import React from 'react';
import { Link } from 'react-router-dom';

const pillars = [
  { title: 'Speed', desc: 'One-tap actions that dispatch alerts and location in seconds.' },
  { title: 'Discretion', desc: 'Silent mode and fake calls for situations where visibility is risky.' },
  { title: 'Reliability', desc: 'Redundant notifications and real-time location sharing.' },
  { title: 'Privacy', desc: 'Data shared only with your chosen contacts and admins you approve.' },
];

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-slate-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <div className="flex justify-between items-start gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-orange-200 mb-2">About Nirbhaya</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-white">Built to empower and protect</h1>
            <p className="mt-3 text-slate-200/80 max-w-2xl">
              Nirbhaya is a safety platform focused on immediate action, discreet communication, and reliable tracking. We streamline how you alert loved ones and admins when every second matters.
            </p>
          </div>
          <Link
            to="/"
            className="px-4 py-2 text-sm font-medium rounded-lg border border-white/15 bg-white/5 hover:bg-white/10"
          >
            ← Back home
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {pillars.map((item) => (
            <div key={item.title} className="p-5 rounded-2xl bg-white/5 border border-white/10">
              <p className="text-orange-200 text-sm font-semibold uppercase tracking-wide">{item.title}</p>
              <p className="text-slate-200 mt-2 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl">
          <h2 className="text-2xl font-semibold text-white mb-3">Why we built this</h2>
          <p className="text-slate-200/80 leading-relaxed">
            Personal safety tools often trade speed for complexity. We wanted a workflow that mirrors instinct: one tap to alert, optional discretion when needed, and instant location visibility for the right people. By pairing a user dashboard with an admin console, we keep both personal contacts and responders in sync.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {[
            { title: 'Fast onboarding', desc: 'Add contacts and try a silent alert in under 2 minutes.' },
            { title: 'Location certainty', desc: 'Continuous location updates keep everyone aligned.' },
            { title: 'Actionable history', desc: 'Admins see timelines, resolutions, and notes for every alert.' },
          ].map((item) => (
            <div key={item.title} className="p-5 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="text-slate-200/80 text-sm mt-2">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-primary-600/80 to-orange-500/70 p-8 shadow-2xl">
          <h3 className="text-2xl font-bold text-white mb-2">Our commitment</h3>
          <p className="text-orange-50/90">
            We keep the experience simple, the alerts fast, and your privacy at the center. Feedback fuels our roadmap—tell us what you need to feel safer.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;


