import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-orange-200 mb-2">Contact</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-white">We’re here to help</h1>
            <p className="mt-3 text-slate-200/80 max-w-2xl">
              Have feedback or need support? Send us a message and we’ll get back to you. For urgent issues, trigger an SOS or silent alert from your dashboard.
            </p>
          </div>
          <Link
            to="/"
            className="px-4 py-2 text-sm font-medium rounded-lg border border-white/15 bg-white/5 hover:bg-white/10"
          >
            ← Back home
          </Link>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl">
          {submitted ? (
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-white">Message received ✅</h2>
              <p className="text-slate-200/80">Thanks for reaching out. We’ll follow up at the email you provided.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-300/70"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-300/70"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">Message</label>
                <textarea
                  name="message"
                  rows={4}
                  required
                  value={form.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-300/70"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-orange-400 hover:from-primary-600 hover:to-orange-500 text-white font-semibold shadow-lg"
              >
                Send message
              </button>
            </form>
          )}
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 grid sm:grid-cols-2 gap-4 text-sm text-slate-200/80">
          <div>
            <p className="text-orange-200 font-semibold">Support</p>
            <p>support@nirbhaya.app</p>
          </div>
          <div>
            <p className="text-orange-200 font-semibold">Emergency</p>
            <p>Trigger SOS or Silent Mode from your dashboard for fastest action.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;


