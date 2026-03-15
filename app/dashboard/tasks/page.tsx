'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';

interface Task {
  id: string;
  title: string;
  description: string | null;
  is_active: boolean | null;
  source: string | null;
  created_at: string | null;
  tenant_id: string;
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [tenantId, setTenantId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    is_active: true
  });

  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { user }
      } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        const { data: tenantData } = (await supabase
          .from('tenants')
          .select('id')
          .eq('owner_id', user.id)
          .maybeSingle()) as { data: { id: string } | null };

        if (tenantData?.id) {
          setTenantId(tenantData.id);

          const { data: tasksData } = (await supabase
            .from('tasks')
            .select('*')
            .eq('tenant_id', tenantData.id)
            .order('created_at', { ascending: false })) as {
            data: Task[] | null;
          };

          setTasks(tasksData || []);
        }
      }
      setLoading(false);
    };

    fetchData();
  }, [supabase]);

  const createTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tenantId) return;

    const { data, error } = await supabase
      .from('tasks')
      .insert([
        {
          tenant_id: tenantId,
          title: newTask.title,
          description: newTask.description || null,
          is_active: newTask.is_active
        }
      ] as never)
      .select();

    if (data) {
      setTasks([data[0] as Task, ...tasks]);
      setNewTask({ title: '', description: '', is_active: true });
      setShowForm(false);
    }
  };

  const toggleTaskActive = async (id: string, currentActive: boolean) => {
    const { error } = await supabase
      .from('tasks')
      .update({
        is_active: !currentActive,
        updated_at: new Date().toISOString()
      } as never)
      .eq('id', id);

    if (!error) {
      setTasks(
        tasks.map((t) =>
          t.id === id ? { ...t, is_active: !currentActive } : t
        )
      );
    }
  };

  const deleteTask = async (id: string) => {
    const { error } = await supabase.from('tasks').delete().eq('id', id);

    if (!error) {
      setTasks(tasks.filter((t) => t.id !== id));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!tenantId) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-white mb-4">
            No tenant found. Please set up your account first.
          </div>
          <a href="/account" className="text-indigo-400 hover:text-indigo-300">
            Go to Account
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black">
      <div className="max-w-4xl px-4 py-8 mx-auto sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Tasks</h1>
            <p className="mt-2 text-zinc-400">
              Manage your tasks and print queue
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
          >
            {showForm ? 'Cancel' : 'Add Task'}
          </button>
        </div>

        {showForm && (
          <form
            onSubmit={createTask}
            className="mb-8 p-6 bg-zinc-900 rounded-lg border border-zinc-800"
          >
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) =>
                    setNewTask({ ...newTask, title: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">
                  Description
                </label>
                <textarea
                  value={newTask.description || ''}
                  onChange={(e) =>
                    setNewTask({ ...newTask, description: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  rows={3}
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
              >
                Create Task
              </button>
            </div>
          </form>
        )}

        <div className="space-y-4">
          {tasks.length === 0 ? (
            <div className="text-center py-12 bg-zinc-900 rounded-lg border border-zinc-800">
              <p className="text-zinc-400">
                No tasks yet. Create your first task!
              </p>
            </div>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className="p-4 bg-zinc-900 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-medium text-white">
                        {task.title}
                      </h3>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          task.is_active
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-zinc-500/20 text-zinc-400'
                        }`}
                      >
                        {task.is_active ? 'Active' : 'Inactive'}
                      </span>
                      {task.source && (
                        <span className="px-2 py-1 text-xs rounded-full bg-purple-500/20 text-purple-400">
                          {task.source}
                        </span>
                      )}
                    </div>
                    {task.description && (
                      <p className="mt-2 text-zinc-400 text-sm">
                        {task.description}
                      </p>
                    )}
                    <p className="mt-2 text-zinc-500 text-xs">
                      Created{' '}
                      {task.created_at
                        ? new Date(task.created_at).toLocaleDateString()
                        : 'Unknown'}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        toggleTaskActive(task.id, task.is_active || false)
                      }
                      className={`px-3 py-1 rounded text-sm transition-colors ${
                        task.is_active
                          ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30'
                          : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                      }`}
                    >
                      {task.is_active ? 'Deactivate' : 'Activate'}
                    </button>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="px-3 py-1 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded text-sm transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
