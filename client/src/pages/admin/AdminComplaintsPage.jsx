import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { MessageSquareWarning, Check, Send } from 'lucide-react';

export default function AdminComplaintsPage() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [replyText, setReplyText] = useState({});

  const fetchComplaints = async () => {
    try {
      const res = await api.get('/complaints/all');
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

  const handleResolve = async (id) => {
    const text = replyText[id] || 'Issue resolved per Help On Drive customer guarantee.';
    try {
      const res = await api.put(`/complaints/${id}`, {
        status: 'resolved',
        adminResponse: text
      });
      if (res.data.success) fetchComplaints();
    } catch (e) {
      alert('Error updating complaint');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Support Tickets & Dispute Claims</h1>
        <p className="text-xs text-slate-500">Review feedback and complaints submitted by vehicle owners</p>
      </div>

      {loading ? (
        <div className="text-center py-16 text-xs text-slate-400">Loading complaints...</div>
      ) : complaints.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 text-xs text-slate-400">
          No open complaints. Customer satisfaction at 100%.
        </div>
      ) : (
        <div className="space-y-4">
          {complaints.map((c) => (
            <div key={c._id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                  {c.category}
                </span>
                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                  c.status === 'resolved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {c.status}
                </span>
              </div>

              <h4 className="font-bold text-sm text-slate-900">{c.subject}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{c.description}</p>
              <div className="text-[11px] text-slate-400">
                Filed by: {c.userId?.name} ({c.userId?.phone}, {c.userId?.email}) • {new Date(c.createdAt).toLocaleString()}
              </div>

              {c.status !== 'resolved' ? (
                <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-2">
                  <input
                    type="text"
                    placeholder="Enter resolution comment for customer..."
                    value={replyText[c._id] || ''}
                    onChange={(e) => setReplyText({ ...replyText, [c._id]: e.target.value })}
                    className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-purple-500"
                  />
                  <button
                    onClick={() => handleResolve(c._id)}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition-colors shadow-sm whitespace-nowrap"
                  >
                    Resolve & Send Response
                  </button>
                </div>
              ) : (
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900">
                  <strong className="block text-[11px] text-emerald-700 mb-0.5">Resolved by Admin:</strong>
                  {c.adminResponse}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
