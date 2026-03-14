export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      admin_integrations: {
        Row: {
          admin_user_id: string
          created_at: string | null
          id: string
          provider: string
          provider_account_id: string
          settings: Json | null
          updated_at: string | null
        }
        Insert: {
          admin_user_id: string
          created_at?: string | null
          id?: string
          provider: string
          provider_account_id: string
          settings?: Json | null
          updated_at?: string | null
        }
        Update: {
          admin_user_id?: string
          created_at?: string | null
          id?: string
          provider?: string
          provider_account_id?: string
          settings?: Json | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "admin_integrations_admin_user_id_fkey"
            columns: ["admin_user_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      admin_users: {
        Row: {
          apple_user_id: string | null
          avatar_url: string | null
          created_at: string | null
          email: string
          full_name: string | null
          id: string
          last_login_at: string | null
          role: string
          updated_at: string | null
        }
        Insert: {
          apple_user_id?: string | null
          avatar_url?: string | null
          created_at?: string | null
          email: string
          full_name?: string | null
          id?: string
          last_login_at?: string | null
          role: string
          updated_at?: string | null
        }
        Update: {
          apple_user_id?: string | null
          avatar_url?: string | null
          created_at?: string | null
          email?: string
          full_name?: string | null
          id?: string
          last_login_at?: string | null
          role?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      audit_logs: {
        Row: {
          action: string
          changes: Json | null
          created_at: string | null
          entity_id: string | null
          entity_type: string | null
          id: string
          ip_address: unknown
          tenant_id: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          changes?: Json | null
          created_at?: string | null
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          ip_address?: unknown
          tenant_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          changes?: Json | null
          created_at?: string | null
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          ip_address?: unknown
          tenant_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenant_dashboard"
            referencedColumns: ["tenant_id"]
          },
          {
            foreignKeyName: "audit_logs_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "audit_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      customers: {
        Row: {
          id: string
          stripe_customer_id: string | null
        }
        Insert: {
          id: string
          stripe_customer_id?: string | null
        }
        Update: {
          id?: string
          stripe_customer_id?: string | null
        }
        Relationships: []
      }
      device_logs: {
        Row: {
          created_at: string | null
          device_id: string
          id: string
          level: string | null
          message: string
          metadata: Json | null
        }
        Insert: {
          created_at?: string | null
          device_id: string
          id?: string
          level?: string | null
          message: string
          metadata?: Json | null
        }
        Update: {
          created_at?: string | null
          device_id?: string
          id?: string
          level?: string | null
          message?: string
          metadata?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "device_logs_device_id_fkey"
            columns: ["device_id"]
            isOneToOne: false
            referencedRelation: "devices"
            referencedColumns: ["id"]
          },
        ]
      }
      devices: {
        Row: {
          created_at: string | null
          firmware_version: string | null
          id: string
          ip_address: unknown
          last_seen_at: string | null
          mac_address: unknown
          model: string | null
          name: string
          serial_number: string | null
          settings: Json | null
          status: string | null
          tenant_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          firmware_version?: string | null
          id?: string
          ip_address?: unknown
          last_seen_at?: string | null
          mac_address?: unknown
          model?: string | null
          name: string
          serial_number?: string | null
          settings?: Json | null
          status?: string | null
          tenant_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          firmware_version?: string | null
          id?: string
          ip_address?: unknown
          last_seen_at?: string | null
          mac_address?: unknown
          model?: string | null
          name?: string
          serial_number?: string | null
          settings?: Json | null
          status?: string | null
          tenant_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "devices_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenant_dashboard"
            referencedColumns: ["tenant_id"]
          },
          {
            foreignKeyName: "devices_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      integrations: {
        Row: {
          access_token: string | null
          created_at: string | null
          id: string
          last_sync_at: string | null
          provider: string
          provider_account_id: string | null
          refresh_token: string | null
          scopes: string[] | null
          settings: Json | null
          tenant_id: string
          token_expires_at: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          access_token?: string | null
          created_at?: string | null
          id?: string
          last_sync_at?: string | null
          provider: string
          provider_account_id?: string | null
          refresh_token?: string | null
          scopes?: string[] | null
          settings?: Json | null
          tenant_id: string
          token_expires_at?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          access_token?: string | null
          created_at?: string | null
          id?: string
          last_sync_at?: string | null
          provider?: string
          provider_account_id?: string | null
          refresh_token?: string | null
          scopes?: string[] | null
          settings?: Json | null
          tenant_id?: string
          token_expires_at?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "integrations_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenant_dashboard"
            referencedColumns: ["tenant_id"]
          },
          {
            foreignKeyName: "integrations_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "integrations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      prices: {
        Row: {
          active: boolean | null
          currency: string | null
          description: string | null
          id: string
          interval: Database["public"]["Enums"]["pricing_plan_interval"] | null
          interval_count: number | null
          metadata: Json | null
          product_id: string | null
          trial_period_days: number | null
          type: Database["public"]["Enums"]["pricing_type"] | null
          unit_amount: number | null
        }
        Insert: {
          active?: boolean | null
          currency?: string | null
          description?: string | null
          id: string
          interval?: Database["public"]["Enums"]["pricing_plan_interval"] | null
          interval_count?: number | null
          metadata?: Json | null
          product_id?: string | null
          trial_period_days?: number | null
          type?: Database["public"]["Enums"]["pricing_type"] | null
          unit_amount?: number | null
        }
        Update: {
          active?: boolean | null
          currency?: string | null
          description?: string | null
          id?: string
          interval?: Database["public"]["Enums"]["pricing_plan_interval"] | null
          interval_count?: number | null
          metadata?: Json | null
          product_id?: string | null
          trial_period_days?: number | null
          type?: Database["public"]["Enums"]["pricing_type"] | null
          unit_amount?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "prices_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      print_jobs: {
        Row: {
          attempts: number | null
          completed_at: string | null
          created_at: string | null
          device_id: string
          id: string
          last_error: string | null
          max_attempts: number | null
          payload: string | null
          payload_text: string | null
          sent_at: string | null
          status: string | null
          task_instance_id: string | null
          tenant_id: string
          updated_at: string | null
        }
        Insert: {
          attempts?: number | null
          completed_at?: string | null
          created_at?: string | null
          device_id: string
          id?: string
          last_error?: string | null
          max_attempts?: number | null
          payload?: string | null
          payload_text?: string | null
          sent_at?: string | null
          status?: string | null
          task_instance_id?: string | null
          tenant_id: string
          updated_at?: string | null
        }
        Update: {
          attempts?: number | null
          completed_at?: string | null
          created_at?: string | null
          device_id?: string
          id?: string
          last_error?: string | null
          max_attempts?: number | null
          payload?: string | null
          payload_text?: string | null
          sent_at?: string | null
          status?: string | null
          task_instance_id?: string | null
          tenant_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "print_jobs_device_id_fkey"
            columns: ["device_id"]
            isOneToOne: false
            referencedRelation: "devices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "print_jobs_task_instance_id_fkey"
            columns: ["task_instance_id"]
            isOneToOne: false
            referencedRelation: "task_instances"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "print_jobs_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenant_dashboard"
            referencedColumns: ["tenant_id"]
          },
          {
            foreignKeyName: "print_jobs_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          active: boolean | null
          description: string | null
          id: string
          image: string | null
          metadata: Json | null
          name: string | null
        }
        Insert: {
          active?: boolean | null
          description?: string | null
          id: string
          image?: string | null
          metadata?: Json | null
          name?: string | null
        }
        Update: {
          active?: boolean | null
          description?: string | null
          id?: string
          image?: string | null
          metadata?: Json | null
          name?: string | null
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          cancel_at: string | null
          cancel_at_period_end: boolean | null
          canceled_at: string | null
          created: string
          current_period_end: string
          current_period_start: string
          ended_at: string | null
          id: string
          metadata: Json | null
          price_id: string | null
          quantity: number | null
          status: Database["public"]["Enums"]["subscription_status"] | null
          trial_end: string | null
          trial_start: string | null
          user_id: string
        }
        Insert: {
          cancel_at?: string | null
          cancel_at_period_end?: boolean | null
          canceled_at?: string | null
          created?: string
          current_period_end?: string
          current_period_start?: string
          ended_at?: string | null
          id: string
          metadata?: Json | null
          price_id?: string | null
          quantity?: number | null
          status?: Database["public"]["Enums"]["subscription_status"] | null
          trial_end?: string | null
          trial_start?: string | null
          user_id: string
        }
        Update: {
          cancel_at?: string | null
          cancel_at_period_end?: boolean | null
          canceled_at?: string | null
          created?: string
          current_period_end?: string
          current_period_start?: string
          ended_at?: string | null
          id?: string
          metadata?: Json | null
          price_id?: string | null
          quantity?: number | null
          status?: Database["public"]["Enums"]["subscription_status"] | null
          trial_end?: string | null
          trial_start?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_price_id_fkey"
            columns: ["price_id"]
            isOneToOne: false
            referencedRelation: "prices"
            referencedColumns: ["id"]
          },
        ]
      }
      task_instances: {
        Row: {
          completed_at: string | null
          created_at: string | null
          device_id: string | null
          id: string
          notes: string | null
          printed_at: string | null
          scheduled_for: string
          scheduled_time: string
          status: string | null
          task_id: string
          tenant_id: string
          updated_at: string | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          device_id?: string | null
          id?: string
          notes?: string | null
          printed_at?: string | null
          scheduled_for: string
          scheduled_time: string
          status?: string | null
          task_id: string
          tenant_id: string
          updated_at?: string | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          device_id?: string | null
          id?: string
          notes?: string | null
          printed_at?: string | null
          scheduled_for?: string
          scheduled_time?: string
          status?: string | null
          task_id?: string
          tenant_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "task_instances_device_id_fkey"
            columns: ["device_id"]
            isOneToOne: false
            referencedRelation: "devices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "task_instances_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "task_instances_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenant_dashboard"
            referencedColumns: ["tenant_id"]
          },
          {
            foreignKeyName: "task_instances_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      tasks: {
        Row: {
          created_at: string | null
          cron_expression: string | null
          description: string | null
          external_id: string | null
          frequency: Database["public"]["Enums"]["task_frequency"] | null
          id: string
          is_active: boolean | null
          metadata: Json | null
          source: string | null
          tags: string[] | null
          tenant_id: string
          time_of_day: string | null
          timezone: string | null
          title: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          cron_expression?: string | null
          description?: string | null
          external_id?: string | null
          frequency?: Database["public"]["Enums"]["task_frequency"] | null
          id?: string
          is_active?: boolean | null
          metadata?: Json | null
          source?: string | null
          tags?: string[] | null
          tenant_id: string
          time_of_day?: string | null
          timezone?: string | null
          title: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          cron_expression?: string | null
          description?: string | null
          external_id?: string | null
          frequency?: Database["public"]["Enums"]["task_frequency"] | null
          id?: string
          is_active?: boolean | null
          metadata?: Json | null
          source?: string | null
          tags?: string[] | null
          tenant_id?: string
          time_of_day?: string | null
          timezone?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tasks_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenant_dashboard"
            referencedColumns: ["tenant_id"]
          },
          {
            foreignKeyName: "tasks_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      tenants: {
        Row: {
          created_at: string | null
          deleted_at: string | null
          id: string
          metadata: Json | null
          name: string
          plan: string | null
          settings: Json | null
          slug: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          deleted_at?: string | null
          id?: string
          metadata?: Json | null
          name: string
          plan?: string | null
          settings?: Json | null
          slug: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          deleted_at?: string | null
          id?: string
          metadata?: Json | null
          name?: string
          plan?: string | null
          settings?: Json | null
          slug?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          avatar_url: string | null
          billing_address: Json | null
          created_at: string | null
          email: string
          full_name: string | null
          id: string
          last_login_at: string | null
          payment_method: Json | null
          preferences: Json | null
          role: string | null
          tenant_id: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          billing_address?: Json | null
          created_at?: string | null
          email: string
          full_name?: string | null
          id?: string
          last_login_at?: string | null
          payment_method?: Json | null
          preferences?: Json | null
          role?: string | null
          tenant_id?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          billing_address?: Json | null
          created_at?: string | null
          email?: string
          full_name?: string | null
          id?: string
          last_login_at?: string | null
          payment_method?: Json | null
          preferences?: Json | null
          role?: string | null
          tenant_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenant_dashboard"
            referencedColumns: ["tenant_id"]
          },
          {
            foreignKeyName: "users_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      tenant_dashboard: {
        Row: {
          active_tasks: number | null
          completed_today: number | null
          failed_print_jobs: number | null
          online_devices: number | null
          pending_today: number | null
          plan: string | null
          queued_print_jobs: number | null
          tenant_created_at: string | null
          tenant_id: string | null
          tenant_name: string | null
          total_devices: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      generate_storage_path: {
        Args: {
          bucket_name: string
          original_filename: string
          user_id: string
        }
        Returns: string
      }
      has_storage_access: {
        Args: { bucket_name: string; storage_path: string }
        Returns: boolean
      }
      is_admin: { Args: never; Returns: boolean }
      is_service_role: { Args: never; Returns: boolean }
      tenant_id: { Args: never; Returns: string }
    }
    Enums: {
      pricing_plan_interval: "day" | "week" | "month" | "year"
      pricing_type: "one_time" | "recurring"
      subscription_status:
        | "trialing"
        | "active"
        | "canceled"
        | "incomplete"
        | "incomplete_expired"
        | "past_due"
        | "unpaid"
        | "paused"
      task_frequency: "once" | "daily" | "weekdays" | "weekends" | "custom"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      pricing_plan_interval: ["day", "week", "month", "year"],
      pricing_type: ["one_time", "recurring"],
      subscription_status: [
        "trialing",
        "active",
        "canceled",
        "incomplete",
        "incomplete_expired",
        "past_due",
        "unpaid",
        "paused",
      ],
      task_frequency: ["once", "daily", "weekdays", "weekends", "custom"],
    },
  },
} as const
