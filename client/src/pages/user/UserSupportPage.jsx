import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { LifeBuoy, Send, MessageSquare, AlertCircle, CheckCircle } from 'lucide-react';

export default function UserSupportPage() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const [category, setCategory] = useState('Booking Issue');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchComplaints = async () => {
    try {
      const res = await api.get('/complaints/my');
      if (res.data.success) setComplaints(res.data.complaints);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await api.post('/complaints', { category, subject, description });
      if (res.data.success) {
        setSubject('');
        setDescription('');
        fetchComplaints();
      }
    } catch (e) {
      alert(e.response?.data?.message || 'Error creating support ticket');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Support & Complaints</h1>
        <p className="text-xs text-slate-500">Raise issues regarding billing, driver behavior, or emergency response</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Ticket Form */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900">Create Support Ticket</h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Issue Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-brand-500"
              >
                <option value="Booking Issue">Booking Issue</option>
                <option value="Payment Issue">Payment Issue</option>
                <option value="Driver Behaviour">Driver Behaviour</option>
                <option value="Service Provider Issue">Service Provider Issue</option>
                <option value="Emergency / Safety Issue">Emergency / Safety Issue</option>
                <option value="Other">Other Query</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Subject</label>
              <input
                required
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Brief summary of the issue..."
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Description</label>
              <textarea
                required
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Explain in detail what occurred..."
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-brand-500"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold shadow-md transition-colors flex items-center justify-center space-x-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{submitting ? 'Submitting...' : 'Submit Ticket'}</span>
            </button>
          </form>
        </div>

        {/* Existing Tickets */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-base font-bold text-slate-900">Your Tickets ({complaints.length})</h3>

          {loading ? (
            <div className="text-center py-10 text-xs text-slate-400">Loading tickets...</div>
          ) : complaints.length === 0 ? (
            <div className="bg-white rounded-3xl p-10 text-center border border-slate-200 text-xs text-slate-400">
              No tickets raised. All systems running smooth!
            </div>
          ) : (
            <div className="space-y-3">
              {complaints.map((c) => (
                <div key={c._id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                      {c.category}
                    </span>
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                      c.status === 'resolved'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {c.status}
                    </span>
                  </div>

                  <h4 className="font-bold text-sm text-slate-800">{c.subject}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{c.description}</p>

                  {c.adminResponse && (
                    <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 mt-2">
                      <strong className="block text-[11px] text-emerald-700 mb-0.5">Admin Resolution:</strong>
                      {c.adminResponse}
                    </div>
                  )}

                  <div className="text-[10px] text-slate-400 pt-1">
                    Filed on {new Date(c.createdAt).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
