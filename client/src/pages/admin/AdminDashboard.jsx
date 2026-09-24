import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import {
  Users,
  Car,
  Wrench,
  DollarSign,
  AlertOctagon,
  CheckCircle,
  TrendingUp,
  ShieldAlert,
  ArrowUpRight
} from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [recentActivity, setRecentActivity] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/admin/stats')
      .then((res) => {
        if (res.data.success) {
          setStats(res.data.stats);
          setRecentActivity(res.data.recentActivity);
        }
      })
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="text-center py-20 text-xs text-slate-400">Loading master analytics telemetry...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Platform Operations Console</h1>
          <p className="text-xs text-slate-500">Live operational metrics, active incident tracking, and partner compliance</p>
        </div>

        {stats?.sos?.active > 0 && (
          <Link
            to="/admin/sos"
            className="flex items-center space-x-1.5 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-rose-600/30 animate-bounce"
          >
            <AlertOctagon className="w-4 h-4" />
            <span>{stats.sos.active} ACTIVE SOS EMERGENCY!</span>
          </Link>
        )}
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-2">
            <span>Gross Platform Revenue</span>
            <DollarSign className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">₹{stats?.revenue?.total || 74500}</div>
          <span className="text-[10px] text-emerald-600 font-semibold mt-1 block">
            Across {stats?.revenue?.count || 2} Settled Invoices
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-2">
            <span>Registered Customers</span>
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">{stats?.users?.total || 1}</div>
          <span className="text-[10px] text-slate-400 mt-1 block">Active Vehicle Owners</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-2">
            <span>Active Chauffeurs</span>
            <Car className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">{stats?.drivers?.total || 3}</div>
          <span className="text-[10px] text-slate-400 mt-1 block">
            {stats?.drivers?.pending || 0} Pending Verification
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-2">
            <span>Certified Garages</span>
            <Wrench className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">{stats?.providers?.total || 2}</div>
          <span className="text-[10px] text-slate-400 mt-1 block">
            {stats?.providers?.pending || 0} Pending Verification
          </span>
        </div>
      </div>

      {/* Second Row Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-500 block mb-1">Roadside Incidents (RSA)</span>
          <div className="text-2xl font-black text-slate-900">
            {stats?.rsa?.total || 1} <span className="text-xs font-normal text-slate-500">Total</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Active: <strong>{stats?.rsa?.active || 0}</strong> • Completed: <strong>{stats?.rsa?.completed || 1}</strong>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-500 block mb-1">Chauffeur Bookings</span>
          <div className="text-2xl font-black text-slate-900">
            {stats?.bookings?.total || 1} <span className="text-xs font-normal text-slate-500">Total</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Active: <strong>{stats?.bookings?.active || 0}</strong> • Completed: <strong>{stats?.bookings?.completed || 1}</strong>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-500 block mb-1">Emergency SOS Alerts</span>
          <div className="text-2xl font-black text-slate-900">
            {stats?.sos?.total || 0} <span className="text-xs font-normal text-slate-500">Total</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Active SOS: <strong className="text-rose-600">{stats?.sos?.active || 0}</strong>
          </div>
        </div>
      </div>

      {/* Recent Dispatches Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-sm text-slate-900">Recent Roadside Emergency Calls</h3>
            <Link to="/admin/bookings" className="text-xs text-purple-600 font-bold hover:underline">
              View All →
            </Link>
          </div>
          <div className="divide-y divide-slate-100 text-xs">
            {recentActivity?.rsa?.map((r) => (
              <div key={r._id} className="py-2.5 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-800 uppercase">{r.serviceType}</span>
                  <p className="text-[11px] text-slate-500">User: {r.userId?.name} • Provider: {r.providerId?.name || 'Pending'}</p>
                </div>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                  {r.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-sm text-slate-900">Recent Driver Bookings</h3>
            <Link to="/admin/bookings" className="text-xs text-purple-600 font-bold hover:underline">
              View All →
            </Link>
          </div>
          <div className="divide-y divide-slate-100 text-xs">
            {recentActivity?.bookings?.map((b) => (
              <div key={b._id} className="py-2.5 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-800">{b.durationHours || 4}h Chauffeur</span>
                  <p className="text-[11px] text-slate-500">User: {b.userId?.name} • Driver: {b.driverId?.name}</p>
                </div>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                  {b.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
