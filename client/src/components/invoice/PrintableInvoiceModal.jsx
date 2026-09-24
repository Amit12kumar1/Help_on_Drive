import React from 'react';
import { X, Printer, Download, ShieldCheck, Car } from 'lucide-react';

export default function PrintableInvoiceModal({ isOpen, onClose, invoiceData }) {
  if (!isOpen || !invoiceData) return null;

  const { payment, bookingDetails } = invoiceData;
  const user = bookingDetails?.userId || payment?.userId;
  const vehicle = bookingDetails?.vehicleId;
  const partner = bookingDetails?.driverId || bookingDetails?.providerId;
  const isDriver = payment?.bookingType === 'driver';

  const handlePrint = () => {
    window.print();
  };

  const invoiceNo = payment?.invoiceNumber || `HOD-${Date.now().toString().slice(-6)}`;
  const dateStr = new Date(payment?.createdAt || Date.now()).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  return (
    <div className="fixed inset-0 z-[1300] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden border border-slate-200 my-8">
        {/* Modal Controls (Hidden in Print) */}
        <div className="bg-slate-900 text-white px-6 py-3.5 flex items-center justify-between print:hidden">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            GST Tax Invoice Preview
          </span>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-brand-600 hover:bg-brand-700 text-white rounded-lg text-xs font-medium transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Area */}
        <div className="p-8 text-slate-800 bg-white" id="invoice-content">
          {/* Header */}
          <div className="flex justify-between items-start border-b border-slate-200 pb-6 mb-6">
            <div>
              <div className="flex items-center space-x-2 text-brand-600 font-extrabold text-xl tracking-tight mb-1">
                <Car className="w-6 h-6" />
                <span>HELP ON DRIVE</span>
              </div>
              <p className="text-xs text-slate-500">Help On Drive Technologies Private Limited</p>
              <p className="text-xs text-slate-500">Connaught Place, Central Delhi, 110001</p>
              <p className="text-[11px] text-slate-400 mt-1 font-mono">GSTIN: 07AABCH1234F1Z8 • CIN: U72900DL2024PTC11892</p>
            </div>

            <div className="text-right">
              <div className="inline-block px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
                PAID INVOICE
              </div>
              <p className="text-xs font-bold text-slate-800">Invoice: {invoiceNo}</p>
              <p className="text-xs text-slate-500">Date: {dateStr}</p>
              <p className="text-[11px] text-slate-400 font-mono">Txn: {payment?.transactionId || 'TXN_ONLINE_HOD'}</p>
            </div>
          </div>

          {/* Customer & Service Partner Info */}
          <div className="grid grid-cols-2 gap-6 mb-6 text-xs">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Billed To (Customer)</span>
              <p className="font-bold text-slate-900 text-sm">{user?.name || 'Customer'}</p>
              <p className="text-slate-600">{user?.phone}</p>
              <p className="text-slate-500">{user?.email}</p>
              {vehicle && (
                <div className="mt-2 pt-2 border-t border-slate-200 text-[11px]">
                  <span className="font-semibold">Vehicle: </span>
                  {vehicle.brand} {vehicle.model} ({vehicle.vehicleNumber})
                </div>
              )}
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                {isDriver ? 'Chauffeur / Driver' : 'Service Provider'}
              </span>
              <p className="font-bold text-slate-900 text-sm">{partner?.name || 'Verified Partner'}</p>
              <p className="text-slate-600">{partner?.phone}</p>
              <p className="text-slate-500 capitalize">
                Service: {isDriver ? 'Chauffeur Booking' : bookingDetails?.serviceType || 'Roadside Assistance'}
              </p>
              <div className="mt-2 pt-2 border-t border-slate-200 text-[11px] flex items-center space-x-1 text-emerald-700">
                <ShieldCheck className="w-3 h-3" />
                <span>Help On Drive Verified Partner</span>
              </div>
            </div>
          </div>

          {/* Breakdown Table */}
          <table className="w-full text-xs mb-6 border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-600 uppercase text-[10px] font-semibold tracking-wider">
                <th className="py-2.5 px-3 text-left">Description</th>
                <th className="py-2.5 px-3 text-center">Type / Duration</th>
                <th className="py-2.5 px-3 text-right">Amount (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="py-3 px-3">
                  <div className="font-semibold text-slate-800">
                    {isDriver
                      ? `On-Demand Chauffeur Service (${bookingDetails?.tripType?.replace(/_/g, ' ') || 'City Commute'})`
                      : `Emergency Roadside Assistance - ${bookingDetails?.serviceType?.toUpperCase() || 'SERVICE'}`}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {isDriver
                      ? `Pickup: ${bookingDetails?.pickupLocation?.address || 'Pickup Point'}`
                      : `Problem: ${bookingDetails?.problemDescription || 'On-spot mechanical assistance'}`}
                  </div>
                </td>
                <td className="py-3 px-3 text-center text-slate-600">
                  {isDriver
                    ? `${bookingDetails?.durationHours || 4} Hours`
                    : `${bookingDetails?.distanceKm || 3.2} km Dispatch`}
                </td>
                <td className="py-3 px-3 text-right font-medium text-slate-800">
                  ₹{payment?.breakdown?.baseFare || (payment?.amount ? Math.round(payment.amount * 0.7) : 480)}
                </td>
              </tr>

              {payment?.breakdown?.distanceFare > 0 && (
                <tr>
                  <td className="py-2.5 px-3 text-slate-600">Travel Distance Diagnostic Allowance</td>
                  <td className="py-2.5 px-3 text-center text-slate-500">Per km rate</td>
                  <td className="py-2.5 px-3 text-right font-medium text-slate-800">
                    ₹{payment?.breakdown?.distanceFare}
                  </td>
                </tr>
              )}

              <tr>
                <td className="py-2.5 px-3 text-slate-600">Platform Convenience & Safety Surcharge</td>
                <td className="py-2.5 px-3 text-center text-slate-500">Fixed</td>
                <td className="py-2.5 px-3 text-right font-medium text-slate-800">
                  ₹{payment?.breakdown?.platformFee || 50}
                </td>
              </tr>

              <tr>
                <td className="py-2.5 px-3 text-slate-600">Taxes (CGST 2.5% + SGST 2.5% / IGST 5%)</td>
                <td className="py-2.5 px-3 text-center text-slate-500">GST 5%</td>
                <td className="py-2.5 px-3 text-right font-medium text-slate-800">
                  ₹{payment?.breakdown?.gst || 40}
                </td>
              </tr>
            </tbody>
          </table>

          {/* Total Bar */}
          <div className="flex justify-end border-t-2 border-slate-900 pt-4 mb-6">
            <div className="w-56 space-y-1.5 text-xs">
              <div className="flex justify-between font-extrabold text-sm text-slate-900">
                <span>Grand Total Paid:</span>
                <span className="text-brand-600">₹{payment?.amount || 570}</span>
              </div>
              <div className="text-[10px] text-slate-500 text-right">
                Payment Mode: <span className="font-semibold uppercase">{payment?.paymentMethod || 'UPI'}</span>
              </div>
            </div>
          </div>

          {/* Footer Notes */}
          <div className="border-t border-slate-200 pt-4 text-[10px] text-slate-400 text-center">
            This is a computer-generated tax invoice and requires no physical signature under the Information Technology Act.
            <br />
            For any queries or dispute claims, contact support@helpondrive.com or call 24x7 Helpline +91 1800-HELP-DRIVE.
          </div>
        </div>
      </div>
    </div>
  );
}
