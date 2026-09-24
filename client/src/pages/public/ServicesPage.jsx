import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
  Shield,
  Clock,
  ArrowRight,
  CheckCircle,
  Filter,
  Sparkles,
  Layers,
  UserCheck,
  CheckCircle2
} from 'lucide-react';

/**
 * ============================================================================
 * 🚗 HELP ON DRIVE - SERVICES CATALOG PAGE
 * ============================================================================
 *
 * 🎓 Viva & Presentation Quick Defense:
 * 1. Filtering Architecture:
 *    - `activeCategory` state ('all' | 'rsa' | 'driver') filter karta hai array ko
 *      seamlessly client-side bina server round-trip ke.
 * 2. 3D Tilt Integration:
 *    - Har service card `TiltCard3D` me wrapped hai with `scale={1.03}` aur `maxTilt={8}`.
 *    - Specular glare dynamic radial gradient ke through mouse follow karta hai.
 * 3. Mobile Responsiveness:
 *    - Grid layout automatic adapts: `grid-cols-1` on mobile, `md:grid-cols-2`, `lg:grid-cols-3`
 *      on wide desktop screens.
 * ============================================================================
 */
export default function ServicesPage() {
  const { isAuthenticated } = useAuth();
  const [activeCategory, setActiveCategory] = useState('all');

  const services = [
    {
      id: 'puncture',
      title: 'Flat Tyre & Puncture Repair',
      category: 'rsa',
      categoryLabel: 'Roadside Assistance',
      icon: Zap,
      baseFare: '₹199',
      eta: '15-20 mins',
      features: ['On-spot tubeless puncture sealing', 'Spare wheel replacement & balancing', 'Tyre air pressure optimization', 'Hydraulic jack lift support'],
      actionText: 'Book Puncture Service',
      link: '/user/roadside-assistance?service=puncture',
      meta: SERVICE_IMAGES.puncture
    },
    {
      id: 'battery',
      title: 'Battery Jump Start & Boost',
      category: 'rsa',
      categoryLabel: 'Roadside Assistance',
      icon: BatteryCharging,
      baseFare: '₹349',
      eta: '15-20 mins',
      features: ['Heavy-duty 1000A booster jumpstart', 'Alternator charging output diagnostic', 'Terminal corrosion cleaning & grease', 'Brand new battery replacement option'],
      actionText: 'Book Battery Jumpstart',
      link: '/user/roadside-assistance?service=battery',
      meta: SERVICE_IMAGES.battery
    },
    {
      id: 'fuel',
      title: 'Emergency Fuel Delivery',
      category: 'rsa',
      categoryLabel: 'Roadside Assistance',
      icon: Fuel,
      baseFare: '₹249',
      eta: '20 mins',
      features: ['5 Litres pure petrol/diesel delivered', 'Approved PESO safety jerrican dispensing', 'Fuel line & pump priming assistance', 'Standard fuel pump rates apply'],
      actionText: 'Get Fuel Delivery',
      link: '/user/roadside-assistance?service=fuel',
      meta: SERVICE_IMAGES.fuel
    },
    {
      id: 'towing',
      title: 'Flatbed & Underlift Towing',
      category: 'rsa',
      categoryLabel: 'Roadside Assistance',
      icon: Car,
      baseFare: '₹799',
      eta: '25-35 mins',
      features: ['Hydraulic zero-drag flatbed carrier', 'Safe wheel-lift towing for tight basements', 'Comprehensive transit damage cover', 'Drop directly to authorized workshop'],
      actionText: 'Call Tow Truck',
      link: '/user/roadside-assistance?service=towing',
      meta: SERVICE_IMAGES.towing
    },
    {
      id: 'lockout',
      title: 'Key Lockout Assistance',
      category: 'rsa',
      categoryLabel: 'Roadside Assistance',
      icon: Key,
      baseFare: '₹449',
      eta: '20 mins',
      features: ['Safe non-destructive vehicle door opening', 'Precision inflatable air-wedge tools', 'Zero glass or body scratch guarantee', 'Vehicle RC identity verification required'],
      actionText: 'Request Lockout Help',
      link: '/user/roadside-assistance?service=lockout',
      meta: SERVICE_IMAGES.lockout
    },
    {
      id: 'breakdown',
      title: 'Mechanical Breakdown & Minor Repair',
      category: 'rsa',
      categoryLabel: 'Roadside Assistance',
      icon: Wrench,
      baseFare: '₹399',
      eta: '20 mins',
      features: ['Engine stalling & overheating diagnosis', 'Fan belt, radiator & coolant inspection', 'Brake pad jamming release', 'Sensor & electrical relay check'],
      actionText: 'Request On-Spot Mechanic',
      link: '/user/roadside-assistance?service=breakdown',
      meta: SERVICE_IMAGES.breakdown
    },
    {
      id: 'driver-hourly',
      title: 'Hourly Chauffeur (2 to 8 Hours)',
      category: 'driver',
      categoryLabel: 'Hire a Driver',
      icon: Clock,
      baseFare: '₹120/hr',
      eta: 'Advance or 25 mins',
      features: ['City shopping, markets & medical visits', 'Late night party safe ride home', 'Manual & Automatic transmission pros', 'Uniformed, polite & verified drivers'],
      actionText: 'Hire Hourly Driver',
      link: '/user/hire-driver',
      meta: SERVICE_IMAGES.driverCity
    },
    {
      id: 'driver-outstation',
      title: 'Outstation & Multi-Day Driver',
      category: 'driver',
      categoryLabel: 'Hire a Driver',
      icon: Shield,
      baseFare: '₹900/day',
      eta: 'Scheduled Booking',
      features: ['Weekend family highway roadtrips', 'Hill station & expressway driving pro', '10-12 hours daily active drive duty', 'Police verified & clean criminal record'],
      actionText: 'Hire Outstation Chauffeur',
      link: '/user/hire-driver',
      meta: SERVICE_IMAGES.driverOutstation
    },
  ];

  // Filter list based on selected category
  const filteredServices = activeCategory === 'all'
    ? services
    : services.filter(s => s.category === activeCategory);

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-brand-100 text-brand-700 text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Complete Mobility Services Catalog</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Transparent Pricing. Verified Experts.
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Explore our standardized roadside emergency offerings and certified chauffeur booking tiers with live tracking.
          </p>

          {/* Interactive Category Filter Segmented Tabs */}
          <div className="pt-6 flex flex-col items-center space-y-3">
            <div className="inline-flex p-1.5 rounded-2xl bg-slate-200/80 border border-slate-300/80 shadow-inner">
              {/* All Services Tab */}
              <button
                type="button"
                onClick={() => setActiveCategory('all')}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
                  activeCategory === 'all'
                    ? 'bg-slate-900 text-white shadow-md scale-102 ring-2 ring-slate-900/10'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>All Services ({services.length})</span>
                {activeCategory === 'all' && <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse ml-1" />}
              </button>

              {/* Roadside Assistance Tab */}
              <button
                type="button"
                onClick={() => setActiveCategory('rsa')}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
                  activeCategory === 'rsa'
                    ? 'bg-brand-600 text-white shadow-md shadow-brand-500/30 scale-102 ring-2 ring-brand-500/20'
                    : 'text-slate-600 hover:text-brand-600 hover:bg-white/60'
                }`}
              >
                <Wrench className="w-3.5 h-3.5" />
                <span>Roadside Assistance (6)</span>
                {activeCategory === 'rsa' && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse ml-1" />}
              </button>

              {/* Hire Driver Tab */}
              <button
                type="button"
                onClick={() => setActiveCategory('driver')}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
                  activeCategory === 'driver'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30 scale-102 ring-2 ring-blue-500/20'
                    : 'text-slate-600 hover:text-blue-600 hover:bg-white/60'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Hire a Driver (2)</span>
                {activeCategory === 'driver' && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse ml-1" />}
              </button>
            </div>

            {/* Active Tab Indicator Bar */}
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-xl bg-white border border-slate-200/90 shadow-sm text-xs">
              <span className="text-slate-400 font-medium">📍 Showing:</span>
              <span className="font-extrabold text-slate-800">
                {activeCategory === 'all' && `All 8 Mobility Services (Breakdown Support & Chauffeurs)`}
                {activeCategory === 'rsa' && `6 Rapid Roadside Breakdown & Emergency Services (~15 Min ETA)`}
                {activeCategory === 'driver' && `2 Verified Personal Car Chauffeur Packages (₹120/hr - ₹900/day)`}
              </span>
            </div>
          </div>
        </div>

        {/* Services Cards Grid with 3D Tilt */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((srv) => (
            <TiltCard3D key={srv.id} maxTilt={9} scale={1.02}>
              <div className="bg-white rounded-3xl border border-slate-200 hover:border-brand-500 shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col justify-between h-full group">
                
                {/* Visual Imagery Container with 3D Badges */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                  <img
                    src={srv.meta.image}
                    alt={srv.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                    onError={(e) => { e.currentTarget.src = srv.meta.fallback; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/30 to-transparent" />

                  {/* Category Badge (Top Left) */}
                  <div className="absolute top-3 left-3 translate-z-30">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-md ${
                      srv.category === 'rsa' ? 'bg-brand-600 text-white' : 'bg-blue-600 text-white'
                    }`}>
                      {srv.categoryLabel}
                    </span>
                  </div>

                  {/* Pricing Badge (Top Right) */}
                  <div className="absolute top-3 right-3 translate-z-30">
                    <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md text-white font-black text-xs border border-white/20">
                      Starting {srv.baseFare}
                    </span>
                  </div>

                  {/* ETA Indicator (Bottom Left) */}
                  <div className="absolute bottom-3 left-3 translate-z-20 flex items-center space-x-1.5 text-[11px] text-slate-200">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>ETA: {srv.eta}</span>
                  </div>
                </div>

                {/* Card Content & Features */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-brand-600 transition-colors">
                      {srv.title}
                    </h3>

                    {/* Feature Checkmarks */}
                    <ul className="space-y-2.5 text-xs text-slate-600">
                      {srv.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start space-x-2">
                          <CheckCircle className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                            srv.category === 'rsa' ? 'text-brand-600' : 'text-blue-600'
                          }`} />
                          <span className="leading-snug">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Booking CTA Button */}
                  <Link
                    to={isAuthenticated ? srv.link : `/login?redirect=${encodeURIComponent(srv.link)}`}
                    className={`w-full py-3 px-4 rounded-xl text-white font-bold text-xs flex items-center justify-center space-x-2 transition-all shadow-md group-hover:scale-[1.01] ${
                      srv.category === 'rsa'
                        ? 'bg-brand-600 hover:bg-brand-700 shadow-brand-500/20'
                        : 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/20'
                    }`}
                  >
                    <span>{srv.actionText}</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </TiltCard3D>
          ))}
        </div>
      </div>
    </div>
  );
}
