import React, { useState } from 'react';
import { Star, X, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import api from '../../services/api';

export default function ReviewModal({
  isOpen,
  onClose,
  targetUser = { _id: '', name: 'Partner', role: 'driver' },
  bookingId,
  bookingType = 'driver',
  onSuccess
}) {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [punctuality, setPunctuality] = useState(5);
  const [serviceQuality, setServiceQuality] = useState(5);
  const [professionalism, setProfessionalism] = useState(5);
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setSubmitting(true);
    try {
      const res = await api.post('/reviews', {
        targetId: targetUser._id,
        bookingId,
        bookingType,
        rating,
        comment: comment.trim(),
        aspects: {
          punctuality,
          serviceQuality,
          professionalism
        }
      });

      if (res.data.success) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
        if (onSuccess) onSuccess();
        onClose();
      }
    } catch (err) {
      console.error('Review submission error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[1250] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full text-slate-400 hover:text-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <h3 className="text-lg font-bold text-slate-900">Rate Your Experience</h3>
          <p className="text-xs text-slate-500 mt-1">
            How was your service with <span className="font-semibold text-slate-800">{targetUser.name}</span>?
          </p>

          {/* Star Selector */}
          <div className="flex justify-center space-x-2 my-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="p-1 focus:outline-none transition-transform hover:scale-110"
              >
                <Star
                  className={`w-8 h-8 ${
                    (hoverRating || rating) >= star
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-slate-300'
                  }`}
                />
              </button>
            ))}
          </div>
          <span className="text-xs font-semibold text-amber-600">
            {rating === 5 ? 'Exceptional! 🌟' : rating === 4 ? 'Very Good 👍' : rating === 3 ? 'Average 🙂' : 'Needs Improvement ⚠️'}
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Detailed Aspects */}
          <div className="grid grid-cols-3 gap-2 text-center text-[11px] bg-slate-50 p-3 rounded-xl border border-slate-100">
            <div>
              <span className="text-slate-500 block mb-1">Punctuality</span>
              <select
                value={punctuality}
                onChange={(e) => setPunctuality(Number(e.target.value))}
                className="bg-white border border-slate-200 rounded px-1.5 py-1 text-xs font-semibold"
              >
                {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n} ★</option>)}
              </select>
            </div>
            <div>
              <span className="text-slate-500 block mb-1">Quality</span>
              <select
                value={serviceQuality}
                onChange={(e) => setServiceQuality(Number(e.target.value))}
                className="bg-white border border-slate-200 rounded px-1.5 py-1 text-xs font-semibold"
              >
                {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n} ★</option>)}
              </select>
            </div>
            <div>
              <span className="text-slate-500 block mb-1">Behavior</span>
              <select
                value={professionalism}
                onChange={(e) => setProfessionalism(Number(e.target.value))}
                className="bg-white border border-slate-200 rounded px-1.5 py-1 text-xs font-semibold"
              >
                {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n} ★</option>)}
              </select>
            </div>
          </div>

          {/* Comment Box */}
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Write a Review
            </label>
            <textarea
              required
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell others what you appreciated about this service..."
              className="w-full text-xs p-3 border border-slate-200 rounded-xl focus:border-brand-500 outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold shadow-md transition-colors"
          >
            {submitting ? 'Submitting...' : 'Post Review'}
          </button>
        </form>
      </div>
    </div>
  );
}
