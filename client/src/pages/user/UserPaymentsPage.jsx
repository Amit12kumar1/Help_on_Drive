import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import PrintableInvoiceModal from '../../components/invoice/PrintableInvoiceModal';
import { CreditCard, Printer, CheckCircle2, FileText, ArrowDownRight } from 'lucide-react';

export default function UserPaymentsPage() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    api.get('/payments/my')
      .then((res) => {
        if (res.data.success) setPayments(res.data.payments);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const openInvoice = async (payment) => {
    try {
      const res = await api.get(`/payments/invoice/${payment.bookingId}`);
      if (res.data.success) {
        setSelectedInvoice(res.data);
        setModalOpen(true);
      }
    } catch {
      setSelectedInvoice({ payment });
      setModalOpen(true);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Payments & Tax Invoices</h1>
        <p className="text-xs text-slate-500">Download and print official GST invoices for all completed trips</p>
      </div>

      {loading ? (
        <div className="text-center py-16 text-xs text-slate-400">Loading transactions...</div>
      ) : payments.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
          <CreditCard className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No Transaction Records Found</h3>
          <p className="text-xs text-slate-500">Invoices will appear here once you complete and settle a booking.</p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-5">Invoice No.</th>
                <th className="py-3 px-4">Service Category</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Method</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Amount</th>
                <th className="py-3 px-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {payments.map((p) => (
                <tr key={p._id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 px-5 font-mono font-bold text-slate-900">{p.invoiceNumber}</td>
                  <td className="py-3.5 px-4 capitalize font-medium text-slate-700">
                    {p.bookingType === 'driver' ? 'Chauffeur Booking' : 'Roadside Assistance'}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">
                    {new Date(p.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3.5 px-4 uppercase text-slate-600 font-medium">{p.paymentMethod}</td>
                  <td className="py-3.5 px-4">
                    <span className="flex items-center space-x-1 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full w-max">
                      <CheckCircle2 className="w-3 h-3" />
                      <span className="capitalize">{p.status}</span>
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right font-bold text-slate-900">₹{p.amount}</td>
                  <td className="py-3.5 px-5 text-right">
                    <button
                      onClick={() => openInvoice(p)}
                      className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center space-x-1 ml-auto shadow-sm transition-colors"
                    >
                      <Printer className="w-3 h-3" />
                      <span>Print</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <PrintableInvoiceModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        invoiceData={selectedInvoice}
      />
    </div>
  );
}
