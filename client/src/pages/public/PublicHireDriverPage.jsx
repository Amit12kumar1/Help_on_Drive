import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import TiltCard3D from '../../components/common/TiltCard3D';
import { SERVICE_IMAGES } from '../../constants/serviceImages';
import {
  UserCheck,
  ShieldCheck,
  Clock,
  Car,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Award,
  Star,
  Compass,
  PhoneCall,
  Layers
} from 'lucide-react';

/**
 * ============================================================================
 * 🚗 HELP ON DRIVE - PUBLIC HIRE A DRIVER PAGE
 * ============================================================================
 *
 * 🎓 Presentation Note:
 * Dedicated public landing page for On-Demand Chauffeur Booking.
 * Showcases duration tiers, vetting criteria, and booking links.
 * ============================================================================
 */
export default function PublicHireDriverPage() {
  const { isAuthenticated } = useAuth();
  const [activeCategory, setActiveCategory] = useState('all');

  const chauffeurTiers = [
    {
      id: '2h',
      category: 'hourly',
      time: '2 Hours Commute',
      label: 'Quick Errand & Medical',
      price: '₹240',
      tag: 'City Run',
      desc: 'Ideal for local shopping, hospital visits, airport pickups, or quick business errands in your personal car.',
      meta: SERVICE_IMAGES.driverNight,
      features: ['Manual & Automatic car drivers', 'Doorstep pickup in uniform', 'Flexible extension available', 'Real-time GPS tracking']
    },
    {
      id: '4h',
      category: 'hourly',
      time: '4 Hours Half-Day',
      label: 'Shopping & Family Outing',
      price: '₹480',
      tag: 'Best Value',
      desc: 'Relax while our driver navigates crowded market lanes, mall parking basements, and city peak rush hour.',
      meta: SERVICE_IMAGES.driverCity,
      features: ['Stress-free market transit', 'Multiple stops supported', 'Zero parking search hassle', 'Polite, vetted chauffeurs']
    },
    {
      id: '8h',
      category: 'outstation',
      time: '8-10 Hours Full Day',
      label: 'Corporate & Executive Day',
      price: '₹900',
      tag: 'Most Popular',
      desc: 'Full-day dedicated chauffeur for corporate executives, client meetings, weddings, and full-shift city travel.',
      meta: SERVICE_IMAGES.driverFullDay,
      features: ['Dedicated full-day chauffeur', 'Professional business attire', 'City-wide multi-location commute', 'Transparent daily tariff']
    },
    {
      id: 'outstation',
      category: 'outstation',
      time: 'Multi-Day Outstation',
      label: 'Weekend Roadtrip Specialist',
      price: 'From ₹900/day',
      tag: 'Highway Pro',
      desc: 'Experienced highway drivers for hill stations, long-distance expressways, and multi-day family vacations.',
      meta: SERVICE_IMAGES.driverOutstation,
      features: ['National expressway experience', 'Night highway driving experts', 'Clean police verification record', 'Daily allowance included']
    },
  ];

  return (
    <div className="py-12 bg-slate-50 min-h-screen space-y-16">
      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl">
          <div className="max-w-2xl space-y-4 relative z-10">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-500/30">
              <UserCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>Certified Professional Chauffeurs On Demand</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Your Personal Car. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                Our Professional Driver.
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
              Skip the exhausting bumper-to-bumper traffic, late-night party commutes, and fatigue of long highway roadtrips. Hire thoroughly vetted, background-verified personal drivers in seconds.
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                to={isAuthenticated ? "/user/hire-driver" : "/login?redirect=/user/hire-driver"}
                className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-600/30 flex items-center space-x-2 transition-all hover:scale-105"
              >
                <UserCheck className="w-4 h-4" />
                <span>Book a Verified Chauffeur</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/how-it-works"
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/20 flex items-center space-x-2 transition-all"
              >
                <span>How Driver Booking Works</span>
              </Link>
            </div>
          </div>

          <div className="absolute right-0 bottom-0 top-0 w-1/2 opacity-20 pointer-events-none bg-gradient-to-l from-blue-500 to-transparent" />
        </div>
      </section>

      {/* 4 Chauffeur Tiers with 3D Tilt */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Flexible Chauffeur Tiers</span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Tailored for Every Journey
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Standardized transparent rates. No surprise surge charges or arbitrary driver demands.
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
                <span>All Tiers ({chauffeurTiers.length})</span>
                {activeCategory === 'all' && <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse ml-1" />}
              </button>

              <button
                type="button"
                onClick={() => setActiveCategory('hourly')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
                  activeCategory === 'hourly'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                    : 'text-slate-600 hover:text-blue-600 hover:bg-white/60'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>City Commute (2h & 4h)</span>
                {activeCategory === 'hourly' && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse ml-1" />}
              </button>

              <button
                type="button"
                onClick={() => setActiveCategory('outstation')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
                  activeCategory === 'outstation'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25'
                    : 'text-slate-600 hover:text-indigo-600 hover:bg-white/60'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Full Day & Outstation (2)</span>
                {activeCategory === 'outstation' && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse ml-1" />}
              </button>
            </div>

            {/* Active Tab Helper Badge */}
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-xl bg-white border border-slate-200/90 shadow-sm text-xs">
              <span className="text-slate-400 font-medium">📍 Showing:</span>
              <span className="font-extrabold text-slate-800">
                {activeCategory === 'all' && `All 4 Chauffeur Booking Tiers for Personal Vehicles`}
                {activeCategory === 'hourly' && `Short City Commute: 2-Hour Errand (₹240) & 4-Hour Half-Day (₹480)`}
                {activeCategory === 'outstation' && `Long Duration: 8-10 Hour Corporate Full Day (₹900) & Multi-Day Outstation`}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {(activeCategory === 'all' ? chauffeurTiers : chauffeurTiers.filter(t => t.category === activeCategory)).map((tier, idx) => (
            <TiltCard3D key={idx} maxTilt={9} scale={1.02}>
              <div className="bg-white rounded-3xl border border-slate-200 hover:border-blue-500 shadow-md hover:shadow-xl transition-all overflow-hidden flex flex-col justify-between h-full group">
                <div className="relative h-44 w-full overflow-hidden bg-slate-950">
                  <img
                    src={tier.meta.image}
                    alt={tier.time}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85"
                    onError={(e) => { e.currentTarget.src = tier.meta.fallback; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/30 to-transparent" />

                  <div className="absolute top-3 left-3 translate-z-30">
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-black uppercase tracking-wider shadow-md">
                      {tier.tag}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3 translate-z-30">
                    <span className="px-2.5 py-0.5 rounded-full bg-black/75 backdrop-blur-md text-white font-black text-xs border border-white/20">
                      {tier.price}
                    </span>
                  </div>

                  <div className="absolute bottom-2 left-3 translate-z-20 text-white">
                    <div className="text-base font-black">{tier.time}</div>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 mb-1">{tier.label}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed mb-4">{tier.desc}</p>

                    <ul className="space-y-2 text-xs text-slate-600">
                      {tier.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-center space-x-2">
                          <CheckCircle className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    to={isAuthenticated ? "/user/hire-driver" : `/login?redirect=/user/hire-driver`}
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl text-center shadow-md transition-colors"
                  >
                    Select & Book
                  </Link>
                </div>
              </div>
            </TiltCard3D>
          ))}
        </div>
      </section>

      {/* Driver Vetting 4-Pillar Trust Shield */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Uncompromising Standards</span>
            <h3 className="text-2xl sm:text-3xl font-black">Our 4-Pillar Driver Vetting System</h3>
            <p className="text-xs text-slate-400">Only top 15% of applicant drivers are accepted onto Help On Drive</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-2">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
              <h4 className="font-bold text-sm">1. Commercial DL Check</h4>
              <p className="text-xs text-slate-400">Authenticity verified against government Parivahan RTO databases.</p>
            </div>

            <div className="p-5 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-2">
              <ShieldCheck className="w-6 h-6 text-blue-400" />
              <h4 className="font-bold text-sm">2. Police Background</h4>
              <p className="text-xs text-slate-400">Criminal records & address verification via official police records.</p>
            </div>

            <div className="p-5 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-2">
              <Car className="w-6 h-6 text-amber-400" />
              <h4 className="font-bold text-sm">3. Transmission Proficiency</h4>
              <p className="text-xs text-slate-400">Certified for both Manual gearboxes and modern Automatics (DCT/CVT/AT).</p>
            </div>

            <div className="p-5 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-2">
              <Star className="w-6 h-6 text-purple-400" />
              <h4 className="font-bold text-sm">4. Customer Etiquette</h4>
              <p className="text-xs text-slate-400">Trained in polite communication, passenger privacy, and safe speed limits.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
