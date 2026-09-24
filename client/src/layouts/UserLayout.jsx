import React, { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import EmergencySOSModal from '../components/sos/EmergencySOSModal';
import {
  Car,
  LayoutDashboard,
  Wrench,
  UserCheck,
  Navigation,
  Clock,
  CreditCard,
  LifeBuoy,
  LogOut,
  Siren,
  Menu,
  X,
  PhoneCall,
  Shield,
  ChevronRight
} from 'lucide-react';

export default function UserLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sosModalOpen, setSosModalOpen] = useState(false);

  const navItems = [
    { to: '/user', icon: LayoutDashboard, label: 'Overview', end: true },
    { to: '/user/vehicles', icon: Car, label: 'My Vehicles' },
    { to: '/user/roadside-assistance', icon: Wrench, label: 'Roadside Assistance' },
    { to: '/user/hire-driver', icon: UserCheck, label: 'Hire a Driver' },
    { to: '/user/tracking', icon: Navigation, label: 'Live Tracking' },
    { to: '/user/bookings', icon: Clock, label: 'Service History' },
    { to: '/user/emergency-contacts', icon: Shield, label: 'Emergency Contacts' },
    { to: '/user/payments', icon: CreditCard, label: 'Payments & Invoices' },
    { to: '/user/support', icon: LifeBuoy, label: 'Support & Help' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar for Desktop */}
      <aside className="hidden lg:flex lg:flex-col w-64 bg-slate-900 text-white border-r border-slate-800 z-30">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2.5 flex-shrink-0">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-600 to-amber-500 flex items-center justify-center text-white font-bold shadow-md shadow-brand-600/30 flex-shrink-0">
              <Car className="w-4 h-4" />
            </div>
            <span className="font-extrabold text-sm tracking-tight text-white whitespace-nowrap">
              Help on <span className="text-brand-400">Drive</span>
            </span>
          </Link>
        </div>

        {/* User Card */}
        <div className="p-4 mx-3 my-3 bg-slate-800/60 rounded-xl border border-slate-700/50 flex items-center space-x-3">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'}
            alt={user?.name}
            className="w-10 h-10 rounded-full object-cover border-2 border-brand-500"
          />
          <div className="truncate flex-1">
            <h4 className="text-xs font-bold text-white truncate">{user?.name}</h4>
            <p className="text-[10px] text-slate-400 truncate">{user?.city || 'New Delhi'}</p>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto text-xs font-medium">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-3.5 py-2.5 rounded-xl transition-all ${
                  isActive
                    ? 'bg-brand-600 text-white shadow-md font-semibold shadow-brand-600/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`
              }
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Bottom SOS & Logout */}
        <div className="p-3 border-t border-slate-800 space-y-2">
          <button
            onClick={() => setSosModalOpen(true)}
            className="w-full py-2.5 px-3 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-rose-600/30 flex items-center justify-center space-x-2 transition-all"
          >
            <Siren className="w-4 h-4 animate-pulse" />
            <span>EMERGENCY SOS</span>
          </button>

          <button
            onClick={() => {
              logout();
              navigate('/');
            }}
            className="w-full py-2 px-3 text-slate-400 hover:text-rose-400 hover:bg-slate-800 text-xs font-medium rounded-xl flex items-center justify-center space-x-1.5 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-white border-b border-slate-200 h-16 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-20 shadow-sm">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden sm:block">
              <h2 className="text-sm font-bold text-slate-800">Welcome back, {user?.name?.split(' ')[0]} 👋</h2>
              <p className="text-[11px] text-slate-500">Need a driver or quick breakdown recovery today?</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setSosModalOpen(true)}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md shadow-rose-600/30 transition-all hover:scale-105"
            >
              <Siren className="w-4 h-4" />
              <span>SOS PANIC</span>
            </button>

            <Link
              to="/user/roadside-assistance"
              className="hidden sm:flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-brand-50 hover:bg-brand-100 text-brand-700 font-semibold text-xs border border-brand-200 transition-colors"
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>Get Roadside Help</span>
            </Link>

            <Link
              to="/user/hire-driver"
              className="hidden sm:flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold text-xs border border-blue-200 transition-colors"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Hire Driver</span>
            </Link>
          </div>
        </header>

        {/* Main Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Emergency SOS Modal Global Mount */}
      <EmergencySOSModal isOpen={sosModalOpen} onClose={() => setSosModalOpen(false)} />

      {/* Mobile Drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-slate-900 text-white p-4">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <span className="font-bold text-sm">HELP ON DRIVE</span>
              <button onClick={() => setSidebarOpen(false)} className="p-1 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex-1 py-4 space-y-1 text-xs">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800"
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </nav>
            <div className="pt-4 border-t border-slate-800">
              <button
                onClick={() => {
                  setSidebarOpen(false);
                  setSosModalOpen(true);
                }}
                className="w-full py-2.5 bg-rose-600 text-white font-bold rounded-xl text-xs flex items-center justify-center space-x-2"
              >
                <Siren className="w-4 h-4" />
                <span>EMERGENCY SOS</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
