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

  const quickTags = [
    '⚡ Rapid 15-Min Arrival',
    '🔧 Professional Fix',
    '🤝 Very Polite & Courteous',
    '💯 Transparent Fair Pricing',
    '🛡️ Safe Vehicle Care'
  ];

  const handleAddTag = (tag) => {
    if (!comment.includes(tag)) {
      setComment(prev => prev ? `${prev} • ${tag}` : tag);
    }
  };

  const isAssistance = bookingType === 'assistance' || bookingType === 'rsa';

  return (
    <div className="fixed inset-0 z-[1250] flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-5">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200 mb-2">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>Post-Service Customer Feedback</span>
          </div>

          <h3 className="text-lg font-black text-slate-900">
            {isAssistance ? 'Rate Vehicle Roadside Service' : 'Rate Your Chauffeur Trip'}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            How was your experience with <span className="font-bold text-slate-800">{targetUser?.name || 'Assigned Partner'}</span>?
          </p>

          {/* Star Selector */}
          <div className="flex justify-center space-x-2 my-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="p-1 focus:outline-none transition-transform hover:scale-125"
              >
                <Star
                  className={`w-8 h-8 transition-colors ${
                    (hoverRating || rating) >= star
                      ? 'fill-amber-400 text-amber-400 drop-shadow'
                      : 'text-slate-200'
                  }`}
                />
              </button>
            ))}
          </div>
          <span className="text-xs font-bold text-amber-600 block">
            {rating === 5 ? 'Exceptional Service! 🌟' : rating === 4 ? 'Very Good Experience 👍' : rating === 3 ? 'Average Service 🙂' : 'Needs Improvement ⚠️'}
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Detailed Aspects Ratings */}
          <div className="grid grid-cols-3 gap-2 text-center text-[11px] bg-slate-50 p-2.5 rounded-2xl border border-slate-200/80">
            <div>
              <span className="text-slate-500 block mb-1 font-semibold">Punctuality</span>
              <select
                value={punctuality}
                onChange={(e) => setPunctuality(Number(e.target.value))}
                className="bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs font-bold w-full"
              >
                {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n} ★</option>)}
              </select>
            </div>
            <div>
              <span className="text-slate-500 block mb-1 font-semibold">{isAssistance ? 'Fix Quality' : 'Driving Skill'}</span>
              <select
                value={serviceQuality}
                onChange={(e) => setServiceQuality(Number(e.target.value))}
                className="bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs font-bold w-full"
              >
                {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n} ★</option>)}
              </select>
            </div>
            <div>
              <span className="text-slate-500 block mb-1 font-semibold">Behavior</span>
              <select
                value={professionalism}
                onChange={(e) => setProfessionalism(Number(e.target.value))}
                className="bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs font-bold w-full"
              >
                {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n} ★</option>)}
              </select>
            </div>
          </div>

          {/* Quick Praise Pills */}
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
              1-Tap Quick Tags:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {quickTags.map((tag, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleAddTag(tag)}
                  className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-900 border border-slate-200 text-[11px] font-semibold transition-colors"
                >
                  + {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Comment Box */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Your Review & Comments
            </label>
            <textarea
              required
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell other vehicle owners how your roadside assistance or chauffeur trip went..."
              className="w-full text-xs p-3 border border-slate-200 rounded-xl focus:border-brand-500 outline-none transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 bg-gradient-to-r from-brand-600 to-amber-600 hover:from-brand-500 hover:to-amber-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-brand-500/25 transition-all hover:scale-[1.01]"
          >
            {submitting ? 'Submitting Feedback...' : '⭐ Submit Service Feedback'}
          </button>
        </form>
      </div>
    </div>
  );
}
