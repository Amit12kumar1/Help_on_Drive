import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { Wrench, MapPin, Navigation, Clock } from 'lucide-react';

export default function RSAIncomingJobsPage() {
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

  const handleAccept = async (id) => {
    try {
      const res = await api.put(`/assistance/${id}/accept`);
      if (res.data.success) fetchJobs();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Roadside Emergency Jobs</h1>
        <p className="text-xs text-slate-500">Breakdown calls broadcasted in your service territory</p>
      </div>

      {loading ? (
        <div className="text-center py-16 text-xs text-slate-400">Loading incoming jobs...</div>
      ) : jobs.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 text-xs text-slate-400">
          No active roadside assistance calls in your area currently.
        </div>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold flex-shrink-0">
                  <Wrench className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                      {job.serviceType?.toUpperCase()}
                    </span>
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                      job.status === 'completed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : job.status === 'accepted'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-amber-100 text-amber-800 animate-pulse'
                    }`}>
                      {job.status?.replace(/_/g, ' ')}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mt-1">
                    {job.userId?.name} ({job.vehicleId?.brand} {job.vehicleId?.model})
                  </h3>
                  <p className="text-xs text-slate-600 mt-0.5">{job.problemDescription}</p>
                  <p className="text-[11px] text-slate-400 mt-1 flex items-center space-x-1 font-mono">
                    <MapPin className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                    <span>{job.location?.address}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4 justify-end pt-4 md:pt-0 border-t md:border-t-0 border-slate-100">
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block">Total Bill</span>
                  <span className="text-base font-black text-emerald-600">₹{job.charges?.totalAmount || 648}</span>
                </div>

                {job.status === 'pending' && (
                  <button
                    onClick={() => handleAccept(job._id)}
                    className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold shadow-md transition-colors"
                  >
                    Accept Job
                  </button>
                )}

                {['accepted', 'on_the_way', 'arrived', 'in_progress'].includes(job.status) && (
                  <Link
                    to="/provider/active"
                    className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center space-x-1.5"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Open Terminal</span>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
