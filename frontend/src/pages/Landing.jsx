import React from 'react';
import { Link } from 'react-router-dom';

const features = [
  {
    title: 'One-tap SOS',
    desc: 'Instantly alert trusted contacts with your live location.',
    icon: '🚨',
    color: 'from-red-500 to-orange-500',
  },
  {
    title: 'Silent Mode',
    desc: 'Discrete alerts with zero sound or on-screen disruption.',
    icon: '🤫',
    color: 'from-amber-400 to-orange-500',
  },
  {
    title: 'Live Tracking',
    desc: 'Continuous location updates during emergencies.',
    icon: '🛰️',
    color: 'from-indigo-500 to-blue-500',
  },
  {
    title: 'Fake Call',
    desc: 'Trigger a convincing call to exit unsafe situations.',
    icon: '📞',
    color: 'from-emerald-500 to-teal-500',
  },
];

const valueCards = [
  {
    title: 'Trusted Contacts',
    desc: 'Add friends and family who get notified first.',
  },
  {
    title: 'Admin Oversight',
    desc: 'Admins monitor alerts and coordinate responses.',
  },
  {
    title: 'Privacy First',
    desc: 'Your data is encrypted and shared only when you choose.',
  },
];

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-primary-500 to-orange-400 shadow-lg flex items-center justify-center text-2xl font-bold">
              N
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-orange-200">Safety Platform</p>
              <h1 className="text-2xl sm:text-3xl font-semibold">Nirbhaya</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="px-4 py-2 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 transition text-sm font-medium"
            >
              Log in
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-primary-500 to-orange-400 hover:from-primary-600 hover:to-orange-500 transition text-sm font-semibold text-white shadow-lg"
            >
              Get started
            </Link>
          </div>
        </header>

        <section className="grid lg:grid-cols-2 gap-10 items-center mb-16">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-medium text-orange-100">
              Built for real-world safety
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
              Act fast. Stay discreet.
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-orange-200">
                {' '}Be heard.
              </span>
            </h2>
            <p className="text-lg text-slate-200/80">
              Nirbhaya empowers you with one-tap SOS, silent alerts, continuous location sharing, and a fake call escape. Your trusted contacts and admins stay informed instantly.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/register"
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-orange-400 hover:from-primary-600 hover:to-orange-500 text-white font-semibold shadow-xl"
              >
                Create account
              </Link>
              <Link
                to="/about"
                className="px-5 py-3 rounded-xl border border-white/10 hover:border-white/30 text-slate-100 font-medium"
              >
                Learn more
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-4 pt-6">
              {valueCards.map((card) => (
                <div key={card.title} className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <p className="text-sm text-orange-100">{card.title}</p>
                  <p className="text-slate-200 text-sm mt-1">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 blur-3xl bg-primary-500/30 rounded-full" />
            <div className="relative grid grid-cols-2 gap-4">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur shadow-xl"
                >
                  <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-xl`}>
                    {feature.icon}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-white">{feature.title}</h3>
                  <p className="text-sm text-slate-200/80 mt-1">{feature.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 p-4 rounded-2xl bg-white/5 border border-white/10 text-sm text-slate-200/80">
              <p className="font-semibold text-white mb-1">“Speed and discretion are non-negotiable.”</p>
              <p>We designed every flow to keep you in control—alerts send in seconds and contacts know exactly where you are.</p>
            </div>
          </div>
        </section>

        <section className="grid md:grid-cols-3 gap-6 mb-16">
          {[
            { title: 'Sign up', desc: 'Create your account and add trusted contacts.' },
            { title: 'Stay ready', desc: 'Keep Nirbhaya pinned to your home screen for one-tap access.' },
            { title: 'Act instantly', desc: 'Trigger SOS or silent mode and we notify your contacts right away.' },
          ].map((item) => (
            <div key={item.title} className="p-5 rounded-2xl bg-white/5 border border-white/10">
              <p className="text-orange-200 text-sm font-semibold uppercase tracking-wide">{item.title}</p>
              <p className="text-slate-200 mt-2 text-sm">{item.desc}</p>
            </div>
          ))}
        </section>

        <section className="rounded-3xl border border-white/10 bg-gradient-to-r from-primary-600/80 to-orange-500/70 p-10 text-center shadow-2xl">
          <h3 className="text-3xl font-bold text-white mb-3">Ready to feel safer?</h3>
          <p className="text-orange-50/90 mb-6">
            Create your account, set up trusted contacts, and try a silent alert in under two minutes.
          </p>
          <div className="flex justify-center gap-3">
            <Link
              to="/register"
              className="px-6 py-3 rounded-xl bg-white text-primary-700 font-semibold shadow-lg"
            >
              Start for free
            </Link>
            <Link
              to="/login"
              className="px-6 py-3 rounded-xl border border-white/50 text-white font-semibold hover:bg-white/10"
            >
              Log in
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Landing;


