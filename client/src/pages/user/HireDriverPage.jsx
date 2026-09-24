import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import LocationPickerMap from '../../components/map/LocationPickerMap';
import TiltCard3D from '../../components/common/TiltCard3D';
import { SERVICE_IMAGES } from '../../constants/serviceImages';
import {
  UserCheck,
  Car,
  Clock,
  Calendar,
  Star,
  ShieldCheck,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Award,
  Plus
} from 'lucide-react';

/**
 * ============================================================================
 * 🚗 HELP ON DRIVE - ON-DEMAND DRIVER BOOKING
 * ============================================================================
 *
 * 🎓 Viva & Presentation Quick Defense:
 * 1. Booking Architecture:
 *    - Allows user to hire a verified driver for their personal car.
 *    - Durations: Hourly (2h, 4h, 6h, 8h) or Multi-Day Outstation (1 to 7 days).
 * 2. 3D Visual Cards:
 *    - `TiltCard3D` provides realistic physics tilt for chauffeur profiles and trip tiers.
 *    - Chauffeur profiles display verified driving license badges and customer ratings.
 * 3. Responsive State Form:
 *    - Real-time fare calculation (`isMultiDay ? dailyRate * days : hourlyRate * hours`).
 * ============================================================================
 */
export default function HireDriverPage() {
  const navigate = useNavigate();

  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [drivers, setDrivers] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState(null);

  const [durationCategory, setDurationCategory] = useState('quick'); // 'quick' | 'multiday'
  const [bookingType, setBookingType] = useState('4_hours');
  const [durationHours, setDurationHours] = useState(4);
  const [durationDays, setDurationDays] = useState(1);
  const [tripType, setTripType] = useState('city_commute');

  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [startTime, setStartTime] = useState('10:00 AM');
  const [pickupLocation, setPickupLocation] = useState({
    lat: 28.5583,
    lng: 77.2028,
    address: 'Green Park Extension, New Delhi'
  });
  const [destinationAddress, setDestinationAddress] = useState('DLF Cyber City, Gurugram');
  const [notes, setNotes] = useState('');

  const [loading, setLoading] = useState(true);
  const [bookingInProgress, setBookingInProgress] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [vehRes, drvRes] = await Promise.all([
          api.get('/vehicles'),
          api.get('/drivers')
        ]);

        if (vehRes.data.success && vehRes.data.vehicles.length > 0) {
          setVehicles(vehRes.data.vehicles);
          const defaultVeh = vehRes.data.vehicles.find(v => v.isDefault) || vehRes.data.vehicles[0];
          setSelectedVehicle(defaultVeh._id);
        }

        if (drvRes.data.success && drvRes.data.drivers.length > 0) {
          setDrivers(drvRes.data.drivers);
          setSelectedDriver(drvRes.data.drivers[0]);
        }
      } catch (err) {
        console.error('Error loading hire driver page:', err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleDurationSelect = (type, hrs, days) => {
    setBookingType(type);
    setDurationHours(hrs);
    setDurationDays(days);
  };

  // Pricing calculations
  const driverHourlyRate = selectedDriver?.hourlyRate || 120;
  const driverDailyRate = selectedDriver?.dailyRate || 900;
  const isMultiDay = bookingType.includes('day') || durationCategory === 'multiday';

  const driverFee = isMultiDay ? (driverDailyRate * durationDays) : (driverHourlyRate * durationHours);
  const platformFee = 50;
  const tax = Math.round((driverFee + platformFee) * 0.05);
  const totalAmount = driverFee + platformFee + tax;

  const handleConfirmBooking = async (e) => {
    e.preventDefault();
    if (!selectedVehicle) {
      alert('Please select or add a vehicle first');
      return;
    }
    if (!selectedDriver) {
      alert('Please select a driver');
      return;
    }

    setBookingInProgress(true);
    try {
      const res = await api.post('/driver-bookings', {
        vehicleId: selectedVehicle,
        driverId: selectedDriver.userId?._id || selectedDriver.userId,
        bookingType,
        tripType,
        startDate,
        startTime,
        durationHours,
        durationDays,
        pickupLocation,
        destinationLocation: {
          address: destinationAddress || 'Local City Commute',
          lat: 28.4950,
          lng: 77.0890
        },
        notes
      });

      if (res.data.success) {
        navigate(`/user/tracking?type=driver&id=${res.data.booking._id}`);
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to book driver');
    } finally {
      setBookingInProgress(false);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* Title Header */}
      <div>
        <div className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Personal Chauffeur Service</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Hire a Verified Driver for Your Car
        </h1>
        <p className="text-xs text-slate-500">
          Temporary professional chauffeurs for city commutes, evening parties, or highway vacations
        </p>
      </div>

      <form onSubmit={handleConfirmBooking} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Form Steps */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Step 1: Select Car */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs flex items-center justify-center font-bold">1</span>
                <span>Select Your Car</span>
              </h3>
              <button
                type="button"
                onClick={() => navigate('/user/vehicles')}
                className="text-xs font-bold text-blue-600 hover:underline flex items-center space-x-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Vehicle</span>
              </button>
            </div>

            {vehicles.length === 0 ? (
              <div className="p-4 bg-amber-50 rounded-2xl text-xs text-amber-800 border border-amber-200 flex items-center justify-between">
                <span>No car registered yet. Please add your car to book a personal chauffeur.</span>
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
                        ? 'border-blue-500 bg-blue-50/70 shadow-md ring-2 ring-blue-500/20'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="font-bold text-xs text-slate-900">{v.brand} {v.model}</div>
                    <div className="font-mono text-xs text-blue-600 font-bold">{v.vehicleNumber}</div>
                    <div className="text-[10px] text-slate-400 mt-1">{v.vehicleType} • {v.fuelType} • {v.transmission || 'Manual'}</div>
                    {selectedVehicle === v._id && (
                      <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-500" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Step 2: Duration Selector with 3D Options */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs flex items-center justify-center font-bold">2</span>
                <span>Select Booking Duration</span>
              </h3>

              <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => { setDurationCategory('quick'); setBookingType('4_hours'); setDurationHours(4); setDurationDays(1); }}
                  className={`px-3 py-1 rounded-lg transition-all ${durationCategory === 'quick' ? 'bg-white shadow text-blue-700' : 'text-slate-600'}`}
                >
                  Hourly
                </button>
                <button
                  type="button"
                  onClick={() => { setDurationCategory('multiday'); setBookingType('full_day'); setDurationHours(10); setDurationDays(1); }}
                  className={`px-3 py-1 rounded-lg transition-all ${durationCategory === 'multiday' ? 'bg-white shadow text-blue-700' : 'text-slate-600'}`}
                >
                  Full-Day / Outstation
                </button>
              </div>
            </div>

            {durationCategory === 'quick' ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: '2_hours', h: 2, label: '2 Hours', tag: 'Errands', desc: 'Quick errands & doctor visits' },
                  { id: '4_hours', h: 4, label: '4 Hours', tag: 'Half-Day', desc: 'Shopping & market visits' },
                  { id: '6_hours', h: 6, label: '6 Hours', tag: 'Extended', desc: 'Family outings & dinner' },
                  { id: '8_hours', h: 8, label: '8 Hours', tag: 'Full Shift', desc: 'Full office or corporate day' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleDurationSelect(item.id, item.h, 1)}
                    className={`p-3.5 rounded-2xl border text-center transition-all ${
                      bookingType === item.id
                        ? 'border-blue-500 bg-blue-600 text-white shadow-md shadow-blue-500/20'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span className="text-xs font-bold block">{item.label}</span>
                    <span className={`text-[10px] block mt-0.5 ${bookingType === item.id ? 'text-blue-100' : 'text-slate-400'}`}>
                      {item.tag}
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: 'full_day', d: 1, label: '1 Day (10h)', tag: 'City/Outstation' },
                  { id: '2_days', d: 2, label: '2 Days Trip', tag: 'Weekend Getaway' },
                  { id: '3_days', d: 3, label: '3 Days Tour', tag: 'Holiday Trip' },
                  { id: '7_days', d: 7, label: '1 Week Tour', tag: 'Vacation' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleDurationSelect(item.id, item.d * 10, item.d)}
                    className={`p-3.5 rounded-2xl border text-center transition-all ${
                      bookingType === item.id
                        ? 'border-blue-500 bg-blue-600 text-white shadow-md shadow-blue-500/20'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span className="text-xs font-bold block">{item.label}</span>
                    <span className={`text-[10px] block mt-0.5 ${bookingType === item.id ? 'text-blue-100' : 'text-slate-400'}`}>
                      {item.tag}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Step 3: Schedule, Time & Route */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs flex items-center justify-center font-bold">3</span>
              <span>Schedule & Route</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Pickup Time</label>
                <select
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-500 font-medium"
                >
                  {['08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '02:00 PM', '04:00 PM', '06:00 PM', '08:00 PM', '10:00 PM'].map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Trip Type</label>
                <select
                  value={tripType}
                  onChange={(e) => setTripType(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-500 font-medium"
                >
                  <option value="city_commute">City Commute / Local</option>
                  <option value="one_way">One Way Drop</option>
                  <option value="round_trip">Round Trip</option>
                  <option value="outstation">Outstation Highway</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Pickup Location</label>
              <div className="h-44 rounded-2xl overflow-hidden border border-slate-200 mb-2">
                <LocationPickerMap
                  initialPos={pickupLocation}
                  onLocationChange={(newPos) => setPickupLocation(newPos)}
                />
              </div>
              <input
                type="text"
                value={pickupLocation.address}
                onChange={(e) => setPickupLocation({ ...pickupLocation, address: e.target.value })}
                placeholder="Pickup address or landmark..."
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-500 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Destination Landmark</label>
              <input
                type="text"
                value={destinationAddress}
                onChange={(e) => setDestinationAddress(e.target.value)}
                placeholder="Destination address or city..."
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-blue-500 font-medium"
              />
            </div>
          </div>

          {/* Step 4: Driver Catalog with 3D Tilt */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs flex items-center justify-center font-bold">4</span>
              <span>Select Verified Chauffeur ({drivers.length})</span>
            </h3>

            <div className="grid grid-cols-1 gap-3.5">
              {drivers.map((d) => (
                <TiltCard3D key={d._id} maxTilt={4} scale={1.01}>
                  <div
                    onClick={() => setSelectedDriver(d)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                      selectedDriver?._id === d._id
                        ? 'border-blue-500 bg-blue-50/70 shadow-md ring-2 ring-blue-500/20'
                        : 'border-slate-200 hover:bg-slate-50 bg-white'
                    }`}
                  >
                    <div className="flex items-center space-x-3.5">
                      <img
                        src={d.userId?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120'}
                        alt={d.userId?.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-blue-500 shadow-sm"
                      />
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="text-xs font-bold text-slate-900">{d.userId?.name}</h4>
                          <span className="flex items-center space-x-0.5 text-[10px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full font-bold">
                            <ShieldCheck className="w-3 h-3" />
                            <span>Verified</span>
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          {d.experienceYears} Years Exp • {d.vehicleTypesSupported?.join(', ') || 'Sedan, SUV'} • {d.languages?.join(', ') || 'Hindi, English'}
                        </div>
                        <div className="flex items-center space-x-1 text-amber-500 text-xs font-bold mt-1">
                          <Star className="w-3.5 h-3.5 fill-amber-500" />
                          <span>{d.rating || 4.9}</span>
                          <span className="text-slate-400 font-normal">({d.totalTrips || 140} trips)</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-left sm:text-right">
                      <div className="text-base font-black text-slate-900">₹{d.hourlyRate}/hr</div>
                      <span className="text-[10px] text-slate-400">or ₹{d.dailyRate}/day</span>
                    </div>
                  </div>
                </TiltCard3D>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Fare Summary */}
        <div className="space-y-6">
          <TiltCard3D maxTilt={6}>
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-900">Trip Fare Summary</h3>

              {selectedDriver && (
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs flex items-center space-x-3">
                  <img
                    src={selectedDriver.userId?.avatar}
                    alt={selectedDriver.userId?.name}
                    className="w-10 h-10 rounded-full object-cover border border-blue-500"
                  />
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium">Selected Chauffeur</span>
                    <span className="font-bold text-slate-800">{selectedDriver.userId?.name}</span>
                  </div>
                </div>
              )}

              <div className="space-y-2.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span className="font-semibold text-slate-800">
                    {isMultiDay ? `${durationDays} Day(s)` : `${durationHours} Hours`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Driver Tariff:</span>
                  <span className="font-semibold text-slate-800">₹{driverFee}</span>
                </div>
                <div className="flex justify-between">
                  <span>Platform Booking Fee:</span>
                  <span className="font-semibold text-slate-800">₹{platformFee}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST (5%):</span>
                  <span className="font-semibold text-slate-800">₹{tax}</span>
                </div>

                <div className="pt-3 border-t border-slate-200 flex justify-between font-black text-sm text-slate-900">
                  <span>Total Amount:</span>
                  <span className="text-blue-600 text-base">₹{totalAmount}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={bookingInProgress || vehicles.length === 0}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-600/25 transition-all flex items-center justify-center space-x-2"
              >
                {bookingInProgress ? (
                  <span>Confirming Chauffeur...</span>
                ) : (
                  <>
                    <span>Book Verified Chauffeur</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </TiltCard3D>
        </div>
      </form>
    </div>
  );
}
