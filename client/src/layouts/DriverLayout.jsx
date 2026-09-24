import React, { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import {
  Car,
  LayoutDashboard,
  Clock,
  Compass,
  DollarSign,
  User,
  LogOut,
  Power,
  Star,
  ShieldCheck,
  Menu,
  X
} from 'lucide-react';

export default function DriverLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isAvailable, setIsAvailable] = useState(user?.profile?.isAvailable ?? true);
  const [toggling, setToggling] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleAvailability = async () => {
    setToggling(true);
    try {
      const nextStatus = !isAvailable;
      const res = await api.put('/drivers/me', { isAvailable: nextStatus });
      if (res.data.success) {
        setIsAvailable(nextStatus);
      }
    } catch (err) {
      console.error('Failed to toggle driver availability:', err);
    } finally {
      setToggling(false);
    }
  };

  const navItems = [
    { to: '/driver', icon: LayoutDashboard, label: 'Overview', end: true },
    { to: '/driver/requests', icon: Clock, label: 'Trip Requests' },
    { to: '/driver/active', icon: Compass, label: 'Active Trip Navigation' },
    { to: '/driver/earnings', icon: DollarSign, label: 'Earnings & Payouts' },
    { to: '/driver/profile', icon: User, label: 'Profile & Documents' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col w-64 bg-slate-900 text-white border-r border-slate-800 z-30">
        <div className="p-5 border-b border-slate-800">
          <Link to="/" className="flex items-center space-x-2.5 flex-shrink-0">
            <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold shadow-md flex-shrink-0">
              <Car className="w-4 h-4" />
            </div>
            <span className="font-extrabold text-sm tracking-tight text-white whitespace-nowrap">
              Help on <span className="text-blue-400">Drive</span>
            </span>
          </Link>
        </div>

        {/* Driver Profile card */}
        <div className="p-4 mx-3 my-3 bg-slate-800/70 rounded-2xl border border-slate-700/50">
          <div className="flex items-center space-x-3 mb-3">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100'}
              alt={user?.name}
              className="w-11 h-11 rounded-full object-cover border-2 border-blue-500"
            />
            <div className="truncate flex-1">
              <h4 className="text-xs font-bold text-white truncate">{user?.name}</h4>
              <div className="flex items-center space-x-1 text-[11px] text-amber-400">
                <Star className="w-3 h-3 fill-amber-400" />
                <span className="font-bold">{user?.profile?.rating || 4.9}</span>
                <span className="text-slate-400 text-[10px]">({user?.profile?.totalRatings || 38})</span>
              </div>
            </div>
          </div>

          {/* Online Toggle Switch */}
          <button
            onClick={toggleAvailability}
            disabled={toggling}
            className={`w-full py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 transition-all ${
              isAvailable
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
                : 'bg-rose-500/20 text-rose-300 border border-rose-500/40 hover:bg-rose-500/30'
            }`}
          >
            <Power className="w-3.5 h-3.5" />
            <span>{isAvailable ? '🟢 Online & Ready' : '🔴 Currently Offline'}</span>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-2 space-y-1 text-xs font-medium overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-3.5 py-2.5 rounded-xl transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white font-semibold shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
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
            <h2 className="text-sm font-bold text-slate-800">Driver Console</h2>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-xs font-medium text-slate-600">
              <span className="hidden sm:inline">Rate:</span>
              <span className="font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                ₹{user?.profile?.hourlyRate || 120}/hr
              </span>
            </div>
            <div className="flex items-center space-x-1.5 text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified Chauffeur</span>
            </div>
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
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-slate-900 text-white p-4">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <span className="font-bold text-sm">DRIVER CONSOLE</span>
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
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800"
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
