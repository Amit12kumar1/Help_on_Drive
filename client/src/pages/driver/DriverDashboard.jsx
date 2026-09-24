import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import {
  Car,
  Clock,
  DollarSign,
  Star,
  CheckCircle,
  Navigation,
  ArrowRight,
  ShieldCheck,
  Phone
} from 'lucide-react';

export default function DriverDashboard() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const res = await api.get('/driver-bookings/driver');
      if (res.data.success) setBookings(res.data.bookings);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const activeTrip = bookings.find(b => ['accepted', 'driver_arrived', 'trip_started'].includes(b.status));
  const pendingRequests = bookings.filter(b => b.status === 'pending');
  const completedTrips = bookings.filter(b => b.status === 'completed');

  const totalEarnings = user?.profile?.earnings || (completedTrips.length * 480) || 28400;

  const handleAccept = async (id) => {
    try {
      const res = await api.put(`/driver-bookings/${id}/status`, { status: 'accepted' });
      if (res.data.success) fetchBookings();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6">
      {/* Active Trip Announcement if any */}
      {activeTrip && (
        <div className="bg-gradient-to-r from-blue-900 to-slate-900 text-white p-6 rounded-3xl shadow-xl border border-blue-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-2xl bg-blue-500 text-white flex items-center justify-center font-bold">
              <Navigation className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-500/30 text-blue-300 px-2 py-0.5 rounded">
                Active Chauffeur Mission
              </span>
              <h3 className="text-base font-bold text-white mt-0.5">
                Driving for {activeTrip.userId?.name} ({activeTrip.vehicleId?.brand} {activeTrip.vehicleId?.model})
              </h3>
              <p className="text-xs text-slate-300">
                Pickup: {activeTrip.pickupLocation?.address}
              </p>
            </div>
          </div>

          <Link
            to="/driver/active"
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-lg transition-colors flex items-center space-x-1.5"
          >
            <span>Open Navigation Console</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}

      {/* Driver Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-2">
            <span>Total Earnings</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">₹{totalEarnings}</div>
          <span className="text-[10px] text-emerald-600 font-semibold mt-1 block">Direct Bank Disbursal</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-2">
            <span>Completed Trips</span>
            <Car className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">{user?.profile?.totalTrips || 142}</div>
          <span className="text-[10px] text-slate-400 mt-1 block">Safe Driving Record</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-2">
            <span>Driver Rating</span>
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
          </div>
          <div className="text-2xl font-black text-slate-900">{user?.profile?.rating || 4.9} ★</div>
          <span className="text-[10px] text-amber-600 font-semibold mt-1 block">Top 5% Rated Chauffeur</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-2">
            <span>Hourly Tariff</span>
            <Clock className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">₹{user?.profile?.hourlyRate || 120}/hr</div>
          <span className="text-[10px] text-slate-400 mt-1 block">or ₹{user?.profile?.dailyRate || 900}/day</span>
        </div>
      </div>

      {/* Pending Incoming Requests */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
            <h3 className="text-base font-bold text-slate-900">Incoming Booking Inquiries ({pendingRequests.length})</h3>
          </div>
          <Link to="/driver/requests" className="text-xs font-bold text-blue-600 hover:underline">
            View All →
          </Link>
        </div>

        {pendingRequests.length === 0 ? (
          <div className="text-center py-8 text-xs text-slate-400">
            No pending requests at this moment. Stay online to receive customer booking dispatches.
          </div>
        ) : (
          <div className="space-y-3">
            {pendingRequests.map((req) => (
              <div
                key={req._id}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start space-x-3.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold flex-shrink-0">
                    <Car className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">
                      {req.durationHours || 4} Hours Chauffeur for {req.userId?.name}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Car: {req.vehicleId?.brand} {req.vehicleId?.model} ({req.vehicleId?.vehicleNumber})
                    </p>
                    <p className="text-[11px] text-slate-600 font-medium mt-1">
                      Pickup: {req.pickupLocation?.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="text-right mr-2">
                    <span className="text-[10px] text-slate-400 block">Payout</span>
                    <span className="text-sm font-bold text-emerald-600">₹{req.fare?.driverFee || 480}</span>
                  </div>

                  <button
                    onClick={() => handleAccept(req._id)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors shadow-sm"
                  >
                    Accept Trip
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Completed Trip History */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900">Recent Completed Trips ({completedTrips.length})</h3>

        {completedTrips.length === 0 ? (
          <div className="text-center py-8 text-xs text-slate-400">No completed trips logged yet.</div>
        ) : (
          <div className="divide-y divide-slate-100">
            {completedTrips.slice(0, 5).map((trip) => (
              <div key={trip._id} className="py-3 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-bold text-slate-800">
                    {trip.userId?.name} • {trip.durationHours || 4}h City Run
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    {trip.vehicleId?.brand} {trip.vehicleId?.model} • {new Date(trip.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full uppercase">
                    Completed
                  </span>
                  <span className="font-bold text-slate-900">₹{trip.fare?.driverFee || 480}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
