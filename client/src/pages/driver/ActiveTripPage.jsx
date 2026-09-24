import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useSocket } from '../../context/SocketContext';
import LiveTrackingMap from '../../components/map/LiveTrackingMap';
import LiveChatModal from '../../components/chat/LiveChatModal';
import SimulatedCallModal from '../../components/common/SimulatedCallModal';
import {
  Navigation,
  Car,
  Phone,
  MessageSquare,
  CheckCircle,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export default function ActiveTripPage() {
  const { socket, joinBookingRoom, emitStatusChange } = useSocket();
  const [activeBooking, setActiveBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  const [chatOpen, setChatOpen] = useState(false);
  const [callOpen, setCallOpen] = useState(false);

  const fetchActive = async () => {
    try {
      const res = await api.get('/driver-bookings/driver');
      if (res.data.success) {
        const found = res.data.bookings.find(b => ['accepted', 'driver_arrived', 'trip_started'].includes(b.status));
        setActiveBooking(found || null);
        if (found) joinBookingRoom(found._id);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActive();
  }, []);

  const handleUpdateStatus = async (newStatus) => {
    if (!activeBooking) return;
    try {
      const res = await api.put(`/driver-bookings/${activeBooking._id}/status`, {
        status: newStatus
      });

      if (res.data.success) {
        setActiveBooking(res.data.booking);
        emitStatusChange(activeBooking._id, newStatus, `Driver updated status to ${newStatus}`);
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) {
    return <div className="text-center py-16 text-xs text-slate-400">Loading active trip terminal...</div>;
  }

  if (!activeBooking) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-md mx-auto space-y-4">
        <Navigation className="w-12 h-12 text-slate-400 mx-auto" />
        <h3 className="text-base font-bold text-slate-800">No Active Trip Dispatched</h3>
        <p className="text-xs text-slate-500">
          Accept an incoming trip request from your dashboard to begin live navigation and status tracking.
        </p>
      </div>
    );
  }

  const customer = activeBooking.userId;
  const vehicle = activeBooking.vehicleId;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-ping" />
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Turn-by-Turn Navigation Hub</span>
        </div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-0.5">
          Active Trip: {customer?.name} ({activeBooking.bookingType?.replace(/_/g, ' ')})
        </h1>
        <p className="text-xs text-slate-500 font-mono">Trip ID: {activeBooking._id}</p>
      </div>

      {/* Driver Milestone Action Bar */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Trip State</span>
          <span className="text-sm font-black text-blue-700 capitalize">
            {activeBooking.status?.replace(/_/g, ' ')}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          {activeBooking.status === 'accepted' && (
            <button
              onClick={() => handleUpdateStatus('driver_arrived')}
              className="px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold shadow-md transition-colors"
            >
              📍 Arrived at Customer Location
            </button>
          )}

          {activeBooking.status === 'driver_arrived' && (
            <button
              onClick={() => handleUpdateStatus('trip_started')}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md transition-colors"
            >
              🚗 Start Trip Driving
            </button>
          )}

          {activeBooking.status === 'trip_started' && (
            <button
              onClick={() => handleUpdateStatus('completed')}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md transition-colors"
            >
              🏁 Complete & End Trip
            </button>
          )}

          {activeBooking.status === 'completed' && (
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 flex items-center space-x-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>Trip Finished</span>
            </span>
          )}
        </div>
      </div>

      {/* Map */}
      <LiveTrackingMap
        userLocation={activeBooking.pickupLocation}
        partnerLocation={{
          lat: 28.5670,
          lng: 77.2430,
          name: 'You (Driver in Transit)',
          role: 'driver'
        }}
        bookingStatus={activeBooking.status}
      />

      {/* Trip & Customer Metadata */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex items-center space-x-3.5">
          <img
            src={customer?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'}
            alt={customer?.name}
            className="w-12 h-12 rounded-2xl object-cover border-2 border-blue-500"
          />
          <div>
            <h4 className="font-bold text-xs text-slate-900">{customer?.name}</h4>
            <span className="text-[11px] text-slate-500 font-mono block">{customer?.phone}</span>
            <span className="text-[10px] text-emerald-600 font-semibold">Verified Car Owner</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-700 font-bold">
            <Car className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Vehicle Driven</span>
            <h4 className="font-bold text-xs text-slate-900">{vehicle?.brand} {vehicle?.model}</h4>
            <span className="font-mono text-xs font-bold text-blue-600">{vehicle?.vehicleNumber}</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between gap-3">
          <button
            onClick={() => setCallOpen(true)}
            className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-bold flex items-center justify-center space-x-1.5 shadow-sm transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call</span>
          </button>
          <button
            onClick={() => setChatOpen(true)}
            className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-xs font-bold flex items-center justify-center space-x-1.5 shadow-sm transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Chat</span>
          </button>
        </div>
      </div>

      <LiveChatModal
        isOpen={chatOpen}
        onClose={() => setChatOpen(false)}
        bookingId={activeBooking._id}
        partnerUser={customer}
      />

      <SimulatedCallModal
        isOpen={callOpen}
        onClose={() => setCallOpen(false)}
        partner={customer}
      />
    </div>
  );
}
