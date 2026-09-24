import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import api from '../../services/api';
import LocationPickerMap from '../../components/map/LocationPickerMap';
import TiltCard3D from '../../components/common/TiltCard3D';
import { SERVICE_IMAGES } from '../../constants/serviceImages';
import {
  Wrench,
  Zap,
  BatteryCharging,
  Fuel,
  Car,
  Key,
  AlertTriangle,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Plus,
  Sparkles
} from 'lucide-react';

/**
 * ============================================================================
 * 🚗 HELP ON DRIVE - ROADSIDE ASSISTANCE DISPATCH
 * ============================================================================
 *
 * 🎓 Viva & Presentation Quick Defense:
 * 1. State Orchestration:
 *    - `vehicles`: Fetched from `/api/vehicles`, allows user to select their registered car.
 *    - `serviceType`: Initialized from URL query params (`?service=breakdown`) or user click.
 *    - `location`: Leaflet map updates lat/lng and reverse-geocodes addresses.
 * 2. Dynamic 3D Service Cards:
 *    - Service options display high-res photographs from `SERVICE_IMAGES`.
 *    - Selected card illuminates with dynamic border and active badges.
 * 3. Fare Calculation:
 *    - Total = Base Fare + (Distance in Km * Rate) + Platform Safety Fee + 18% GST.
 * ============================================================================
 */
export default function RoadsideAssistancePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialService = searchParams.get('service') || 'breakdown';

  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [serviceType, setServiceType] = useState(initialService);
  const [problemDescription, setProblemDescription] = useState('');
  const [location, setLocation] = useState({
    lat: 28.5494,
    lng: 77.2001,
    address: 'Hauz Khas, New Delhi'
  });
  const [providers, setProviders] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [requesting, setRequesting] = useState(false);

  // 8 Services with metadata & imagery
  const servicesList = [
    {
      id: 'breakdown',
      title: 'Engine Breakdown',
      icon: Wrench,
      base: 399,
      desc: 'Engine stall, clutch or transmission issue',
      meta: SERVICE_IMAGES.breakdown
    },
    {
      id: 'puncture',
      title: 'Tyre / Puncture',
      icon: Zap,
      base: 199,
      desc: 'Puncture plug, spare tyre change & pressure',
      meta: SERVICE_IMAGES.puncture
    },
    {
      id: 'battery',
      title: 'Battery Jump Start',
      icon: BatteryCharging,
      base: 349,
      desc: 'Dead battery boost & electrical test',
      meta: SERVICE_IMAGES.battery
    },
    {
      id: 'fuel',
      title: 'Fuel Delivery',
      icon: Fuel,
      base: 249,
      desc: '5L emergency fuel delivered to vehicle',
      meta: SERVICE_IMAGES.fuel
    },
    {
      id: 'towing',
      title: 'Flatbed Towing',
      icon: Car,
      base: 799,
      desc: 'Hydraulic carrier towing to garage',
      meta: SERVICE_IMAGES.towing
    },
    {
      id: 'lockout',
      title: 'Key Lockout',
      icon: Key,
      base: 449,
      desc: 'Safe non-damaging vehicle door opening',
      meta: SERVICE_IMAGES.lockout
    },
    {
      id: 'repair',
      title: 'Minor On-Spot Repair',
      icon: Wrench,
      base: 499,
      desc: 'Radiator, belt, or brake pad servicing',
      meta: SERVICE_IMAGES.breakdown
    },
    {
      id: 'emergency',
      title: 'Highway Rescue',
      icon: AlertTriangle,
      base: 599,
      desc: 'High-speed expressway breakdown response',
      meta: SERVICE_IMAGES.towing
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [vehRes, provRes] = await Promise.all([
          api.get('/vehicles'),
          api.get('/providers')
        ]);

        if (vehRes.data.success && vehRes.data.vehicles.length > 0) {
          setVehicles(vehRes.data.vehicles);
          const defaultVeh = vehRes.data.vehicles.find(v => v.isDefault) || vehRes.data.vehicles[0];
          setSelectedVehicle(defaultVeh._id);
        }

        if (provRes.data.success) {
          setProviders(provRes.data.providers);
          if (provRes.data.providers.length > 0) {
            setSelectedProvider(provRes.data.providers[0]);
          }
        }
      } catch (err) {
        console.error('Error initializing RSA request:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const currentServiceObj = servicesList.find(s => s.id === serviceType) || servicesList[0];
  const distanceKm = 4.2;
  const distanceFee = Math.round(distanceKm * 25);
  const basePrice = currentServiceObj.base;
  const platformFee = 50;
  const totalEstimated = basePrice + distanceFee + platformFee;

  const handleRequestAssistance = async (e) => {
    e.preventDefault();
    if (!selectedVehicle) {
      alert('Please select or add a vehicle first');
      return;
    }

    setRequesting(true);
    try {
      const res = await api.post('/assistance', {
        vehicleId: selectedVehicle,
        serviceType,
        problemDescription: problemDescription || `Emergency assistance needed for ${currentServiceObj.title} at ${location.address}`,
        location,
        providerId: selectedProvider?.userId?._id || selectedProvider?.userId,
        charges: {
          baseCharge: basePrice,
          distanceCharge: distanceFee,
          serviceCharge: platformFee,
          gst: Math.round(totalEstimated * 0.18),
          totalAmount: Math.round(totalEstimated * 1.18)
        }
      });

      if (res.data.success) {
        navigate(`/user/tracking?type=assistance&id=${res.data.request._id}`);
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to dispatch roadside assistance');
    } finally {
      setRequesting(false);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* Title Header */}
      <div>
        <div className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-brand-100 text-brand-700 text-xs font-bold mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Emergency Dispatch Console</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Request Roadside Assistance
        </h1>
        <p className="text-xs text-slate-500">
          Fast certified mechanic & tow truck dispatch with real-time Leaflet GPS tracking
        </p>
      </div>

      <form onSubmit={handleRequestAssistance} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Input Steps */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Step 1: Select Vehicle */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                <span className="w-6 h-6 rounded-full bg-brand-100 text-brand-700 text-xs flex items-center justify-center font-bold">1</span>
                <span>Select Your Vehicle</span>
              </h3>
              <button
                type="button"
                onClick={() => navigate('/user/vehicles')}
                className="text-xs font-bold text-brand-600 hover:underline flex items-center space-x-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Vehicle</span>
              </button>
            </div>

            {vehicles.length === 0 ? (
              <div className="p-4 bg-amber-50 rounded-2xl text-xs text-amber-800 border border-amber-200 flex items-center justify-between">
                <span>No vehicles in garage. Please add your car first to dispatch assistance.</span>
                <button
                  type="button"
                  onClick={() => navigate('/user/vehicles')}
                  className="px-3 py-1 bg-amber-600 text-white rounded-lg font-bold text-xs"
                >
                  Add Now
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {vehicles.map((v) => (
                  <button
                    key={v._id}
                    type="button"
                    onClick={() => setSelectedVehicle(v._id)}
                    className={`p-3.5 rounded-2xl border text-left transition-all relative ${
                      selectedVehicle === v._id
                        ? 'border-brand-500 bg-brand-50/70 shadow-md ring-2 ring-brand-500/20'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="font-bold text-xs text-slate-900">{v.brand} {v.model}</div>
                    <div className="font-mono text-xs text-brand-600 font-bold">{v.vehicleNumber}</div>
                    <div className="text-[10px] text-slate-400 mt-1">{v.vehicleType} • {v.fuelType}</div>
                    {selectedVehicle === v._id && (
                      <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-brand-500" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Step 2: Interactive 3D Service Selector */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                <span className="w-6 h-6 rounded-full bg-brand-100 text-brand-700 text-xs flex items-center justify-center font-bold">2</span>
                <span>Select Breakdown Category</span>
              </h3>
              <span className="text-xs text-slate-400 font-medium">Click to select</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
              {servicesList.map((s) => {
                const isSelected = serviceType === s.id;
                return (
                  <TiltCard3D key={s.id} maxTilt={6} scale={1.03}>
                    <button
                      type="button"
                      onClick={() => setServiceType(s.id)}
                      className={`w-full rounded-2xl border text-left transition-all overflow-hidden flex flex-col justify-between h-36 relative ${
                        isSelected
                          ? 'border-brand-500 ring-2 ring-brand-500 shadow-lg shadow-brand-500/15'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      {/* Image Thumbnail Header */}
                      <div className="h-16 w-full relative overflow-hidden bg-slate-900">
                        <img
                          src={s.meta.image}
                          alt={s.title}
                          className="w-full h-full object-cover opacity-80"
                          onError={(e) => { e.currentTarget.src = s.meta.fallback; }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        <div className="absolute top-1.5 right-1.5 translate-z-20">
                          <span className={`text-[10px] font-black px-1.5 py-0.5 rounded ${
                            isSelected ? 'bg-brand-500 text-white' : 'bg-black/60 text-white'
                          }`}>
                            ₹{s.base}
                          </span>
                        </div>
                      </div>

                      {/* Card Bottom Content */}
                      <div className="p-2.5 space-y-0.5 flex-1 flex flex-col justify-between">
                        <div>
                          <div className={`text-xs font-bold leading-tight ${
                            isSelected ? 'text-brand-600' : 'text-slate-800'
                          }`}>
                            {s.title}
                          </div>
                          <div className="text-[10px] text-slate-400 truncate mt-0.5">{s.desc}</div>
                        </div>

                        {isSelected && (
                          <div className="flex items-center space-x-1 text-[10px] font-bold text-brand-600">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Selected</span>
                          </div>
                        )}
                      </div>
                    </button>
                  </TiltCard3D>
                );
              })}
            </div>
          </div>

          {/* Step 3: Incident Location Picker Map */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
              <span className="w-6 h-6 rounded-full bg-brand-100 text-brand-700 text-xs flex items-center justify-center font-bold">3</span>
              <span>Pin Breakdown Location on Map</span>
            </h3>

            <div className="h-56 rounded-2xl overflow-hidden border border-slate-200">
              <LocationPickerMap
                initialPos={location}
                onLocationChange={(newLoc) => setLocation(newLoc)}
              />
            </div>

            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-brand-600 flex-shrink-0" />
              <input
                type="text"
                value={location.address}
                onChange={(e) => setLocation({ ...location, address: e.target.value })}
                placeholder="Exact landmark, highway milestone, or street address..."
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-brand-500 font-medium"
              />
            </div>
          </div>

          {/* Step 4: Describe Problem */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
              <span className="w-6 h-6 rounded-full bg-brand-100 text-brand-700 text-xs flex items-center justify-center font-bold">4</span>
              <span>Problem Details (Optional)</span>
            </h3>

            <textarea
              rows={2}
              value={problemDescription}
              onChange={(e) => setProblemDescription(e.target.value)}
              placeholder="e.g. Engine started smoking near red light; battery is clicking but not starting..."
              className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-brand-500"
            />
          </div>
        </div>

        {/* Right Column: Matched Provider & Price Summary */}
        <div className="space-y-6">
          {/* 3D Matched Provider Card */}
          <TiltCard3D maxTilt={6}>
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900">Nearby Workshop Match</h3>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  <span>Live Dispatch</span>
                </span>
              </div>

              {selectedProvider ? (
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex items-center space-x-3">
                    <img
                      src={selectedProvider.userId?.avatar || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=120'}
                      alt="Provider"
                      className="w-12 h-12 rounded-xl object-cover border-2 border-brand-500 shadow-sm"
                    />
                    <div>
                      <h4 className="font-bold text-xs text-slate-900">{selectedProvider.businessName}</h4>
                      <span className="text-[11px] text-slate-500">{selectedProvider.serviceType} Specialist</span>
                      <div className="text-[11px] text-amber-500 font-bold">★ {selectedProvider.rating || 4.9} (50+ rescues)</div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5 text-brand-600" />
                      <span>ETA: ~15-20 mins</span>
                    </span>
                    <span className="flex items-center space-x-1 text-emerald-600 font-semibold">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Verified Mechanic</span>
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-xs text-slate-400 py-4 text-center">Searching nearby verified service workshops...</div>
              )}
            </div>
          </TiltCard3D>

          {/* Pricing Calculation Summary */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Fare Breakdown</h3>

            <div className="space-y-2.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Base Service Tariff ({currentServiceObj.title}):</span>
                <span className="font-semibold text-slate-800">₹{basePrice}</span>
              </div>
              <div className="flex justify-between">
                <span>Distance Transit (~{distanceKm} km):</span>
                <span className="font-semibold text-slate-800">₹{distanceFee}</span>
              </div>
              <div className="flex justify-between">
                <span>Platform Safety Surcharge:</span>
                <span className="font-semibold text-slate-800">₹{platformFee}</span>
              </div>
              <div className="flex justify-between">
                <span>GST (18%):</span>
                <span className="font-semibold text-slate-800">₹{Math.round(totalEstimated * 0.18)}</span>
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-between font-black text-sm text-slate-900">
                <span>Total Estimated:</span>
                <span className="text-brand-600 text-base">₹{Math.round(totalEstimated * 1.18)}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={requesting || vehicles.length === 0}
              className="w-full py-3.5 bg-brand-600 hover:bg-brand-700 disabled:bg-slate-300 text-white font-bold text-xs rounded-xl shadow-lg shadow-brand-600/25 transition-all flex items-center justify-center space-x-2"
            >
              {requesting ? (
                <span>Dispatching Nearest Mechanic...</span>
              ) : (
                <>
                  <span>Confirm & Dispatch Mechanic</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
