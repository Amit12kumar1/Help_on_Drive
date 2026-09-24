import React from 'react';
import { Link } from 'react-router-dom';
import TiltCard3D from '../../components/common/TiltCard3D';
import { SERVICE_IMAGES } from '../../constants/serviceImages';
import {
  Wrench,
  TrendingUp,
  Users,
  MapPin,
  CheckCircle,
  ArrowRight,
  ShieldCheck,
  Building2,
  Car,
  Zap,
  BatteryCharging
} from 'lucide-react';

/**
 * ============================================================================
 * 🚗 HELP ON DRIVE - BECOME A SERVICE PROVIDER / WORKSHOP
 * ============================================================================
 */
export default function BecomeProviderPage() {
  return (
    <div className="py-12 bg-slate-50 min-h-screen space-y-16">
      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-950 via-amber-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl">
          <div className="max-w-2xl space-y-4 relative z-10">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
              <Building2 className="w-3.5 h-3.5 text-amber-400" />
              <span>Partner Garage & Fleet Network</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Grow Your Garage. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-300">
                Receive Breakdown Jobs Daily.
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
              Partner your automobile workshop, flatbed tow truck fleet, or mobile mechanic van with Help On Drive to receive high-margin emergency rescue calls in your territory.
            </p>

            <div className="pt-2">
              <Link
                to="/register?role=provider"
                className="px-6 py-3.5 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-amber-600/30 inline-flex items-center space-x-2 transition-all hover:scale-105"
              >
                <Wrench className="w-4 h-4" />
                <span>Register Workshop / Fleet</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Provider Benefits with 3D Tilt */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Workshop Advantages</span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Why Partner With Help On Drive?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TiltCard3D maxTilt={8} scale={1.02}>
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md h-full space-y-4 text-center">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto shadow-sm">
                <TrendingUp className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-base text-slate-900">Steady Breakdown Leads</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Receive real-time push alerts from stranded drivers within a 5-8 km radius with live GPS coordinates.
              </p>
            </div>
          </TiltCard3D>

          <TiltCard3D maxTilt={8} scale={1.02}>
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md h-full space-y-4 text-center">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <Users className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-base text-slate-900">Guaranteed Standard Tariffs</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Clear base diagnostic fees plus per-km transit allowances. Zero bargaining or delayed customer payments.
              </p>
            </div>
          </TiltCard3D>

          <TiltCard3D maxTilt={8} scale={1.02}>
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md h-full space-y-4 text-center">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto shadow-sm">
                <MapPin className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-base text-slate-900">Digital Provider Console</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Accept jobs, view customer location, navigate on map, and complete digital billing from any smartphone.
              </p>
            </div>
          </TiltCard3D>
        </div>
      </section>

      {/* Categories Accepted */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 space-y-6">
          <h3 className="text-xl font-bold">Supported Provider Categories</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs text-slate-300">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>Independent Automobile Garages</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>Hydraulic Flatbed Towing Operators</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>Battery Dealers & Jumpstart Boosters</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>Tyre Puncture & Wheel Alignment Centers</span>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
            <span className="text-xs text-slate-400">Zero joining fee for authorized vehicle workshops.</span>
            <Link
              to="/register?role=provider"
              className="px-6 py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
            >
              Register Workshop Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
