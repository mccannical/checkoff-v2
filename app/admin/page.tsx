'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';

interface Tenant {
  id: string;
  name: string;
  owner_id: string;
  created_at: string | null;
}

interface AdminUser {
  id: string;
  email: string;
  full_name: string | null;
  role: string;
  created_at: string | null;
}

export default function AdminPage() {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [stats, setStats] = useState({
    totalTenants: 0,
    totalUsers: 0,
    totalTasks: 0,
    totalDevices: 0
  });

  const supabase = createClient();

  useEffect(() => {
    const checkAdmin = async () => {
      const {
        data: { user }
      } = await supabase.auth.getUser();

      if (user) {
        const { data: adminUser } = (await supabase
          .from('admin_users')
          .select('*')
          .eq('id', user.id)
          .maybeSingle()) as { data: AdminUser | null };

        if (adminUser && adminUser.role === 'admin') {
          setIsAdmin(true);
          await fetchData();
        }
      }
      setLoading(false);
    };

    const fetchData = async () => {
      const { data: tenantsData } = (await supabase
        .from('tenants')
        .select('*')
        .order('created_at', { ascending: false })) as {
        data: Tenant[] | null;
      };

      const { data: usersData } = (await supabase
        .from('admin_users')
        .select('*')
        .order('created_at', { ascending: false })) as {
        data: AdminUser[] | null;
      };

      const { count: tasksCount } = await supabase
        .from('tasks')
        .select('*', { count: 'exact', head: true });

      const { count: devicesCount } = await supabase
        .from('devices')
        .select('*', { count: 'exact', head: true });

      if (tenantsData) setTenants(tenantsData);
      if (usersData) setAdminUsers(usersData);
      setStats({
        totalTenants: tenantsData?.length || 0,
        totalUsers: usersData?.length || 0,
        totalTasks: tasksCount || 0,
        totalDevices: devicesCount || 0
      });
    };

    checkAdmin();
  }, [supabase]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-white mb-4">Access Denied</div>
          <p className="text-zinc-400 mb-4">
            You need admin privileges to view this page.
          </p>
          <a
            href="/dashboard"
            className="text-indigo-400 hover:text-indigo-300"
          >
            Go to Dashboard
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black">
      <div className="max-w-6xl px-4 py-8 mx-auto sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Admin Portal</h1>
          <p className="mt-2 text-zinc-400">Manage your Checkoff application</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <div className="p-6 rounded-lg bg-zinc-900 border border-zinc-800">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-indigo-500/20">
                <svg
                  className="w-6 h-6 text-indigo-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm text-zinc-400">Total Tenants</p>
                <p className="text-2xl font-bold text-white">
                  {stats.totalTenants}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-lg bg-zinc-900 border border-zinc-800">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-green-500/20">
                <svg
                  className="w-6 h-6 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm text-zinc-400">Total Users</p>
                <p className="text-2xl font-bold text-white">
                  {stats.totalUsers}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-lg bg-zinc-900 border border-zinc-800">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-yellow-500/20">
                <svg
                  className="w-6 h-6 text-yellow-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm text-zinc-400">Total Tasks</p>
                <p className="text-2xl font-bold text-white">
                  {stats.totalTasks}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-lg bg-zinc-900 border border-zinc-800">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-purple-500/20">
                <svg
                  className="w-6 h-6 text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm text-zinc-400">Total Devices</p>
                <p className="text-2xl font-bold text-white">
                  {stats.totalDevices}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="p-6 rounded-lg bg-zinc-900 border border-zinc-800">
            <h2 className="text-xl font-semibold text-white mb-4">
              Recent Tenants
            </h2>
            <div className="space-y-3">
              {tenants.slice(0, 5).map((tenant) => (
                <div
                  key={tenant.id}
                  className="flex justify-between items-center p-3 rounded-lg bg-zinc-800"
                >
                  <div>
                    <p className="text-white font-medium">{tenant.name}</p>
                    <p className="text-zinc-400 text-sm">
                      Created{' '}
                      {tenant.created_at
                        ? new Date(tenant.created_at).toLocaleDateString()
                        : 'Unknown'}
                    </p>
                  </div>
                </div>
              ))}
              {tenants.length === 0 && (
                <p className="text-zinc-400 text-center py-4">No tenants yet</p>
              )}
            </div>
          </div>

          <div className="p-6 rounded-lg bg-zinc-900 border border-zinc-800">
            <h2 className="text-xl font-semibold text-white mb-4">
              Admin Users
            </h2>
            <div className="space-y-3">
              {adminUsers.slice(0, 5).map((user) => (
                <div
                  key={user.id}
                  className="flex justify-between items-center p-3 rounded-lg bg-zinc-800"
                >
                  <div>
                    <p className="text-white font-medium">
                      {user.full_name || user.email}
                    </p>
                    <p className="text-zinc-400 text-sm">{user.email}</p>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      user.role === 'admin'
                        ? 'bg-indigo-500/20 text-indigo-400'
                        : 'bg-zinc-500/20 text-zinc-400'
                    }`}
                  >
                    {user.role}
                  </span>
                </div>
              ))}
              {adminUsers.length === 0 && (
                <p className="text-zinc-400 text-center py-4">
                  No admin users yet
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 p-6 rounded-lg bg-zinc-900 border border-zinc-800">
          <h2 className="text-xl font-semibold text-white mb-4">Quick Links</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <a
              href="https://supabase.com/dashboard/project/kirlloierbnloqbmrxpk"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors text-center"
            >
              <p className="text-white font-medium">Supabase Dashboard</p>
            </a>
            <a
              href="https://dashboard.stripe.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors text-center"
            >
              <p className="text-white font-medium">Stripe Dashboard</p>
            </a>
            <a
              href="https://vercel.com/dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors text-center"
            >
              <p className="text-white font-medium">Vercel Dashboard</p>
            </a>
            <a
              href="https://github.com/mccannical/checkoff-v2"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors text-center"
            >
              <p className="text-white font-medium">GitHub Repo</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
