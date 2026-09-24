import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Car, Wrench, Clock, CheckCircle2 } from 'lucide-react';

export default function AllBookingsPage() {
  const [tab, setTab] = useState('all');
  const [data, setData] = useState({ rsa: [], bookings: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/admin/stats')
      .then((res) => {
        if (res.data.success && res.data.recentActivity) {
          setData(res.data.recentActivity);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const combined = [
    ...(data.rsa || []).map(r => ({ ...r, category: 'rsa' })),
    ...(data.bookings || []).map(b => ({ ...b, category: 'driver' }))
  ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const filtered = combined.filter(c => tab === 'all' ? true : c.category === tab);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">System Ledger: All Dispatches</h1>
          <p className="text-xs text-slate-500">Master record of all Roadside Assistance and Chauffeur calls</p>
        </div>

        <div className="flex bg-slate-200/70 p-1 rounded-2xl text-xs font-semibold">
          <button
            onClick={() => setTab('all')}
            className={`px-4 py-1.5 rounded-xl transition-all ${tab === 'all' ? 'bg-white shadow text-slate-900' : 'text-slate-600'}`}
          >
            All Dispatches
          </button>
          <button
            onClick={() => setTab('rsa')}
            className={`px-4 py-1.5 rounded-xl transition-all ${tab === 'rsa' ? 'bg-white shadow text-slate-900' : 'text-slate-600'}`}
          >
            Roadside Assistance
          </button>
          <button
            onClick={() => setTab('driver')}
            className={`px-4 py-1.5 rounded-xl transition-all ${tab === 'driver' ? 'bg-white shadow text-slate-900' : 'text-slate-600'}`}
          >
            Chauffeur Trips
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold tracking-wider border-b border-slate-200">
            <tr>
              <th className="py-3 px-5">Ref ID</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Customer</th>
              <th className="py-3 px-4">Assigned Partner</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-5 text-right">Tariff (₹)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((item) => {
              const isDriver = item.category === 'driver';
              const partner = isDriver ? item.driverId : item.providerId;
              const amount = item.charges?.totalAmount || item.fare?.totalAmount || 570;

              return (
                <tr key={item._id} className="hover:bg-slate-50/60">
                  <td className="py-3.5 px-5 font-mono font-bold text-slate-800">{item._id.slice(-6).toUpperCase()}</td>
                  <td className="py-3.5 px-4 font-semibold text-slate-900 capitalize">
                    {isDriver ? 'Chauffeur Booking' : `RSA (${item.serviceType})`}
                  </td>
                  <td className="py-3.5 px-4 text-slate-700 font-medium">{item.userId?.name || 'Customer'}</td>
                  <td className="py-3.5 px-4 text-slate-700">{partner?.name || 'Pending'}</td>
                  <td className="py-3.5 px-4 text-slate-500">{new Date(item.createdAt).toLocaleDateString()}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-slate-100 text-slate-700">
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-right font-black text-slate-900">₹{amount}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
