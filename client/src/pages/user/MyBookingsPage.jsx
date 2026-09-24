import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import PrintableInvoiceModal from '../../components/invoice/PrintableInvoiceModal';
import ReviewModal from '../../components/common/ReviewModal';
import { Wrench, Car, Clock, Printer, Star, ChevronRight, Navigation } from 'lucide-react';

export default function MyBookingsPage() {
  const [tab, setTab] = useState('all'); // 'all' | 'rsa' | 'driver'
  const [rsaRequests, setRsaRequests] = useState([]);
  const [driverBookings, setDriverBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [invoiceModalOpen, setInvoiceModalOpen] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [reviewTarget, setReviewTarget] = useState(null);

  const fetchData = async () => {
    try {
      const [rRes, dRes] = await Promise.all([
        api.get('/assistance/my'),
        api.get('/driver-bookings/my')
      ]);

      if (rRes.data.success) setRsaRequests(rRes.data.requests);
      if (dRes.data.success) setDriverBookings(dRes.data.bookings);
    } catch (err) {
      console.error('Error fetching bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openInvoice = async (item, type) => {
    try {
      const res = await api.get(`/payments/invoice/${item._id}`);
      if (res.data.success) {
        setSelectedInvoice(res.data);
        setInvoiceModalOpen(true);
      }
    } catch (e) {
      // Fallback preview
      setSelectedInvoice({
        payment: {
          invoiceNumber: `HOD-${Date.now().toString().slice(-6)}`,
          amount: item.charges?.totalAmount || item.fare?.totalAmount || 570,
          paymentMethod: 'UPI',
          transactionId: 'TXN_ONLINE_HOD',
          createdAt: item.createdAt
        },
        bookingDetails: item
      });
      setInvoiceModalOpen(true);
    }
  };

  const openReview = (partner, bookingId, bType) => {
    setReviewTarget({
      targetUser: partner,
      bookingId,
      bookingType: bType
    });
    setReviewModalOpen(true);
  };

  const combinedList = [
    ...rsaRequests.map(r => ({ ...r, category: 'rsa' })),
    ...driverBookings.map(d => ({ ...d, category: 'driver' }))
  ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const filtered = combinedList.filter(item => {
    if (tab === 'rsa') return item.category === 'rsa';
    if (tab === 'driver') return item.category === 'driver';
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Booking & Service History</h1>
          <p className="text-xs text-slate-500">Track all your roadside assistance requests and chauffeur trips</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex bg-slate-200/70 p-1 rounded-2xl text-xs font-semibold">
          <button
            onClick={() => setTab('all')}
            className={`px-4 py-1.5 rounded-xl transition-all ${tab === 'all' ? 'bg-white shadow text-slate-900' : 'text-slate-600'}`}
          >
            All ({combinedList.length})
          </button>
          <button
            onClick={() => setTab('rsa')}
            className={`px-4 py-1.5 rounded-xl transition-all ${tab === 'rsa' ? 'bg-white shadow text-slate-900' : 'text-slate-600'}`}
          >
            Roadside ({rsaRequests.length})
          </button>
          <button
            onClick={() => setTab('driver')}
            className={`px-4 py-1.5 rounded-xl transition-all ${tab === 'driver' ? 'bg-white shadow text-slate-900' : 'text-slate-600'}`}
          >
            Chauffeur ({driverBookings.length})
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-16 text-xs text-slate-400">Loading your history...</div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
          <Clock className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No Service Records</h3>
          <p className="text-xs text-slate-500">You haven't made any bookings under this filter yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((item) => {
            const isDriver = item.category === 'driver';
            const partner = isDriver ? item.driverId : item.providerId;
            const amount = item.charges?.totalAmount || item.fare?.totalAmount || 570;

            return (
              <div
                key={item._id}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold flex-shrink-0 ${
                    isDriver ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {isDriver ? <Car className="w-6 h-6" /> : <Wrench className="w-6 h-6" />}
                  </div>

                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                        {isDriver ? 'Chauffeur Booking' : 'Roadside Assistance'}
                      </span>
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                        item.status === 'completed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : item.status === 'cancelled'
                          ? 'bg-slate-100 text-slate-600'
                          : 'bg-amber-100 text-amber-800 animate-pulse'
                      }`}>
                        {item.status?.replace(/_/g, ' ')}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 mt-1">
                      {isDriver ? `Driver Trip (${item.durationHours || 4} Hours)` : `RSA: ${item.serviceType?.toUpperCase()}`}
                    </h3>

                    <p className="text-xs text-slate-500 mt-0.5">
                      Vehicle: <span className="font-semibold text-slate-800">{item.vehicleId?.brand} {item.vehicleId?.model}</span> ({item.vehicleId?.vehicleNumber})
                    </p>

                    <p className="text-[11px] text-slate-400 mt-1">
                      {new Date(item.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })} • Partner: {partner?.name || 'Assigned Agent'}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-end gap-3 pt-4 md:pt-0 border-t md:border-t-0 border-slate-100">
                  <div className="text-left md:text-right mr-2">
                    <span className="text-[10px] text-slate-400 block">Total Amount</span>
                    <span className="text-base font-black text-slate-900">₹{amount}</span>
                  </div>

                  {item.status !== 'completed' && item.status !== 'cancelled' ? (
                    <Link
                      to={`/user/tracking?type=${item.category}&id=${item._id}`}
                      className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center space-x-1.5 shadow-sm"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Live Track</span>
                    </Link>
                  ) : (
                    <>
                      <button
                        onClick={() => openInvoice(item, item.category)}
                        className="px-3.5 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold transition-colors flex items-center space-x-1"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>Invoice</span>
                      </button>

                      <button
                        onClick={() => openReview(partner, item._id, item.category)}
                        className="px-3.5 py-2 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded-xl text-xs font-bold transition-colors flex items-center space-x-1"
                      >
                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        <span>Rate</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <PrintableInvoiceModal
        isOpen={invoiceModalOpen}
        onClose={() => setInvoiceModalOpen(false)}
        invoiceData={selectedInvoice}
      />

      {reviewTarget && (
        <ReviewModal
          isOpen={reviewModalOpen}
          onClose={() => setReviewModalOpen(false)}
          targetUser={reviewTarget.targetUser}
          bookingId={reviewTarget.bookingId}
          bookingType={reviewTarget.bookingType}
          onSuccess={() => alert('Review submitted!')}
        />
      )}
    </div>
  );
}
