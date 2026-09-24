import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Wrench, UserCheck, ShieldAlert, CreditCard, Layers, Sparkles } from 'lucide-react';

export default function FAQPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
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
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'all'
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>All Questions ({faqs.length})</span>
            </button>

            <button
              type="button"
              onClick={() => { setActiveTab('rsa'); setOpenIdx(0); }}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
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
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
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
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
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
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
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
              {activeTab === 'rsa' && `Roadside Assistance & Breakdown Support FAQs`}
              {activeTab === 'driver' && `Chauffeur Hire & Personal Car Driving FAQs`}
              {activeTab === 'safety' && `Driver Vetting, Background Checks & SOS Emergency Protocol`}
              {activeTab === 'pricing' && `Transparent Rate Card, GST Billing & Payment Methods`}
            </span>
          </div>
        </div>

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
                className="w-full p-5 text-left flex justify-between items-center font-bold text-sm text-slate-800 hover:text-brand-600"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform ${
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
