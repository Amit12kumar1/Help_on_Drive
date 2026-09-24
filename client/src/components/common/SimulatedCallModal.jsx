import React, { useState, useEffect } from 'react';
import { Phone, PhoneOff, Mic, MicOff, Volume2, ShieldCheck } from 'lucide-react';

export default function SimulatedCallModal({
  isOpen,
  onClose,
  partner = { name: 'Partner', phone: '+91 9876543210', avatar: '', role: 'driver' }
}) {
  const [callState, setCallState] = useState('ringing'); // 'ringing' | 'connected'
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    let timer;
    let connectTimeout;

    if (isOpen) {
      setCallState('ringing');
      setCallDuration(0);

      // Simulate connection after 3 seconds
      connectTimeout = setTimeout(() => {
        setCallState('connected');
      }, 3000);
    }

    return () => {
      clearTimeout(connectTimeout);
      clearInterval(timer);
    };
  }, [isOpen]);

  useEffect(() => {
    let interval;
    if (callState === 'connected') {
      interval = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [callState]);

  if (!isOpen) return null;

  const formatTimer = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-[1100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 text-white w-full max-w-sm rounded-3xl p-6 shadow-2xl flex flex-col items-center text-center relative overflow-hidden">
        {/* Decorative ambient aura */}
        <div className="absolute -top-20 -left-20 w-44 h-44 bg-brand-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Encrypted call banner */}
        <div className="flex items-center space-x-1.5 text-[11px] text-emerald-400 bg-emerald-950/50 px-3 py-1 rounded-full border border-emerald-800/60 mb-6">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Encrypted Voice Link</span>
        </div>

        {/* Avatar with pulsing ring */}
        <div className="relative mb-5">
          <div className={`absolute inset-0 rounded-full bg-brand-500/30 ${callState === 'ringing' ? 'animate-ping' : ''}`} />
          <img
            src={partner.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'}
            alt={partner.name}
            className="w-24 h-24 rounded-full object-cover border-4 border-slate-700 relative z-10 shadow-lg"
          />
        </div>

        <h3 className="text-xl font-bold tracking-tight mb-1">{partner.name}</h3>
        <p className="text-xs text-slate-400 mb-2">{partner.role === 'provider' ? 'Mechanic Technician' : 'Chauffeur Driver'}</p>
        <p className="text-xs text-slate-500 font-mono mb-4">{partner.phone || '+91 9810101011'}</p>

        {/* Call Status Indicator */}
        <div className="text-sm font-semibold text-brand-400 mb-8">
          {callState === 'ringing' ? (
            <span className="animate-pulse">Calling...</span>
          ) : (
            <span className="text-emerald-400 font-mono text-base">{formatTimer(callDuration)}</span>
          )}
        </div>

        {/* Call Action Controls */}
        <div className="flex items-center justify-center space-x-6 w-full">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`p-4 rounded-full transition-colors ${
              isMuted ? 'bg-amber-500 text-slate-900' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          <button
            onClick={onClose}
            className="p-5 rounded-full bg-rose-600 hover:bg-rose-700 text-white shadow-lg shadow-rose-600/40 hover:scale-105 transition-all"
          >
            <PhoneOff className="w-6 h-6" />
          </button>

          <button
            onClick={() => {}}
            className="p-4 rounded-full bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
          >
            <Volume2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
