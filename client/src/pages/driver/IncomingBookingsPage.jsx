import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { Car, Clock, MapPin, CheckCircle, Navigation } from 'lucide-react';

export default function IncomingBookingsPage() {
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
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Trip Dispatch Requests</h1>
        <p className="text-xs text-slate-500">Manage incoming booking invitations from car owners</p>
      </div>

      {loading ? (
        <div className="text-center py-16 text-xs text-slate-400">Loading requests...</div>
      ) : bookings.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 text-xs text-slate-400">
          No trip requests currently. Stay online to receive jobs.
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((b) => (
            <div
              key={b._id}
              className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold flex-shrink-0">
                  <Car className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                      {b.bookingType?.replace(/_/g, ' ')}
                    </span>
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                      b.status === 'completed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : b.status === 'accepted'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-amber-100 text-amber-800 animate-pulse'
                    }`}>
                      {b.status?.replace(/_/g, ' ')}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mt-1">
                    Customer: {b.userId?.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Vehicle: {b.vehicleId?.brand} {b.vehicleId?.model} ({b.vehicleId?.vehicleNumber})
                  </p>
                  <p className="text-[11px] text-slate-600 mt-1 flex items-center space-x-1">
                    <MapPin className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                    <span>Pickup: {b.pickupLocation?.address}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4 justify-end pt-4 md:pt-0 border-t md:border-t-0 border-slate-100">
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block">Payout</span>
                  <span className="text-base font-black text-emerald-600">₹{b.fare?.driverFee || 480}</span>
                </div>

                {b.status === 'pending' && (
                  <button
                    onClick={() => handleAccept(b._id)}
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md transition-colors"
                  >
                    Accept Trip
                  </button>
                )}

                {['accepted', 'driver_arrived', 'trip_started'].includes(b.status) && (
                  <Link
                    to="/driver/active"
                    className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center space-x-1.5"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Open Navigation</span>
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
