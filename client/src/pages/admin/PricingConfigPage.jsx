import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { BadgePercent, Save, Check } from 'lucide-react';

export default function PricingConfigPage() {
  const [pricing, setPricing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    api.get('/admin/pricing')
      .then((res) => {
        if (res.data.success) setPricing(res.data.pricing);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put('/admin/pricing', pricing);
      if (res.data.success) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (e) {
      alert('Failed to update pricing');
    }
  };

  if (loading || !pricing) {
    return <div className="text-center py-16 text-xs text-slate-400">Loading pricing configuration...</div>;
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Tariffs & Pricing Engine Configurator</h1>
        <p className="text-xs text-slate-500">Live adjust base diagnostic rates, per-kilometer travel charges, and driver fee structures</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Roadside Assistance Tariffs */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-brand-600">
            Roadside Assistance Base Diagnostic Fees (₹)
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">Tyre Puncture</label>
              <input
                type="number"
                value={pricing.rsa?.basePuncture || 199}
                onChange={(e) => setPricing({ ...pricing, rsa: { ...pricing.rsa, basePuncture: Number(e.target.value) } })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">Battery Jumpstart</label>
              <input
                type="number"
                value={pricing.rsa?.baseBattery || 349}
                onChange={(e) => setPricing({ ...pricing, rsa: { ...pricing.rsa, baseBattery: Number(e.target.value) } })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">Fuel Delivery</label>
              <input
                type="number"
                value={pricing.rsa?.baseFuel || 249}
                onChange={(e) => setPricing({ ...pricing, rsa: { ...pricing.rsa, baseFuel: Number(e.target.value) } })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">Flatbed Towing</label>
              <input
                type="number"
                value={pricing.rsa?.baseTowing || 799}
                onChange={(e) => setPricing({ ...pricing, rsa: { ...pricing.rsa, baseTowing: Number(e.target.value) } })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-100">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">Travel Rate Per Km (₹)</label>
              <input
                type="number"
                value={pricing.rsa?.ratePerKm || 25}
                onChange={(e) => setPricing({ ...pricing, rsa: { ...pricing.rsa, ratePerKm: Number(e.target.value) } })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">Emergency Surcharge (₹)</label>
              <input
                type="number"
                value={pricing.rsa?.emergencySurcharge || 150}
                onChange={(e) => setPricing({ ...pricing, rsa: { ...pricing.rsa, emergencySurcharge: Number(e.target.value) } })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">GST Percentage (%)</label>
              <input
                type="number"
                value={pricing.rsa?.taxPercentage || 18}
                onChange={(e) => setPricing({ ...pricing, rsa: { ...pricing.rsa, taxPercentage: Number(e.target.value) } })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
              />
            </div>
          </div>
        </div>

        {/* Chauffeur Tariffs */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-blue-600">
            Driver & Chauffeur Tariffs
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">Hourly Driver Tariff (₹/hr)</label>
              <input
                type="number"
                value={pricing.driver?.hourlyRate || 120}
                onChange={(e) => setPricing({ ...pricing, driver: { ...pricing.driver, hourlyRate: Number(e.target.value) } })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">Full Day Rate (₹/day)</label>
              <input
                type="number"
                value={pricing.driver?.dailyRate || 900}
                onChange={(e) => setPricing({ ...pricing, driver: { ...pricing.driver, dailyRate: Number(e.target.value) } })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">Night Allowance (₹)</label>
              <input
                type="number"
                value={pricing.driver?.nightAllowance || 150}
                onChange={(e) => setPricing({ ...pricing, driver: { ...pricing.driver, nightAllowance: Number(e.target.value) } })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            type="submit"
            className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-md transition-colors flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Live Tariffs</span>
          </button>
          {saved && (
            <span className="text-xs text-emerald-600 font-bold flex items-center space-x-1">
              <Check className="w-4 h-4" />
              <span>Pricing Parameters Synchronized!</span>
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
