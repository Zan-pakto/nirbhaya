import React, { useMemo, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SIDEBAR_WIDTH = 260;

const AppShell = ({ title, subtitle, actions, children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const storedUser = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('user') || '{}');
    } catch {
      return {};
    }
  }, []);

  const navItems = useMemo(
    () =>
      [
        { label: 'Dashboard', to: '/dashboard', icon: '🏠' },
        { label: 'Profile', to: '/profile', icon: '👤' },
        { label: 'Admin', to: '/admin', icon: '🛡️', adminOnly: true },
        { label: 'Resources', to: '/resources', icon: '📚' },
        { label: 'Contact', to: '/contact', icon: '✉️' },
        { label: 'About', to: '/about', icon: 'ℹ️' },
      ].filter((item) => !item.adminOnly || storedUser?.role === 'admin'),
    [storedUser]
  );

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-50 lg:pl-[260px]">
      {/* Fixed sidebar for desktop */}
      <aside
        className="hidden lg:flex flex-col fixed inset-y-0 left-0 z-40 border-r border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl"
        style={{ width: `${SIDEBAR_WIDTH}px` }}
      >
        <div className="px-4 pt-5 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 flex items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-orange-400 text-white font-bold shadow-lg">
              N
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-orange-100">Nirbhaya</p>
              <p className="text-sm text-slate-100">Safety Platform</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const active = location.pathname.startsWith(item.to);
            return (
              <button
                key={item.to}
                onClick={() => navigate(item.to)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold transition border ${
                  active
                    ? 'bg-white text-slate-900 border-white shadow'
                    : 'bg-white/5 border-white/5 text-slate-100 hover:bg-white/10'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                {item.label}
              </button>
            );
          })}
        </nav>
        <div className="px-3 pb-4 text-xs text-slate-200/70">Quick navigation</div>
      </aside>

      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-white/10 backdrop-blur-xl lg:pl-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              className="lg:hidden inline-flex items-center justify-center h-10 w-10 rounded-xl bg-white/10 border border-white/15 text-white"
              onClick={() => setSidebarOpen((o) => !o)}
              aria-label="Toggle navigation"
            >
              ☰
            </button>
            <div>
              <p className="text-xs uppercase tracking-widest text-orange-100">Nirbhaya Safety</p>
              <h1 className="text-xl sm:text-2xl font-semibold text-white">{title}</h1>
              {subtitle && <p className="text-sm text-slate-200/80">{subtitle}</p>}
            </div>
          </div>
          <div className="flex items-center gap-2">{actions}</div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Mobile drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden" onClick={() => setSidebarOpen(false)}>
          <div
            className="absolute top-0 left-0 h-full w-64 bg-slate-900/95 border-r border-white/10 shadow-2xl p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="h-10 w-10 flex items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-orange-400 text-white font-bold shadow-lg">
                N
              </div>
              <button
                className="text-white text-xl"
                onClick={() => setSidebarOpen(false)}
                aria-label="Close navigation"
              >
                ✕
              </button>
            </div>
            <nav className="space-y-2">
              {navItems.map((item) => {
                const active = location.pathname.startsWith(item.to);
                return (
                  <button
                    key={item.to}
                    onClick={() => navigate(item.to)}
                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold transition ${
                      active
                        ? 'bg-white text-slate-900 shadow'
                        : 'bg-white/10 text-slate-100 hover:bg-white/20'
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppShell;


