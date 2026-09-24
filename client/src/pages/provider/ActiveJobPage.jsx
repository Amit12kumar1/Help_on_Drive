import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useSocket } from '../../context/SocketContext';
import LiveTrackingMap from '../../components/map/LiveTrackingMap';
import LiveChatModal from '../../components/chat/LiveChatModal';
import SimulatedCallModal from '../../components/common/SimulatedCallModal';
import {
  Wrench,
  Car,
  Navigation,
  Phone,
  MessageSquare,
  CheckCircle2,
  MapPin,
  Clock,
  AlertTriangle
} from 'lucide-react';

export default function ActiveJobPage() {
  const { socket, joinBookingRoom, emitStatusChange } = useSocket();
  const [activeJob, setActiveJob] = useState(null);
  const [loading, setLoading] = useState(true);

  const [chatOpen, setChatOpen] = useState(false);
  const [callOpen, setCallOpen] = useState(false);

  const fetchActive = async () => {
    try {
      const res = await api.get('/assistance/provider/jobs');
      if (res.data.success) {
        const found = res.data.jobs.find(j => ['accepted', 'on_the_way', 'arrived', 'in_progress'].includes(j.status));
        setActiveJob(found || null);
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
    if (!activeJob) return;
    try {
      const res = await api.put(`/assistance/${activeJob._id}/status`, {
        status: newStatus
      });

      if (res.data.success) {
        setActiveJob(res.data.request);
        emitStatusChange(activeJob._id, newStatus, `Technician advanced status to ${newStatus}`);
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) {
    return <div className="text-center py-16 text-xs text-slate-400">Loading active dispatch terminal...</div>;
  }

  if (!activeJob) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-md mx-auto space-y-4">
        <Wrench className="w-12 h-12 text-slate-400 mx-auto" />
        <h3 className="text-base font-bold text-slate-800">No Active Roadside Job Dispatched</h3>
        <p className="text-xs text-slate-500">
          Accept a pending breakdown request from your job queue to launch the live navigation dispatch terminal.
        </p>
      </div>
    );
  }

  const customer = activeJob.userId;
  const vehicle = activeJob.vehicleId;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
          <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Mechanic Dispatch Terminal</span>
        </div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-0.5">
          Roadside Job: {activeJob.serviceType?.toUpperCase()} for {customer?.name}
        </h1>
        <p className="text-xs text-slate-500 font-mono">Incident ID: {activeJob._id}</p>
      </div>

      {/* Provider Workflow Milestone Action Bar */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Job Status</span>
          <span className="text-sm font-black text-amber-700 capitalize">
            {activeJob.status?.replace(/_/g, ' ')}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          {activeJob.status === 'accepted' && (
            <button
              onClick={() => handleUpdateStatus('on_the_way')}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md transition-colors"
            >
              🚚 Dispatch Van (On The Way)
            </button>
          )}

          {activeJob.status === 'on_the_way' && (
            <button
              onClick={() => handleUpdateStatus('arrived')}
              className="px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold shadow-md transition-colors"
            >
              📍 Arrived at Stranded Car
            </button>
          )}

          {activeJob.status === 'arrived' && (
            <button
              onClick={() => handleUpdateStatus('in_progress')}
              className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold shadow-md transition-colors"
            >
              🔧 Begin Repair Work
            </button>
          )}

          {activeJob.status === 'in_progress' && (
            <button
              onClick={() => handleUpdateStatus('completed')}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md transition-colors"
            >
              🏁 Job Resolved & Complete
            </button>
          )}

          {activeJob.status === 'completed' && (
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 flex items-center space-x-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>Job Resolved</span>
            </span>
          )}
        </div>
      </div>

      {/* Map */}
      <LiveTrackingMap
        userLocation={activeJob.location}
        partnerLocation={{
          lat: 28.5670,
          lng: 77.2430,
          name: 'Your Mobile Repair Unit',
          role: 'provider'
        }}
        bookingStatus={activeJob.status}
      />

      {/* Details Box */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex items-center space-x-3.5">
          <img
            src={customer?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'}
            alt={customer?.name}
            className="w-12 h-12 rounded-2xl object-cover border-2 border-amber-500"
          />
          <div>
            <h4 className="font-bold text-xs text-slate-900">{customer?.name}</h4>
            <span className="text-[11px] text-slate-500 font-mono block">{customer?.phone}</span>
            <span className="text-[10px] text-emerald-600 font-semibold">Stranded Car Owner</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">Vehicle Problem</span>
          <h4 className="font-bold text-xs text-slate-900">{vehicle?.brand} {vehicle?.model} ({vehicle?.vehicleNumber})</h4>
          <p className="text-[11px] text-slate-600 mt-1 line-clamp-2">{activeJob.problemDescription}</p>
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
        bookingId={activeJob._id}
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
