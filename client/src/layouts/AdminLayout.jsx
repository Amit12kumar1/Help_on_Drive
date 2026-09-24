import React, { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  ShieldAlert,
  BarChart3,
  CheckSquare,
  BadgePercent,
  Car,
  Users,
  AlertOctagon,
  MessageSquareWarning,
  LogOut,
  Menu,
  X
} from 'lucide-react';

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { to: '/admin', icon: BarChart3, label: 'Analytics & KPIs', end: true },
    { to: '/admin/verifications', icon: CheckSquare, label: 'Partner Verifications' },
    { to: '/admin/pricing', icon: BadgePercent, label: 'Tariff & Pricing Engine' },
    { to: '/admin/sos', icon: AlertOctagon, label: 'Emergency SOS Monitor' },
    { to: '/admin/bookings', icon: Car, label: 'All Trips & Incidents' },
    { to: '/admin/complaints', icon: MessageSquareWarning, label: 'Complaints & Support' },
    { to: '/admin/users', icon: Users, label: 'User Directory' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col w-64 bg-slate-950 text-white border-r border-slate-800 z-30">
        <div className="p-5 border-b border-slate-800">
          <Link to="/" className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-600 flex items-center justify-center text-white font-bold shadow-md">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-sm tracking-tight text-white block">HELP ON DRIVE</span>
              <span className="text-[10px] text-purple-400 font-semibold tracking-wider uppercase block">Super Admin Control</span>
            </div>
          </Link>
        </div>

        {/* Admin Card */}
        <div className="p-4 mx-3 my-3 bg-purple-950/40 rounded-xl border border-purple-800/40 flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-sm">
            AD
          </div>
          <div className="truncate flex-1">
            <h4 className="text-xs font-bold text-white truncate">{user?.name || 'Administrator'}</h4>
            <span className="text-[10px] text-purple-300 font-mono">Full Permissions</span>
          </div>
        </div>

        {/* Nav list */}
        <nav className="flex-1 px-3 py-2 space-y-1 text-xs font-medium overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-3.5 py-2.5 rounded-xl transition-all ${
                  isActive
                    ? 'bg-purple-600 text-white font-semibold shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`
              }
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-3 border-t border-slate-800">
          <button
            onClick={() => {
              logout();
              navigate('/');
            }}
            className="w-full py-2 px-3 text-slate-400 hover:text-rose-400 text-xs font-medium rounded-xl flex items-center justify-center space-x-1.5 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Viewport */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-slate-200 h-16 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-20 shadow-sm">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h2 className="text-sm font-bold text-slate-800">Master Operations Control Room</h2>
          </div>

          <div className="flex items-center space-x-3">
            <span className="flex items-center space-x-1.5 text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>All Systems Operational</span>
            </span>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="fixed inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-slate-950 text-white p-4">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <span className="font-bold text-sm">ADMIN CONTROL</span>
              <button onClick={() => setMobileMenuOpen(false)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            <nav className="py-4 space-y-1 text-xs">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-900"
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
