import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import TiltCard3D from '../../components/common/TiltCard3D';
import { SERVICE_IMAGES } from '../../constants/serviceImages';
import {
  Car,
  UserCheck,
  Wrench,
  Lock,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Eye,
  EyeOff,
  Building2,
  Award
} from 'lucide-react';

/**
 * ============================================================================
 * 🚗 HELP ON DRIVE - MODERN SPLIT-SCREEN REGISTRATION PAGE
 * ============================================================================
 *
 * 🎓 Viva & Presentation Quick Defense:
 * 1. Multi-Role Registration Architecture:
 *    - Dynamically modifies payload and form fields depending on `role` state:
 *      - `user`: Standard customer registration with vehicle management.
 *      - `driver`: Requires commercial license number, driving experience, and hourly tariff.
 *      - `provider`: Requires business name and primary service specialty (Mechanic, Towing, etc.).
 * 2. Real-time Feedback & Validation:
 *    - Validates inputs before sending to `/api/auth/register`.
 *    - On successful registration, receives JWT token, stores in AuthContext,
 *      and routes directly to the corresponding role dashboard.
 * ============================================================================
 */
export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get('role') || 'user';

  const [role, setRole] = useState(initialRole);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('New Delhi');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Driver fields
  const [licenseNumber, setLicenseNumber] = useState('');
  const [experienceYears, setExperienceYears] = useState('3');
  const [hourlyRate, setHourlyRate] = useState('120');

  // Provider fields
  const [businessName, setBusinessName] = useState('');
  const [serviceType, setServiceType] = useState('Mechanic');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const payload = {
        name,
        email,
        phone,
        city,
        password,
        role,
        licenseNumber: role === 'driver' ? licenseNumber : undefined,
        experienceYears: Number(experienceYears),
        hourlyRate: role === 'driver' ? Number(hourlyRate) : undefined,
        businessName: role === 'provider' ? businessName : undefined,
        serviceType: role === 'provider' ? serviceType : undefined,
      };

      const data = await register(payload);

      // Redirect by role
      if (data.user.role === 'admin') navigate('/admin');
      else if (data.user.role === 'driver') navigate('/driver');
      else if (data.user.role === 'provider') navigate('/provider');
      else navigate('/user');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please check your inputs.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-5xl bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        
        {/* Left Side: 3D Visual Showcase (Visible on Large Screens) */}
        <div className="hidden lg:flex flex-col justify-between p-10 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white relative overflow-hidden">
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-brand-600/15 rounded-full blur-3xl pointer-events-none" />

          {/* Brand Logo */}
          <div className="relative z-10">
            <Link to="/" className="inline-flex items-center space-x-2.5 flex-shrink-0 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30 flex-shrink-0">
                <Car className="w-5 h-5 text-white stroke-[2.2]" />
              </div>
              <span className="text-lg font-black tracking-tight text-white whitespace-nowrap">
                Help on <span className="text-blue-400">Drive</span>
              </span>
            </Link>
          </div>

          {/* 3D Showcase Card */}
          <div className="relative z-10 my-8">
            <TiltCard3D maxTilt={10} floatAnimation={true}>
              <div className="bg-slate-800/80 backdrop-blur-md rounded-3xl border border-slate-700/80 p-6 shadow-2xl space-y-4">
                <div className="relative h-44 rounded-2xl overflow-hidden">
                  <img
                    src={role === 'driver' ? SERVICE_IMAGES.driverCity.image : role === 'provider' ? SERVICE_IMAGES.breakdown.image : SERVICE_IMAGES.driverNight.image}
                    alt="Network Showcase"
                    className="w-full h-full object-cover opacity-85 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />
                  <div className="absolute top-3 left-3 translate-z-30">
                    <span className="px-2.5 py-1 rounded-full bg-blue-600 text-white text-[10px] font-black uppercase tracking-wider shadow-md">
                      {role === 'driver' ? 'Driver Partner Network' : role === 'provider' ? 'Workshop Partner Network' : 'Customer Account'}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 translate-z-20 text-xs font-bold text-white">
                    {role === 'driver' ? 'Earn up to ₹35,000/month driving personal cars' : role === 'provider' ? 'Receive daily emergency rescue calls' : '24/7 Roadside Assistance & Chauffeurs'}
                  </div>
                </div>

                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Instant account activation & digital dashboard</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Live GPS tracking & emergency SOS integration</span>
                  </div>
                </div>
              </div>
            </TiltCard3D>
          </div>

          {/* Bottom Security */}
          <div className="relative z-10 flex items-center space-x-2 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>Government Verified RTO & Commercial Standards</span>
          </div>
        </div>

        {/* Right Side: Registration Form */}
        <div className="p-8 sm:p-12 flex flex-col justify-between space-y-6">
          <div className="space-y-5">
            <div>
              <div className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[11px] font-bold mb-2">
                <Sparkles className="w-3 h-3 text-blue-600" />
                <span>Join Help On Drive Network</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Create Your Account
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Select your account role and enter your details below
              </p>
            </div>

            {/* Role Selection Segmented Tabs */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label className="font-bold text-slate-700">Account Type (Select Role):</label>
                <span className="text-[11px] font-bold text-brand-600">
                  {role === 'user' && '👤 Personal Customer'}
                  {role === 'driver' && '👨‍✈️ Professional Driver'}
                  {role === 'provider' && '👨‍🔧 Garage / Workshop'}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 p-1.5 rounded-2xl bg-slate-100 border border-slate-200">
                <button
                  type="button"
                  onClick={() => setRole('user')}
                  className={`p-3 rounded-xl border text-center transition-all relative ${
                    role === 'user'
                      ? 'border-brand-500 bg-white text-brand-700 font-extrabold shadow-md ring-2 ring-brand-500/20'
                      : 'border-transparent text-slate-600 hover:bg-white/60 font-semibold'
                  }`}
                >
                  <Car className={`w-5 h-5 mx-auto mb-1 ${role === 'user' ? 'text-brand-600' : 'text-slate-400'}`} />
                  <span className="text-xs block">Car Owner</span>
                  {role === 'user' && (
                    <span className="inline-flex items-center text-[10px] text-brand-600 font-bold mt-0.5">
                      ✓ Active
                    </span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setRole('driver')}
                  className={`p-3 rounded-xl border text-center transition-all relative ${
                    role === 'driver'
                      ? 'border-blue-500 bg-white text-blue-700 font-extrabold shadow-md ring-2 ring-blue-500/20'
                      : 'border-transparent text-slate-600 hover:bg-white/60 font-semibold'
                  }`}
                >
                  <UserCheck className={`w-5 h-5 mx-auto mb-1 ${role === 'driver' ? 'text-blue-600' : 'text-slate-400'}`} />
                  <span className="text-xs block">Chauffeur</span>
                  {role === 'driver' && (
                    <span className="inline-flex items-center text-[10px] text-blue-600 font-bold mt-0.5">
                      ✓ Active
                    </span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setRole('provider')}
                  className={`p-3 rounded-xl border text-center transition-all relative ${
                    role === 'provider'
                      ? 'border-amber-500 bg-white text-amber-700 font-extrabold shadow-md ring-2 ring-amber-500/20'
                      : 'border-transparent text-slate-600 hover:bg-white/60 font-semibold'
                  }`}
                >
                  <Wrench className={`w-5 h-5 mx-auto mb-1 ${role === 'provider' ? 'text-amber-600' : 'text-slate-400'}`} />
                  <span className="text-xs block">Workshop</span>
                  {role === 'provider' && (
                    <span className="inline-flex items-center text-[10px] text-amber-700 font-bold mt-0.5">
                      ✓ Active
                    </span>
                  )}
                </button>
              </div>

              {/* Explanatory Role Chip */}
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px] text-slate-600 flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                <span>
                  {role === 'user' && 'Create your customer account to add cars & request emergency assistance or drivers.'}
                  {role === 'driver' && 'Register your commercial driver profile to receive verified driving trips in customer cars.'}
                  {role === 'provider' && 'Enroll your repair garage or towing fleet to accept emergency breakdown dispatches.'}
                </span>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-medium text-center">
                {error}
              </div>
            )}

            {/* Dynamic Form */}
            <form onSubmit={handleRegister} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                  <input
                    required
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ramesh Sharma"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-brand-500 focus:bg-white font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      required
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-brand-500 focus:bg-white font-medium"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ramesh@example.com"
                      className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-brand-500 focus:bg-white font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">City</label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      required
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="New Delhi"
                      className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-brand-500 focus:bg-white font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Driver Specific Fields */}
              {role === 'driver' && (
                <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-2xl space-y-3">
                  <div className="text-[11px] font-bold text-blue-900 flex items-center space-x-1">
                    <Award className="w-3.5 h-3.5 text-blue-600" />
                    <span>Commercial Driving Credentials</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-700 mb-1">License No (DL)</label>
                      <input
                        required
                        type="text"
                        value={licenseNumber}
                        onChange={(e) => setLicenseNumber(e.target.value)}
                        placeholder="DL-0420180012345"
                        className="w-full px-2.5 py-2 bg-white border border-slate-200 rounded-lg text-xs outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-700 mb-1">Experience (Yrs)</label>
                      <input
                        required
                        type="number"
                        min="1"
                        value={experienceYears}
                        onChange={(e) => setExperienceYears(e.target.value)}
                        className="w-full px-2.5 py-2 bg-white border border-slate-200 rounded-lg text-xs outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-700 mb-1">Rate (₹/hr)</label>
                      <input
                        required
                        type="number"
                        min="80"
                        value={hourlyRate}
                        onChange={(e) => setHourlyRate(e.target.value)}
                        className="w-full px-2.5 py-2 bg-white border border-slate-200 rounded-lg text-xs outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Provider Specific Fields */}
              {role === 'provider' && (
                <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-2xl space-y-3">
                  <div className="text-[11px] font-bold text-amber-900 flex items-center space-x-1">
                    <Building2 className="w-3.5 h-3.5 text-amber-600" />
                    <span>Workshop / Fleet Information</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-700 mb-1">Business / Garage Name</label>
                      <input
                        required
                        type="text"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        placeholder="SpeedFix Automobile Works"
                        className="w-full px-2.5 py-2 bg-white border border-slate-200 rounded-lg text-xs outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-700 mb-1">Primary Specialty</label>
                      <select
                        value={serviceType}
                        onChange={(e) => setServiceType(e.target.value)}
                        className="w-full px-2.5 py-2 bg-white border border-slate-200 rounded-lg text-xs outline-none"
                      >
                        <option value="Mechanic">Mobile Automobile Mechanic</option>
                        <option value="Towing">Flatbed Towing Carrier</option>
                        <option value="Battery">Battery Dealer & Jumpstart</option>
                        <option value="Tyre">Tyre Puncture & Wheel Alignment</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Create Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    required
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimum 6 characters"
                    className="w-full pl-9 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-brand-500 focus:bg-white font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-brand-600/25 transition-all flex items-center justify-center space-x-2 mt-2"
              >
                {loading ? (
                  <span>Registering Profile...</span>
                ) : (
                  <>
                    <span>Create {role === 'driver' ? 'Chauffeur' : role === 'provider' ? 'Partner' : 'Member'} Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="pt-3 border-t border-slate-100 text-center text-xs text-slate-500">
            <span>Already have an account? </span>
            <Link to="/login" className="font-bold text-brand-600 hover:underline">
              Sign In
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
