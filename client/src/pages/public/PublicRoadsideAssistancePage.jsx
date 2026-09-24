import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import TiltCard3D from '../../components/common/TiltCard3D';
import { SERVICE_IMAGES } from '../../constants/serviceImages';
import {
  Wrench,
  Zap,
  BatteryCharging,
  Fuel,
  Car,
  Key,
  ShieldAlert,
  Clock,
  MapPin,
  CheckCircle,
  ArrowRight,
  Sparkles,
  PhoneCall,
  Siren,
  ChevronRight,
  Layers
} from 'lucide-react';

/**
 * ============================================================================
 * 🚗 HELP ON DRIVE - PUBLIC ROADSIDE ASSISTANCE PAGE
 * ============================================================================
 *
 * 🎓 Presentation Note:
 * Dedicated public landing page for Roadside Assistance.
 * Displays real-time breakdown services, 3D cards, transparent tariff cards,
 * and emergency safety guidance for vehicle owners.
 * ============================================================================
 */
export default function PublicRoadsideAssistancePage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');

  const rsaServices = [
    {
      id: 'breakdown',
      category: 'heavy',
      title: 'Vehicle Breakdown & Mechanical Repair',
      desc: 'Engine stall, clutch failure, radiator overheating, and on-spot minor mechanical diagnosis.',
      meta: SERVICE_IMAGES.breakdown,
      points: ['Experienced automobile mechanics', 'On-spot diagnostic scanner tools', 'Coolant, belt & hose repair', 'Transparent parts pricing']
    },
    {
      id: 'puncture',
      category: 'quick',
      title: 'Flat Tyre & Puncture Repair',
      desc: 'On-spot tubeless puncture sealing, spare wheel replacement, and hydraulic jack lift.',
      meta: SERVICE_IMAGES.puncture,
      points: ['Tubeless plugging within 10 mins', 'Spare wheel swap & torque check', 'Tyre air pressure optimization', 'All car models supported']
    },
    {
      id: 'battery',
      category: 'quick',
      title: 'Battery Jumpstart & Health Test',
      desc: 'Heavy-duty 1000A booster cables jumpstart, terminal cleaning, and alternator output inspection.',
      meta: SERVICE_IMAGES.battery,
      points: ['Instant engine cranking boost', 'Alternator charging current test', 'Terminal corrosion clearing', 'New battery delivery option']
    },
    {
      id: 'fuel',
      category: 'quick',
      title: 'Emergency Fuel Delivery',
      desc: '5 Litres of pure petrol or diesel delivered directly to your stranded vehicle in certified safety jerricans.',
      meta: SERVICE_IMAGES.fuel,
      points: ['5L pure fuel dispensed', 'Government PESO approved cans', 'Fuel line priming assistance', 'Standard pump fuel rates']
    },
    {
      id: 'towing',
      category: 'heavy',
      title: 'Flatbed & Underlift Towing',
      desc: 'Zero-drag hydraulic flatbed carrier and wheel-lift recovery trucks for safe vehicle transit.',
      meta: SERVICE_IMAGES.towing,
      points: ['Hydraulic flatbed carrier', 'Zero wheel friction or drag', 'Transit insurance included', 'Safe garage or doorstep drop']
    },
    {
      id: 'lockout',
      category: 'heavy',
      title: 'Key Lockout Assistance',
      desc: 'Safe, non-destructive automotive air-wedge door unlocking when keys are locked inside.',
      meta: SERVICE_IMAGES.lockout,
      points: ['Zero scratch or glass damage', 'Inflatable air-wedge toolkits', 'Verified vehicle RC required', 'Fast 20-minute response']
    }
  ];

  return (
    <div className="py-12 bg-slate-50 min-h-screen space-y-16">
      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-brand-950 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl">
          <div className="max-w-2xl space-y-4 relative z-10">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-bold border border-brand-500/30">
              <Siren className="w-3.5 h-3.5 text-brand-400" />
              <span>24/7 Nationwide Emergency Roadside Support</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Stranded on the Road? <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-amber-300">
                Help Arrives in 15 Minutes.
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
              From flat tyres and dead batteries to hydraulic flatbed towing, our verified mobile workshops and mechanics are on standby across all major highways and city routes.
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                to={isAuthenticated ? "/user/roadside-assistance" : "/login?redirect=/user/roadside-assistance"}
                className="px-6 py-3.5 bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-brand-600/30 flex items-center space-x-2 transition-all hover:scale-105"
              >
                <Wrench className="w-4 h-4" />
                <span>Request Breakdown Help Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href="tel:1800435737"
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/20 flex items-center space-x-2 transition-all"
              >
                <PhoneCall className="w-4 h-4 text-emerald-400" />
                <span>Call Emergency Helpline</span>
              </a>
            </div>
          </div>

          {/* Background Illustration Glow */}
          <div className="absolute right-0 bottom-0 top-0 w-1/2 opacity-20 pointer-events-none bg-gradient-to-l from-brand-500 to-transparent" />
        </div>
      </section>

      {/* 6 Services Catalog Grid with 3D Tilt */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">Standardized Roadside Services</span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Certified Breakdown Assistance Offerings
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Every service is billed on transparent flat-rate tariffs with real-time GPS tracking.
          </p>

          {/* Segmented Category Filter Tabs */}
          <div className="pt-4 flex flex-col items-center space-y-3">
            <div className="inline-flex p-1.5 rounded-2xl bg-slate-200/80 border border-slate-300/80 shadow-inner">
              <button
                type="button"
                onClick={() => setActiveCategory('all')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
                  activeCategory === 'all'
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>All Assistance ({rsaServices.length})</span>
                {activeCategory === 'all' && <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse ml-1" />}
              </button>

              <button
                type="button"
                onClick={() => setActiveCategory('quick')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
                  activeCategory === 'quick'
                    ? 'bg-brand-600 text-white shadow-md shadow-brand-500/25'
                    : 'text-slate-600 hover:text-brand-600 hover:bg-white/60'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Quick Spot Fix (3)</span>
                {activeCategory === 'quick' && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse ml-1" />}
              </button>

              <button
                type="button"
                onClick={() => setActiveCategory('heavy')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
                  activeCategory === 'heavy'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                    : 'text-slate-600 hover:text-blue-600 hover:bg-white/60'
                }`}
              >
                <Car className="w-3.5 h-3.5" />
                <span>Recovery & Mechanical (3)</span>
                {activeCategory === 'heavy' && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse ml-1" />}
              </button>
            </div>

            {/* Active Tab Helper Badge */}
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-xl bg-white border border-slate-200/90 shadow-sm text-xs">
              <span className="text-slate-400 font-medium">📍 Showing:</span>
              <span className="font-extrabold text-slate-800">
                {activeCategory === 'all' && `All 6 Standardized Emergency Roadside Services`}
                {activeCategory === 'quick' && `Minor Spot Repairs: Puncture, Battery Jumpstart & 5L Fuel Delivery`}
                {activeCategory === 'heavy' && `Heavy Recovery: Flatbed Towing, Key Lockout & Mechanical Repair`}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(activeCategory === 'all' ? rsaServices : rsaServices.filter(s => s.category === activeCategory)).map((srv) => (
            <TiltCard3D key={srv.id} maxTilt={8} scale={1.02}>
              <div className="bg-white rounded-3xl border border-slate-200 hover:border-brand-500 shadow-md hover:shadow-xl transition-all overflow-hidden flex flex-col justify-between h-full group">
                <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                  <img
                    src={srv.meta.image}
                    alt={srv.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                    onError={(e) => { e.currentTarget.src = srv.meta.fallback; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/30 to-transparent" />

                  <div className="absolute top-3 left-3 translate-z-30">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow-md ${srv.meta.badgeColor}`}>
                      {srv.meta.badge}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3 translate-z-30">
                    <span className="px-2.5 py-0.5 rounded-full bg-black/75 backdrop-blur-md text-white font-black text-xs border border-white/20">
                      Starting {srv.meta.price}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 translate-z-20 flex items-center space-x-1.5 text-[11px] text-slate-200">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Average Arrival: {srv.meta.eta}</span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-brand-600 transition-colors">
                      {srv.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed mb-4">
                      {srv.desc}
                    </p>

                    <ul className="space-y-2 text-xs text-slate-600">
                      {srv.points.map((pt, pIdx) => (
                        <li key={pIdx} className="flex items-center space-x-2">
                          <CheckCircle className="w-3.5 h-3.5 text-brand-600 flex-shrink-0" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    to={isAuthenticated ? `/user/roadside-assistance?service=${srv.id}` : `/login?redirect=/user/roadside-assistance?service=${srv.id}`}
                    className="w-full py-3 bg-slate-900 group-hover:bg-brand-600 text-white font-bold text-xs rounded-xl flex items-center justify-center space-x-1.5 transition-colors shadow-sm"
                  >
                    <span>Request This Service</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </TiltCard3D>
          ))}
        </div>
      </section>

      {/* Safety Protocol Guide */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-amber-50 rounded-3xl p-8 border border-amber-200 space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-amber-950">Safety Checklist for Stranded Drivers</h3>
              <p className="text-xs text-amber-800">Essential steps while waiting for your rescue mechanic or tow truck</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-amber-900 pt-2">
            <div className="p-3 bg-white/70 rounded-xl border border-amber-200/60">
              <strong>1. Pull Over to Shoulder:</strong> Safely steer your vehicle as far onto the road shoulder or emergency lane as possible.
            </div>
            <div className="p-3 bg-white/70 rounded-xl border border-amber-200/60">
              <strong>2. Turn On Hazard Lights:</strong> Activate your emergency blinkers immediately to make your car visible to oncoming traffic.
            </div>
            <div className="p-3 bg-white/70 rounded-xl border border-amber-200/60">
              <strong>3. Stay in Safe Position:</strong> Wait behind the highway barrier or inside your locked vehicle with tracking shared with family.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
