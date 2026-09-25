import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  ChevronDown,
  HelpCircle,
  Wrench,
  UserCheck,
  ShieldAlert,
  CreditCard,
  Layers,
  Sparkles,
  Shield
} from 'lucide-react';

export default function FAQPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlTab = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState(urlTab || 'road_safety');
  const [openIdx, setOpenIdx] = useState(0);

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) {
      setActiveTab(tab);
      setOpenIdx(0);
    }
  }, [searchParams]);

  const faqs = [
    // ROAD SAFETY & HIGHWAY RULES
    {
      category: 'road_safety',
      q: 'What immediate safety steps should I take if my vehicle stalls or breaks down on a highway or expressway?',
      a: 'Follow these 5 immediate safety protocols: 1) Switch on Hazard Warning Lights (Double indicators) instantly. 2) Steer the vehicle gently to the leftmost shoulder lane or hard shoulder—never stop in an active driving lane. 3) Place your red reflective warning hazard triangle 50 to 100 meters behind your car to give oncoming high-speed traffic sufficient reaction time. 4) All passengers and driver must exit from the left side (away from traffic) and stand safely BEHIND the metal highway crash barrier. Never sit inside a stalled vehicle on an expressway. 5) Open Help On Drive and request on-spot assistance or call our 24/7 hotline 1800-435-737.'
    },
    {
      category: 'road_safety',
      q: 'How should a driver safely handle a sudden tyre burst at highway speeds?',
      a: '1) NEVER slam on the brakes abruptly—locking wheels during a blowout causes instantaneous spinouts and roll-overs. 2) Firmly grip the steering wheel with both hands at the 9 and 3 o’clock position to keep the car tracking straight. 3) Gently ease off the accelerator pedal and allow engine braking to decelerate the vehicle naturally. 4) Once your speed drops below 40 km/h, gently apply brakes, engage the left indicator, and guide the car onto the emergency shoulder. 5) Dispatch our rapid tyre replacement technician via the Help On Drive app.'
    },
    {
      category: 'road_safety',
      q: 'What is the "Golden Hour" in road safety, and how does Help On Drive SOS assist?',
      a: 'The "Golden Hour" refers to the first 60 minutes following a traumatic road injury where prompt medical care offers the highest probability of saving lives and preventing permanent disability. Clicking the Help On Drive 1-Tap SOS button instantly locks your precise device GPS coordinates, broadcasts real-time location SMS alerts to your registered family emergency contacts, and provides direct connections to Government Highway Emergency Helplines (112 Police, 108 Ambulance, 1033 NHAI).'
    },
    {
      category: 'road_safety',
      q: 'What precautions are critical for safe driving at night and in heavy monsoon rains?',
      a: 'Night Driving: Always dip your headlights to low beam when following another vehicle or facing oncoming traffic to prevent blinding glare. Keep windscreens clean inside and out to eliminate halo refraction. Take a 15-minute break every 2 hours to prevent micro-sleep. Monsoon & Aquaplaning: Double your following distance (4-second rule). Ensure tyre tread depth is above 2mm to channel water away. Never drive through standing water if the flood level reaches the car wheel hub or exhaust pipe to avoid catastrophic engine hydrostatic lock.'
    },
    {
      category: 'road_safety',
      q: 'What is the essential "P-O-W-D-E-R" vehicle safety pre-drive check?',
      a: 'Before starting any long highway roadtrip, always run the standard P-O-W-D-E-R inspection: P (Petrol/Fuel/Battery Charge: minimum 50% or 60%+ EV charge), O (Oil: verify engine oil and brake fluid levels), W (Water: check coolant reservoir and windscreen wiper wash), D (Damage: inspect tyres for sidewall cuts, bulging, and cold PSI pressure), E (Electrics: verify all headlights, brake lights, and hazard flashers work), R (Rubber: check wiper blades for clean, streak-free wipes).'
    },
    {
      category: 'road_safety',
      q: 'What mandatory road safety equipment must every vehicle carry in India?',
      a: 'Under the Motor Vehicles Act and MoRTH safety guidelines, all four-wheelers must carry: 1) An ARAI-certified Reflective Red Warning Triangle. 2) A properly inflated Spare Wheel (Stepney) with working hydraulic jack and wheel wrench. 3) A certified In-Vehicle First Aid Kit. 4) A high-visibility reflective safety vest for highway roadside repairs. 5) A compact ABC-type fire extinguisher.'
    },

    // ROADSIDE ASSISTANCE
    {
      category: 'rsa',
      q: 'How fast will roadside assistance reach my breakdown location?',
      a: 'In urban city areas, our average response and arrival time is between 15 to 20 minutes. On major expressways and highway corridors, arrival takes approximately 25 to 35 minutes depending on distance.'
    },
    {
      category: 'driver',
      q: 'Can I hire a driver to drive my personal car for a multi-day trip?',
      a: 'Yes! Help On Drive allows you to hire verified chauffeurs for 2h, 4h, 8h, full-day, 2-day, 3-day, or 7-day outstation roadtrips. The driver is contracted specifically to drive your personal car.'
    },
    {
      category: 'safety',
      q: 'How are the drivers verified for safety?',
      a: 'All registered chauffeurs undergo mandatory 3-tier vetting: Commercial Driving License verification with RTO databases, background check / Aadhaar verification, and driving proficiency assessments.'
    },
    {
      category: 'pricing',
      q: 'How does the pricing engine calculate the final cost?',
      a: 'For Roadside Assistance: Base Diagnostic Charge + (Distance in km × Rate/km) + Service Specific Add-on + 18% GST. For Driver Booking: Hourly Rate × Duration + Platform Booking Fee + 5% GST. No hidden surge charges!'
    },
    {
      category: 'safety',
      q: 'How does the SOS Emergency button function?',
      a: 'Pressing the SOS button instantly acquires your device GPS coordinates, sounds an emergency alert siren, dispatches SMS notifications to your emergency contacts (Father, Mother, etc.), and flags an urgent priority alert across the Admin Control Center.'
    },
    {
      category: 'pricing',
      q: 'Do you provide a formal tax invoice for company claims?',
      a: 'Yes, every completed booking or assistance incident automatically generates a downloadable and printable GST tax invoice with full company details, breakdown of charges, and transaction IDs.'
    },
    {
      category: 'rsa',
      q: 'What should I do if my car battery dies in a basement parking?',
      a: 'Select Battery Jumpstart on Help On Drive. Our technicians carry portable high-amperage jumpstart power packs that do not require service vehicles to enter tight basement clearance heights.'
    },
    {
      category: 'driver',
      q: 'Are your chauffeurs trained for luxury & automatic cars?',
      a: 'Yes, you can filter drivers specifically trained on Automatic (CVT, DCT/DSG, Torque Converter) transmissions, luxury sedans, and high-end SUVs during chauffeur booking.'
    }
  ];

  const filteredFaqs = activeTab === 'all'
    ? faqs
    : faqs.filter(f => f.category === activeTab);

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-brand-100 text-brand-700 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Help Center & Knowledge Base</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Got questions about Help On Drive? Select a category tab below to find clear answers.
          </p>
        </div>

        {/* Category Tabs & Active Indicator */}
        <div className="flex flex-col items-center space-y-3">
          <div className="inline-flex flex-wrap items-center justify-center p-1.5 rounded-2xl bg-slate-200/80 border border-slate-300/80 shadow-inner gap-1">
            <button
              type="button"
              onClick={() => { setActiveTab('all'); setOpenIdx(0); }}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'all'
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>All ({faqs.length})</span>
            </button>

            {/* ROAD SAFETY TAB */}
            <button
              type="button"
              onClick={() => { setActiveTab('road_safety'); setOpenIdx(0); }}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'road_safety'
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'text-amber-800 hover:text-amber-900 hover:bg-amber-100/70 font-extrabold'
              }`}
            >
              <Shield className="w-3.5 h-3.5 text-amber-500" />
              <span>🛣️ Road Safety & Rules</span>
              <span className="text-[9px] bg-amber-100 text-amber-900 px-1.5 py-0.2 rounded-full font-bold ml-0.5">
                6 Rules
              </span>
            </button>

            <button
              type="button"
              onClick={() => { setActiveTab('rsa'); setOpenIdx(0); }}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'rsa'
                  ? 'bg-brand-600 text-white shadow-md'
                  : 'text-slate-600 hover:text-brand-600 hover:bg-white/60'
              }`}
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>Roadside Assistance</span>
            </button>

            <button
              type="button"
              onClick={() => { setActiveTab('driver'); setOpenIdx(0); }}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'driver'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-white/60'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Chauffeurs</span>
            </button>

            <button
              type="button"
              onClick={() => { setActiveTab('safety'); setOpenIdx(0); }}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'safety'
                  ? 'bg-rose-600 text-white shadow-md'
                  : 'text-slate-600 hover:text-rose-600 hover:bg-white/60'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Safety & SOS</span>
            </button>

            <button
              type="button"
              onClick={() => { setActiveTab('pricing'); setOpenIdx(0); }}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'pricing'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-600 hover:text-emerald-600 hover:bg-white/60'
              }`}
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Pricing & GST</span>
            </button>
          </div>

          {/* Active Tab Helper Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-xl bg-white border border-slate-200/90 shadow-sm text-xs">
            <span className="text-slate-400 font-medium">📍 Showing:</span>
            <span className="font-extrabold text-slate-800">
              {activeTab === 'all' && `All ${filteredFaqs.length} Frequently Asked Questions`}
              {activeTab === 'road_safety' && `Highway Breakdown Protocol, Tyre Safety & Road Safety Guidelines`}
              {activeTab === 'rsa' && `Roadside Assistance & Breakdown Support FAQs`}
              {activeTab === 'driver' && `Chauffeur Hire & Personal Car Driving FAQs`}
              {activeTab === 'safety' && `Driver Vetting, Background Checks & SOS Emergency Protocol`}
              {activeTab === 'pricing' && `Transparent Rate Card, GST Billing & Payment Methods`}
            </span>
          </div>
        </div>

        {/* ROAD SAFETY QUICK GOLDEN RULES HIGHLIGHT CARD (Shown on road_safety or all) */}
        {(activeTab === 'road_safety' || activeTab === 'all') && (
          <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-brand-600 rounded-3xl p-6 sm:p-7 text-white shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/20">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center font-bold text-lg">
                  🛡️
                </div>
                <div>
                  <h3 className="font-black text-base text-white">5 Golden Rules for Highway & Road Safety</h3>
                  <p className="text-[11px] text-white/80">Life-saving guidelines recommended by MoRTH & Help On Drive Safety Council</p>
                </div>
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider bg-black/30 px-2.5 py-1 rounded-full border border-white/20">
                Safety First
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
              <div className="bg-black/20 backdrop-blur-sm p-3 rounded-2xl border border-white/10 space-y-1">
                <span className="font-black text-amber-200 block text-xs">1. Never Sit in Stalled Car</span>
                <p className="text-[11px] text-white/90 leading-relaxed">
                  On highways, always exit and stand behind the metal crash barrier. 70% of highway rear-ends hit stalled cars.
                </p>
              </div>

              <div className="bg-black/20 backdrop-blur-sm p-3 rounded-2xl border border-white/10 space-y-1">
                <span className="font-black text-amber-200 block text-xs">2. 50m Hazard Triangle</span>
                <p className="text-[11px] text-white/90 leading-relaxed">
                  Place the reflective warning triangle 50-100m behind your vehicle so approaching cars at 100km/h have time to brake.
                </p>
              </div>

              <div className="bg-black/20 backdrop-blur-sm p-3 rounded-2xl border border-white/10 space-y-1">
                <span className="font-black text-amber-200 block text-xs">3. Tyre Burst: No Sudden Brake</span>
                <p className="text-[11px] text-white/90 leading-relaxed">
                  Keep steering straight, ease off the gas, and let engine braking slow you down before softly tapping brakes.
                </p>
              </div>

              <div className="bg-black/20 backdrop-blur-sm p-3 rounded-2xl border border-white/10 space-y-1">
                <span className="font-black text-amber-200 block text-xs">4. High-Beam Etiquette</span>
                <p className="text-[11px] text-white/90 leading-relaxed">
                  Always dip to low beam when following or facing oncoming traffic to prevent blinding fellow drivers.
                </p>
              </div>

              <div className="bg-black/20 backdrop-blur-sm p-3 rounded-2xl border border-white/10 space-y-1">
                <span className="font-black text-amber-200 block text-xs">5. Zero Drowsy Driving</span>
                <p className="text-[11px] text-white/90 leading-relaxed">
                  Feeling sleepy? Stop at a fuel plaza or hire an on-demand Help On Drive chauffeur instead of pushing through fatigue.
                </p>
              </div>

              <div className="bg-black/20 backdrop-blur-sm p-3 rounded-2xl border border-white/10 space-y-1">
                <span className="font-black text-amber-200 block text-xs">6. 1-Tap SOS Golden Hour</span>
                <p className="text-[11px] text-white/90 leading-relaxed">
                  Tap SOS button to broadcast exact GPS coordinates to family and connect instantly to 112 police and 108 ambulance.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow transition-all"
            >
              <button
                type="button"
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full p-4 sm:p-5 text-left flex justify-between items-center font-bold text-xs sm:text-sm text-slate-800 hover:text-brand-600"
              >
                <div className="flex items-center space-x-2.5 pr-2">
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${
                    faq.category === 'road_safety' ? 'bg-amber-500' :
                    faq.category === 'rsa' ? 'bg-brand-500' :
                    faq.category === 'driver' ? 'bg-blue-500' :
                    faq.category === 'safety' ? 'bg-rose-500' : 'bg-emerald-500'
                  }`} />
                  <span>{faq.q}</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform flex-shrink-0 ${
                    openIdx === idx ? 'rotate-180 text-brand-600' : ''
                  }`}
                />
              </button>
              {openIdx === idx && (
                <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
