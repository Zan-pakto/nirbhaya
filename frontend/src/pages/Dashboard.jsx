import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { createAlert } from '../services/alertService';
import { getProfile } from '../services/userService';
import toast from 'react-hot-toast';
import FakeCall from '../components/FakeCall';
import AppShell from '../components/AppShell';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showFakeCall, setShowFakeCall] = useState(false);
  const [locationInterval, setLocationInterval] = useState(null);
  const navigate = useNavigate();
  const fakeCallTimeoutRef = useRef(null);

  useEffect(() => {
    loadUser();
    getCurrentLocation();
  }, []);

  const loadUser = async () => {
    try {
      const response = await getProfile();
      setUser(response.data);
    } catch (error) {
      toast.error('Failed to load profile');
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          toast.error('Location access denied. Please enable location services.');
        }
      );
    } else {
      toast.error('Geolocation is not supported by your browser.');
    }
  };

  const handleSOS = async (type = 'sos') => {
    if (!location) {
      toast.error('Location not available. Please enable location services.');
      return;
    }

    setLoading(true);
    try {
      const alertData = {
        type,
        location: {
          latitude: location.latitude,
          longitude: location.longitude,
        },
      };

      await createAlert(alertData);
      toast.success(type === 'sos' ? 'SOS alert sent! Trusted contacts have been notified.' : 'Silent alert sent!');
      
      // Start continuous location updates
      if (!locationInterval) {
        const interval = setInterval(() => {
          getCurrentLocation();
        }, 30000); // Update every 30 seconds
        setLocationInterval(interval);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send alert');
    } finally {
      setLoading(false);
    }
  };

  const handleFakeCall = () => {
    setShowFakeCall(true);
    // Auto-dismiss after 30 seconds
    fakeCallTimeoutRef.current = setTimeout(() => {
      setShowFakeCall(false);
    }, 30000);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const headerActions = (
    <>
      <button
        onClick={() => navigate('/profile')}
        className="px-3 py-2 rounded-lg text-sm font-medium text-white bg-white/15 hover:bg-white/25 border border-white/15 transition"
      >
        Profile
      </button>
      {user?.role === 'admin' && (
        <button
          onClick={() => navigate('/admin')}
          className="px-3 py-2 rounded-lg text-sm font-medium text-white bg-white/15 hover:bg-white/25 border border-white/15 transition"
        >
          Admin
        </button>
      )}
      <button
        onClick={handleLogout}
        className="px-3 py-2 rounded-lg text-sm font-medium text-slate-900 bg-white hover:bg-slate-100 border border-white/30 transition shadow"
      >
        Logout
      </button>
    </>
  );

  return (
    <AppShell title={`Welcome, ${user?.name || 'User'}`} subtitle="Your safety controls in one place" actions={headerActions}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-primary-600 to-orange-500 shadow-xl border border-white/10 text-white">
            <p className="text-sm uppercase tracking-wide text-orange-100/90 font-semibold">Emergency</p>
            <h3 className="text-2xl font-bold mt-1 mb-4">SOS Alert</h3>
            <button
              onClick={() => handleSOS('sos')}
              disabled={loading || !location}
              className="w-full h-16 rounded-xl bg-white text-primary-700 font-semibold text-lg shadow-lg hover:translate-y-[-1px] transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending...' : 'Tap to send SOS'}
            </button>
            <p className="text-sm text-orange-50/90 mt-3">Sends immediate alert + live location to trusted contacts.</p>
          </div>

          <div className="p-6 rounded-2xl bg-white/10 border border-white/15 shadow-xl">
            <p className="text-sm uppercase tracking-wide text-orange-100/90 font-semibold">Discreet</p>
            <h3 className="text-2xl font-bold text-white mt-1 mb-4">Silent Alert</h3>
            <button
              onClick={() => handleSOS('silent')}
              disabled={loading || !location}
              className="w-full h-16 rounded-xl bg-white/10 text-white font-semibold text-lg border border-white/20 hover:bg-white/15 transition shadow disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending...' : 'Send silent alert'}
            </button>
            <p className="text-sm text-slate-200/80 mt-3">No sound or screen flash. Contacts still receive your location.</p>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-orange-100">Location status</p>
            {location && (
              <span className="px-3 py-1 text-xs rounded-full bg-emerald-500/20 text-emerald-100">
                Active
              </span>
            )}
          </div>
          {location ? (
            <>
              <p className="text-lg text-white font-semibold">Lat {location.latitude.toFixed(4)}</p>
              <p className="text-lg text-white font-semibold">Lng {location.longitude.toFixed(4)}</p>
              {locationInterval && (
                <p className="text-sm text-emerald-100/80">Continuous tracking enabled</p>
              )}
            </>
          ) : (
            <p className="text-slate-200/80 text-sm">Location not available. Enable GPS to send alerts.</p>
          )}
          <button
            onClick={getCurrentLocation}
            className="w-full px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-sm font-medium text-white border border-white/15 transition"
          >
            Refresh location
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">Quick actions</h3>
              <span className="text-xs uppercase tracking-wide text-orange-200">Stay prepared</span>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <button
                onClick={handleFakeCall}
                className="px-6 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold shadow-lg hover:translate-y-[-1px] transition"
              >
                📞 Trigger fake call
              </button>
              <button
                onClick={() => navigate('/profile')}
                className="px-6 py-4 rounded-xl bg-white/10 border border-white/15 text-white font-semibold hover:bg-white/15 transition"
              >
                👥 Manage trusted contacts
              </button>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">
                Trusted Contacts ({user?.trustedContacts?.length || 0})
              </h3>
              <button
                onClick={() => navigate('/profile')}
                className="text-sm px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/15"
              >
                Edit contacts
              </button>
            </div>
            {user?.trustedContacts && user.trustedContacts.length > 0 ? (
              <ul className="space-y-3">
                {user.trustedContacts.map((contact, index) => (
                  <li
                    key={index}
                    className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-white"
                  >
                    <div>
                      <p className="font-semibold">{contact.name}</p>
                      <p className="text-sm text-slate-200/80">{contact.phone}</p>
                      {contact.email && <p className="text-sm text-slate-200/80">{contact.email}</p>}
                    </div>
                    <span className="text-xs text-orange-200">Trusted</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-slate-200/80">No trusted contacts yet. Add at least two for redundancy.</p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 shadow-lg text-white">
            <p className="text-sm uppercase tracking-wide text-orange-200 mb-2">Tips</p>
            <ul className="space-y-2 text-sm text-slate-200/80">
              <li>• Keep GPS enabled to speed up alerts.</li>
              <li>• Test a silent alert weekly with a trusted contact.</li>
              <li>• Pin Nirbhaya to your home screen for one-tap access.</li>
            </ul>
          </div>
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 shadow-lg text-white">
            <p className="text-sm uppercase tracking-wide text-orange-200 mb-2">Need help?</p>
            <p className="text-sm text-slate-200/80 mb-3">
              Visit resources or contact support if you run into issues.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => navigate('/resources')}
                className="flex-1 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-sm font-semibold border border-white/15"
              >
                Resources
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="flex-1 px-3 py-2 rounded-lg bg-primary-500 text-white text-sm font-semibold shadow hover:bg-primary-600"
              >
                Contact
              </button>
            </div>
          </div>
        </div>
      </div>

      {showFakeCall && (
        <FakeCall
          onClose={() => {
            setShowFakeCall(false);
            if (fakeCallTimeoutRef.current) {
              clearTimeout(fakeCallTimeoutRef.current);
            }
          }}
        />
      )}
    </AppShell>
  );
};

export default Dashboard;

