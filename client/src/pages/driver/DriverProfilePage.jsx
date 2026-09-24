import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import { User, ShieldCheck, Award, Clock, DollarSign, Check } from 'lucide-react';

export default function DriverProfilePage() {
  const { user, updateUser } = useAuth();
  const profile = user?.profile;

  const [hourlyRate, setHourlyRate] = useState(profile?.hourlyRate || 120);
  const [dailyRate, setDailyRate] = useState(profile?.dailyRate || 900);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSaveRates = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await api.put('/drivers/me', {
        hourlyRate: Number(hourlyRate),
        dailyRate: Number(dailyRate)
      });
      if (res.data.success) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Driver Profile & Credentials</h1>
        <p className="text-xs text-slate-500">View your verified license status and configure your hourly driving tariffs</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Details Card */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 text-center">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'}
            alt={user?.name}
            className="w-24 h-24 rounded-full object-cover border-4 border-blue-500 mx-auto"
          />
          <div>
            <h3 className="text-base font-bold text-slate-900">{user?.name}</h3>
            <p className="text-xs text-slate-500">{user?.email}</p>
            <p className="text-xs text-slate-500 font-mono mt-0.5">{user?.phone}</p>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-center space-x-1.5 text-xs text-emerald-700 bg-emerald-50 py-2 rounded-xl border border-emerald-200 font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>RTO Verified Chauffeur</span>
          </div>
        </div>

        {/* License & Credentials */}
        <div className="md:col-span-2 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900">Driving Qualifications</h3>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-400 font-bold uppercase block mb-0.5">License Number</span>
              <span className="font-mono font-bold text-slate-800 text-sm">
                {profile?.licenseNumber || 'DL-0420140028192'}
              </span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-400 font-bold uppercase block mb-0.5">Experience</span>
              <span className="font-bold text-slate-800 text-sm">
                {profile?.experienceYears || 7} Years Professional
              </span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-400 font-bold uppercase block mb-0.5">Eligible Vehicle Types</span>
              <span className="font-bold text-slate-800">
                {profile?.vehicleTypesSupported?.join(', ') || 'Hatchback, Sedan, SUV'}
              </span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-400 font-bold uppercase block mb-0.5">Languages Spoken</span>
              <span className="font-bold text-slate-800">
                {profile?.languages?.join(', ') || 'Hindi, English, Punjabi'}
              </span>
            </div>
          </div>

          {/* Pricing Adjustments */}
          <form onSubmit={handleSaveRates} className="pt-4 border-t border-slate-100 space-y-4">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Configure Tariffs</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Hourly Rate (₹/hr)</label>
                <input
                  type="number"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Day Rate (₹/day)</label>
                <input
                  type="number"
                  value={dailyRate}
                  onChange={(e) => setDailyRate(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                type="submit"
                disabled={saving}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md transition-colors"
              >
                {saving ? 'Saving...' : 'Update Tariff Rates'}
              </button>
              {saved && (
                <span className="text-xs text-emerald-600 font-bold flex items-center space-x-1">
                  <Check className="w-4 h-4" />
                  <span>Tariffs Updated!</span>
                </span>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
