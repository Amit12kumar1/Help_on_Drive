import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { useSocket } from '../../context/SocketContext';
import LiveTrackingMap from '../../components/map/LiveTrackingMap';
import LiveChatModal from '../../components/chat/LiveChatModal';
import SimulatedCallModal from '../../components/common/SimulatedCallModal';
import MockPaymentModal from '../../components/common/MockPaymentModal';
import PrintableInvoiceModal from '../../components/invoice/PrintableInvoiceModal';
import ReviewModal from '../../components/common/ReviewModal';
import {
  Car,
  Wrench,
  Navigation,
  Phone,
  MessageSquare,
  CreditCard,
  Star,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Printer,
  Siren
} from 'lucide-react';

export default function LiveTrackingView() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const bookingType = searchParams.get('type') || 'assistance';
  const bookingId = searchParams.get('id');

  const { socket, joinBookingRoom } = useSocket();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  // Modals 
  const [chatOpen, setChatOpen] = useState(false);
  const [callOpen, setCallOpen] = useState(false);
  const [payModalOpen, setPayModalOpen] = useState(false);
  const [invoiceModalOpen, setInvoiceModalOpen] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [invoiceData, setInvoiceData] = useState(null);

  const fetchDetails = async () => {
    try {
      if (!bookingId) {
        // Fallback: fetch most recent active request
        if (bookingType === 'driver') {
          const res = await api.get('/driver-bookings/my');
          if (res.data.success && res.data.bookings.length > 0) {
            setBooking(res.data.bookings[0]);
          }
        } else {
          const res = await api.get('/assistance/my');
          if (res.data.success && res.data.requests.length > 0) {
            setBooking(res.data.requests[0]);
          }
        }
      } else {
        const endpoint = bookingType === 'driver' ? `/driver-bookings/${bookingId}` : `/assistance/${bookingId}`;
        const res = await api.get(endpoint);
        if (res.data.success) {
          setBooking(res.data.booking || res.data.request);
        }
      }
    } catch (err) {
      console.error('Error fetching live tracking booking:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [bookingId, bookingType]);

  useEffect(() => {
    if (booking?._id) {
      joinBookingRoom(booking._id);
    }
  }, [booking]);

  useEffect(() => {
    if (!socket) return;

    const handleStatusChanged = (data) => {
      if (data.bookingId === booking?._id) {
        setBooking((prev) => ({ ...prev, status: data.status }));
      }
    };

    socket.on('status_changed', handleStatusChanged);
    return () => socket.off('status_changed', handleStatusChanged);
  }, [socket, booking]);

  const handleOpenInvoice = async () => {
    try {
      const res = await api.get(`/payments/invoice/${booking?._id}`);
      if (res.data.success) {
        setInvoiceData(res.data);
        setInvoiceModalOpen(true);
      }
    } catch (err) {
      // If invoice not created yet, show standard invoice payload
      setInvoiceData({
        payment: {
          invoiceNumber: `HOD-${Date.now().toString().slice(-6)}`,
          amount: booking?.charges?.totalAmount || booking?.fare?.totalAmount || 570,
          paymentMethod: 'UPI',
          transactionId: 'TXN_ONLINE_HOD',
          createdAt: new Date()
        },
        bookingDetails: booking
      });
      setInvoiceModalOpen(true);
    }
  };

  if (loading) {
    return <div className="text-center py-20 text-xs text-slate-400">Loading live tracking telemetry...</div>;
  }

  if (!booking) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-lg mx-auto space-y-4">
        <Navigation className="w-12 h-12 text-slate-400 mx-auto" />
        <h3 className="text-lg font-bold text-slate-800">No Active Dispatch Found</h3>
        <p className="text-xs text-slate-500">You do not have any pending or in-transit service right now.</p>
        <button
          onClick={() => navigate('/user')}
          className="px-5 py-2.5 bg-brand-600 text-white rounded-xl text-xs font-bold shadow-md"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  const isDriver = bookingType === 'driver';
  const partnerUser = isDriver ? booking.driverId : booking.providerId;
  const userLoc = isDriver ? booking.pickupLocation : booking.location;
  const partnerLoc = {
    lat: 28.5670,
    lng: 77.2430,
    name: partnerUser?.name || 'Assigned Specialist',
    role: isDriver ? 'driver' : 'provider'
  };

  const steps = isDriver
    ? ['pending', 'accepted', 'driver_arrived', 'trip_started', 'completed']
    : ['pending', 'accepted', 'on_the_way', 'arrived', 'completed'];

  const currentStepIdx = steps.indexOf(booking.status);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Live Active Dispatch</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-0.5">
            {isDriver ? `Chauffeur Trip Tracking` : `Roadside Assistance (${booking.serviceType})`}
          </h1>
          <p className="text-xs text-slate-500 font-mono">Incident Reference: {booking._id}</p>
        </div>

        <div className="flex items-center space-x-2">
          {booking.status === 'completed' && (
            <>
              <button
                onClick={handleOpenInvoice}
                className="flex items-center space-x-1.5 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors shadow-sm"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>GST Tax Invoice</span>
              </button>
              <button
                onClick={() => setReviewModalOpen(true)}
                className="flex items-center space-x-1.5 px-3.5 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold transition-colors shadow-sm"
              >
                <Star className="w-3.5 h-3.5" />
                <span>Rate Partner</span>
              </button>
            </>
          )}

          {booking.paymentStatus !== 'paid' && booking.status === 'completed' && (
            <button
              onClick={() => setPayModalOpen(true)}
              className="flex items-center space-x-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors shadow-md shadow-emerald-600/20 animate-pulse"
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Settle Payment (₹{booking.charges?.totalAmount || booking.fare?.totalAmount})</span>
            </button>
          )}
        </div>
      </div>

      {/* Post-Service Completion & Feedback Prompt Banner */}
      {booking.status === 'completed' && (
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-amber-950 rounded-3xl p-6 text-white border border-emerald-500/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4 animate-fadeIn">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-400/40 text-amber-300 flex items-center justify-center font-bold text-2xl flex-shrink-0">
              ⭐
            </div>
            <div>
              <div className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold mb-1 border border-emerald-500/30">
                <span>✓ Service Completed Successfully</span>
              </div>
              <h3 className="text-lg font-black text-white">How was your vehicle service experience?</h3>
              <p className="text-xs text-slate-300">
                Please leave your feedback & rating for <span className="font-bold text-amber-400">{partnerUser?.name || 'the service partner'}</span>.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 w-full md:w-auto">
            <button
              onClick={() => setReviewModalOpen(true)}
              className="flex-1 md:flex-initial px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-black text-xs shadow-lg shadow-amber-500/30 flex items-center justify-center space-x-2 transition-all hover:scale-105"
            >
              <Star className="w-4 h-4 fill-white" />
              <span>Leave Feedback & Rating</span>
            </button>
            <button
              onClick={handleOpenInvoice}
              className="px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 flex items-center justify-center space-x-1.5 transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Tax Invoice</span>
            </button>
          </div>
        </div>
      )}

      {/* Status Progress Stepper */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
          <span>Service Progression</span>
          <span className="text-brand-600 capitalize">{booking.status?.replace(/_/g, ' ')}</span>
        </div>

        <div className="relative flex items-center justify-between mt-4">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-100 -translate-y-1/2 z-0" />
          {steps.map((step, idx) => {
            const isPassed = currentStepIdx >= idx;
            const isCurrent = currentStepIdx === idx;
            return (
              <div key={step} className="relative z-10 flex flex-col items-center">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    isPassed
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                      : 'bg-slate-200 text-slate-500'
                  } ${isCurrent ? 'ring-4 ring-brand-500/20 scale-110' : ''}`}
                >
                  {isPassed ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                </div>
                <span className={`text-[10px] font-semibold mt-2 capitalize whitespace-nowrap hidden sm:block ${
                  isPassed ? 'text-slate-900' : 'text-slate-400'
                }`}>
                  {step.replace(/_/g, ' ')}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Map View */}
      <div className="space-y-4">
        <LiveTrackingMap
          userLocation={userLoc || { lat: 28.5494, lng: 77.2001, address: 'Pickup Location' }}
          partnerLocation={partnerLoc}
          bookingStatus={booking.status}
        />
      </div>

      {/* Partner Info & Action Hub */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Partner Card */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div className="flex items-center space-x-3.5">
            <img
              src={partnerUser?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100'}
              alt={partnerUser?.name}
              className="w-12 h-12 rounded-2xl object-cover border-2 border-brand-500"
            />
            <div>
              <div className="flex items-center space-x-1.5">
                <h4 className="font-bold text-xs text-slate-900">{partnerUser?.name || 'Certified Specialist'}</h4>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              </div>
              <p className="text-[11px] text-slate-500 font-mono">{partnerUser?.phone || '+91 9810101011'}</p>
              <div className="text-[10px] text-amber-500 font-bold mt-0.5">★ 4.9 Verified Professional</div>
            </div>
          </div>
        </div>

        {/* Vehicle Being Serviced */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-700 font-bold">
            <Car className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Vehicle</span>
            <h4 className="font-bold text-xs text-slate-900">{booking.vehicleId?.brand} {booking.vehicleId?.model}</h4>
            <span className="font-mono text-xs text-brand-600 font-bold">{booking.vehicleId?.vehicleNumber}</span>
          </div>
        </div>

        {/* Quick Communication Actions */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between gap-3">
          <button
            onClick={() => setCallOpen(true)}
            className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-bold flex items-center justify-center space-x-2 shadow-md shadow-emerald-600/20 transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span>Call Partner</span>
          </button>

          <button
            onClick={() => setChatOpen(true)}
            className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-xs font-bold flex items-center justify-center space-x-2 shadow-md shadow-blue-600/20 transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Live Chat</span>
          </button>
        </div>
      </div>

      {/* Modals */}
      <LiveChatModal
        isOpen={chatOpen}
        onClose={() => setChatOpen(false)}
        bookingId={booking._id}
        partnerUser={partnerUser}
        onTriggerCall={() => {
          setChatOpen(false);
          setCallOpen(true);
        }}
      />

      <SimulatedCallModal
        isOpen={callOpen}
        onClose={() => setCallOpen(false)}
        partner={partnerUser}
      />

      <MockPaymentModal
        isOpen={payModalOpen}
        onClose={() => setPayModalOpen(false)}
        bookingId={booking._id}
        bookingType={bookingType}
        amount={booking.charges?.totalAmount || booking.fare?.totalAmount || 570}
        onSuccess={() => {
          setBooking((prev) => ({ ...prev, paymentStatus: 'paid' }));
          handleOpenInvoice();
        }}
      />

      <PrintableInvoiceModal
        isOpen={invoiceModalOpen}
        onClose={() => setInvoiceModalOpen(false)}
        invoiceData={invoiceData}
      />

      <ReviewModal
        isOpen={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        targetUser={partnerUser}
        bookingId={booking._id}
        bookingType={bookingType}
        onSuccess={() => alert('Review successfully published! Thank you.')}
      />
    </div>
  );
}
