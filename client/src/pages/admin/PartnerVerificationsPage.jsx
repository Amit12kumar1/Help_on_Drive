import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { CheckCircle2, XCircle, ShieldCheck, Car, Wrench } from 'lucide-react';

export default function PartnerVerificationsPage() {
  const [drivers, setDrivers] = useState([]);
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchVerifications = async () => {
    try {
      const res = await api.get('/admin/verifications');
      if (res.data.success) {
        setDrivers(res.data.drivers);
        setProviders(res.data.providers);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVerifications();
  }, []);

  const handleVerify = async (role, id, status) => {
    try {
      const res = await api.put(`/admin/verify/${role}/${id}`, { status });
      if (res.data.success) fetchVerifications();
    } catch (e) {
      alert('Verification update error');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Partner Document Verifications</h1>
        <p className="text-xs text-slate-500">Audit driving licenses, garage certificates, and approve partner onboarding</p>
      </div>

      {loading ? (
        <div className="text-center py-16 text-xs text-slate-400">Loading pending partner queues...</div>
      ) : drivers.length === 0 && providers.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 text-xs text-slate-400 space-y-2">
          <ShieldCheck className="w-12 h-12 text-emerald-500 mx-auto" />
          <h3 className="font-bold text-sm text-slate-800">All Applications Audited</h3>
          <p>Zero pending driver or workshop verifications waiting in queue.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Driver Queue */}
          {drivers.length > 0 && (
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-sm text-slate-900 flex items-center space-x-2">
                <Car className="w-4 h-4 text-blue-600" />
                <span>Pending Driver Applications ({drivers.length})</span>
              </h3>

              <div className="space-y-3">
                {drivers.map((d) => (
                  <div key={d._id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="font-bold text-xs text-slate-900">{d.userId?.name}</h4>
                      <p className="text-[11px] text-slate-500">
                        License: <strong className="font-mono text-slate-800">{d.licenseNumber}</strong> • {d.experienceYears} Years Exp
                      </p>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Cars: {d.vehicleTypesSupported?.join(', ')} • Phone: {d.userId?.phone}
                      </p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleVerify('driver', d._id, 'approved')}
                        className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors"
                      >
                        Approve License
                      </button>
                      <button
                        onClick={() => handleVerify('driver', d._id, 'rejected')}
                        className="px-3.5 py-1.5 border border-rose-300 text-rose-600 hover:bg-rose-50 rounded-xl text-xs font-semibold transition-colors"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Provider Queue */}
          {providers.length > 0 && (
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-sm text-slate-900 flex items-center space-x-2">
                <Wrench className="w-4 h-4 text-amber-600" />
                <span>Pending Garage & Mechanic Applications ({providers.length})</span>
              </h3>

              <div className="space-y-3">
                {providers.map((p) => (
                  <div key={p._id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="font-bold text-xs text-slate-900">{p.businessName} ({p.serviceType})</h4>
                      <p className="text-[11px] text-slate-500">Owner: {p.userId?.name} • Phone: {p.userId?.phone}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">Address: {p.workshopAddress}</p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleVerify('provider', p._id, 'approved')}
                        className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors"
                      >
                        Approve Garage
                      </button>
                      <button
                        onClick={() => handleVerify('provider', p._id, 'rejected')}
                        className="px-3.5 py-1.5 border border-rose-300 text-rose-600 hover:bg-rose-50 rounded-xl text-xs font-semibold transition-colors"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
