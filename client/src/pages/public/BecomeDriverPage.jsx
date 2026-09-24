import React from 'react';
import { Link } from 'react-router-dom';
import TiltCard3D from '../../components/common/TiltCard3D';
import { SERVICE_IMAGES } from '../../constants/serviceImages';
import {
  UserCheck,
  DollarSign,
  ShieldCheck,
  Clock,
  Calendar,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Award,
  Star
} from 'lucide-react';

/**
 * ============================================================================
 * 🚗 HELP ON DRIVE - BECOME A DRIVER PARTNER
 * ============================================================================
 */
export default function BecomeDriverPage() {
  return (
    <div className="py-12 bg-slate-50 min-h-screen space-y-16">
      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-950 via-blue-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl">
          <div className="max-w-2xl space-y-4 relative z-10">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-500/30">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>Earn Up To ₹35,000 / Month</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Drive Personal Cars. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                Zero Car EMI or Maintenance.
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
              Drive customer-owned sedans, SUVs, and luxury cars. You provide the driving skills; customers provide the vehicle, fuel, and toll taxes.
            </p>

            <div className="pt-2">
              <Link
                to="/register?role=driver"
                className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-600/30 inline-flex items-center space-x-2 transition-all hover:scale-105"
              >
                <UserCheck className="w-4 h-4" />
                <span>Register as Driver Partner</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Benefits with 3D Tilt */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Driver Partner Benefits</span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Why Drive With Help On Drive?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TiltCard3D maxTilt={8} scale={1.02}>
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md h-full space-y-4 text-center">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <DollarSign className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-base text-slate-900">Direct Daily Payouts</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Receive earnings directly to your UPI ID or bank account every evening with transparent trip logs.
              </p>
            </div>
          </TiltCard3D>

          <TiltCard3D maxTilt={8} scale={1.02}>
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md h-full space-y-4 text-center">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto shadow-sm">
                <Clock className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-base text-slate-900">Flexible Shifts</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Work when you choose. Accept 2-hour quick runs, 8-hour day shifts, or high-paying weekend outstations.
              </p>
            </div>
          </TiltCard3D>

          <TiltCard3D maxTilt={8} scale={1.02}>
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md h-full space-y-4 text-center">
              <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto shadow-sm">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-base text-slate-900">Zero Asset Liability</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                No car loans, no tyre replacements, no insurance premiums. Focus strictly on comfortable, safe driving.
              </p>
            </div>
          </TiltCard3D>
        </div>
      </section>

      {/* Eligibility Box */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 space-y-6">
          <h3 className="text-xl font-bold">Eligibility Requirements</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs text-slate-300">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Valid Indian Driving License (LMV)</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Minimum 2+ years verified driving</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Aadhaar & Police verification clean</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Smartphone with GPS capability</span>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
            <span className="text-xs text-slate-400">Onboarding takes only 5 minutes. Start earning today.</span>
            <Link
              to="/register?role=driver"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
            >
              Submit Driver Application
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
