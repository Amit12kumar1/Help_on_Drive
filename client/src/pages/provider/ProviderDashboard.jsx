import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import {
  Wrench,
  DollarSign,
  TrendingUp,
  Star,
  Clock,
  MapPin,
  Car,
  Navigation,
  ArrowRight
} from 'lucide-react';

export default function ProviderDashboard() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    try {
      const res = await api.get('/assistance/provider/jobs');
      if (res.data.success) setJobs(res.data.jobs);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const activeJob = jobs.find(j => ['accepted', 'on_the_way', 'arrived', 'in_progress'].includes(j.status));
  const incomingPending = jobs.filter(j => j.status === 'pending');
  const completedJobs = jobs.filter(j => j.status === 'completed');

  const totalEarnings = user?.profile?.earnings || (completedJobs.length * 471) || 45200;

  const handleAcceptJob = async (id) => {
    try {
      const res = await api.put(`/assistance/${id}/accept`);
      if (res.data.success) fetchJobs();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6">
      {/* Active Job Callout */}
      {activeJob && (
        <div className="bg-gradient-to-r from-amber-900 to-slate-900 text-white p-6 rounded-3xl shadow-xl border border-amber-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-bold">
              <Navigation className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-500/30 text-amber-300 px-2 py-0.5 rounded">
                Active Roadside Dispatch
              </span>
              <h3 className="text-base font-bold text-white mt-0.5">
                {activeJob.serviceType?.toUpperCase()} for {activeJob.userId?.name}
              </h3>
              <p className="text-xs text-slate-300">
                Location: {activeJob.location?.address}
              </p>
            </div>
          </div>

          <Link
            to="/provider/active"
            className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-lg transition-colors flex items-center space-x-1.5"
          >
            <span>Open Dispatch Terminal</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-2">
            <span>Total Earnings</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">₹{totalEarnings}</div>
          <span className="text-[10px] text-emerald-600 font-semibold mt-1 block">Net Revenue</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-2">
            <span>Jobs Resolved</span>
            <Wrench className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">{user?.profile?.totalJobs || 184}</div>
          <span className="text-[10px] text-slate-400 mt-1 block">Vehicles Recovered</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-2">
            <span>Customer Rating</span>
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
          </div>
          <div className="text-2xl font-black text-slate-900">{user?.profile?.rating || 4.9} ★</div>
          <span className="text-[10px] text-amber-600 font-semibold mt-1 block">Top Service Rating</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-2">
            <span>Base Diagnostic Tariff</span>
            <Clock className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">₹{user?.profile?.baseCharge || 299}</div>
          <span className="text-[10px] text-slate-400 mt-1 block">+ ₹{user?.profile?.ratePerKm || 25}/km distance</span>
        </div>
      </div>

      {/* Incoming Requests Queue */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
            <h3 className="text-base font-bold text-slate-900">Nearby Breakdown Requests ({incomingPending.length})</h3>
          </div>
          <Link to="/provider/jobs" className="text-xs font-bold text-amber-600 hover:underline">
            View All →
          </Link>
        </div>

        {incomingPending.length === 0 ? (
          <div className="text-center py-8 text-xs text-slate-400">
            No pending roadside requests in your immediate perimeter right now. Keep your terminal active.
          </div>
        ) : (
          <div className="space-y-3">
            {incomingPending.map((job) => (
              <div
                key={job._id}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start space-x-3.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold flex-shrink-0">
                    <Wrench className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">
                      {job.serviceType?.toUpperCase()} Assistance • {job.userId?.name}
                    </h4>
                    <p className="text-[11px] text-slate-600 mt-0.5">
                      Problem: {job.problemDescription}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-1 flex items-center space-x-1 font-mono">
                      <MapPin className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                      <span>{job.location?.address}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="text-right mr-2">
                    <span className="text-[10px] text-slate-400 block">Total Fare</span>
                    <span className="text-sm font-bold text-emerald-600">₹{job.charges?.totalAmount || 648}</span>
                  </div>

                  <button
                    onClick={() => handleAcceptJob(job._id)}
                    className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition-colors shadow-sm"
                  >
                    Accept & Dispatch
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Completed History */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900">Recent Completed Rescues ({completedJobs.length})</h3>

        {completedJobs.length === 0 ? (
          <div className="text-center py-8 text-xs text-slate-400">No completed jobs yet.</div>
        ) : (
          <div className="divide-y divide-slate-100">
            {completedJobs.slice(0, 5).map((job) => (
              <div key={job._id} className="py-3 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-bold text-slate-800">
                    {job.serviceType?.toUpperCase()} • {job.userId?.name}
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    {job.vehicleId?.brand} {job.vehicleId?.model} • {new Date(job.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full uppercase">
                    Completed
                  </span>
                  <span className="font-bold text-slate-900">₹{job.charges?.totalAmount || 471}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
