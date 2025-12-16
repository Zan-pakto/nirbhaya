import React from 'react';
import { Link } from 'react-router-dom';

const tips = [
  {
    title: 'Pre-share your plan',
    desc: 'Let trusted contacts know where you’re going and when to expect you.',
  },
  {
    title: 'Use silent alerts',
    desc: 'If you feel watched, trigger a silent alert so contacts know without drawing attention.',
  },
  {
    title: 'Keep battery ready',
    desc: 'Low power mode can interfere with location; keep a small power bank with you.',
  },
  {
    title: 'Use fake call',
    desc: 'A well-timed fake call can exit tense situations without confrontation.',
  },
];

const SafetyResources = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-slate-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-orange-200 mb-2">Safety resources</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-white">Be prepared before you need it</h1>
            <p className="mt-3 text-slate-200/80 max-w-2xl">
              Quick tips and reminders to get the most out of Nirbhaya and keep yourself safer in everyday scenarios.
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
          {tips.map((tip) => (
            <div key={tip.title} className="p-5 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="text-lg font-semibold text-white">{tip.title}</h3>
              <p className="text-slate-200/80 text-sm mt-2">{tip.desc}</p>
            </div>
          ))}
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl space-y-4">
          <h2 className="text-2xl font-semibold text-white">When to use each mode</h2>
          <ul className="space-y-3 text-sm text-slate-200/80">
            <li><span className="font-semibold text-orange-200">SOS:</span> Use when you need immediate visible help and can safely show your screen.</li>
            <li><span className="font-semibold text-orange-200">Silent:</span> Use when escalation is risky but you need contacts to know your location.</li>
            <li><span className="font-semibold text-orange-200">Fake call:</span> Use to exit uncomfortable interactions without confrontation.</li>
          </ul>
        </div>

        <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-primary-600/80 to-orange-500/70 p-8 shadow-2xl">
          <h3 className="text-2xl font-bold text-white mb-2">Stay connected</h3>
          <p className="text-orange-50/90">
            Add at least two trusted contacts, and ask them to keep an eye on alerts. Test a silent alert together so everyone knows what to expect.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SafetyResources;


