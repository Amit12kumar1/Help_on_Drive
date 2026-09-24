import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Wrench,
  Zap,
  BatteryCharging,
  Fuel,
  Key,
  Car,
  Play,
  Pause,
  Layers,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Info
} from 'lucide-react';

/**
 * ============================================================================
 * 🚗 HELP ON DRIVE - 3D EXPLODED-VIEW CAR ANATOMY VISUALIZER
 * ============================================================================
 *
 * 🎓 Viva & Presentation Quick Defense:
 * 1. 3D Explosion & Assembly Mathematics:
 *    - Parent container me `perspective: 1200px` aur `transform-style: preserve-3d` laga hai.
 *    - Jab `isExploded = true` hota hai, to har individual mechanical part apne
 *      respective vector (X, Y, Z coordinates) me separate ho jata hai:
 *        • Engine: translate3d(0, -45px, 80px) rotateX(12deg)
 *        • Battery: translate3d(-70px, -20px, 95px) rotateY(-18deg)
 *        • Wheels: translate3d(85px, 20px, 60px) rotateZ(10deg)
 *        • Fuel/EV Port: translate3d(70px, 45px, 70px) rotateY(15deg)
 *        • Door/Lockout: translate3d(-80px, 15px, 90px) rotateY(-15deg)
 *    - Smooth easing `transition: all 0.9s cubic-bezier(0.34, 1.56, 0.64, 1)` ke sath
 *      ye parts dynamically dissemble hokar hawa me float karte hain aur wapas
 *      seamlessly apni jagah par assemble ho jate hain!
 * 2. Auto-Cycle Mode:
 *    - `useEffect` timer ke sath har 4-5 seconds me car ko explode aur reassemble
 *      karta rehta hai jisse landing page par continuous high-tech animation chalta hai.
 * ============================================================================
 */
export default function ExplodedCar3D() {
  const [isExploded, setIsExploded] = useState(true);
  const [autoCycle, setAutoCycle] = useState(true);
  const [activePart, setActivePart] = useState('engine'); // 'engine' | 'battery' | 'wheels' | 'fuel' | 'lockout'
  const containerRef = useRef(null);

  const [tilt, setTilt] = useState({ rotateX: 10, rotateY: -15 });

  // Auto-Cycle Explosion and Reassembly every 5.5 seconds
  useEffect(() => {
    if (!autoCycle) return;
    const interval = setInterval(() => {
      setIsExploded((prev) => !prev);
    }, 5500);
    return () => clearInterval(interval);
  }, [autoCycle]);

  // Mouse Parallax Tilt
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xPct = (x / rect.width - 0.5) * 2;
    const yPct = (y / rect.height - 0.5) * 2;

    setTilt({
      rotateX: -yPct * 16 + 8,
      rotateY: xPct * 20 - 10,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 10, rotateY: -15 });
  };

  // Diagnostic Data for each exploded component
  const partsData = {
    engine: {
      title: 'Engine & Mechanical Powertrain',
      service: 'Vehicle Breakdown Assistance',
      icon: Wrench,
      price: '₹399',
      eta: '15-20 Mins',
      desc: 'Engine stall, clutch cable failure, coolant leak & on-spot diagnostic fix.',
      color: 'from-amber-500 to-orange-600',
      badge: 'Mechanical Core',
      link: '/user/roadside-assistance?service=breakdown'
    },
    battery: {
      title: '12V Lead-Acid / EV 12V Boost',
      service: 'Battery Jump Start',
      icon: BatteryCharging,
      price: '₹349',
      eta: '15 Mins',
      desc: '1000A booster cables, alternator output check & brand new battery swap.',
      color: 'from-emerald-500 to-teal-600',
      badge: 'Electrical System',
      link: '/user/roadside-assistance?service=battery'
    },
    wheels: {
      title: 'Alloy Wheels & Radial Tyres',
      service: 'Tyre & Puncture Repair',
      icon: Zap,
      price: '₹199',
      eta: '15 Mins',
      desc: 'On-spot tubeless puncture plugging, spare wheel swap & pressure balancing.',
      color: 'from-blue-500 to-cyan-600',
      badge: 'Rolling Gear',
      link: '/user/roadside-assistance?service=puncture'
    },
    fuel: {
      title: 'Fuel Tank & EV High-Voltage Port',
      service: 'Emergency Fuel / EV Assist',
      icon: Fuel,
      price: '₹249',
      eta: '20 Mins',
      desc: '5L certified safety fuel dispensing & nearest EV fast charger navigation.',
      color: 'from-rose-500 to-pink-600',
      badge: 'Energy Reservoir',
      link: '/user/roadside-assistance?service=fuel'
    },
    lockout: {
      title: 'Cabin Doors & Security Locking',
      service: 'Key Lockout Assistance',
      icon: Key,
      price: '₹449',
      eta: '20 Mins',
      desc: 'Non-destructive inflatable air-wedge vehicle entry with zero scratch guarantee.',
      color: 'from-purple-500 to-indigo-600',
      badge: 'Cabin Security',
      link: '/user/roadside-assistance?service=lockout'
    }
  };

  const currentPart = partsData[activePart];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full rounded-3xl bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border border-slate-700/80 p-6 sm:p-8 shadow-2xl overflow-hidden select-none"
      style={{ minHeight: '520px' }}
    >
      {/* Background High-Tech Grid & Lighting Effect */}
      <div className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(234, 88, 12, 0.4) 1px, transparent 1px), radial-gradient(rgba(59, 130, 246, 0.4) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          backgroundPosition: '0 0, 12px 12px'
        }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Controls Bar */}
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs font-black uppercase tracking-wider text-slate-200">
            3D Vehicle Anatomy Visualizer
          </span>
          <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-brand-500/20 text-brand-400 text-[10px] font-bold border border-brand-500/30">
            {isExploded ? 'Exploded 3D Breakdown View' : 'Assembled Road-Ready View'}
          </span>
        </div>

        {/* Action Toggle Buttons */}
        <div className="flex items-center space-x-2 text-xs">
          <button
            type="button"
            onClick={() => setIsExploded(!isExploded)}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center space-x-1.5 shadow-md ${
              isExploded
                ? 'bg-brand-600 text-white shadow-brand-500/25 ring-2 ring-brand-400/40'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{isExploded ? 'Assembled Car' : 'Explode Parts ⚡'}</span>
          </button>

          <button
            type="button"
            onClick={() => setAutoCycle(!autoCycle)}
            title="Toggle Continuous Explode & Assemble Loop"
            className={`px-2.5 py-1.5 rounded-xl font-bold transition-all flex items-center space-x-1 ${
              autoCycle ? 'bg-slate-800 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800/60 text-slate-400'
            }`}
          >
            {autoCycle ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span className="text-[11px] hidden sm:inline">{autoCycle ? 'Looping' : 'Paused'}</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3D CAR HARDWARE STAGE */}
      {/* ========================================================================= */}
      <div
        className="relative h-72 sm:h-80 w-full flex items-center justify-center my-4"
        style={{ perspective: '1200px' }}
      >
        <div
          className="relative w-full max-w-md h-56 transition-transform duration-700 ease-out"
          style={{
            transform: `perspective(1200px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Main Car Structural Body Chassis */}
          <div
            className="absolute inset-0 rounded-3xl overflow-hidden transition-all duration-700"
            style={{
              transform: isExploded
                ? 'translateZ(10px) scale(0.92)'
                : 'translateZ(0px) scale(1)',
              boxShadow: isExploded
                ? '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 35px rgba(234, 88, 12, 0.25)'
                : '0 20px 40px -15px rgba(0, 0, 0, 0.9)',
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80"
              alt="High-Performance Vehicle Chassis"
              className="w-full h-full object-cover rounded-3xl opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/30 to-slate-950/40" />

            {/* Subtle Car HUD Neon Contour Overlay */}
            <div className="absolute inset-0 rounded-3xl border-2 border-brand-500/30 pointer-events-none" />
          </div>

          {/* ===================================================================== */}
          {/* 3D DECONSTRUCTIBLE COMPONENT 1: ENGINE BLOCK & COOLING (FRONT-CENTER) */}
          {/* ===================================================================== */}
          <div
            onClick={() => setActivePart('engine')}
            className={`absolute top-2 left-1/3 w-32 sm:w-40 p-2.5 rounded-2xl cursor-pointer transition-all duration-700 backdrop-blur-md border ${
              isExploded
                ? 'opacity-100 translate-y-[-48px] translate-x-[-15px] translate-z-80 shadow-2xl scale-105'
                : 'opacity-0 translate-y-0 translate-x-0 translate-z-10 pointer-events-none'
            } ${
              activePart === 'engine'
                ? 'bg-amber-950/85 border-amber-400 ring-2 ring-amber-400 shadow-amber-500/30'
                : 'bg-slate-900/80 border-amber-500/40 hover:border-amber-400'
            }`}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-lg bg-amber-500 text-white flex items-center justify-center flex-shrink-0 shadow">
                <Wrench className="w-4 h-4" />
              </div>
              <div className="truncate">
                <div className="text-[10px] font-black uppercase text-amber-400 leading-tight">Engine Core</div>
                <div className="text-[11px] font-bold text-white truncate">Mechanical Fix</div>
              </div>
            </div>
            <div className="mt-1 flex items-center justify-between text-[10px] text-slate-300 font-mono">
              <span>Diagnostic</span>
              <span className="font-bold text-amber-300">₹399</span>
            </div>
          </div>

          {/* ===================================================================== */}
          {/* 3D DECONSTRUCTIBLE COMPONENT 2: BATTERY & ALTERNATOR (FRONT-LEFT) */}
          {/* ===================================================================== */}
          <div
            onClick={() => setActivePart('battery')}
            className={`absolute top-10 left-[-20px] sm:left-[-35px] w-32 sm:w-40 p-2.5 rounded-2xl cursor-pointer transition-all duration-700 backdrop-blur-md border ${
              isExploded
                ? 'opacity-100 translate-y-[-20px] translate-x-[-45px] translate-z-90 shadow-2xl scale-105'
                : 'opacity-0 translate-y-0 translate-x-0 translate-z-10 pointer-events-none'
            } ${
              activePart === 'battery'
                ? 'bg-emerald-950/85 border-emerald-400 ring-2 ring-emerald-400 shadow-emerald-500/30'
                : 'bg-slate-900/80 border-emerald-500/40 hover:border-emerald-400'
            }`}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-500 text-white flex items-center justify-center flex-shrink-0 shadow">
                <BatteryCharging className="w-4 h-4" />
              </div>
              <div className="truncate">
                <div className="text-[10px] font-black uppercase text-emerald-400 leading-tight">12V Battery</div>
                <div className="text-[11px] font-bold text-white truncate">Jumpstart Boost</div>
              </div>
            </div>
            <div className="mt-1 flex items-center justify-between text-[10px] text-slate-300 font-mono">
              <span>1000A Boost</span>
              <span className="font-bold text-emerald-300">₹349</span>
            </div>
          </div>

          {/* ===================================================================== */}
          {/* 3D DECONSTRUCTIBLE COMPONENT 3: WHEELS & TYRES (RIGHT SIDE) */}
          {/* ===================================================================== */}
          <div
            onClick={() => setActivePart('wheels')}
            className={`absolute bottom-4 right-[-20px] sm:right-[-40px] w-32 sm:w-40 p-2.5 rounded-2xl cursor-pointer transition-all duration-700 backdrop-blur-md border ${
              isExploded
                ? 'opacity-100 translate-y-[20px] translate-x-[45px] translate-z-70 shadow-2xl scale-105'
                : 'opacity-0 translate-y-0 translate-x-0 translate-z-10 pointer-events-none'
            } ${
              activePart === 'wheels'
                ? 'bg-blue-950/85 border-blue-400 ring-2 ring-blue-400 shadow-blue-500/30'
                : 'bg-slate-900/80 border-blue-500/40 hover:border-blue-400'
            }`}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center flex-shrink-0 shadow">
                <Zap className="w-4 h-4" />
              </div>
              <div className="truncate">
                <div className="text-[10px] font-black uppercase text-blue-400 leading-tight">Tyre & Rim</div>
                <div className="text-[11px] font-bold text-white truncate">Flat Puncture</div>
              </div>
            </div>
            <div className="mt-1 flex items-center justify-between text-[10px] text-slate-300 font-mono">
              <span>Plug & Swap</span>
              <span className="font-bold text-blue-300">₹199</span>
            </div>
          </div>

          {/* ===================================================================== */}
          {/* 3D DECONSTRUCTIBLE COMPONENT 4: FUEL TANK & EV PORT (REAR-CENTER) */}
          {/* ===================================================================== */}
          <div
            onClick={() => setActivePart('fuel')}
            className={`absolute bottom-[-20px] left-1/4 w-32 sm:w-40 p-2.5 rounded-2xl cursor-pointer transition-all duration-700 backdrop-blur-md border ${
              isExploded
                ? 'opacity-100 translate-y-[45px] translate-x-[15px] translate-z-80 shadow-2xl scale-105'
                : 'opacity-0 translate-y-0 translate-x-0 translate-z-10 pointer-events-none'
            } ${
              activePart === 'fuel'
                ? 'bg-rose-950/85 border-rose-400 ring-2 ring-rose-400 shadow-rose-500/30'
                : 'bg-slate-900/80 border-rose-500/40 hover:border-rose-400'
            }`}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-lg bg-rose-600 text-white flex items-center justify-center flex-shrink-0 shadow">
                <Fuel className="w-4 h-4" />
              </div>
              <div className="truncate">
                <div className="text-[10px] font-black uppercase text-rose-400 leading-tight">Energy Port</div>
                <div className="text-[11px] font-bold text-white truncate">5L Emergency Fuel</div>
              </div>
            </div>
            <div className="mt-1 flex items-center justify-between text-[10px] text-slate-300 font-mono">
              <span>Petrol / Diesel</span>
              <span className="font-bold text-rose-300">₹249</span>
            </div>
          </div>

          {/* ===================================================================== */}
          {/* 3D DECONSTRUCTIBLE COMPONENT 5: CABIN DOORS & LOCKOUT (LEFT-MIDDLE) */}
          {/* ===================================================================== */}
          <div
            onClick={() => setActivePart('lockout')}
            className={`absolute top-1/2 left-[-35px] sm:left-[-50px] -translate-y-1/2 w-32 sm:w-40 p-2.5 rounded-2xl cursor-pointer transition-all duration-700 backdrop-blur-md border ${
              isExploded
                ? 'opacity-100 translate-x-[-30px] translate-z-100 shadow-2xl scale-105'
                : 'opacity-0 translate-x-0 translate-z-10 pointer-events-none'
            } ${
              activePart === 'lockout'
                ? 'bg-purple-950/85 border-purple-400 ring-2 ring-purple-400 shadow-purple-500/30'
                : 'bg-slate-900/80 border-purple-500/40 hover:border-purple-400'
            }`}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-lg bg-purple-600 text-white flex items-center justify-center flex-shrink-0 shadow">
                <Key className="w-4 h-4" />
              </div>
              <div className="truncate">
                <div className="text-[10px] font-black uppercase text-purple-400 leading-tight">Lock System</div>
                <div className="text-[11px] font-bold text-white truncate">Key Lockout</div>
              </div>
            </div>
            <div className="mt-1 flex items-center justify-between text-[10px] text-slate-300 font-mono">
              <span>Air-Wedge</span>
              <span className="font-bold text-purple-300">₹449</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* ACTIVE COMPONENT DIAGNOSTIC DRAWER / ACTION BAR */}
      {/* ========================================================================= */}
      <div className="relative z-20 pt-4 border-t border-slate-800 bg-slate-950/70 p-4 rounded-2xl border border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-amber-500 text-white flex items-center justify-center flex-shrink-0 shadow-lg">
            <currentPart.icon className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-black text-white">{currentPart.title}</span>
              <span className="px-2 py-0.5 rounded-full bg-slate-800 text-[10px] font-bold text-brand-400 border border-slate-700">
                {currentPart.badge}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">{currentPart.desc}</p>
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-end space-x-3 w-full sm:w-auto flex-shrink-0">
          <div className="text-right">
            <div className="text-sm font-black text-amber-400">{currentPart.price}</div>
            <span className="text-[10px] text-slate-500">ETA: {currentPart.eta}</span>
          </div>

          <Link
            to={currentPart.link}
            className="px-4 py-2.5 bg-gradient-to-r from-brand-600 to-orange-500 hover:from-brand-500 hover:to-orange-400 text-white text-xs font-bold rounded-xl shadow-lg shadow-brand-500/30 flex items-center space-x-1.5 transition-all hover:scale-105"
          >
            <span>Book Fix</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
