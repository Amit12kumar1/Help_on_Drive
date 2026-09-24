import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useSocket } from '../../context/SocketContext';
import { AlertOctagon, Siren, MapPin, Phone, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function SOSMonitorPage() {
  const { socket } = useSocket();
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAlerts = async () => {
    try {
      const res = await api.get('/sos/active');
      if (res.data.success) setAlerts(res.data.alerts);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  useEffect(() => {
    if (!socket) return;
    const handleNewSOS = (data) => {
      fetchAlerts();
    };
    socket.on('emergency_sos_broadcast', handleNewSOS);
    return () => socket.off('emergency_sos_broadcast', handleNewSOS);
  }, [socket]);

  const handleResolve = async (id) => {
    try {
      const res = await api.put(`/sos/${id}/resolve`);
      if (res.data.success) fetchAlerts();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-ping" />
            <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">Emergency Response Grid</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-0.5">
            Emergency SOS Panic Monitor
          </h1>
          <p className="text-xs text-slate-500">Live priority dispatch incidents broadcasted by stranded vehicle owners</p>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-16 text-xs text-slate-400">Loading emergency telemetry...</div>
      ) : alerts.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 text-xs text-slate-400 space-y-2">
          <ShieldAlert className="w-12 h-12 text-emerald-500 mx-auto" />
          <h3 className="font-bold text-sm text-slate-800">All Corridors Secure</h3>
          <p>No active distress panic signals currently open.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {alerts.map((al) => (
            <div
              key={al._id}
              className={`p-6 rounded-3xl border transition-all ${
                al.status === 'active'
                  ? 'bg-rose-50/50 border-rose-300 shadow-md ring-2 ring-rose-500/20'
                  : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div className="flex items-center space-x-3.5">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold ${
                    al.status === 'active' ? 'bg-rose-600 text-white animate-pulse' : 'bg-slate-100 text-slate-600'
                  }`}>
                    <Siren className="w-6 h-6" />
                  </div>

                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-rose-200 text-rose-900">
                        {al.emergencyType}
                      </span>
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                        al.status === 'active' ? 'bg-rose-600 text-white animate-pulse' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {al.status}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 mt-1">
                      Distress User: {al.userId?.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-mono">
                      Phone: {al.userId?.phone} • Email: {al.userId?.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  {al.status === 'active' && (
                    <button
                      onClick={() => handleResolve(al._id)}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md transition-colors"
                    >
                      Mark Emergency Resolved
                    </button>
                  )}
                  <a
                    href={`https://maps.google.com/?q=${al.location?.lat},${al.location?.lng}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center space-x-1"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>External GPS Map</span>
                  </a>
                </div>
              </div>

              {/* Telemetry metadata */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-3 border-t border-slate-200/60">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Incident Location</span>
                  <p className="font-mono text-slate-800">{al.location?.address}</p>
                  <p className="text-[11px] text-slate-500 font-mono">
                    Coords: {al.location?.lat?.toFixed(5)}, {al.location?.lng?.toFixed(5)}
                  </p>
                </div>

                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">
                    Emergency Relatives Dispatched ({al.notifiedContacts?.length || 0})
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {al.notifiedContacts?.map((c, i) => (
                      <span key={i} className="px-2 py-0.5 bg-white border border-slate-200 rounded text-[11px] font-mono text-slate-700">
                        {c.name}: {c.phone}
                      </span>
                    ))}
                    {(!al.notifiedContacts || al.notifiedContacts.length === 0) && (
                      <span className="text-slate-400 italic">Central SOS Patrol Dispatched</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="text-[10px] text-slate-400 mt-3 pt-2 border-t border-slate-200/40">
                Reported at: {new Date(al.createdAt).toLocaleString()} • Notes: {al.notes}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
