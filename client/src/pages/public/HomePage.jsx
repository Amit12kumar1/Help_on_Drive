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
  MessageSquare,
  HelpCircle,
  X,
  Phone
} from 'lucide-react';

/**
 * ============================================================================
 * 🚗 HELP ON DRIVE - HOME PAGE
 * ============================================================================
 */
export default function HomePage() {
  const { isAuthenticated, user, login, logout } = useAuth();
  const navigate = useNavigate();
  const [sosModalOpen, setSosModalOpen] = useState(false);
  const [guideModalOpen, setGuideModalOpen] = useState(false);
  const [demoLoading, setDemoLoading] = useState(null);

  const handleQuickDemo = async (role) => {
    setDemoLoading(role);
    try {
      if (role === 'user') {
        await login('user@helpondrive.com', 'user123');
        navigate('/user');
      } else if (role === 'provider') {
        await login('provider@helpondrive.com', 'provider123');
        navigate('/provider');
      } else if (role === 'driver') {
        await login('driver@helpondrive.com', 'driver123');
        navigate('/driver');
      } else if (role === 'admin') {
        await login('admin@helpondrive.com', 'admin123');
        navigate('/admin');
      }
    } catch (err) {
      console.error('Demo login error:', err);
    } finally {
      setDemoLoading(null);
    }
  };

  // 6 Quick-Access Emergency Problems (English + Hindi for instant clarity)
  const quickProblems = [
    {
      id: 'puncture',
      icon: Zap,
      title: 'Flat Tyre / Puncture',
      hindi: 'टायर पंक्चर / स्टेपनी चेंज',
      eta: '~15 Mins',
      price: '₹299',
      badge: 'Popular',
      badgeColor: 'bg-blue-100 text-blue-800',
      iconBg: 'bg-blue-600 text-white',
      btnColor: 'bg-blue-600 hover:bg-blue-700 text-white',
      link: '/user/roadside-assistance?service=puncture'
    },
    {
      id: 'battery',
      icon: BatteryCharging,
      title: 'Battery Jump Start',
      hindi: 'कार बैटरी डाउन / जंपस्टार्ट',
      eta: '~15 Mins',
      price: '₹349',
      badge: 'Fast Boost',
      badgeColor: 'bg-emerald-100 text-emerald-800',
      iconBg: 'bg-emerald-600 text-white',
      btnColor: 'bg-emerald-600 hover:bg-emerald-700 text-white',
      link: '/user/roadside-assistance?service=battery'
    },
    {
      id: 'fuel',
      icon: Fuel,
      title: 'Emergency Fuel',
      hindi: 'पेट्रोल / डीजल खत्म (5L कैन)',
      eta: '~20 Mins',
      price: '₹199 + Fuel',
      badge: 'Safety Can',
      badgeColor: 'bg-rose-100 text-rose-800',
      iconBg: 'bg-rose-600 text-white',
      btnColor: 'bg-rose-600 hover:bg-rose-700 text-white',
      link: '/user/roadside-assistance?service=fuel'
    },
    {
      id: 'breakdown',
      icon: Wrench,
      title: 'Engine / Breakdown',
      hindi: 'गाड़ी स्टार्ट नहीं / खराबी',
      eta: '~18 Mins',
      price: '₹449',
      badge: 'Pro Mechanic',
      badgeColor: 'bg-brand-100 text-brand-800',
      iconBg: 'bg-brand-600 text-white',
      btnColor: 'bg-brand-600 hover:bg-brand-700 text-white',
      link: '/user/roadside-assistance?service=breakdown'
    },
    {
      id: 'towing',
      icon: Car,
      title: 'Flatbed Towing Truck',
      hindi: 'टोइंग वैन (गैरेज तक सुरक्षित)',
      eta: '~25 Mins',
      price: '₹999',
      badge: 'Zero-Drag',
      badgeColor: 'bg-purple-100 text-purple-800',
      iconBg: 'bg-purple-600 text-white',
      btnColor: 'bg-purple-600 hover:bg-purple-700 text-white',
      link: '/user/roadside-assistance?service=towing'
    },
    {
      id: 'driver',
      icon: UserCheck,
      title: 'Hire a Chauffeur',
      hindi: 'पर्सनल कार ड्राइवर (घंटे अनुसार)',
      eta: 'Instant',
      price: '₹120/hr',
      badge: 'Verified RTO',
      badgeColor: 'bg-amber-100 text-amber-800',
      iconBg: 'bg-amber-600 text-white',
      btnColor: 'bg-amber-600 hover:bg-amber-700 text-white',
      link: '/user/hire-driver'
    },
  ];

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
      {/* TOP DEMO SWITCHER BAR: 1-CLICK TEST AS ANY ROLE (VIVA DEFENSE & EASY TEST) */}
      {/* ========================================================================= */}
      <section className="bg-slate-900 text-white py-2.5 px-4 border-b border-slate-800 -mt-8 sm:-mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full bg-brand-500/20 text-brand-300 font-extrabold uppercase text-[10px] tracking-wider border border-brand-500/40 animate-pulse">
              ⚡ 1-Click Interactive Demo
            </span>
            <span className="text-slate-300 font-medium">
              {isAuthenticated ? (
                <span>
                  Logged in as <strong className="text-white">{user?.name}</strong> (<span className="text-brand-400 capitalize">{user?.role}</span>) — Switch Role:
                </span>
              ) : (
                <span>Test full platform live in 1-click without registering:</span>
              )}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => handleQuickDemo('user')}
              disabled={demoLoading !== null}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                user?.role === 'user'
                  ? 'bg-brand-600 text-white shadow-md'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700'
              }`}
            >
              <span>👤 Customer</span>
              {demoLoading === 'user' && <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />}
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemo('provider')}
              disabled={demoLoading !== null}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                user?.role === 'provider'
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700'
              }`}
            >
              <span>🔧 Mechanic</span>
              {demoLoading === 'provider' && <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />}
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemo('driver')}
              disabled={demoLoading !== null}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                user?.role === 'driver'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700'
              }`}
            >
              <span>👨‍✈️ Driver</span>
              {demoLoading === 'driver' && <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />}
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemo('admin')}
              disabled={demoLoading !== null}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                user?.role === 'admin'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700'
              }`}
            >
              <span>👑 Admin</span>
              {demoLoading === 'admin' && <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />}
            </button>

            {isAuthenticated && (
              <button
                type="button"
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className="px-2.5 py-1 rounded-xl bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 text-xs font-bold transition-colors ml-1 border border-rose-800/40"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </section>

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
      {/* 2. 1-TAP PROBLEM SELECTOR: AAPKO ABHI KYA MADAD CHAHIYE? */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-2xl border border-slate-800 relative overflow-hidden">
          {/* Subtle Background Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 relative z-10">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-black uppercase tracking-wider mb-2">
                <Siren className="w-3.5 h-3.5 animate-bounce" />
                <span>🚨 Instant 1-Tap Help (Aapko Kya Madad Chahiye?)</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Roadside Emergency? Tap Your Problem:
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
                Har kisi ke liye sabse aasan: Apni problem par click karein aur ~15 minute me verified mechanic ya personal chauffeur aapke paas hoga.
              </p>
            </div>

            {/* Quick Phone Call & SOS Chips */}
            <div className="flex flex-wrap items-center gap-2">
              <a
                href="tel:18001024357"
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center space-x-2 border border-slate-700 transition-colors shadow-sm"
              >
                <PhoneCall className="w-3.5 h-3.5 text-brand-400" />
                <span>Toll Free: 1800-HELP-DRIVE</span>
              </a>
              <button
                type="button"
                onClick={() => setSosModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs flex items-center space-x-2 shadow-lg shadow-rose-600/40 transition-all hover:scale-105"
              >
                <Siren className="w-3.5 h-3.5 animate-pulse" />
                <span>1-Tap SOS</span>
              </button>
            </div>
          </div>

          {/* 6 Quick Action Problem Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
            {quickProblems.map((prob) => {
              const IconComponent = prob.icon;
              return (
                <Link
                  key={prob.id}
                  to={isAuthenticated ? prob.link : `/login?redirect=${encodeURIComponent(prob.link)}`}
                  className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-brand-500 rounded-2xl p-4 sm:p-5 transition-all duration-300 hover:scale-[1.02] shadow-lg group flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className={`w-11 h-11 rounded-2xl ${prob.iconBg} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                        <IconComponent className="w-6 h-6 stroke-[2.2]" />
                      </div>
                      <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${prob.badgeColor}`}>
                        {prob.badge}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-extrabold text-base text-white group-hover:text-brand-400 transition-colors">
                        {prob.title}
                      </h3>
                      <p className="text-xs font-semibold text-amber-400/90 mt-0.5">
                        {prob.hindi}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-medium">Arrival & Cost</span>
                      <span className="text-xs font-black text-white">
                        {prob.eta} • <span className="text-brand-400">{prob.price}</span>
                      </span>
                    </div>
                    <span className={`px-3 py-1.5 rounded-xl ${prob.btnColor} text-xs font-extrabold shadow-sm flex items-center space-x-1 group-hover:translate-x-1 transition-transform`}>
                      <span>Book Now</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. HOW HELP ON DRIVE WORKS IN 3 SIMPLE STEPS (KAISE USE KAREIN) */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-lg">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold mb-2">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>Simple 3-Step Guide (Kaise Kaam Karta Hai)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Anyone Can Use Help On Drive in 3 Steps
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Bina kisi jhanjhat ke: 1-click booking, live GPS tracking aur transparent GST invoice
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Step 1 */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80 flex flex-col justify-between space-y-4 hover:border-brand-300 transition-colors">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-brand-600 text-white flex items-center justify-center font-black text-xl shadow-md shadow-brand-500/30">
                  1
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    Select Problem & Location
                  </h3>
                  <span className="text-xs font-semibold text-brand-600 block mt-0.5">
                    समस्या चुनें और लोकेशन दें
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Click any service above (puncture, battery, tow, fuel, or driver). The app automatically locks your device GPS coordinates or you can enter a landmark.
                </p>
              </div>
              <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
                <span className="font-bold text-slate-700">📍 Free GPS Auto-Detect</span>
                <span className="text-brand-600 font-extrabold">Instant</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80 flex flex-col justify-between space-y-4 hover:border-blue-300 transition-colors">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black text-xl shadow-md shadow-blue-500/30">
                  2
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    Nearest Expert Dispatched
                  </h3>
                  <span className="text-xs font-semibold text-blue-600 block mt-0.5">
                    नजदीकी मैकेनिक तुरंत रवाना
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our system assigns the closest verified mechanic or chauffeur in ~30 seconds. Watch them approach you in real-time on our live Leaflet tracking map with exact ETA.
                </p>
              </div>
              <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
                <span className="font-bold text-slate-700">🚗 Average 15-20 Min ETA</span>
                <span className="text-blue-600 font-extrabold">Live Map</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80 flex flex-col justify-between space-y-4 hover:border-emerald-300 transition-colors">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-black text-xl shadow-md shadow-emerald-500/30">
                  3
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    Fix Done & Transparent Invoice
                  </h3>
                  <span className="text-xs font-semibold text-emerald-600 block mt-0.5">
                    काम पूरा, फिक्स्ड बिल और रसीद
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Vehicle repaired on spot or chauffeur completes trip. Pay fixed price via UPI, Card, or Cash, get digital GST tax invoice, and rate your expert with feedback tags.
                </p>
              </div>
              <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
                <span className="font-bold text-slate-700">🧾 Official GST Tax Invoice</span>
                <span className="text-emerald-600 font-extrabold">Zero Hidden Fees</span>
              </div>
            </div>
          </div>

          {/* Quick Guidance Footer Strip */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gradient-to-r from-slate-50 to-amber-50/50 p-4 rounded-2xl border border-slate-200/60">
            <div className="flex items-center space-x-3 text-xs text-slate-700">
              <Shield className="w-5 h-5 text-amber-500 flex-shrink-0" />
              <span>
                <strong>Highway Breakdown Protocol:</strong> Switch on hazard double indicators and stand safely behind highway metal crash barrier.
              </span>
            </div>
            <Link
              to="/faq?tab=road_safety"
              className="text-xs font-bold text-amber-700 hover:text-amber-800 bg-amber-100/80 hover:bg-amber-100 px-3.5 py-1.5 rounded-xl transition-colors whitespace-nowrap flex items-center space-x-1"
            >
              <span>Read Highway Safety Rules →</span>
            </Link>
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

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setSosModalOpen(true)}
                  className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md shadow-rose-600/30 transition-all hover:scale-[1.02]"
                >
                  <Siren className="w-4 h-4 animate-pulse" />
                  <span>Test Emergency SOS Flow</span>
                </button>
                <Link
                  to="/faq?tab=road_safety"
                  className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md shadow-amber-600/30 transition-all hover:scale-[1.02]"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Highway Safety Rules & Protocols →</span>
                </Link>
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

      {/* ========================================================================= */}
      {/* FLOATING QUICK HELP & HOW-TO-USE ASSISTANT BUTTON */}
      {/* ========================================================================= */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          type="button"
          onClick={() => setGuideModalOpen(true)}
          className="group flex items-center space-x-2 px-4 py-3 rounded-full bg-slate-900 hover:bg-brand-600 text-white font-extrabold text-xs shadow-2xl shadow-slate-900/40 hover:scale-105 active:scale-95 transition-all border border-slate-700"
          title="How to use Help On Drive"
        >
          <HelpCircle className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform" />
          <span>❓ Kaise Use Karein? (Guide)</span>
        </button>
      </div>

      {/* Quick Help Modal */}
      {guideModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5 animate-scaleUp relative">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-xl bg-brand-500 text-white flex items-center justify-center font-bold">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-base text-slate-900">How to Use Help On Drive</h3>
                  <p className="text-[11px] text-slate-500">Aam user ke liye aasan guide (Simple 4 Points)</p>
                </div>
              </div>
              <button
                onClick={() => setGuideModalOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              <div className="p-3.5 rounded-2xl bg-brand-50/70 border border-brand-100 space-y-1">
                <div className="font-extrabold text-brand-900 flex items-center justify-between">
                  <span className="flex items-center space-x-1.5">
                    <Wrench className="w-4 h-4 text-brand-600" />
                    <span>1. Gaadi Kharab / Breakdown Hai?</span>
                  </span>
                  <Link
                    to={isAuthenticated ? "/user/roadside-assistance" : "/login?redirect=/user/roadside-assistance"}
                    onClick={() => setGuideModalOpen(false)}
                    className="text-[11px] font-bold text-brand-700 hover:underline"
                  >
                    Open RSA →
                  </Link>
                </div>
                <p className="text-slate-600 leading-relaxed text-[11px]">
                  Home page par <strong>"Get Vehicle Breakdown Help"</strong> ya kisi bhi problem card (puncture, battery, tow, fuel) par click karein. Aapki GPS location auto-detect hogi aur 15 min me mechanic pahuchega.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100 space-y-1">
                <div className="font-extrabold text-blue-900 flex items-center justify-between">
                  <span className="flex items-center space-x-1.5">
                    <UserCheck className="w-4 h-4 text-blue-600" />
                    <span>2. Apni Car Ke Liye Driver Chahiye?</span>
                  </span>
                  <Link
                    to={isAuthenticated ? "/user/hire-driver" : "/login?redirect=/user/hire-driver"}
                    onClick={() => setGuideModalOpen(false)}
                    className="text-[11px] font-bold text-blue-700 hover:underline"
                  >
                    Hire Driver →
                  </Link>
                </div>
                <p className="text-slate-600 leading-relaxed text-[11px]">
                  <strong>"Hire Driver"</strong> tab dabayein. 2 ghante ke errand se lekar outstation trip tak verified RTO driver book karein sirf ₹120/hr se shuru.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-100 space-y-1">
                <div className="font-extrabold text-emerald-900 flex items-center justify-between">
                  <span className="flex items-center space-x-1.5">
                    <Fuel className="w-4 h-4 text-emerald-600" />
                    <span>3. Petrol Pump / EV Charger Khojna Hai?</span>
                  </span>
                  <a
                    href="#near-me-energy"
                    onClick={() => setGuideModalOpen(false)}
                    className="text-[11px] font-bold text-emerald-700 hover:underline"
                  >
                    View Radar →
                  </a>
                </div>
                <p className="text-slate-600 leading-relaxed text-[11px]">
                  Navbar me <strong>"Near Me"</strong> click karein. Aapke sabse najdeek ke petrol pumps aur EV fast charging stations map pe live dikhenge.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-rose-50/70 border border-rose-100 space-y-1">
                <div className="font-extrabold text-rose-900 flex items-center justify-between">
                  <span className="flex items-center space-x-1.5">
                    <Siren className="w-4 h-4 text-rose-600" />
                    <span>4. Highway Par Khatra / Emergency Hai?</span>
                  </span>
                  <button
                    onClick={() => {
                      setGuideModalOpen(false);
                      setSosModalOpen(true);
                    }}
                    className="text-[11px] font-bold text-rose-700 hover:underline"
                  >
                    Trigger SOS →
                  </button>
                </div>
                <p className="text-slate-600 leading-relaxed text-[11px]">
                  Red <strong>"SOS HELP"</strong> button dabayein. Turant Police (112), Ambulance (108) aur aapke family contacts ko exact GPS SMS alert chala jayega.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setGuideModalOpen(false)}
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs rounded-2xl shadow-md transition-colors"
              >
                Samajh Gaya, Shuru Karein! ✓
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Emergency SOS Modal Global Mount */}
      <EmergencySOSModal isOpen={sosModalOpen} onClose={() => setSosModalOpen(false)} />
    </div>
  );
}
