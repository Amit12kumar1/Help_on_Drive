import React, { useState } from 'react';
import { CreditCard, QrCode, Building2, Banknote, ShieldCheck, X, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import api from '../../services/api';

export default function MockPaymentModal({
  isOpen,
  onClose,
  bookingId,
  bookingType = 'driver',
  amount = 570,
  onSuccess
}) {
  const [method, setMethod] = useState('upi'); // 'upi' | 'card' | 'netbanking' | 'cash'
  const [processing, setProcessing] = useState(false);
  const [successData, setSuccessData] = useState(null);

  if (!isOpen) return null;

  const handlePay = async () => {
    setProcessing(true);
    try {
      // Simulate payment network handshake
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const res = await api.post('/payments/process', {
        bookingId,
        bookingType,
        paymentMethod: method,
        amount,
        breakdown: {
          baseFare: Math.round(amount * 0.75),
          platformFee: 50,
          gst: Math.round(amount * 0.05)
        }
      });

      if (res.data.success) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        setSuccessData(res.data.payment);
        if (onSuccess) onSuccess(res.data.payment);
      }
    } catch (err) {
      console.error('Payment error:', err);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[1250] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200 relative">
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Secure Checkout</span>
            <h3 className="text-lg font-bold">₹{amount}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!successData ? (
          <div className="p-6">
            {/* Payment Methods */}
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Select Payment Mode
            </label>
            <div className="grid grid-cols-2 gap-2.5 mb-6">
              <button
                type="button"
                onClick={() => setMethod('upi')}
                className={`flex items-center space-x-2.5 p-3 rounded-xl border text-xs font-semibold transition-all ${
                  method === 'upi'
                    ? 'border-brand-500 bg-brand-50 text-brand-700 shadow-sm'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <QrCode className="w-4 h-4 text-brand-600" />
                <span>UPI / QR</span>
              </button>

              <button
                type="button"
                onClick={() => setMethod('card')}
                className={`flex items-center space-x-2.5 p-3 rounded-xl border text-xs font-semibold transition-all ${
                  method === 'card'
                    ? 'border-brand-500 bg-brand-50 text-brand-700 shadow-sm'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <CreditCard className="w-4 h-4 text-brand-600" />
                <span>Cards</span>
              </button>

              <button
                type="button"
                onClick={() => setMethod('netbanking')}
                className={`flex items-center space-x-2.5 p-3 rounded-xl border text-xs font-semibold transition-all ${
                  method === 'netbanking'
                    ? 'border-brand-500 bg-brand-50 text-brand-700 shadow-sm'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Building2 className="w-4 h-4 text-brand-600" />
                <span>Net Banking</span>
              </button>

              <button
                type="button"
                onClick={() => setMethod('cash')}
                className={`flex items-center space-x-2.5 p-3 rounded-xl border text-xs font-semibold transition-all ${
                  method === 'cash'
                    ? 'border-brand-500 bg-brand-50 text-brand-700 shadow-sm'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Banknote className="w-4 h-4 text-brand-600" />
                <span>Cash on Spot</span>
              </button>
            </div>

            {/* Method Details Box */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6 text-center">
              {method === 'upi' && (
                <div>
                  <div className="w-32 h-32 bg-white mx-auto border-2 border-slate-300 rounded-xl p-2 flex items-center justify-center shadow-inner mb-2">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=upi://pay?pa=helpondrive@icici%26am=${amount}%26pn=HelpOnDrive`}
                      alt="UPI QR"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <p className="text-[11px] text-slate-500">Scan via GPay, PhonePe, Paytm, or BHIM</p>
                  <p className="text-[10px] text-brand-600 font-mono font-semibold mt-0.5">UPI ID: helpondrive@icici</p>
                </div>
              )}

              {method === 'card' && (
                <div className="space-y-2 text-left text-xs">
                  <input
                    type="text"
                    defaultValue="4532 •••• •••• 8921"
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-mono"
                    placeholder="Card Number"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      defaultValue="08/29"
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-mono"
                      placeholder="MM/YY"
                    />
                    <input
                      type="password"
                      defaultValue="•••"
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-mono"
                      placeholder="CVV"
                    />
                  </div>
                </div>
              )}

              {method === 'netbanking' && (
                <div className="text-xs text-slate-600 space-y-1 text-left">
                  <p className="font-semibold text-slate-800">Popular Banks:</p>
                  <div className="grid grid-cols-3 gap-1.5 pt-1 text-[11px]">
                    <span className="p-1.5 bg-white border border-slate-200 rounded text-center font-medium">HDFC</span>
                    <span className="p-1.5 bg-white border border-slate-200 rounded text-center font-medium">ICICI</span>
                    <span className="p-1.5 bg-white border border-slate-200 rounded text-center font-medium">SBI</span>
                  </div>
                </div>
              )}

              {method === 'cash' && (
                <div className="text-xs text-slate-600 py-2">
                  <p className="font-semibold text-slate-800 mb-1">Pay Directly to Partner</p>
                  <p className="text-[11px] text-slate-500">
                    Hand over exact amount ₹{amount} to your assigned driver/technician after job verification.
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500 mb-4 px-1">
              <span className="flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>256-bit Encrypted Mock Gateway</span>
              </span>
              <span className="font-semibold text-slate-700">₹{amount}</span>
            </div>

            <button
              onClick={handlePay}
              disabled={processing}
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center space-x-2"
            >
              {processing ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Processing Payment...</span>
                </>
              ) : (
                <span>Confirm & Pay ₹{amount}</span>
              )}
            </button>
          </div>
        ) : (
          <div className="p-8 text-center animate-fadeIn">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h4 className="text-lg font-bold text-slate-900 mb-1">Payment Successful!</h4>
            <p className="text-xs text-slate-500 mb-2">
              Transaction ID: <span className="font-mono text-slate-700 font-semibold">{successData.transactionId}</span>
            </p>
            <p className="text-xs text-slate-500 mb-6">
              GST Invoice <span className="font-mono text-brand-600 font-semibold">{successData.invoiceNumber}</span> generated.
            </p>
            <button
              onClick={onClose}
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-colors"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
