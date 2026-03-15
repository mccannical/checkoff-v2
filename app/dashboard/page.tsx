import { createClient } from '@/utils/supabase/server';
import { getUser } from '@/utils/supabase/queries';
import { redirect } from 'next/navigation';
import Navbar from '@/components/ui/Navbar';

export default async function DashboardPage() {
  const supabase = createClient();
  const user = await getUser(supabase);

  if (!user) {
    redirect('/signin');
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black">
      <Navbar />
      <main className="max-w-6xl px-4 py-8 mx-auto sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="mt-2 text-zinc-400">
            Manage your tasks and print devices
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm text-zinc-400">Total Tasks</p>
                <p className="text-2xl font-bold text-white">0</p>
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
                    d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm text-zinc-400">Print Jobs</p>
                <p className="text-2xl font-bold text-white">0</p>
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
                    d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm text-zinc-400">Devices</p>
                <p className="text-2xl font-bold text-white">0</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 p-6 rounded-lg bg-zinc-900 border border-zinc-800">
          <h2 className="text-xl font-semibold text-white mb-4">
            Quick Actions
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <a
              href="/dashboard/tasks"
              className="p-4 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors text-center"
            >
              <p className="text-white font-medium">View Tasks</p>
            </a>
            <a
              href="/dashboard/devices"
              className="p-4 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors text-center"
            >
              <p className="text-white font-medium">Manage Devices</p>
            </a>
            <a
              href="/account"
              className="p-4 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors text-center"
            >
              <p className="text-white font-medium">Subscription</p>
            </a>
            <a
              href="/account"
              className="p-4 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors text-center"
            >
              <p className="text-white font-medium">Settings</p>
            </a>
          </div>
        </div>

        <div className="mt-8 p-6 rounded-lg bg-zinc-900 border border-zinc-800">
          <h2 className="text-xl font-semibold text-white mb-4">
            Getting Started
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">
                1
              </div>
              <div>
                <h3 className="text-white font-medium">
                  Connect Your Task Manager
                </h3>
                <p className="text-zinc-400 text-sm">
                  Integrate with Todoist, Apple Reminders, or other supported
                  platforms
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center text-zinc-400 font-bold">
                2
              </div>
              <div>
                <h3 className="text-zinc-300 font-medium">
                  Set Up Your Print Device
                </h3>
                <p className="text-zinc-500 text-sm">
                  Connect a thermal printer to your network
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center text-zinc-400 font-bold">
                3
              </div>
              <div>
                <h3 className="text-zinc-300 font-medium">
                  Start Printing Tasks
                </h3>
                <p className="text-zinc-500 text-sm">
                  Your tasks will automatically print to your configured device
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
