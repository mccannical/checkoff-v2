'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';

interface Device {
  id: string;
  name: string;
  device_type: string | null;
  status: string | null;
  mac_address: string | null;
  ip_address: string | null;
  last_seen: string | null;
  created_at: string | null;
  tenant_id: string;
}

export default function DevicesPage() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [tenantId, setTenantId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [newDevice, setNewDevice] = useState({
    name: '',
    device_type: 'thermal_printer',
    ip_address: '',
    mac_address: ''
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

          const { data: devicesData } = (await supabase
            .from('devices')
            .select('*')
            .eq('tenant_id', tenantData.id)
            .order('created_at', { ascending: false })) as {
            data: Device[] | null;
          };

          setDevices(devicesData || []);
        }
      }
      setLoading(false);
    };

    fetchData();
  }, [supabase]);

  const createDevice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tenantId) return;

    const { data, error } = await supabase
      .from('devices')
      .insert([
        {
          tenant_id: tenantId,
          name: newDevice.name,
          device_type: newDevice.device_type,
          ip_address: newDevice.ip_address || null,
          mac_address: newDevice.mac_address || null,
          status: 'offline'
        }
      ] as never)
      .select();

    if (data) {
      setDevices([data[0] as Device, ...devices]);
      setNewDevice({
        name: '',
        device_type: 'thermal_printer',
        ip_address: '',
        mac_address: ''
      });
      setShowForm(false);
    }
  };

  const deleteDevice = async (id: string) => {
    const { error } = await supabase.from('devices').delete().eq('id', id);

    if (!error) {
      setDevices(devices.filter((d) => d.id !== id));
    }
  };

  const getStatusColor = (status: string | null) => {
    switch (status) {
      case 'online':
        return 'bg-green-500/20 text-green-400';
      case 'error':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-zinc-500/20 text-zinc-400';
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
            <h1 className="text-3xl font-bold text-white">Devices</h1>
            <p className="mt-2 text-zinc-400">
              Manage your thermal printers and print devices
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
          >
            {showForm ? 'Cancel' : 'Add Device'}
          </button>
        </div>

        {showForm && (
          <form
            onSubmit={createDevice}
            className="mb-8 p-6 bg-zinc-900 rounded-lg border border-zinc-800"
          >
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">
                  Device Name
                </label>
                <input
                  type="text"
                  value={newDevice.name}
                  onChange={(e) =>
                    setNewDevice({ ...newDevice, name: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="e.g., Kitchen Printer"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">
                  Device Type
                </label>
                <select
                  value={newDevice.device_type}
                  onChange={(e) =>
                    setNewDevice({ ...newDevice, device_type: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="thermal_printer">Thermal Printer</option>
                  <option value="label_printer">Label Printer</option>
                  <option value="receipt_printer">Receipt Printer</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">
                    IP Address
                  </label>
                  <input
                    type="text"
                    value={newDevice.ip_address}
                    onChange={(e) =>
                      setNewDevice({ ...newDevice, ip_address: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="192.168.1.100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">
                    MAC Address
                  </label>
                  <input
                    type="text"
                    value={newDevice.mac_address}
                    onChange={(e) =>
                      setNewDevice({
                        ...newDevice,
                        mac_address: e.target.value
                      })
                    }
                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="00:1A:2B:3C:4D:5E"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
              >
                Add Device
              </button>
            </div>
          </form>
        )}

        <div className="space-y-4">
          {devices.length === 0 ? (
            <div className="text-center py-12 bg-zinc-900 rounded-lg border border-zinc-800">
              <p className="text-zinc-400">
                No devices yet. Add your first thermal printer!
              </p>
            </div>
          ) : (
            devices.map((device) => (
              <div
                key={device.id}
                className="p-4 bg-zinc-900 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-indigo-500/20">
                        <svg
                          className="w-5 h-5 text-indigo-400"
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
                        <h3 className="text-lg font-medium text-white">
                          {device.name}
                        </h3>
                        <p className="text-sm text-zinc-400">
                          {device.device_type?.replace('_', ' ') ||
                            'Unknown type'}
                        </p>
                      </div>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${getStatusColor(device.status)}`}
                      >
                        {device.status || 'Offline'}
                      </span>
                    </div>
                    <div className="mt-3 flex gap-4 text-sm text-zinc-500">
                      {device.ip_address && (
                        <span>IP: {device.ip_address}</span>
                      )}
                      {device.mac_address && (
                        <span>MAC: {device.mac_address}</span>
                      )}
                      {device.last_seen && (
                        <span>
                          Last seen:{' '}
                          {new Date(device.last_seen).toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => deleteDevice(device.id)}
                    className="px-3 py-1 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded text-sm transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
