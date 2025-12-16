import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllAlerts, resolveAlert } from '../services/alertService';
import toast from 'react-hot-toast';
import AppShell from '../components/AppShell';

const AdminDashboard = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [resolveForm, setResolveForm] = useState({
    status: 'resolved',
    notes: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    loadAlerts();
    // Refresh alerts every 30 seconds
    const interval = setInterval(loadAlerts, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadAlerts = async () => {
    try {
      const response = await getAllAlerts();
      setAlerts(response.data);
    } catch (error) {
      toast.error('Failed to load alerts');
    }
  };

  const handleResolve = async (e) => {
    e.preventDefault();
    if (!selectedAlert) return;

    setLoading(true);
    try {
      await resolveAlert(selectedAlert._id, resolveForm.status, resolveForm.notes);
      toast.success('Alert resolved successfully');
      setSelectedAlert(null);
      setResolveForm({ status: 'resolved', notes: '' });
      loadAlerts();
    } catch (error) {
      toast.error('Failed to resolve alert');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-red-100 text-red-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'false_alarm':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type) => {
    return type === 'sos' ? 'bg-red-600' : 'bg-orange-600';
  };

  const activeAlerts = alerts.filter((alert) => alert.status === 'active');
  const resolvedAlerts = alerts.filter((alert) => alert.status !== 'active');

  const headerActions = (
    <>
      <button
        onClick={() => navigate('/dashboard')}
        className="px-3 py-2 rounded-lg text-sm font-medium text-white bg-white/15 hover:bg-white/25 border border-white/15 transition"
      >
        User dashboard
      </button>
      <button
        onClick={() => {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          navigate('/login');
        }}
        className="px-3 py-2 rounded-lg text-sm font-medium text-slate-900 bg-white hover:bg-slate-100 border border-white/30 transition shadow"
      >
        Logout
      </button>
    </>
  );

  return (
    <AppShell title="Admin Control" subtitle="Monitor and resolve incoming alerts" actions={headerActions}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="p-5 rounded-2xl bg-gradient-to-br from-primary-600 to-orange-500 text-white shadow-xl border border-white/10">
          <p className="text-sm uppercase tracking-wide text-orange-100/80">Total alerts</p>
          <p className="text-3xl font-bold mt-1">{alerts.length}</p>
        </div>
        <div className="p-5 rounded-2xl bg-white/10 border border-white/15 text-white shadow-xl">
          <p className="text-sm uppercase tracking-wide text-orange-100/80">Active</p>
          <p className="text-3xl font-bold mt-1 text-red-200">{activeAlerts.length}</p>
        </div>
        <div className="p-5 rounded-2xl bg-white/10 border border-white/15 text-white shadow-xl">
          <p className="text-sm uppercase tracking-wide text-orange-100/80">Resolved / false</p>
          <p className="text-3xl font-bold mt-1 text-emerald-200">{resolvedAlerts.length}</p>
        </div>
      </div>

      {activeAlerts.length > 0 && (
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 shadow-xl mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">
            Active Alerts ({activeAlerts.length})
          </h2>
          <div className="space-y-4">
            {activeAlerts.map((alert) => (
              <div
                key={alert._id}
                className="border border-red-500/40 bg-red-500/10 p-4 rounded-xl text-white"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded text-white text-xs font-medium ${getTypeColor(alert.type)}`}>
                        {alert.type.toUpperCase()}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(alert.status)}`}>
                        {alert.status}
                      </span>
                    </div>
                    <p className="font-semibold">
                      User: {alert.user?.name || 'Unknown'} ({alert.user?.email || 'N/A'})
                    </p>
                    <p className="text-sm text-slate-200/80">Phone: {alert.user?.phone || 'N/A'}</p>
                    <p className="text-sm text-slate-200/80">Time: {new Date(alert.createdAt).toLocaleString()}</p>
                    <p className="text-sm text-slate-200/80">
                      Location: {alert.location.latitude.toFixed(6)}, {alert.location.longitude.toFixed(6)}
                    </p>
                    <a
                      href={`https://www.google.com/maps?q=${alert.location.latitude},${alert.location.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-100 underline text-sm"
                    >
                      View on Google Maps →
                    </a>
                    {alert.notifiedContacts && alert.notifiedContacts.length > 0 && (
                      <p className="text-sm text-slate-200/80">
                        Notified contacts: {alert.notifiedContacts.length}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => setSelectedAlert(alert)}
                    className="ml-4 px-4 py-2 bg-white text-primary-700 font-semibold rounded-lg shadow hover:bg-slate-100"
                  >
                    Resolve
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="p-6 rounded-2xl bg-white/5 border border-white/10 shadow-xl overflow-x-auto">
        <h2 className="text-xl font-semibold text-white mb-4">All Alerts</h2>
        <table className="min-w-full text-sm text-left text-slate-100">
          <thead className="text-xs uppercase bg-white/5 text-slate-200">
            <tr>
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Time</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {alerts.map((alert) => (
              <tr key={alert._id}>
                <td className="px-4 py-3">
                  <div className="font-semibold text-white">{alert.user?.name || 'Unknown'}</div>
                  <div className="text-slate-200/80">{alert.user?.email || 'N/A'}</div>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded text-white text-xs font-medium ${getTypeColor(alert.type)}`}>
                    {alert.type.toUpperCase()}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(alert.status)}`}>
                    {alert.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-200/80">
                  {new Date(alert.createdAt).toLocaleString()}
                </td>
                <td className="px-4 py-3">
                  <a
                    href={`https://www.google.com/maps?q=${alert.location.latitude},${alert.location.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-100 underline"
                  >
                    View map
                  </a>
                </td>
                <td className="px-4 py-3">
                  {alert.status === 'active' && (
                    <button
                      onClick={() => setSelectedAlert(alert)}
                      className="text-orange-100 hover:text-white font-semibold"
                    >
                      Resolve
                    </button>
                  )}
                  {alert.resolvedBy && (
                    <div className="text-xs text-slate-200/80">
                      Resolved by: {alert.resolvedBy?.name || 'Admin'}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedAlert && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-slate-900 rounded-2xl shadow-2xl border border-white/10 p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold text-white mb-4">Resolve Alert</h2>
            <form onSubmit={handleResolve} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">
                  Status
                </label>
                <select
                  value={resolveForm.status}
                  onChange={(e) => setResolveForm({ ...resolveForm, status: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/15 text-white focus:outline-none focus:ring-2 focus:ring-orange-300/70"
                >
                  <option value="resolved">Resolved</option>
                  <option value="false_alarm">False Alarm</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">
                  Notes (Optional)
                </label>
                <textarea
                  value={resolveForm.notes}
                  onChange={(e) => setResolveForm({ ...resolveForm, notes: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/15 text-white focus:outline-none focus:ring-2 focus:ring-orange-300/70"
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedAlert(null);
                    setResolveForm({ status: 'resolved', notes: '' });
                  }}
                  className="px-5 py-2 rounded-lg border border-white/20 text-slate-200 hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 rounded-lg bg-gradient-to-r from-primary-500 to-orange-400 text-white font-semibold shadow disabled:opacity-60"
                >
                  {loading ? 'Resolving...' : 'Resolve'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AppShell>
  );
};

export default AdminDashboard;

