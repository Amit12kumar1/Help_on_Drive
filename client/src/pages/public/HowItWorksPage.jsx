import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import TiltCard3D from '../../components/common/TiltCard3D';
import { SERVICE_IMAGES } from '../../constants/serviceImages';
import {
  Wrench,
  UserCheck,
  MapPin,
  CheckCircle,
  Navigation,
  ShieldCheck,
  Siren,
  Smartphone,
  CreditCard,
  Clock,
  ArrowRight,
  Sparkles,
  Zap,
  Building2
} from 'lucide-react';

/**
 * ============================================================================
 * 🚗 HELP ON DRIVE - HOW IT WORKS (INTERACTIVE 3D WORKFLOW)
 * ============================================================================
 *
 * 🎓 Viva & Presentation Quick Defense:
 * 1. Role-Based Workflow Tabs:
 *    - User Roadside Assistance Flow
 *    - User Chauffeur Booking Flow
 *    - Partner Mechanic & Driver Flow
 *    - Emergency SOS Architecture Flow
 * 2. Hash Routing Support:
 *    - Automatically synchronizes with #user, #driver, #provider, and #sos hash tags.
 * ============================================================================
 */
export default function HowItWorksPage() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('rsa'); // 'rsa' | 'driver' | 'partners' | 'sos'

  // Sync tab with URL hash from navbar links
  useEffect(() => {
    const hash = location.hash;
    if (hash === '#driver') setActiveTab('driver');
    else if (hash === '#provider' || hash === '#partners') setActiveTab('partners');
    else if (hash === '#sos') setActiveTab('sos');
    else if (hash === '#user' || hash === '#rsa') setActiveTab('rsa');
  }, [location.hash]);

  // RSA 4-Step Process
  const rsaSteps = [
    {
      num: '01',
      title: 'Pin Breakdown & Vehicle',
      desc: 'Select your car from garage and pick the issue (puncture, battery, fuel, towing, mechanical). Coordinates auto-pin via GPS.',
      image: SERVICE_IMAGES.breakdown.image,
      fallback: SERVICE_IMAGES.breakdown.fallback,
      badge: 'Step 1: Distress Call',
      badgeColor: 'bg-brand-600 text-white'
    },
    {
      num: '02',
      title: 'Smart Geo Dispatch',
      desc: 'Our matching algorithm notifies verified mechanics within a 5-8km radius. Nearest available workshop accepts within 60 seconds.',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
      fallback: SERVICE_IMAGES.towing.image,
      badge: 'Step 2: Auto Match',
      badgeColor: 'bg-blue-600 text-white'
    },
    {
      num: '03',
      title: 'Live GPS Tracking',
      desc: 'Watch the mechanic van moving live on Leaflet Map. Direct in-app masked calling and arrival ETA countdown provided.',
      image: 'https://images.unsplash.com/photo-1548345680-f5475ea5df84?auto=format&fit=crop&w=800&q=80',
      fallback: SERVICE_IMAGES.puncture.image,
      badge: 'Step 3: Live Radar',
      badgeColor: 'bg-amber-600 text-white'
    },
    {
      num: '04',
      title: 'Calibrated Fix & Digital Bill',
      desc: 'Technician fixes the vehicle on-spot. Settle standard transparent charges via UPI or Cash; download GST invoice instantly.',
      image: SERVICE_IMAGES.puncture.image,
      fallback: SERVICE_IMAGES.puncture.fallback,
      badge: 'Step 4: Safe Resolution',
      badgeColor: 'bg-emerald-600 text-white'
    }
  ];

  // Chauffeur 4-Step Process
  const driverSteps = [
    {
      num: '01',
      title: 'Select Duration & Transmission',
      desc: 'Pick 2h, 4h, 8h, or outstation trip. Select Manual or Automatic transmission and specify pickup address and start time.',
      image: SERVICE_IMAGES.driverNight.image,
      fallback: SERVICE_IMAGES.driverNight.fallback,
      badge: 'Step 1: Duration Pick',
      badgeColor: 'bg-blue-600 text-white'
    },
    {
      num: '02',
      title: 'Verified Chauffeur Match',
      desc: 'Inspect chauffeur profiles, driving license verification badge, police verification clearance, customer ratings, and reviews.',
      image: SERVICE_IMAGES.driverCity.image,
      fallback: SERVICE_IMAGES.driverCity.fallback,
      badge: 'Step 2: Vetted Driver',
      badgeColor: 'bg-indigo-600 text-white'
    },
    {
      num: '03',
      title: 'Doorstep Arrival & Inspection',
      desc: 'Driver arrives in uniform at your doorstep. Conducts a quick 2-minute pre-trip vehicle walkaround checklist.',
      image: SERVICE_IMAGES.driverFullDay.image,
      fallback: SERVICE_IMAGES.driverFullDay.fallback,
      badge: 'Step 3: Doorstep Arrival',
      badgeColor: 'bg-purple-600 text-white'
    },
    {
      num: '04',
      title: 'Comfortable Ride & Review',
      desc: 'Relax in your own car while our professional handles city traffic or highways. Complete trip with 1-click digital checkout.',
      image: SERVICE_IMAGES.driverOutstation.image,
      fallback: SERVICE_IMAGES.driverOutstation.fallback,
      badge: 'Step 4: Relax & Arrive',
      badgeColor: 'bg-emerald-600 text-white'
    }
  ];

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-brand-100 text-brand-700 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Operational Flow</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            How Help On Drive Operates
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Engineered for lightning-fast dispatch, total driver accountability, and complete roadside safety.
          </p>

          {/* Workflow Mode Segmented Tabs */}
          <div className="pt-6 flex flex-col items-center space-y-3">
            <div className="inline-flex flex-wrap items-center justify-center p-1.5 rounded-2xl bg-slate-200/80 border border-slate-300/80 shadow-inner gap-1">
              <button
                type="button"
                onClick={() => setActiveTab('rsa')}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'rsa'
                    ? 'bg-brand-600 text-white shadow-md shadow-brand-500/30 scale-102 ring-2 ring-brand-500/20'
                    : 'text-slate-600 hover:text-brand-600 hover:bg-white/60'
                }`}
              >
                <Wrench className="w-4 h-4" />
                <span>Roadside Assistance Flow</span>
                {activeTab === 'rsa' && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse ml-1" />}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('driver')}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'driver'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30 scale-102 ring-2 ring-blue-500/20'
                    : 'text-slate-600 hover:text-blue-600 hover:bg-white/60'
                }`}
              >
                <UserCheck className="w-4 h-4" />
                <span>Hire Driver Flow</span>
                {activeTab === 'driver' && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse ml-1" />}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('partners')}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'partners'
                    ? 'bg-slate-900 text-white shadow-md shadow-slate-900/30 scale-102 ring-2 ring-slate-900/20'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>Workshop & Drivers Network</span>
                {activeTab === 'partners' && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse ml-1" />}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('sos')}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'sos'
                    ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30 scale-102 ring-2 ring-rose-500/20'
                    : 'text-slate-600 hover:text-rose-600 hover:bg-white/60'
                }`}
              >
                <Siren className="w-4 h-4" />
                <span>Emergency SOS Protocol</span>
                {activeTab === 'sos' && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse ml-1" />}
              </button>
            </div>

            {/* Active Workflow Tab Context Banner */}
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-xl bg-white border border-slate-200/90 shadow-sm text-xs">
              <span className="text-slate-400 font-medium">📍 Showing Workflow:</span>
              <span className="font-extrabold text-slate-800">
                {activeTab === 'rsa' && `Step-by-Step Roadside Breakdown Recovery (From Incident Pin to Fixed Car)`}
                {activeTab === 'driver' && `Step-by-Step Chauffeur Booking (From Tier Pick to Safe Destination)`}
                {activeTab === 'partners' && `Service Provider Flow (How Mechanics & Chauffeurs Earn & Fulfill Requests)`}
                {activeTab === 'sos' && `1-Click Emergency SOS Protocol (GPS Broadcast, Siren, Police & Family Alert)`}
              </span>
            </div>
          </div>
        </div>

        {/* Tab 1: Roadside Assistance Grid */}
        {activeTab === 'rsa' && (
          <div className="space-y-8 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {rsaSteps.map((st, idx) => (
                <TiltCard3D key={idx} maxTilt={10} scale={1.03}>
                  <div className="bg-white rounded-3xl border border-slate-200 hover:border-brand-500 shadow-md hover:shadow-xl transition-all overflow-hidden flex flex-col justify-between h-full group">
                    <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                      <img
                        src={st.image}
                        alt={st.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                        onError={(e) => { e.currentTarget.src = st.fallback; }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/30 to-transparent" />
                      
                      <div className="absolute top-3 left-3 translate-z-30">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow-md ${st.badgeColor}`}>
                          {st.badge}
                        </span>
                      </div>

                      <div className="absolute bottom-2 right-3 translate-z-20 text-3xl font-black text-white/80">
                        {st.num}
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <h3 className="font-extrabold text-base text-slate-900 mb-1">{st.title}</h3>
                        <p className="text-xs text-slate-500 leading-relaxed">{st.desc}</p>
                      </div>
                    </div>
                  </div>
                </TiltCard3D>
              ))}
            </div>

            <div className="text-center pt-4">
              <Link
                to="/user/roadside-assistance"
                className="inline-flex items-center space-x-2 px-6 py-3.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-2xl shadow-lg shadow-brand-500/25 transition-all hover:scale-105"
              >
                <Wrench className="w-4 h-4" />
                <span>Request Breakdown Assistance Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}

        {/* Tab 2: Chauffeur Hire Grid */}
        {activeTab === 'driver' && (
          <div className="space-y-8 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {driverSteps.map((st, idx) => (
                <TiltCard3D key={idx} maxTilt={10} scale={1.03}>
                  <div className="bg-white rounded-3xl border border-slate-200 hover:border-blue-500 shadow-md hover:shadow-xl transition-all overflow-hidden flex flex-col justify-between h-full group">
                    <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                      <img
                        src={st.image}
                        alt={st.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                        onError={(e) => { e.currentTarget.src = st.fallback; }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/30 to-transparent" />
                      
                      <div className="absolute top-3 left-3 translate-z-30">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow-md ${st.badgeColor}`}>
                          {st.badge}
                        </span>
                      </div>

                      <div className="absolute bottom-2 right-3 translate-z-20 text-3xl font-black text-white/80">
                        {st.num}
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <h3 className="font-extrabold text-base text-slate-900 mb-1">{st.title}</h3>
                        <p className="text-xs text-slate-500 leading-relaxed">{st.desc}</p>
                      </div>
                    </div>
                  </div>
                </TiltCard3D>
              ))}
            </div>

            <div className="text-center pt-4">
              <Link
                to="/user/hire-driver"
                className="inline-flex items-center space-x-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-2xl shadow-lg shadow-blue-500/25 transition-all hover:scale-105"
              >
                <UserCheck className="w-4 h-4" />
                <span>Book a Verified Personal Chauffeur</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}

        {/* Tab 3: Partner Onboarding */}
        {activeTab === 'partners' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
            <TiltCard3D maxTilt={6}>
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md space-y-6 h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
                    <UserCheck className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Join as a Professional Driver</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    Drive personal customer cars and earn up to ₹35,000/month with zero vehicle EMI or maintenance stress.
                  </p>
                  <ul className="space-y-2.5 text-xs text-slate-600">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      <span>Commercial driving license & 3+ years experience</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      <span>Flexible shifts (morning, evening, or outstation)</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      <span>Instant direct UPI / Bank account payouts</span>
                    </li>
                  </ul>
                </div>

                <Link
                  to="/become-driver"
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl text-center shadow-md transition-colors"
                >
                  Apply as Driver Partner
                </Link>
              </div>
            </TiltCard3D>

            <TiltCard3D maxTilt={6}>
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md space-y-6 h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-brand-100 text-brand-600 flex items-center justify-center mb-4">
                    <Wrench className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Register Garage or Tow Truck</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    Grow your workshop revenue by receiving high-margin emergency roadside calls in your geographical zone.
                  </p>
                  <ul className="space-y-2.5 text-xs text-slate-600">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      <span>Receive real-time distress alerts via Provider Portal</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      <span>Standardized guaranteed platform rate cards</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      <span>Dedicated partner support & transit insurance protection</span>
                    </li>
                  </ul>
                </div>

                <Link
                  to="/become-provider"
                  className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl text-center shadow-md transition-colors"
                >
                  Register Workshop / Towing Fleet
                </Link>
              </div>
            </TiltCard3D>
          </div>
        )}

        {/* Tab 4: Emergency SOS Architecture */}
        {activeTab === 'sos' && (
          <div className="bg-white rounded-3xl p-8 border-2 border-rose-200 shadow-xl space-y-8 animate-fade-in">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center">
                <Siren className="w-7 h-7 animate-pulse" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900">Life-Saving SOS Emergency Protocol</h3>
                <p className="text-xs text-slate-500">How our 1-Click panic system operates when danger is detected</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-rose-50/60 p-5 rounded-2xl border border-rose-100 space-y-2">
                <div className="text-rose-600 font-bold text-sm">1. High-Precision Geo-Lock</div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Browser fetches live GPS latitude & longitude via HTML5 Geolocation API with high accuracy mode enabled.
                </p>
              </div>
              <div className="bg-rose-50/60 p-5 rounded-2xl border border-rose-100 space-y-2">
                <div className="text-rose-600 font-bold text-sm">2. Priority WebSocket Broadcast</div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Socket.io broadcasts instant high-priority emergency payload to the 24/7 Admin Central Monitoring Room.
                </p>
              </div>
              <div className="bg-rose-50/60 p-5 rounded-2xl border border-rose-100 space-y-2">
                <div className="text-rose-600 font-bold text-sm">3. Police & Family Dispatch</div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Automated SMS & WhatsApp dispatch triggers live tracking links to saved emergency contacts and local highway patrol.
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
