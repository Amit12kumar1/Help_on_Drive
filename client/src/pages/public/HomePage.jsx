import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import EmergencySOSModal from '../../components/sos/EmergencySOSModal';
import TiltCard3D from '../../components/common/TiltCard3D';
import ExplodedCar3D from '../../components/home/ExplodedCar3D';
import NearMeEnergyFinder from '../../components/home/NearMeEnergyFinder';
import { SERVICE_IMAGES } from '../../constants/serviceImages';
import {
  Car,
  Wrench,
  UserCheck,
  BatteryCharging,
  Fuel,
  Key,
  ShieldCheck,
  Clock,
  MapPin,
  Siren,
  Star,
  ChevronRight,
  CheckCircle,
  ArrowRight,
  PhoneCall,
  Sparkles,
  Award,
  Zap,
  Shield,
  Compass,
  Navigation,
  MessageSquare
} from 'lucide-react';

/**
 * ============================================================================
 * 🚗 HELP ON DRIVE - HOME PAGE
 * ============================================================================
 * 
 * 🎓 Viva & Presentation Quick Defense:
 * 1. 3D Exploded-View Car Anatomy:
 *    - Uses hardware-accelerated CSS 3D matrix math (`perspective: 1200px`, `preserve-3d`).
 *    - Dynamically disassembles engine, battery, tyres, fuel/EV, and lockout components
 *      into 3D perspective space and smoothly reassembles them.
 * 2. Near-Me Fuel & EV Station Radar:
 *    - HTML5 Geolocation API with live Leaflet map polyline directions and Google Maps routing.
 * 3. Responsive 2-Column Split Hero Layout:
 *    - Side-by-side headline & actions on left, large 3D interactive visualizer on right.
 * ============================================================================
 */
export default function HomePage() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [sosModalOpen, setSosModalOpen] = useState(false);

  // 6 Core Roadside Assistance Offerings
  const rsaServices = [
    {
      id: 'breakdown',
      title: 'Vehicle Breakdown',
      desc: 'Engine stall, clutch failure, coolant leaks, and on-spot mechanical diagnosis.',
      icon: Wrench,
      meta: SERVICE_IMAGES.breakdown
    },
    {
      id: 'puncture',
      title: 'Tyre & Puncture Repair',
      desc: 'Tubeless puncture sealing, spare wheel replacement, and hydraulic jack assistance.',
      icon: Zap,
      meta: SERVICE_IMAGES.puncture
    },
    {
      id: 'battery',
      title: 'Battery Jump Start',
      desc: 'Dead battery boost, terminal cleaning, alternator check, and new battery replacement.',
      icon: BatteryCharging,
      meta: SERVICE_IMAGES.battery
    },
    {
      id: 'fuel',
      title: 'Emergency Fuel Delivery',
      desc: '5 litres of pure petrol or diesel delivered in certified safety canisters directly to you.',
      icon: Fuel,
      meta: SERVICE_IMAGES.fuel
    },
    {
      id: 'towing',
      title: 'Flatbed Towing Service',
      desc: 'Hydraulic carrier and under-lift tow trucks for zero-drag safe transport to workshop.',
      icon: Car,
      meta: SERVICE_IMAGES.towing
    },
    {
      id: 'lockout',
      title: 'Key Lockout Assistance',
      desc: 'Safe, non-destructive air-wedge unlocking when keys are left inside your car.',
      icon: Key,
      meta: SERVICE_IMAGES.lockout
    }
  ];

  // 4 Chauffeur Booking Tiers
  const chauffeurTiers = [
    {
      time: '2 Hours',
      title: 'Quick Errand Commute',
      price: '₹240',
      tag: 'City Run',
      desc: 'Market trips, doctor appointments, or quick city meetings in your personal car.',
      meta: SERVICE_IMAGES.driverNight
    },
    {
      time: '4 Hours',
      title: 'Half-Day Chauffeur',
      price: '₹480',
      tag: 'Best Value',
      desc: 'Shopping sprees, family functions, airport drop/pickup, and stress-free driving.',
      meta: SERVICE_IMAGES.driverCity
    },
    {
      time: '8-10 Hours',
      title: 'Full Day Corporate Chauffeur',
      price: '₹900',
      tag: 'Popular',
      desc: 'Full-day corporate schedule, client visits, and bumper-to-bumper office rush.',
      meta: SERVICE_IMAGES.driverFullDay
    },
    {
      time: 'Multi-Day',
      title: 'Outstation Roadtrip Specialist',
      price: 'From ₹900/day',
      tag: 'Highway Pro',
      desc: 'Scenic highway drives, hill stations, and long-distance family vacations.',
      meta: SERVICE_IMAGES.driverOutstation
    }
  ];

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* ========================================================================= */}
      {/* HERO SECTION: SIDE-BY-SIDE 2-COLUMN WITH 3D EXPLODED CAR VISUALIZER */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:py-20 bg-gradient-to-b from-brand-50/70 via-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Focused Copy & Core Call-to-Actions */}
            <div className="lg:col-span-5 space-y-6 text-left">
              {/* Badge - Core Focus Priority */}
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-brand-100 to-amber-100 border border-brand-200 text-brand-900 text-xs font-black tracking-wide shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-brand-600 animate-spin" style={{ animationDuration: '4s' }} />
                <span>🚗 India's #1 Emergency Roadside Assistance & Breakdown Network</span>
              </div>

              {/* Main Headline - Vehicle First */}
              <h1 className="text-4xl sm:text-5xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                Emergency Breakdown? <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-amber-600 to-orange-500">
                  Instant Vehicle Help.
                </span> <br />
                Dispatched in ~15 Mins.
              </h1>

              {/* Clean Subheadline */}
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-lg">
                Stranded with a puncture, dead battery, engine breakdown, or empty fuel tank? Help On Drive connects you immediately with certified on-spot mechanics and flatbed tow carriers. Need someone to drive your car? Verified personal chauffeurs available on demand.
              </p>

              {/* Dual Core CTA Action Buttons - Vehicle Breakdown is Primary Hero Button */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link
                  to={isAuthenticated ? "/user/roadside-assistance" : "/login?redirect=/user/roadside-assistance"}
                  className="px-6 py-4 bg-gradient-to-r from-brand-600 to-orange-600 hover:from-brand-700 hover:to-orange-700 text-white font-extrabold text-xs sm:text-sm rounded-2xl flex items-center justify-center space-x-2.5 shadow-xl shadow-brand-500/30 hover:scale-105 transition-all border border-brand-400/30"
                >
                  <Wrench className="w-4 h-4" />
                  <span>🚗 Get Vehicle Breakdown Help</span>
                  <span className="text-[10px] bg-white/25 px-2 py-0.5 rounded-full font-bold ml-1">
                    ~15 Min ETA
                  </span>
                </Link>

                <Link
                  to={isAuthenticated ? "/user/hire-driver" : "/login?redirect=/user/hire-driver"}
                  className="px-5 py-3.5 bg-white hover:bg-slate-100 text-slate-800 font-bold text-xs rounded-2xl flex items-center justify-center space-x-2 border border-slate-300 shadow-sm transition-all hover:scale-105"
                >
                  <UserCheck className="w-4 h-4 text-blue-600" />
                  <span>Hire a Chauffeur</span>
                  <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded-full font-semibold ml-1 text-slate-600">
                    ₹120/hr
                  </span>
                </Link>
              </div>

              {/* Key Platform Assurance Badges */}
              <div className="pt-3 grid grid-cols-2 sm:grid-cols-3 gap-3 border-t border-slate-200/80">
                <div className="flex items-center space-x-2 text-xs text-slate-700">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span className="font-semibold">Police Verified</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-slate-700">
                  <Clock className="w-4 h-4 text-brand-600 flex-shrink-0" />
                  <span className="font-semibold">18 Mins Arrival</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-slate-700">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500 flex-shrink-0" />
                  <span className="font-semibold">4.9★ Rated</span>
                </div>
              </div>

              {/* Fast Jump Link to Nearby Fuel / EV Finder */}
              <div className="pt-1">
                <a
                  href="#near-me-energy"
                  className="inline-flex items-center space-x-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3.5 py-1.5 rounded-xl border border-emerald-200/80 transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Check Nearby Petrol Pumps & EV Chargers Radar ↓</span>
                </a>
              </div>
            </div>

            {/* Right Column: Prominent 3D Exploded-View Vehicle Visualizer */}
            <div className="lg:col-span-7">
              <ExplodedCar3D />
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* NEW FEATURE: NEAR ME PETROL PUMP & EV FAST CHARGING STATION RADAR */}
      {/* ========================================================================= */}
      <section id="near-me-energy" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <NearMeEnergyFinder />
      </section>

      {/* ========================================================================= */}
      {/* 6 ROADSIDE ASSISTANCE SERVICES (3D TILT CARDS & SPECIFIC IMAGERY) */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">Instant Breakdown Support</span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Whatever The Breakdown, We’ve Got You Covered
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            No long waiting hours or arbitrary roadside charges. Transparent flat pricing with real-time GPS tracking.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rsaServices.map((srv) => (
            <TiltCard3D key={srv.id} maxTilt={8} scale={1.03}>
              <div className="bg-white rounded-3xl border border-slate-200 hover:border-brand-500 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between h-full group">
                {/* Service Image with 3D Parallax Badge */}
                <div className="relative h-44 w-full overflow-hidden bg-slate-950">
                  <img
                    src={srv.meta.image}
                    alt={srv.meta.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-90"
                    onError={(e) => { e.currentTarget.src = srv.meta.fallback; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/30 to-transparent" />

                  {/* 3D Floating Category Badge */}
                  <div className="absolute top-3 left-3 translate-z-30">
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold shadow-md ${srv.meta.badgeColor}`}>
                      {srv.meta.badge}
                    </span>
                  </div>

                  {/* Price Tag Overlay */}
                  <div className="absolute top-3 right-3 translate-z-30">
                    <span className="px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-white font-black text-xs border border-white/20">
                      {srv.meta.price}
                    </span>
                  </div>

                  {/* ETA Indicator */}
                  <div className="absolute bottom-3 left-3 translate-z-20 flex items-center space-x-1.5 text-[11px] text-white/90">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Arrival ETA: {srv.meta.eta}</span>
                  </div>
                </div>

                {/* Card Text Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-extrabold text-base text-slate-900 mb-1 group-hover:text-brand-600 transition-colors">
                      {srv.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {srv.desc}
                    </p>
                  </div>

                  <Link
                    to={isAuthenticated ? `/user/roadside-assistance?service=${srv.id}` : `/login?redirect=/user/roadside-assistance?service=${srv.id}`}
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-100 group-hover:bg-brand-600 text-slate-800 group-hover:text-white font-bold text-xs flex items-center justify-between transition-colors shadow-sm"
                  >
                    <span>Request Assistance</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </TiltCard3D>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4 CHAUFFEUR HIRE TIERS (3D TILT CARDS & LUXURY IMAGERY) */}
      {/* ========================================================================= */}
      <section className="bg-slate-900 text-white py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Flexible Chauffeur Hire</span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight mt-1">
              Your Car, Our Professional Driver
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Skip the stress of driving in bumper-to-bumper traffic, late-night events, or long highway roadtrips.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {chauffeurTiers.map((tier, idx) => (
              <TiltCard3D key={idx} maxTilt={10} scale={1.03}>
                <div className="bg-slate-800/90 rounded-3xl border border-slate-700 hover:border-blue-500 shadow-xl overflow-hidden flex flex-col justify-between h-full group">
                  {/* Chauffeur Image */}
                  <div className="relative h-36 w-full overflow-hidden bg-slate-950">
                    <img
                      src={tier.meta.image}
                      alt={tier.meta.alt}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80"
                      onError={(e) => { e.currentTarget.src = tier.meta.fallback; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

                    <div className="absolute top-3 left-3 translate-z-30">
                      <span className="px-2.5 py-0.5 rounded-full bg-blue-500 text-white text-[10px] font-bold uppercase tracking-wider shadow-md">
                        {tier.tag}
                      </span>
                    </div>

                    <div className="absolute bottom-2 left-3 translate-z-20">
                      <span className="text-lg font-black text-white">{tier.time}</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h4 className="font-bold text-sm text-white mb-1">{tier.title}</h4>
                      <p className="text-xs text-slate-400 leading-relaxed mb-3">{tier.desc}</p>
                      
                      <div className="text-2xl font-black text-blue-400">{tier.price}</div>
                      <span className="text-[10px] text-slate-500">+ transparent GST billing</span>
                    </div>

                    <Link
                      to={isAuthenticated ? "/user/hire-driver" : `/login?redirect=/user/hire-driver`}
                      className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl text-center shadow-md transition-colors"
                    >
                      Book Driver
                    </Link>
                  </div>
                </div>
              </TiltCard3D>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* HOW HELP ON DRIVE WORKS (3D VISUAL STEPS) */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">Effortless Experience</span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            How Help On Drive Works
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Seamless coordination from distress call to certified completion
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <TiltCard3D maxTilt={6}>
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md text-center space-y-4 h-full flex flex-col justify-between">
              <div>
                <div className="w-16 h-16 rounded-3xl bg-brand-100 text-brand-600 flex items-center justify-center font-black text-2xl mx-auto shadow-md mb-4 translate-z-20">
                  1
                </div>
                <h3 className="font-bold text-base text-slate-900 mb-2">Select Service & Location</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Choose your saved vehicle and service type. Use GPS auto-detect or place a precise pin on the interactive Leaflet map.
                </p>
              </div>
              <div className="pt-2 text-[11px] text-brand-600 font-bold">1-Click Auto Dispatch</div>
            </div>
          </TiltCard3D>

          <TiltCard3D maxTilt={6}>
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md text-center space-y-4 h-full flex flex-col justify-between">
              <div>
                <div className="w-16 h-16 rounded-3xl bg-blue-100 text-blue-600 flex items-center justify-center font-black text-2xl mx-auto shadow-md mb-4 translate-z-20">
                  2
                </div>
                <h3 className="font-bold text-base text-slate-900 mb-2">Live GPS Tracking & ETA</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  A certified nearby mechanic or chauffeur is dispatched. Watch their live location updates in real-time with accurate ETA.
                </p>
              </div>
              <div className="pt-2 text-[11px] text-blue-600 font-bold">Real-time WebSocket Sync</div>
            </div>
          </TiltCard3D>

          <TiltCard3D maxTilt={6}>
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md text-center space-y-4 h-full flex flex-col justify-between">
              <div>
                <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-black text-2xl mx-auto shadow-md mb-4 translate-z-20">
                  3
                </div>
                <h3 className="font-bold text-base text-slate-900 mb-2">Seamless Fix & Invoice</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Work completed safely with digital checklist. Pay securely via UPI, Card, or Cash and download an official GST tax invoice.
                </p>
              </div>
              <div className="pt-2 text-[11px] text-emerald-600 font-bold">Instant Digital Receipt</div>
            </div>
          </TiltCard3D>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SAFETY & TRUST PROMISE (3D PERSPECTIVE BANNER) */}
      {/* ========================================================================= */}
      <section className="bg-slate-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">Uncompromising Safety</span>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                Your Safety & Vehicle Protection is Our Highest Priority
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Whether you're stranded alone at 2 AM or handing your car keys to a temporary chauffeur, Help On Drive provides an end-to-end protective safety net.
              </p>

              <div className="space-y-3 text-xs text-slate-700">
                <div className="flex items-start space-x-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Background-Checked Partners</strong>: 100% verified commercial driving licenses and police verification records.</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Siren className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                  <span><strong>1-Click SOS Panic Button</strong>: Instant GPS coordinate broadcast to family contacts and local emergency authorities.</span>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Live Journey Sharing</strong>: Share real-time Leaflet tracking links with family members during any trip.</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setSosModalOpen(true)}
                  className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md shadow-rose-600/30 transition-all hover:scale-[1.02]"
                >
                  <Siren className="w-4 h-4 animate-pulse" />
                  <span>Test Emergency SOS Flow</span>
                </button>
              </div>
            </div>

            {/* 3D Visual Stats Card */}
            <TiltCard3D maxTilt={8} floatAnimation={true}>
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center space-x-2">
                    <Award className="w-5 h-5 text-amber-500" />
                    <span className="text-xs font-bold text-slate-800">Platform Performance Matrix</span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    99.8% On-Time
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center">
                    <div className="text-3xl font-black text-brand-600 mb-1">15,000+</div>
                    <div className="text-xs font-medium text-slate-600">Breakdown Rescues</div>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center">
                    <div className="text-3xl font-black text-blue-600 mb-1">500+</div>
                    <div className="text-xs font-medium text-slate-600">Vetted Drivers</div>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center">
                    <div className="text-3xl font-black text-emerald-600 mb-1">18 Mins</div>
                    <div className="text-xs font-medium text-slate-600">Average Arrival ETA</div>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center">
                    <div className="text-3xl font-black text-amber-500 mb-1">4.9 ★</div>
                    <div className="text-xs font-medium text-slate-600">Customer Rating</div>
                  </div>
                </div>
              </div>
            </TiltCard3D>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* VERIFIED CUSTOMER REVIEWS & FEEDBACK (REAL SERVICE EXPERIENCES) */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-3 shadow-sm">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>Verified Post-Service Reviews & Ratings</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Real Driver Rescues & Customer Feedback
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Every user receives a prompt to rate their mechanic or chauffeur directly after service completion with 1-tap feedback.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Review 1: Flat Tyre */}
          <TiltCard3D maxTilt={6}>
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md hover:shadow-xl transition-all h-full flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">
                    Tyre Puncture
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed italic">
                  "Stranded on Yamuna Expressway at 11 PM with a shredded rear tyre. Mechanic Arvind arrived in 17 minutes with hydraulic lift. Wheel changed safely. Lifesaver!"
                </p>
                <div className="flex flex-wrap gap-1">
                  <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium">⚡ 17-Min Arrival</span>
                  <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium">🔧 Pro Equipment</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 font-bold flex items-center justify-center text-xs">
                  RV
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Ramesh Verma</div>
                  <div className="text-[10px] text-slate-400">Hyundai Creta • Delhi NCR</div>
                </div>
              </div>
            </div>
          </TiltCard3D>

          {/* Review 2: Battery Jumpstart */}
          <TiltCard3D maxTilt={6}>
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md hover:shadow-xl transition-all h-full flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full">
                    Battery Jump
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed italic">
                  "Flight landed at 1 AM and car wouldn't crank at airport parking. Technician had a heavy-duty booster pack. Started in 2 minutes. Transparent ₹349 fee."
                </p>
                <div className="flex flex-wrap gap-1">
                  <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium">🔋 Instant Boost</span>
                  <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium">💯 Flat Rate</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-xs">
                  PN
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Priya Nair</div>
                  <div className="text-[10px] text-slate-400">Tata Nexon EV • Bangalore</div>
                </div>
              </div>
            </div>
          </TiltCard3D>

          {/* Review 3: Flatbed Towing */}
          <TiltCard3D maxTilt={6}>
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md hover:shadow-xl transition-all h-full flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full">
                    Flatbed Towing
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed italic">
                  "Radiator hose burst during peak traffic on Outer Ring Road. Tow truck arrived with hydraulic under-lift, loaded my SUV without a scratch. Highly recommended!"
                </p>
                <div className="flex flex-wrap gap-1">
                  <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium">🛡️ Zero Scratch</span>
                  <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium">📍 Live GPS Track</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 font-bold flex items-center justify-center text-xs">
                  VR
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Vikram Rathore</div>
                  <div className="text-[10px] text-slate-400">Mahindra XUV700 • Mumbai</div>
                </div>
              </div>
            </div>
          </TiltCard3D>

          {/* Review 4: Personal Chauffeur */}
          <TiltCard3D maxTilt={6}>
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md hover:shadow-xl transition-all h-full flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full">
                    Chauffeur
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed italic">
                  "Hired a driver for a 3-day family roadtrip to Jaipur. Verified commercial license, super courteous, smooth driving on highway. We relaxed the entire trip."
                </p>
                <div className="flex flex-wrap gap-1">
                  <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium">🤝 Polite & Verified</span>
                  <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium">🛣️ Highway Expert</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 font-bold flex items-center justify-center text-xs">
                  AM
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Ananya Mukherjee</div>
                  <div className="text-[10px] text-slate-400">Honda City • Jaipur Roadtrip</div>
                </div>
              </div>
            </div>
          </TiltCard3D>
        </div>

        {/* Post-Service Feedback Promotion Banner */}
        <div className="mt-10 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 rounded-3xl p-6 sm:p-8 text-white border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start space-x-2">
              <MessageSquare className="w-5 h-5 text-amber-400" />
              <h3 className="text-lg font-black tracking-tight text-white">Have You Used Help On Drive Recently?</h3>
            </div>
            <p className="text-xs text-slate-300">
              Submit your rating & review in 1 tap under <strong className="text-white">My Bookings</strong> to help fellow car owners find the best technicians.
            </p>
          </div>
          <Link
            to={isAuthenticated ? "/user/bookings" : "/login?redirect=/user/bookings"}
            className="px-6 py-3 bg-gradient-to-r from-brand-600 to-amber-500 hover:from-brand-700 hover:to-amber-600 text-white font-extrabold text-xs rounded-2xl shadow-lg shadow-brand-500/30 transition-all hover:scale-105 whitespace-nowrap flex items-center space-x-2"
          >
            <Star className="w-4 h-4 fill-white" />
            <span>Rate Past Service in My Bookings</span>
          </Link>
        </div>
      </section>

      {/* Emergency SOS Modal Global Mount */}
      <EmergencySOSModal isOpen={sosModalOpen} onClose={() => setSosModalOpen(false)} />
    </div>
  );
}
