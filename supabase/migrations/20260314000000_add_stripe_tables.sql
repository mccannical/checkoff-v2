-- Add Stripe subscription tables
-- These tables are needed for Stripe billing integration

-- Create enum types if they don't exist
DO $$ BEGIN
  CREATE TYPE pricing_type AS ENUM ('one_time', 'recurring');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE pricing_plan_interval AS ENUM ('day', 'week', 'month', 'year');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE subscription_status AS ENUM ('trialing', 'active', 'canceled', 'incomplete', 'incomplete_expired', 'past_due', 'unpaid', 'paused');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create customers table (maps user IDs to Stripe customer IDs)
CREATE TABLE IF NOT EXISTS customers (
  id uuid references auth.users not null primary key,
  stripe_customer_id text
);
alter table customers enable row level security;

-- Create products table (synced from Stripe)
CREATE TABLE IF NOT EXISTS products (
  id text primary key,
  active boolean,
  name text,
  description text,
  image text,
  metadata jsonb
);
alter table products enable row level security;
DO $$ BEGIN
  CREATE POLICY "Allow public read-only access." on products for select using (true);
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create prices table (synced from Stripe)
CREATE TABLE IF NOT EXISTS prices (
  id text primary key,
  product_id text references products, 
  active boolean,
  description text,
  unit_amount bigint,
  currency text check (char_length(currency) = 3),
  type pricing_type,
  interval pricing_plan_interval,
  interval_count integer,
  trial_period_days integer,
  metadata jsonb
);
alter table prices enable row level security;
DO $$ BEGIN
  CREATE POLICY "Allow public read-only access." on prices for select using (true);
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create subscriptions table (synced from Stripe)
CREATE TABLE IF NOT EXISTS subscriptions (
  id text primary key,
  user_id uuid references auth.users not null,
  status subscription_status,
  metadata jsonb,
  price_id text references prices,
  quantity integer,
  cancel_at_period_end boolean,
  created timestamp with time zone default timezone('utc'::text, now()) not null,
  current_period_start timestamp with time zone default timezone('utc'::text, now()) not null,
  current_period_end timestamp with time zone default timezone('utc'::text, now()) not null,
  ended_at timestamp with time zone default timezone('utc'::text, now()),
  cancel_at timestamp with time zone default timezone('utc'::text, now()),
  canceled_at timestamp with time zone default timezone('utc'::text, now()),
  trial_start timestamp with time zone default timezone('utc'::text, now()),
  trial_end timestamp with time zone default timezone('utc'::text, now())
);
alter table subscriptions enable row level security;
DO $$ BEGIN
  CREATE POLICY "Can only view own subs data." on subscriptions for select using (auth.uid() = user_id);
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Add billing_address and payment_method columns to users table if they don't exist
DO $$ BEGIN
  ALTER TABLE users ADD COLUMN billing_address jsonb;
EXCEPTION
  WHEN duplicate_column THEN null;
END $$;

DO $$ BEGIN
  ALTER TABLE users ADD COLUMN payment_method jsonb;
EXCEPTION
  WHEN duplicate_column THEN null;
END $$;

-- Update realtime publication to include Stripe tables
DROP PUBLICATION IF EXISTS supabase_realtime;
CREATE PUBLICATION supabase_realtime FOR TABLE products, prices;
