import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import { Wrench, ShieldCheck, Check } from 'lucide-react';

export default function ProviderProfilePage() {
  const { user } = useAuth();
  const profile = user?.profile;

  const [businessName, setBusinessName] = useState(profile?.businessName || 'SpeedFix Garage');
  const [baseCharge, setBaseCharge] = useState(profile?.baseCharge || 299);
  const [ratePerKm, setRatePerKm] = useState(profile?.ratePerKm || 25);
  const [workshopAddress, setWorkshopAddress] = useState(profile?.workshopAddress || 'Main Ring Road, New Delhi');

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await api.put('/providers/me', {
        businessName,
        baseCharge: Number(baseCharge),
        ratePerKm: Number(ratePerKm),
        workshopAddress
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
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Workshop Profile & Services</h1>
        <p className="text-xs text-slate-500">Configure base diagnostic tariffs and garage service territory</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 text-center">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150'}
            alt="Garage"
            className="w-24 h-24 rounded-full object-cover border-4 border-amber-500 mx-auto"
          />
          <div>
            <h3 className="text-base font-bold text-slate-900">{profile?.businessName || user?.name}</h3>
            <p className="text-xs text-slate-500">{user?.email}</p>
            <p className="text-xs text-slate-500 font-mono mt-0.5">{user?.phone}</p>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-center space-x-1.5 text-xs text-emerald-700 bg-emerald-50 py-2 rounded-xl border border-emerald-200 font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>Authorized RSA Center</span>
          </div>
        </div>

        <div className="md:col-span-2 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900">Garage Tariffs & Settings</h3>

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Business / Garage Name</label>
              <input
                required
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-amber-500 font-bold text-slate-800"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Base Diagnostic Tariff (₹)</label>
                <input
                  required
                  type="number"
                  value={baseCharge}
                  onChange={(e) => setBaseCharge(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Travel Rate Per Km (₹/km)</label>
                <input
                  required
                  type="number"
                  value={ratePerKm}
                  onChange={(e) => setRatePerKm(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Workshop Base Address</label>
              <input
                required
                type="text"
                value={workshopAddress}
                onChange={(e) => setWorkshopAddress(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-amber-500"
              />
            </div>

            <div className="flex items-center space-x-3 pt-2">
              <button
                type="submit"
                disabled={saving}
                className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold shadow-md transition-colors"
              >
                {saving ? 'Updating...' : 'Save Garage Settings'}
              </button>
              {saved && (
                <span className="text-xs text-emerald-600 font-bold flex items-center space-x-1">
                  <Check className="w-4 h-4" />
                  <span>Settings Saved!</span>
                </span>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
