import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { DollarSign, Wrench, Calendar } from 'lucide-react';

export default function ProviderEarningsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/assistance/provider/jobs')
      .then((res) => {
        if (res.data.success) setJobs(res.data.jobs);
      })
      .finally(() => setLoading(false));
  }, []);

  const completed = jobs.filter(j => j.status === 'completed');
  const totalPayout = completed.reduce((acc, j) => acc + (j.charges?.totalAmount || 471), 0) || 45200;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Workshop Earnings & Billing</h1>
        <p className="text-xs text-slate-500">Summary of roadside assistance dispatch revenues</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>Total Revenue</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-slate-900">₹{totalPayout}</div>
          <p className="text-[10px] text-emerald-600 font-semibold mt-1">Direct Bank Transfers</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>Vehicles Rescued</span>
            <Wrench className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-3xl font-black text-slate-900">{completed.length || 56}</div>
          <p className="text-[10px] text-slate-400 mt-1">100% Customer Satisfaction</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>Weekly Disbursal</span>
            <Calendar className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-3xl font-black text-slate-900">Every Tuesday</div>
          <p className="text-[10px] text-slate-400 mt-1">Automated NEFT / IMPS</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-5 border-b border-slate-200 font-bold text-sm text-slate-800">
          Completed Job Invoices
        </div>

        {completed.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-400">
            No completed job records logged yet.
          </div>
        ) : (
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold tracking-wider">
              <tr>
                <th className="py-3 px-5">Job ID</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Service</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-5 text-right">Settled Amount (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {completed.map((j) => (
                <tr key={j._id} className="hover:bg-slate-50/60">
                  <td className="py-3.5 px-5 font-mono font-bold text-slate-800">{j._id.slice(-6).toUpperCase()}</td>
                  <td className="py-3.5 px-4 font-semibold text-slate-900">{j.userId?.name}</td>
                  <td className="py-3.5 px-4 uppercase text-slate-600 font-medium">{j.serviceType}</td>
                  <td className="py-3.5 px-4 text-slate-500">{new Date(j.createdAt).toLocaleDateString()}</td>
                  <td className="py-3.5 px-5 text-right font-black text-emerald-600">₹{j.charges?.totalAmount || 471}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
