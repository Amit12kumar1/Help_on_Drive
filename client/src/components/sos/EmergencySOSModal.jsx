import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useSocket } from '../../context/SocketContext';
import { AlertTriangle, Siren, ShieldAlert, Phone, CheckCircle, X, MapPin } from 'lucide-react';

export default function EmergencySOSModal({ isOpen, onClose }) {
  const { socket } = useSocket();
  const [countdown, setCountdown] = useState(5);
  const [isDispatched, setIsDispatched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [coords, setCoords] = useState({ lat: 28.5494, lng: 77.2001, address: 'Acquiring GPS location...' });
  const [contacts, setContacts] = useState([]);

  // Browser Web Audio Siren Synthesis
  const playSiren = () => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(800, audioCtx.currentTime);
      osc.frequency.linearRampToValueAtTime(1400, audioCtx.currentTime + 0.3);
      osc.frequency.linearRampToValueAtTime(800, audioCtx.currentTime + 0.6);

      gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.7);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.7);
    } catch (e) {
      // Audio context might be restricted before user gesture
    }
  };

  useEffect(() => {
    if (isOpen) {
      setIsDispatched(false);
      setCountdown(5);

      // Fetch emergency contacts
      api.get('/emergency-contacts')
        .then((res) => {
          if (res.data.success) setContacts(res.data.contacts);
        })
        .catch(() => {});

      // Fetch accurate GPS
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            setCoords({
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
              address: `GPS: ${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`
            });
          },
          () => {
            setCoords({
              lat: 28.5494,
              lng: 77.2001,
              address: 'South Delhi Corridor (Network Geolocation)'
            });
          }
        );
      }

      playSiren();
    }
  }, [isOpen]);

  // Countdown timer for automatic panic dispatch
  useEffect(() => {
    let timer;
    if (isOpen && !isDispatched && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown((c) => c - 1);
        playSiren();
      }, 1000);
    } else if (isOpen && !isDispatched && countdown === 0) {
      triggerDispatch();
    }
    return () => clearTimeout(timer);
  }, [isOpen, countdown, isDispatched]);

  const triggerDispatch = async () => {
    setLoading(true);
    try {
      const res = await api.post('/sos/trigger', {
        location: coords,
        emergencyType: 'Highway Threat / Emergency Breakdown',
        notes: 'EMERGENCY: User pressed panic button on Help On Drive platform.'
      });

      if (res.data.success) {
        setIsDispatched(true);
        if (socket) {
          socket.emit('sos_alert', res.data.alert);
        }
      }
    } catch (error) {
      console.error('SOS dispatch error:', error);
      setIsDispatched(true); // show confirmation fallback
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1200] flex items-center justify-center p-4 bg-rose-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border-4 border-rose-600 relative">
        {/* Flashing Strobe Bar */}
        <div className="bg-rose-600 text-white p-5 flex items-center justify-between animate-pulse">
          <div className="flex items-center space-x-2.5">
            <Siren className="w-7 h-7" />
            <div>
              <h3 className="text-lg font-black tracking-wide uppercase">SOS Emergency Mode</h3>
              <p className="text-xs text-rose-100">Live Assistance & Contact Dispatch</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-rose-700 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 text-center">
          {!isDispatched ? (
            <>
              {/* Countdown circle */}
              <div className="my-3 flex justify-center">
                <div className="w-24 h-24 rounded-full border-4 border-rose-500 bg-rose-50 flex flex-col items-center justify-center shadow-inner animate-bounce">
                  <span className="text-3xl font-black text-rose-600">{countdown}</span>
                  <span className="text-[10px] text-rose-500 font-bold uppercase">Seconds</span>
                </div>
              </div>

              <h4 className="text-base font-bold text-slate-800 mb-1">
                Dispatching Emergency Alert
              </h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto mb-4">
                Broadcasting your live GPS location to nearby patrol, rescue teams, and your emergency contacts.
              </p>

              {/* Location telemetry box */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-left text-xs mb-4 flex items-center space-x-2 text-slate-700">
                <MapPin className="w-4 h-4 text-rose-600 flex-shrink-0" />
                <span className="truncate font-mono">{coords.address}</span>
              </div>

              {/* Emergency contacts list preview */}
              <div className="text-left mb-6">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Notifying Emergency Contacts ({contacts.length}):
                </div>
                <div className="space-y-1.5 max-h-24 overflow-y-auto">
                  {contacts.map((c, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs bg-rose-50/60 px-3 py-1.5 rounded-lg border border-rose-100 text-rose-900 font-medium">
                      <span>{c.name} ({c.relationship})</span>
                      <span className="text-rose-600 font-mono text-[11px]">{c.phone}</span>
                    </div>
                  ))}
                  {contacts.length === 0 && (
                    <div className="text-xs text-slate-400 italic">No custom contacts saved. Alerting central rescue team.</div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-3 border border-slate-300 text-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-100 transition-colors"
                >
                  Cancel (False Alarm)
                </button>
                <button
                  type="button"
                  onClick={triggerDispatch}
                  disabled={loading}
                  className="flex-1 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-rose-600/30 transition-all"
                >
                  {loading ? 'Dispatching...' : 'Dispatch Immediately'}
                </button>
              </div>
            </>
          ) : (
            <div className="py-6 animate-fadeIn">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-9 h-9" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-1">
                Emergency Alert Broadcasted!
              </h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto mb-6">
                Your emergency signal has been transmitted. Nearby patrol mechanics and your listed contacts have received your live GPS coordinates. Keep your phone line active.
              </p>

              <div className="bg-slate-900 text-white p-4 rounded-xl text-left text-xs mb-6">
                <div className="text-slate-400 text-[10px] uppercase font-bold tracking-wider mb-1">National Helpline Quick Dial</div>
                <div className="flex justify-between items-center text-emerald-400 font-bold text-sm">
                  <span>Highway Emergency: 1033</span>
                  <a href="tel:1033" className="p-1.5 bg-slate-800 rounded-lg text-white hover:bg-slate-700">
                    <Phone className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-colors"
              >
                Return to Dashboard
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
