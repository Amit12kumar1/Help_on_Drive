import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Car, Plus, Trash2, CheckCircle2, Shield, AlertCircle } from 'lucide-react';

export default function MyVehiclesPage() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    vehicleNumber: '',
    brand: '',
    model: '',
    vehicleType: 'Sedan',
    fuelType: 'Petrol',
    color: 'White',
    rcNumber: '',
    isDefault: false
  });

  const fetchVehicles = async () => {
    try {
      const res = await api.get('/vehicles');
      if (res.data.success) setVehicles(res.data.vehicles);
    } catch (err) {
      console.error('Error fetching vehicles:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await api.post('/vehicles', formData);
      if (res.data.success) {
        setModalOpen(false);
        setFormData({
          vehicleNumber: '',
          brand: '',
          model: '',
          vehicleType: 'Sedan',
          fuelType: 'Petrol',
          color: 'White',
          rcNumber: '',
          isDefault: false
        });
        fetchVehicles();
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to add vehicle');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to remove this vehicle from your garage?')) return;
    try {
      await api.delete(`/vehicles/${id}`);
      fetchVehicles();
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const handleSetDefault = async (id) => {
    try {
      await api.put(`/vehicles/${id}`, { isDefault: true });
      fetchVehicles();
    } catch (err) {
      console.error('Set default error:', err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">My Saved Vehicles</h1>
          <p className="text-xs text-slate-500">Manage cars linked to your account for fast 1-click booking</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center space-x-1.5 px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold rounded-xl shadow-md transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Vehicle</span>
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12 text-xs text-slate-400">Loading garage...</div>
      ) : vehicles.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Car className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-slate-800">No Vehicles in Garage Yet</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Save your car details once so you don't have to enter them during roadside emergencies or chauffeur bookings.
          </p>
          <button
            onClick={() => setModalOpen(true)}
            className="px-5 py-2.5 bg-brand-600 text-white rounded-xl text-xs font-bold shadow-md"
          >
            Add Your First Car
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((v) => (
            <div
              key={v._id}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative group"
            >
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-700 font-bold">
                    <Car className="w-6 h-6" />
                  </div>
                  {v.isDefault ? (
                    <span className="flex items-center space-x-1 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Default Vehicle</span>
                    </span>
                  ) : (
                    <button
                      onClick={() => handleSetDefault(v._id)}
                      className="text-[10px] text-slate-400 hover:text-brand-600 font-semibold transition-colors"
                    >
                      Set as Default
                    </button>
                  )}
                </div>

                <h3 className="text-lg font-bold text-slate-900">{v.brand} {v.model}</h3>
                <div className="inline-block px-3 py-1 bg-slate-900 text-amber-400 font-mono text-xs font-bold rounded-lg tracking-wider my-2 border border-slate-700">
                  {v.vehicleNumber}
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 mt-2 pt-3 border-t border-slate-100">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Category</span>
                    <span className="font-semibold">{v.vehicleType}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Fuel Type</span>
                    <span className="font-semibold">{v.fuelType}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Color</span>
                    <span className="font-semibold">{v.color}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">RC Number</span>
                    <span className="font-semibold font-mono text-[11px] truncate block">{v.rcNumber || 'Verified'}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => handleDelete(v._id)}
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                  title="Remove vehicle"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Vehicle Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-1">Add Vehicle to Garage</h3>
            <p className="text-xs text-slate-500 mb-4">Provide accurate details for breakdown and chauffeur assignments</p>

            <form onSubmit={handleAdd} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Brand</label>
                  <input
                    required
                    type="text"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    placeholder="e.g. Hyundai, Tata"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Model</label>
                  <input
                    required
                    type="text"
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    placeholder="e.g. i20 Asta, Nexon"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Vehicle Plate No.</label>
                  <input
                    required
                    type="text"
                    value={formData.vehicleNumber}
                    onChange={(e) => setFormData({ ...formData, vehicleNumber: e.target.value.toUpperCase() })}
                    placeholder="DL-03-CC-1234"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono uppercase outline-none focus:border-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Vehicle Type</label>
                  <select
                    value={formData.vehicleType}
                    onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none"
                  >
                    <option value="Hatchback">Hatchback</option>
                    <option value="Sedan">Sedan</option>
                    <option value="SUV">SUV</option>
                    <option value="Luxury">Luxury</option>
                    <option value="Bike">Bike / Two-Wheeler</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Fuel Type</label>
                  <select
                    value={formData.fuelType}
                    onChange={(e) => setFormData({ ...formData, fuelType: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none"
                  >
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="CNG">CNG</option>
                    <option value="Electric">Electric (EV)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Color</label>
                  <input
                    type="text"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    placeholder="Polar White"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">RC Certificate Number (Optional)</label>
                <input
                  type="text"
                  value={formData.rcNumber}
                  onChange={(e) => setFormData({ ...formData, rcNumber: e.target.value.toUpperCase() })}
                  placeholder="RC-IND-2023-XXXX"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono uppercase outline-none"
                />
              </div>

              <div className="flex items-center space-x-2 pt-1">
                <input
                  type="checkbox"
                  id="defVeh"
                  checked={formData.isDefault}
                  onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
                  className="rounded text-brand-600"
                />
                <label htmlFor="defVeh" className="text-xs text-slate-700">
                  Set as primary/default vehicle for bookings
                </label>
              </div>

              <div className="flex space-x-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="flex-1 py-2.5 border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 py-2.5 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold rounded-xl shadow-md"
                >
                  {submitting ? 'Saving...' : 'Save to Garage'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
