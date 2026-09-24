import React, { useState, useEffect, useRef } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import EmergencySOSModal from '../components/sos/EmergencySOSModal';
import {
  Car,
  Wrench,
  UserCheck,
  Siren,
  Phone,
  ShieldCheck,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  LogOut,
  LayoutDashboard,
  Zap,
  BatteryCharging,
  Fuel,
  Key,
  Clock,
  Compass,
  Building2,
  Users,
  AlertTriangle,
  Sparkles,
  HelpCircle,
  Layers
} from 'lucide-react';

export default function PublicLayout() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sosModalOpen, setSosModalOpen] = useState(false);

  // Dropdown states for desktop
  const [activeDropdown, setActiveDropdown] = useState(null); // 'rsa' | 'how' | 'driver' | 'partner' | null
  const dropdownTimeoutRef = useRef(null);

  // Mobile Accordion toggles
  const [mobileRsaOpen, setMobileRsaOpen] = useState(false);
  const [mobileHowOpen, setMobileHowOpen] = useState(false);
  const [mobileDriverOpen, setMobileDriverOpen] = useState(false);
  const [mobilePartnerOpen, setMobilePartnerOpen] = useState(false);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  const handleMouseEnter = (menuName) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(menuName);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
  };

  const getDashboardLink = () => {
    if (!user) return '/login';
    if (user.role === 'admin') return '/admin';
    if (user.role === 'driver') return '/driver';
    if (user.role === 'provider') return '/provider';
    return '/user';
  };

  // Helper to get active page details and breadcrumb
  const getPageInfo = (pathname) => {
    if (pathname === '/roadside-assistance' || pathname.startsWith('/roadside-assistance')) {
      return { label: 'Roadside Assistance', icon: Wrench, color: 'text-brand-600', badge: 'Emergency Breakdown Recovery' };
    }
    if (pathname === '/hire-driver' || pathname.startsWith('/hire-driver')) {
      return { label: 'Hire a Chauffeur', icon: UserCheck, color: 'text-blue-600', badge: 'On-Demand Personal Drivers' };
    }
    if (pathname === '/services' || pathname.startsWith('/services')) {
      return { label: 'Services Catalog', icon: Layers, color: 'text-brand-600', badge: 'All Breakdown & Chauffeur Services' };
    }
    if (pathname === '/how-it-works' || pathname.startsWith('/how-it-works')) {
      return { label: 'How It Works', icon: HelpCircle, color: 'text-blue-600', badge: 'Interactive System Flow & Workflows' };
    }
    if (pathname === '/faq') {
      return { label: 'Frequently Asked Questions', icon: HelpCircle, color: 'text-brand-600', badge: 'Help Center & Knowledge Base' };
    }
    if (pathname === '/contact') {
      return { label: 'Contact Support', icon: Phone, color: 'text-emerald-600', badge: '24/7 Helpline & Assistance' };
    }
    if (pathname === '/become-driver') {
      return { label: 'Become a Driver Partner', icon: UserCheck, color: 'text-blue-600', badge: 'Driver Onboarding & Daily Earnings' };
    }
    if (pathname === '/become-provider') {
      return { label: 'Register Workshop / Garage', icon: Building2, color: 'text-amber-600', badge: 'Receive Breakdown Callouts' };
    }
    return null;
  };

  const activePageInfo = getPageInfo(location.pathname);

  // Roadside assistance catalog for dropdown
  const rsaDropdownServices = [
    { title: 'Tyre & Flat Puncture', desc: 'On-spot tubeless puncture sealing & wheel replacement', icon: Zap, color: 'text-blue-500 bg-blue-50', link: '/user/roadside-assistance?service=puncture' },
    { title: 'Battery Jumpstart', desc: 'Heavy duty boost cables, charging & alternator check', icon: BatteryCharging, color: 'text-emerald-500 bg-emerald-50', link: '/user/roadside-assistance?service=battery' },
    { title: 'Emergency Fuel Delivery', desc: '5L pure petrol/diesel delivered directly to car', icon: Fuel, color: 'text-rose-500 bg-rose-50', link: '/user/roadside-assistance?service=fuel' },
    { title: 'Flatbed Towing Service', desc: 'Safe hydraulic under-lift & flatbed tow carrier', icon: Car, color: 'text-purple-500 bg-purple-50', link: '/user/roadside-assistance?service=towing' },
    { title: 'Key Lockout Help', desc: 'Non-destructive door opening with zero car damage', icon: Key, color: 'text-amber-500 bg-amber-50', link: '/user/roadside-assistance?service=lockout' },
    { title: 'Mechanical Breakdown', desc: 'Overheating, clutch, radiator & on-spot minor repairs', icon: Wrench, color: 'text-orange-500 bg-orange-50', link: '/user/roadside-assistance?service=breakdown' },
  ];

  // How It Works items for dropdown
  const howItWorksWorkflows = [
    { title: 'For Vehicle Owners', desc: 'How to request breakdown help or hire an on-demand driver', icon: Car, color: 'text-brand-600 bg-brand-50', link: '/how-it-works#user' },
    { title: 'For Chauffeurs / Drivers', desc: 'How drivers accept trips, navigate, and get daily payouts', icon: UserCheck, color: 'text-blue-600 bg-blue-50', link: '/how-it-works#driver' },
    { title: 'For Workshop Garages', desc: 'How mechanics and towing providers receive emergency calls', icon: Wrench, color: 'text-amber-600 bg-amber-50', link: '/how-it-works#provider' },
    { title: 'Emergency SOS Protocol', desc: 'How 1-click GPS panic dispatch alerts family and police', icon: Siren, color: 'text-rose-600 bg-rose-50', link: '/how-it-works#sos' },
  ];

  // Chauffeur hire items for dropdown
  const chauffeurTiers = [
    { title: 'Quick Hourly (2 - 8 Hours)', desc: 'City errands, shopping, airport pickup & party commute', icon: Clock, price: 'From ₹120/hr', link: '/user/hire-driver' },
    { title: 'Full Day Chauffeur (10h)', desc: 'Full business day driving in your personal vehicle', icon: ShieldCheck, price: '₹900/day', link: '/user/hire-driver' },
    { title: 'Outstation Roadtrips', desc: 'Weekend getaways and multi-day holiday family vacations', icon: Compass, price: '₹1400/day', link: '/user/hire-driver' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      {/* ============================================================
          TOP ANNOUNCEMENT & EMERGENCY HOTLINE BAR
          ============================================================ */}
      <div className="bg-slate-950 text-white text-xs py-2 px-4 border-b border-slate-800/80 tracking-tight">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
            </span>
            <span className="text-slate-300 font-medium">
              <span className="text-brand-400 font-bold mr-1.5">🚗 Core Focus:</span> 
              India's #1 Emergency Roadside Assistance & Vehicle Breakdown Network | Rapid 15-Min On-Spot Mechanics
            </span>
          </div>

          <div className="hidden sm:flex items-center space-x-6 text-slate-300">
            <a
              href="tel:18001024357"
              className="flex items-center space-x-1.5 hover:text-white transition-colors group"
            >
              <Phone className="w-3.5 h-3.5 text-brand-500 group-hover:scale-110 transition-transform" />
              <span className="font-semibold">Toll Free: 1800-HELP-DRIVE (1800-435-737)</span>
            </a>
            <div className="flex items-center space-x-1 text-emerald-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Certified Mechanics & RTO Drivers</span>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================
          MAIN GLASSMORPHIC NAVIGATION BAR
          ============================================================ */}
      <nav className="sticky top-0 z-50 glass-modern border-b border-slate-200/80 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18">
            {/* Brand Logo - Compact Single-Line "Help on Drive" */}
            <Link to="/" className="flex items-center space-x-2.5 flex-shrink-0 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 via-orange-500 to-amber-400 flex items-center justify-center text-white shadow-md shadow-brand-500/25 group-hover:scale-105 group-hover:rotate-2 transition-transform flex-shrink-0">
                <Car className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="font-black text-lg tracking-tight text-slate-900 whitespace-nowrap">
                Help on <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-amber-500">Drive</span>
              </span>
            </Link>

            {/* Desktop Navigation with User-Friendly Compact Segmented Tab Bar */}
            <div className="hidden lg:flex items-center space-x-0.5 p-1 rounded-2xl bg-slate-100/90 border border-slate-200/80 text-xs font-semibold shadow-inner">
              {/* Home Tab */}
              <Link
                to="/"
                className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-xl whitespace-nowrap transition-all ${
                  location.pathname === '/'
                    ? 'bg-white text-slate-900 shadow-sm font-bold border border-slate-200/90'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                {location.pathname === '/' && <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />}
                <span>Home</span>
              </Link>

              {/* DROPDOWN 1: Roadside Assistance (Mega Menu) - PRIMARY FOCUS */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('rsa')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-xl whitespace-nowrap transition-all ${
                    location.pathname === '/roadside-assistance' || location.pathname.includes('/roadside-assistance')
                      ? 'bg-brand-600 text-white shadow-md font-bold'
                      : activeDropdown === 'rsa'
                      ? 'text-brand-700 bg-brand-50 font-bold'
                      : 'text-brand-700 font-bold hover:bg-brand-50/80'
                  }`}
                >
                  <Wrench className="w-3.5 h-3.5 text-brand-500" />
                  <span>Roadside Help</span>
                  <span className={`text-[8px] px-1 py-0.2 rounded-full uppercase tracking-wider font-extrabold ${
                    location.pathname === '/roadside-assistance' || location.pathname.includes('/roadside-assistance')
                      ? 'bg-white text-brand-700'
                      : 'bg-brand-100 text-brand-700'
                  }`}>
                    ★ Core
                  </span>
                  <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${activeDropdown === 'rsa' ? 'rotate-180' : 'opacity-70'}`} />
                </button>

                {/* Dropdown Menu Window */}
                {activeDropdown === 'rsa' && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-[620px] pt-3 animate-fadeIn z-50">
                    <div className="glass-dropdown rounded-3xl p-5 shadow-2xl border border-slate-200/90">
                      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                        <div>
                          <span className="text-xs font-extrabold text-slate-900 block">Emergency Roadside Recovery</span>
                          <span className="text-[11px] text-slate-400">Mobile mechanics & recovery trucks dispatched in ~15 minutes</span>
                        </div>
                        <Link
                          to="/roadside-assistance"
                          className="text-[11px] font-bold text-brand-600 hover:underline flex items-center"
                        >
                          <span>Explore RSA Page</span>
                          <ChevronRight className="w-3 h-3 ml-0.5" />
                        </Link>
                      </div>

                      {/* 2-Column Services Grid */}
                      <div className="grid grid-cols-2 gap-2.5">
                        {rsaDropdownServices.map((srv, idx) => (
                          <Link
                            key={idx}
                            to={isAuthenticated ? srv.link : `/login?redirect=${encodeURIComponent(srv.link)}`}
                            className="flex items-start space-x-3 p-3 rounded-2xl hover:bg-slate-100/80 border border-transparent hover:border-slate-200 transition-all group"
                          >
                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${srv.color} group-hover:scale-110 transition-transform`}>
                              <srv.icon className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-slate-900 group-hover:text-brand-600 transition-colors">
                                {srv.title}
                              </div>
                              <p className="text-[11px] text-slate-500 leading-tight mt-0.5 line-clamp-1">
                                {srv.desc}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>

                      {/* Bottom Banner */}
                      <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between bg-gradient-to-r from-brand-50 to-amber-50/50 p-3 rounded-2xl border border-brand-100/50">
                        <div className="flex items-center space-x-2">
                          <Sparkles className="w-4 h-4 text-brand-600" />
                          <span className="text-[11px] font-bold text-brand-900">
                            15-20 Min Average Fast Arrival Guarantee
                          </span>
                        </div>
                        <Link
                          to={isAuthenticated ? "/user/roadside-assistance" : "/login?redirect=/user/roadside-assistance"}
                          className="px-3 py-1 bg-brand-600 hover:bg-brand-700 text-white rounded-lg text-[11px] font-bold shadow-sm transition-colors"
                        >
                          Book On-Spot Mechanic
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* DROPDOWN 2: How It Works */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('how')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl transition-all ${
                    location.pathname.startsWith('/how-it-works')
                      ? 'bg-white text-blue-600 shadow-sm font-bold border border-blue-200'
                      : activeDropdown === 'how'
                      ? 'text-blue-600 bg-white/80 font-bold'
                      : 'text-slate-600 hover:text-blue-600 hover:bg-white/60'
                  }`}
                >
                  <HelpCircle className="w-3.5 h-3.5 text-blue-500" />
                  <span>How It Works</span>
                  {location.pathname.startsWith('/how-it-works') && (
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  )}
                  <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${activeDropdown === 'how' ? 'rotate-180 text-blue-600' : 'text-slate-400'}`} />
                </button>

                {activeDropdown === 'how' && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-[440px] pt-3 animate-fadeIn z-50">
                    <div className="glass-dropdown rounded-3xl p-5 shadow-2xl border border-slate-200/90 space-y-2">
                      <div className="pb-2 border-b border-slate-100 flex items-center justify-between">
                        <div>
                          <span className="text-xs font-extrabold text-slate-900 block">System Workflows</span>
                          <span className="text-[11px] text-slate-400">Step-by-step role guidance</span>
                        </div>
                        <Link to="/how-it-works" className="text-[11px] font-bold text-blue-600 hover:underline">
                          View Full Guide →
                        </Link>
                      </div>

                      {howItWorksWorkflows.map((item, idx) => (
                        <Link
                          key={idx}
                          to={item.link}
                          className="flex items-center space-x-3 p-2.5 rounded-2xl hover:bg-slate-100/80 border border-transparent hover:border-slate-200 transition-all group"
                        >
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${item.color} group-hover:scale-110 transition-transform`}>
                            <item.icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900 group-hover:text-brand-600 transition-colors">
                              {item.title}
                            </div>
                            <p className="text-[10px] text-slate-500 leading-tight">
                              {item.desc}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* DROPDOWN 3: Hire a Driver */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('driver')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-xl whitespace-nowrap transition-all ${
                    location.pathname === '/hire-driver' || location.pathname.includes('/hire-driver')
                      ? 'bg-white text-blue-600 shadow-sm font-bold border border-blue-200'
                      : activeDropdown === 'driver'
                      ? 'text-blue-600 bg-white/80 font-bold'
                      : 'text-slate-600 hover:text-blue-600 hover:bg-white/60'
                  }`}
                >
                  <UserCheck className="w-3.5 h-3.5 text-blue-500" />
                  <span>Hire Driver</span>
                  {(location.pathname === '/hire-driver' || location.pathname.includes('/hire-driver')) && (
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  )}
                  <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${activeDropdown === 'driver' ? 'rotate-180 text-blue-600' : 'text-slate-400'}`} />
                </button>

                {activeDropdown === 'driver' && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-[420px] pt-3 animate-fadeIn z-50">
                    <div className="glass-dropdown rounded-3xl p-5 shadow-2xl border border-slate-200/90 space-y-2">
                      <div className="pb-2 border-b border-slate-100 flex items-center justify-between">
                        <div>
                          <span className="text-xs font-extrabold text-slate-900 block">Personal Car Chauffeurs</span>
                          <span className="text-[11px] text-slate-400">Background-checked drivers</span>
                        </div>
                        <Link
                          to="/hire-driver"
                          className="text-[11px] font-bold text-blue-600 hover:underline flex items-center"
                        >
                          <span>Explore Chauffeur Page</span>
                          <ChevronRight className="w-3 h-3 ml-0.5" />
                        </Link>
                      </div>

                      {chauffeurTiers.map((tier, idx) => (
                        <Link
                          key={idx}
                          to={isAuthenticated ? tier.link : `/login?redirect=${encodeURIComponent(tier.link)}`}
                          className="flex items-center justify-between p-2.5 rounded-2xl hover:bg-blue-50/70 border border-transparent hover:border-blue-200 transition-all group"
                        >
                          <div className="flex items-center space-x-2.5">
                            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                              <tier.icon className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                                {tier.title}
                              </div>
                              <p className="text-[10px] text-slate-500 leading-tight">
                                {tier.desc}
                              </p>
                            </div>
                          </div>
                          <span className="text-xs font-black text-slate-900 ml-2 whitespace-nowrap">
                            {tier.price}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* All Services Catalog Tab */}
              <Link
                to="/services"
                className={`flex items-center space-x-1 px-3 py-2 rounded-xl transition-all ${
                  location.pathname === '/services'
                    ? 'bg-white text-slate-900 shadow-sm font-bold border border-slate-200/90'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                {location.pathname === '/services' && <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />}
                <span>Catalog</span>
              </Link>

              {/* Partners Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('partner')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  className={`flex items-center space-x-1 px-2 py-1.5 rounded-xl whitespace-nowrap transition-all ${
                    location.pathname === '/become-driver' || location.pathname === '/become-provider'
                      ? 'bg-white text-slate-900 shadow-sm font-bold border border-slate-200/90'
                      : activeDropdown === 'partner'
                      ? 'text-slate-900 bg-white/80 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  <Users className="w-3.5 h-3.5 text-slate-500" />
                  <span>Partners</span>
                  {(location.pathname === '/become-driver' || location.pathname === '/become-provider') && (
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                  )}
                  <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${activeDropdown === 'partner' ? 'rotate-180 text-slate-700' : 'text-slate-400'}`} />
                </button>

                {activeDropdown === 'partner' && (
                  <div className="absolute top-full right-0 w-[300px] pt-3 animate-fadeIn z-50">
                    <div className="glass-dropdown rounded-3xl p-4 shadow-2xl border border-slate-200/90 space-y-2">
                      <Link
                        to="/become-driver"
                        className="flex items-center space-x-3 p-3 rounded-2xl hover:bg-slate-100 transition-all group"
                      >
                        <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                          <UserCheck className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900">Become a Driver</div>
                          <p className="text-[10px] text-slate-500">Earn up to ₹35,000/month</p>
                        </div>
                      </Link>

                      <Link
                        to="/become-provider"
                        className="flex items-center space-x-3 p-3 rounded-2xl hover:bg-slate-100 transition-all group"
                      >
                        <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                          <Building2 className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900">Register Garage / Workshop</div>
                          <p className="text-[10px] text-slate-500">Get nearby breakdown calls</p>
                        </div>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Near Me (Fuel & EV) Radar Button */}
              <a
                href="/#near-me-energy"
                className="flex items-center space-x-1 px-2 py-1.5 rounded-xl whitespace-nowrap text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 font-bold transition-all border border-emerald-200/80 shadow-sm"
              >
                <Fuel className="w-3.5 h-3.5 text-emerald-600" />
                <span>Near Me</span>
              </a>

              {/* FAQ Tab */}
              <Link
                to="/faq"
                className={`flex items-center space-x-1 px-2 py-1.5 rounded-xl whitespace-nowrap transition-all ${
                  location.pathname === '/faq'
                    ? 'bg-white text-slate-900 shadow-sm font-bold border border-slate-200/90'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                {location.pathname === '/faq' && <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />}
                <span>FAQ</span>
              </Link>

              {/* Contact Tab */}
              <Link
                to="/contact"
                className={`flex items-center space-x-1 px-2 py-1.5 rounded-xl whitespace-nowrap transition-all ${
                  location.pathname === '/contact'
                    ? 'bg-white text-slate-900 shadow-sm font-bold border border-slate-200/90'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                {location.pathname === '/contact' && <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />}
                <span>Contact</span>
              </Link>
            </div>

            {/* Right Action CTA & Emergency SOS - flex-shrink-0 */}
            <div className="flex items-center space-x-2 flex-shrink-0">
              {/* Emergency SOS Panic Button */}
              <button
                onClick={() => setSosModalOpen(true)}
                className="relative group flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 text-white font-extrabold text-xs shadow-md shadow-rose-600/30 hover:scale-105 active:scale-95 transition-all whitespace-nowrap flex-shrink-0"
              >
                <Siren className="w-3.5 h-3.5 animate-bounce" />
                <span className="tracking-wide">SOS HELP</span>
              </button>

              {/* User Authentication state */}
              {isAuthenticated ? (
                <div className="flex items-center space-x-1.5 flex-shrink-0">
                  <Link
                    to={getDashboardLink()}
                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm transition-all whitespace-nowrap"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5 text-brand-400" />
                    <span>Dashboard ({user?.name?.split(' ')[0]})</span>
                  </Link>

                  <button
                    onClick={() => {
                      logout();
                      navigate('/');
                    }}
                    title="Sign Out"
                    className="p-1.5 rounded-xl border border-slate-200 text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="hidden sm:flex items-center space-x-1.5 flex-shrink-0">
                  <Link
                    to="/login"
                    className="px-3 py-1.5 text-xs font-bold text-slate-700 hover:text-brand-600 hover:bg-slate-100 rounded-xl transition-all whitespace-nowrap"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="px-3.5 py-1.5 text-xs font-extrabold bg-gradient-to-r from-brand-600 to-amber-500 hover:from-brand-700 hover:to-amber-600 text-white rounded-xl shadow-md shadow-brand-500/25 hover:scale-105 transition-all whitespace-nowrap"
                  >
                    Register
                  </Link>
                </div>
              )}

              {/* Mobile Drawer Trigger Hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-2xl text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* ============================================================
            MOBILE RESPONSIVE ACCORDION DRAWER
            ============================================================ */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white/98 backdrop-blur-xl border-b border-slate-200 px-4 py-4 space-y-2.5 text-xs animate-fadeIn max-h-[85vh] overflow-y-auto shadow-2xl">
            {/* Mobile Active Tab Location Chip */}
            <div className="p-3 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-between">
              <span className="text-[11px] font-medium text-slate-500">You are currently on:</span>
              <span className="text-xs font-black text-brand-600 flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
                <span>{activePageInfo ? activePageInfo.label : 'Home'}</span>
              </span>
            </div>

            {/* Home Link on Mobile */}
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`p-3 rounded-2xl border flex items-center justify-between font-bold transition-all ${
                location.pathname === '/'
                  ? 'border-brand-500 bg-brand-50 text-brand-700'
                  : 'border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span>🏠 Home</span>
              {location.pathname === '/' && <span className="text-[10px] bg-brand-600 text-white px-2 py-0.5 rounded-full">Active</span>}
            </Link>

            {/* Roadside Assistance Accordion - PRIMARY FOCUS */}
            <div className="border border-brand-300/80 rounded-2xl overflow-hidden bg-brand-50/30">
              <button
                type="button"
                onClick={() => setMobileRsaOpen(!mobileRsaOpen)}
                className="w-full p-3.5 flex items-center justify-between font-bold text-slate-900 text-left"
              >
                <div className="flex items-center space-x-2">
                  <Wrench className="w-4 h-4 text-brand-600" />
                  <span className="text-brand-900">Roadside Assistance</span>
                  <span className="text-[9px] bg-brand-600 text-white font-black px-1.5 py-0.5 rounded-full uppercase">
                    ★ Primary
                  </span>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${mobileRsaOpen ? 'rotate-180 text-brand-600' : ''}`} />
              </button>

              {mobileRsaOpen && (
                <div className="p-3 pt-0 space-y-1.5 border-t border-slate-100 bg-white">
                  <div className="pt-1 pb-1">
                    <Link
                      to="/roadside-assistance"
                      className="block text-center py-2 text-xs font-bold text-brand-600 bg-brand-50 hover:bg-brand-100 rounded-xl transition-colors"
                    >
                      Explore Roadside Assistance Page →
                    </Link>
                  </div>
                  {rsaDropdownServices.map((srv, idx) => (
                    <Link
                      key={idx}
                      to={isAuthenticated ? srv.link : `/login?redirect=${encodeURIComponent(srv.link)}`}
                      className="flex items-center space-x-2.5 p-2 rounded-xl hover:bg-slate-50 text-slate-700"
                    >
                      <srv.icon className="w-3.5 h-3.5 text-brand-600" />
                      <span className="font-semibold text-[11px]">{srv.title}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* How It Works Accordion */}
            <div className="border border-slate-200/80 rounded-2xl overflow-hidden bg-slate-50/50">
              <button
                type="button"
                onClick={() => setMobileHowOpen(!mobileHowOpen)}
                className="w-full p-3.5 flex items-center justify-between font-bold text-slate-900 text-left"
              >
                <div className="flex items-center space-x-2">
                  <HelpCircle className="w-4 h-4 text-blue-600" />
                  <span>How It Works & Workflows</span>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${mobileHowOpen ? 'rotate-180 text-blue-600' : ''}`} />
              </button>

              {mobileHowOpen && (
                <div className="p-3 pt-0 space-y-1.5 border-t border-slate-100 bg-white">
                  {howItWorksWorkflows.map((item, idx) => (
                    <Link
                      key={idx}
                      to={item.link}
                      className="flex items-center space-x-2.5 p-2 rounded-xl hover:bg-slate-50 text-slate-700"
                    >
                      <item.icon className="w-3.5 h-3.5 text-blue-600" />
                      <span className="font-semibold text-[11px]">{item.title}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Chauffeur Booking Accordion */}
            <div className="border border-slate-200/80 rounded-2xl overflow-hidden bg-slate-50/50">
              <button
                type="button"
                onClick={() => setMobileDriverOpen(!mobileDriverOpen)}
                className="w-full p-3.5 flex items-center justify-between font-bold text-slate-900 text-left"
              >
                <div className="flex items-center space-x-2">
                  <UserCheck className="w-4 h-4 text-emerald-600" />
                  <span>Hire a Chauffeur</span>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${mobileDriverOpen ? 'rotate-180 text-emerald-600' : ''}`} />
              </button>

              {mobileDriverOpen && (
                <div className="p-3 pt-0 space-y-1.5 border-t border-slate-100 bg-white">
                  <div className="pt-1 pb-1">
                    <Link
                      to="/hire-driver"
                      className="block text-center py-2 text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors"
                    >
                      Explore Hire a Driver Page →
                    </Link>
                  </div>
                  {chauffeurTiers.map((tier, idx) => (
                    <Link
                      key={idx}
                      to={isAuthenticated ? tier.link : `/login?redirect=${encodeURIComponent(tier.link)}`}
                      className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 text-slate-700"
                    >
                      <span className="font-semibold text-[11px]">{tier.title}</span>
                      <span className="font-bold text-slate-900 text-[10px]">{tier.price}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Direct Links */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <Link to="/become-driver" className="p-2.5 bg-slate-100 rounded-xl font-bold text-slate-700 text-center">
                Drive With Us
              </Link>
              <Link to="/become-provider" className="p-2.5 bg-slate-100 rounded-xl font-bold text-slate-700 text-center">
                Partner Garage
              </Link>
              <Link to="/faq" className="p-2.5 bg-slate-100 rounded-xl font-bold text-slate-700 text-center">
                FAQ
              </Link>
              <Link to="/contact" className="p-2.5 bg-slate-100 rounded-xl font-bold text-slate-700 text-center">
                Contact
              </Link>
            </div>

            {/* Auth Buttons for Mobile */}
            {!isAuthenticated && (
              <div className="pt-2 border-t border-slate-200/80 flex space-x-2">
                <Link to="/login" className="flex-1 py-2.5 text-center bg-slate-100 font-bold text-slate-800 rounded-xl">
                  Sign In
                </Link>
                <Link to="/register" className="flex-1 py-2.5 text-center bg-gradient-to-r from-brand-600 to-amber-500 font-bold text-white rounded-xl shadow-md">
                  Register
                </Link>
              </div>
            )}
          </div>
        )}
      </nav>

      {/* Active Tab & Page Location Breadcrumb Banner */}
      {activePageInfo && (
        <div className="bg-white/95 backdrop-blur-md border-b border-slate-200/90 py-2.5 px-4 shadow-xs sticky top-20 z-40 transition-all">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div className="flex items-center space-x-2 text-slate-500 font-medium">
              <Link to="/" className="hover:text-brand-600 font-bold transition-colors">Home</Link>
              <span className="text-slate-300">/</span>
              <span className="font-extrabold text-slate-900 flex items-center space-x-1.5">
                {React.createElement(activePageInfo.icon, { className: `w-3.5 h-3.5 ${activePageInfo.color}` })}
                <span>{activePageInfo.label}</span>
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-[11px] text-slate-400 hidden md:inline">Current Page:</span>
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-[11px] font-extrabold shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
                <span>Active Tab: {activePageInfo.label}</span>
                <span className="text-slate-400 font-normal">({activePageInfo.badge})</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Page Content Viewport */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Global Emergency SOS Panic Modal */}
      <EmergencySOSModal isOpen={sosModalOpen} onClose={() => setSosModalOpen(false)} />

      {/* ============================================================
          MODERN FOOTER
          ============================================================ */}
      <footer className="bg-slate-950 text-white pt-14 pb-8 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 pb-12 border-b border-slate-800">
            {/* Brand details */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-amber-400 flex items-center justify-center text-white font-bold shadow-md flex-shrink-0">
                  <Car className="w-5 h-5" />
                </div>
                <span className="font-extrabold text-base tracking-tight text-white whitespace-nowrap">
                  Help on <span className="text-brand-500">Drive</span>
                </span>
              </div>
              <p className="text-slate-400 leading-relaxed max-w-sm">
                India's trusted dual-service mobility platform. Instant emergency roadside assistance for breakdown recovery, and on-demand professional temporary chauffeurs to drive your personal car.
              </p>
              <div className="flex items-center space-x-3 text-slate-400 text-[11px]">
                <span className="flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>24x7 Emergency Patrol</span>
                </span>
                <span>•</span>
                <span>Verified Partners</span>
                <span>•</span>
                <span>Zero Hidden Tariffs</span>
              </div>
            </div>

            {/* Quick links */}
            <div>
              <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">Roadside Assistance</h4>
              <ul className="space-y-2 text-slate-400">
                <li><Link to="/roadside-assistance" className="hover:text-white transition-colors">Tyre Puncture Repair</Link></li>
                <li><Link to="/roadside-assistance" className="hover:text-white transition-colors">Battery Jumpstart</Link></li>
                <li><Link to="/roadside-assistance" className="hover:text-white transition-colors">Emergency Fuel Delivery</Link></li>
                <li><Link to="/roadside-assistance" className="hover:text-white transition-colors">Flatbed Towing Service</Link></li>
                <li><Link to="/roadside-assistance" className="hover:text-white transition-colors">Key Lockout & Mechanical</Link></li>
              </ul>
            </div>

            {/* Driver links */}
            <div>
              <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">Chauffeur Hire</h4>
              <ul className="space-y-2 text-slate-400">
                <li><Link to="/hire-driver" className="hover:text-white transition-colors">Quick 2/4/6/8 Hours</Link></li>
                <li><Link to="/hire-driver" className="hover:text-white transition-colors">Full Day Chauffeur</Link></li>
                <li><Link to="/hire-driver" className="hover:text-white transition-colors">Outstation & Multi-Day</Link></li>
                <li><Link to="/become-driver" className="hover:text-white transition-colors">Join as Driver</Link></li>
                <li><Link to="/become-provider" className="hover:text-white transition-colors">Register Garage</Link></li>
              </ul>
            </div>

            {/* Academic details */}
            <div>
              <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">Platform Details</h4>
              <ul className="space-y-2 text-slate-400">
                <li><Link to="/about" className="hover:text-white transition-colors">About Project</Link></li>
                <li><Link to="/how-it-works" className="hover:text-white transition-colors">System Workflow</Link></li>
                <li><Link to="/faq" className="hover:text-white transition-colors">FAQ & Support</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Emergency Dispatch</Link></li>
                <li className="pt-2 text-brand-400 font-mono text-[10px]">Academic Capstone 2026</li>
              </ul>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-slate-500 text-[11px] space-y-2 sm:space-y-0">
            <div>
              © 2026 HELP ON DRIVE Technologies. Developed with MERN Stack + Socket.IO + Leaflet.
            </div>
            <div className="flex space-x-4">
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
              <span>Safety Guidelines</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
