import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfile, updateProfile, addTrustedContact, removeTrustedContact } from '../services/userService';
import toast from 'react-hot-toast';
import AppShell from '../components/AppShell';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showAddContact, setShowAddContact] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    phone: '',
    email: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const response = await getProfile();
      setUser(response.data);
    } catch (error) {
      toast.error('Failed to load profile');
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await updateProfile({
        name: user.name,
        phone: user.phone,
      });
      setUser(response.data);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleAddContact = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addTrustedContact(contactForm);
      toast.success('Trusted contact added');
      setContactForm({ name: '', phone: '', email: '' });
      setShowAddContact(false);
      loadProfile();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add contact');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveContact = async (contactId) => {
    if (!window.confirm('Are you sure you want to remove this contact?')) {
      return;
    }

    try {
      await removeTrustedContact(contactId);
      toast.success('Contact removed');
      loadProfile();
    } catch (error) {
      toast.error('Failed to remove contact');
    }
  };

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center text-white bg-slate-950">Loading...</div>;
  }

  const headerActions = (
    <button
      onClick={() => navigate('/dashboard')}
      className="px-3 py-2 rounded-lg text-sm font-medium text-white bg-white/15 hover:bg-white/25 border border-white/15 transition"
    >
      Back to dashboard
    </button>
  );

  return (
    <AppShell title="Profile" subtitle="Update your details and trusted contacts" actions={headerActions}>
      <div className="space-y-6">
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 shadow-lg">
          <h2 className="text-xl font-semibold text-white mb-4">Profile Information</h2>
          <form onSubmit={handleUpdateProfile} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-1">
                Name
              </label>
              <input
                type="text"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/15 text-white focus:outline-none focus:ring-2 focus:ring-orange-300/70"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-1">
                Phone
              </label>
              <input
                type="tel"
                value={user.phone}
                onChange={(e) => setUser({ ...user, phone: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/15 text-white focus:outline-none focus:ring-2 focus:ring-orange-300/70"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-1">
                Email
              </label>
              <input
                type="email"
                value={user.email}
                disabled
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-slate-200"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="md:col-span-3 mt-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-orange-400 text-white font-semibold shadow disabled:opacity-60"
            >
              {loading ? 'Updating...' : 'Update Profile'}
            </button>
          </form>
        </div>

        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-white">Trusted Contacts</h2>
            <button
              onClick={() => setShowAddContact(!showAddContact)}
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium border border-white/15"
            >
              {showAddContact ? 'Cancel' : '+ Add Contact'}
            </button>
          </div>

          {showAddContact && (
            <form onSubmit={handleAddContact} className="mb-6 p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/15 text-white focus:outline-none focus:ring-2 focus:ring-orange-300/70"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    required
                    value={contactForm.phone}
                    onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/15 text-white focus:outline-none focus:ring-2 focus:ring-orange-300/70"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-1">
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/15 text-white focus:outline-none focus:ring-2 focus:ring-orange-300/70"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="mt-4 px-6 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-orange-400 text-white font-semibold shadow disabled:opacity-60"
              >
                {loading ? 'Adding...' : 'Add Contact'}
              </button>
            </form>
          )}

          {user.trustedContacts && user.trustedContacts.length > 0 ? (
            <div className="space-y-3">
              {user.trustedContacts.map((contact) => (
                <div
                  key={contact._id}
                  className="flex justify-between items-center p-4 rounded-xl bg-white/5 border border-white/10 text-white"
                >
                  <div>
                    <p className="font-semibold">{contact.name}</p>
                    <p className="text-sm text-slate-200/80">{contact.phone}</p>
                    {contact.email && (
                      <p className="text-sm text-slate-200/80">{contact.email}</p>
                    )}
                  </div>
                  <button
                    onClick={() => handleRemoveContact(contact._id)}
                    className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-semibold shadow"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-200/80">No trusted contacts added yet.</p>
          )}
        </div>
      </div>
    </AppShell>
  );
};

export default Profile;

