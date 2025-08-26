import { useState, useEffect } from "react";
import { supabase, WAITLIST_TABLE, WaitlistEntry } from "@/lib/supabase";
import { Download, RefreshCw } from "lucide-react";

const WaitlistAdmin = () => {
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    notified: 0,
    launched: 0
  });

  const fetchEntries = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from(WAITLIST_TABLE)
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) {
        throw fetchError;
      }

      setEntries(data || []);

      // Calculate stats
      const total = data?.length || 0;
      const pending = data?.filter(entry => entry.status === 'pending').length || 0;
      const notified = data?.filter(entry => entry.status === 'notified').length || 0;
      const launched = data?.filter(entry => entry.status === 'launched').length || 0;

      setStats({ total, pending, notified, launched });
    } catch (err) {
      console.error('Error fetching waitlist entries:', err);
      setError('Failed to fetch waitlist entries');
    } finally {
      setLoading(false);
    }
  };

  const exportToCSV = () => {
    const headers = ['Email', 'Status', 'Created At'];
    const csvContent = [
      headers.join(','),
      ...entries.map(entry => [
        entry.email,
        entry.status || 'pending',
        entry.created_at
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `waitlist-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <RefreshCw className="w-6 h-6 animate-spin" />
        <span className="ml-2">Loading waitlist entries...</span>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-4">Waitlist Admin</h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="text-2xl font-bold text-white">{stats.total}</div>
            <div className="text-gray-400">Total Signups</div>
          </div>
          <div className="bg-blue-800 p-4 rounded-lg">
            <div className="text-2xl font-bold text-white">{stats.pending}</div>
            <div className="text-gray-400">Pending</div>
          </div>
          <div className="bg-yellow-800 p-4 rounded-lg">
            <div className="text-2xl font-bold text-white">{stats.notified}</div>
            <div className="text-gray-400">Notified</div>
          </div>
          <div className="bg-green-800 p-4 rounded-lg">
            <div className="text-2xl font-bold text-white">{stats.launched}</div>
            <div className="text-gray-400">Launched</div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={fetchEntries}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
          <button
            onClick={exportToCSV}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
          <p className="text-red-400">{error}</p>
        </div>
      )}

      {/* Entries Table */}
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Created At
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {entries.map((entry) => (
                <tr key={entry.id} className="hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {entry.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      entry.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      entry.status === 'notified' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {entry.status || 'pending'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {entry.created_at ? new Date(entry.created_at).toLocaleDateString() : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {entries.length === 0 && !loading && (
        <div className="text-center py-8 text-gray-400">
          No waitlist entries found.
        </div>
      )}
    </div>
  );
};

export default WaitlistAdmin;
