import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import {
  Car,
  Wrench,
  UserCheck,
  Navigation,
  Clock,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  ChevronRight,
  MapPin,
  Sparkles,
  PhoneCall,
  Star
} from 'lucide-react';

export default function UserDashboard() {
  const { user } = useAuth();
  const [vehicles, setVehicles] = useState([]);
  const [activeRSA, setActiveRSA] = useState(null);
  const [activeDriverBooking, setActiveDriverBooking] = useState(null);
  const [recentHistory, setRecentHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [vehRes, rsaRes, drvRes] = await Promise.all([
          api.get('/vehicles'),
          api.get('/assistance/my'),
          api.get('/driver-bookings/my'),
        ]);

        if (vehRes.data.success) setVehicles(vehRes.data.vehicles);

        if (rsaRes.data.success) {
          const activeR = rsaRes.data.requests.find(r => ['pending', 'accepted', 'on_the_way', 'arrived', 'in_progress'].includes(r.status));
          setActiveRSA(activeR || null);
        }

        if (drvRes.data.success) {
          const activeD = drvRes.data.bookings.find(b => ['pending', 'accepted', 'driver_arrived', 'trip_started'].includes(b.status));
          setActiveDriverBooking(activeD || null);

          // Combined recent history
          const combined = [
            ...(rsaRes.data.requests || []).map(r => ({ ...r, type: 'Roadside Assistance' })),
            ...(drvRes.data.bookings || []).map(b => ({ ...b, type: 'Driver Booking' }))
          ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);

          setRecentHistory(combined);
        }
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-6">
      {/* Active Service Notification Banner if job is in transit */}
      {(activeRSA || activeDriverBooking) && (
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-5 rounded-3xl shadow-xl border border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-pulse-slow">
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-2xl bg-brand-500 text-white flex items-center justify-center font-bold">
              <Navigation className="w-6 h-6 animate-spin" style={{ animationDuration: '6s' }} />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-brand-500/30 text-brand-300 px-2 py-0.5 rounded">
                  Live Active Dispatch
                </span>
                <span className="text-xs text-slate-400 capitalize">
                  {activeRSA ? `RSA: ${activeRSA.serviceType}` : `Driver: ${activeDriverBooking.bookingType?.replace(/_/g, ' ')}`}
                </span>
              </div>
              <h3 className="text-base font-bold text-white mt-0.5">
                {activeRSA
                  ? `Technician ${activeRSA.status.replace(/_/g, ' ').toUpperCase()}`
                  : `Driver ${activeDriverBooking.status.replace(/_/g, ' ').toUpperCase()}`}
              </h3>
              <p className="text-xs text-slate-300">
                {activeRSA?.location?.address || activeDriverBooking?.pickupLocation?.address}
              </p>
            </div>
          </div>

          <Link
            to={`/user/tracking?type=${activeRSA ? 'assistance' : 'driver'}&id=${activeRSA?._id || activeDriverBooking?._id}`}
            className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl shadow-lg transition-colors flex items-center space-x-1.5"
          >
            <span>Open Live GPS Map</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}

      {/* Hero Action Cards - Vehicle Breakdown is #1 Primary Focus */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          to="/user/roadside-assistance"
          className="group relative bg-gradient-to-br from-brand-50/50 via-white to-amber-50/30 p-6 rounded-3xl border-2 border-brand-500 shadow-md hover:shadow-xl transition-all flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-600 text-white flex items-center justify-center shadow-lg shadow-brand-500/30">
                <Wrench className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider bg-brand-600 text-white px-2.5 py-1 rounded-full shadow-sm">
                ★ Core Focus #1
              </span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-700">Immediate Breakdown Recovery</span>
            <h3 className="text-xl font-black text-slate-900 mt-1 mb-2">Request Roadside Assistance</h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-6">
              Puncture repairs, battery jumpstarts, emergency fuel delivery, flatbed towing, and on-spot minor mechanical repairs within 15-20 minutes.
            </p>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-brand-100">
            <span className="text-[11px] font-bold text-slate-500">~15 Min Fast Arrival</span>
            <div className="flex items-center text-xs font-black text-brand-700 group-hover:translate-x-1 transition-transform">
              <span>Dispatch Mechanic Now</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </div>
        </Link>

        <Link
          to="/user/hire-driver"
          className="group relative bg-white hover:bg-blue-50/40 p-6 rounded-3xl border border-slate-200 hover:border-blue-500 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
              <UserCheck className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">Drive Your Personal Car</span>
            <h3 className="text-xl font-bold text-slate-900 mt-1 mb-2">Hire a Chauffeur / Driver</h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-6">
              Book vetted professional drivers for 2h, 4h, 8h city errands, night party commutes, or multi-day family outstation roadtrips.
            </p>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <span className="text-[11px] font-semibold text-slate-400">From ₹120/hr</span>
            <div className="flex items-center text-xs font-bold text-blue-600 group-hover:translate-x-1 transition-transform">
              <span>Choose Duration & Chauffeur</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </div>
        </Link>
      </div>

      {/* Post-Service Feedback Prompt if completed services exist */}
      {recentHistory.some(item => item.status === 'completed') && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 rounded-2xl p-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-md">
              <Star className="w-5 h-5 fill-white" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">How was your recent vehicle service experience?</h4>
              <p className="text-[11px] text-slate-600">
                Leave a rating and review on your completed bookings to help us maintain top quality standards.
              </p>
            </div>
          </div>
          <Link
            to="/user/bookings"
            className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-xl shadow-sm transition-all hover:scale-105 whitespace-nowrap ml-4"
          >
            Leave Feedback →
          </Link>
        </div>
      )}

      {/* My Vehicles Quick Section */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2.5">
            <Car className="w-5 h-5 text-brand-600" />
            <h3 className="text-base font-bold text-slate-900">Saved Vehicles in Garage ({vehicles.length})</h3>
          </div>
          <Link to="/user/vehicles" className="text-xs font-bold text-brand-600 hover:underline">
            Manage Vehicles →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {vehicles.map((v) => (
            <div key={v._id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 relative group">
              {v.isDefault && (
                <span className="absolute top-3 right-3 text-[10px] bg-brand-100 text-brand-700 font-bold px-2 py-0.5 rounded-full">
                  Primary
                </span>
              )}
              <div className="text-xs font-bold text-slate-900">{v.brand} {v.model}</div>
              <div className="font-mono text-xs font-semibold text-brand-600 my-1">{v.vehicleNumber}</div>
              <div className="text-[11px] text-slate-500 flex items-center space-x-2">
                <span>{v.vehicleType}</span>
                <span>•</span>
                <span>{v.fuelType}</span>
                <span>•</span>
                <span>{v.color}</span>
              </div>
            </div>
          ))}

          <Link
            to="/user/vehicles"
            className="border-2 border-dashed border-slate-200 hover:border-brand-500 rounded-2xl p-4 flex flex-col items-center justify-center text-slate-400 hover:text-brand-600 text-xs font-medium transition-colors"
          >
            <span className="text-lg font-bold">+</span>
            <span>Add Another Car</span>
          </Link>
        </div>
      </div>

      {/* Recent History Table */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2.5">
            <Clock className="w-5 h-5 text-slate-600" />
            <h3 className="text-base font-bold text-slate-900">Recent Services & Bookings</h3>
          </div>
          <Link to="/user/bookings" className="text-xs font-bold text-brand-600 hover:underline">
            View All ({recentHistory.length}) →
          </Link>
        </div>

        {recentHistory.length === 0 ? (
          <div className="text-center py-8 text-xs text-slate-400">
            No past bookings found. Try requesting a service above!
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {recentHistory.map((item, idx) => (
              <div key={idx} className="py-3 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold ${
                    item.type === 'Roadside Assistance' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {item.type === 'Roadside Assistance' ? <Wrench className="w-4 h-4" /> : <Car className="w-4 h-4" />}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">
                      {item.type === 'Roadside Assistance' ? `RSA: ${item.serviceType}` : `Driver: ${item.bookingType?.replace(/_/g, ' ')}`}
                    </h4>
                    <span className="text-[11px] text-slate-400">
                      {new Date(item.createdAt).toLocaleDateString()} • {item.vehicleId?.brand} {item.vehicleId?.model}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                    item.status === 'completed'
                      ? 'bg-emerald-100 text-emerald-800'
                      : item.status === 'cancelled'
                      ? 'bg-slate-100 text-slate-600'
                      : 'bg-amber-100 text-amber-800 animate-pulse'
                  }`}>
                    {item.status?.replace(/_/g, ' ')}
                  </span>
                  <span className="font-bold text-slate-900">
                    ₹{item.charges?.totalAmount || item.fare?.totalAmount || 570}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
