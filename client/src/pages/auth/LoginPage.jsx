import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import TiltCard3D from '../../components/common/TiltCard3D';
import { SERVICE_IMAGES } from '../../constants/serviceImages';
import {
  Car,
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  UserCheck,
  Wrench,
  Eye,
  EyeOff,
  Sparkles,
  CheckCircle2,
  Clock,
  Star
} from 'lucide-react';

/**
 * ============================================================================
 * 🚗 HELP ON DRIVE - MODERN SPLIT-SCREEN LOGIN PAGE
 * ============================================================================
 *
 * 🎓 Viva & Presentation Quick Defense:
 * 1. Role-Based Redirection:
 *    - After successful authentication via `/api/auth/login`, JWT token is stored
 *      in localStorage and user is redirected to their specific dashboard:
 *      - `user` -> `/user`
 *      - `driver` -> `/driver`
 *      - `provider` -> `/provider`
 *      - `admin` -> `/admin`
 * 2. 1-Click Demo Persona Switcher:
 *    - Allows examiners and evaluators to test all 4 platform roles instantly
 *      without typing mock passwords.
 * 3. Form UX:
 *    - Password show/hide toggle using React state `showPassword`.
 *    - Hardware-accelerated 3D visual showcase on desktop side.
 * ============================================================================
 */
export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectUrl = searchParams.get('redirect');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedDemoRole, setSelectedDemoRole] = useState(null);

  const navigateByRole = (role) => {
    if (redirectUrl) {
      navigate(redirectUrl);
    } else {
      if (role === 'admin') navigate('/admin');
      else if (role === 'driver') navigate('/driver');
      else if (role === 'provider') navigate('/provider');
      else navigate('/user');
    }
  };

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await login(email, password);
      navigateByRole(data.user.role);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = (demoEmail, demoPassword, roleKey) => {
    setSelectedDemoRole(roleKey);
    setEmail(demoEmail);
    setPassword(demoPassword);
    setLoading(true);
    setError('');

    login(demoEmail, demoPassword)
      .then((data) => {
        navigateByRole(data.user.role);
      })
      .catch((err) => {
        setError(err.response?.data?.message || 'Quick login failed.');
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-5xl bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        
        {/* Left Side: 3D Visual Showcase (Visible on Large Screens) */}
        <div className="hidden lg:flex flex-col justify-between p-10 bg-gradient-to-br from-slate-950 via-slate-900 to-brand-950 text-white relative overflow-hidden">
          {/* Ambient glow */}
          <div className="absolute top-10 left-10 w-72 h-72 bg-brand-600/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

          {/* Top Brand Logo */}
          <div className="relative z-10">
            <Link to="/" className="inline-flex items-center space-x-2.5 flex-shrink-0 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-amber-500 flex items-center justify-center shadow-lg shadow-brand-500/30 flex-shrink-0">
                <Car className="w-5 h-5 text-white stroke-[2.2]" />
              </div>
              <span className="text-lg font-black tracking-tight text-white whitespace-nowrap">
                Help on <span className="text-brand-400">Drive</span>
              </span>
            </Link>
          </div>

          {/* Center 3D Floating Showcase Card */}
          <div className="relative z-10 my-8">
            <TiltCard3D maxTilt={10} floatAnimation={true}>
              <div className="bg-slate-800/80 backdrop-blur-md rounded-3xl border border-slate-700/80 p-6 shadow-2xl space-y-4">
                <div className="relative h-44 rounded-2xl overflow-hidden">
                  <img
                    src={SERVICE_IMAGES.breakdown.image}
                    alt="Roadside Assistance Showcase"
                    className="w-full h-full object-cover opacity-85"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />
                  <div className="absolute top-3 left-3 translate-z-30">
                    <span className="px-2.5 py-1 rounded-full bg-brand-500 text-white text-[10px] font-black uppercase tracking-wider shadow-md">
                      Live Network Active
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 translate-z-20 text-xs font-bold text-white">
                    Emergency Dispatch & Chauffeurs
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-700/60 text-center">
                    <div className="text-base font-black text-brand-400">15-20 Min</div>
                    <div className="text-[10px] text-slate-400">Average Arrival</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-700/60 text-center">
                    <div className="text-base font-black text-emerald-400">100% Vetted</div>
                    <div className="text-[10px] text-slate-400">Verified Partners</div>
                  </div>
                </div>
              </div>
            </TiltCard3D>
          </div>

          {/* Bottom Security Assurance */}
          <div className="relative z-10 flex items-center space-x-2 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>256-Bit SSL Encrypted & Bank-Grade Security</span>
          </div>
        </div>

        {/* Right Side: Clean Login Form & 1-Click Testing */}
        <div className="p-8 sm:p-12 flex flex-col justify-between space-y-6">
          
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-700 text-[11px] font-bold mb-2">
                <Sparkles className="w-3 h-3 text-brand-600" />
                <span>Unified Member Access</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Welcome Back
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Sign in to manage your vehicles, bookings, or partner earnings
              </p>
            </div>

            {/* 1-Click Quick Demo Login Switcher */}
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-2">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block text-center">
                ⚡ 1-Click Quick Demo Access (Instant Evaluation)
              </span>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickLogin('rahul@gmail.com', 'user123', 'user')}
                  className={`p-2.5 rounded-xl border text-left transition-all shadow-sm group relative ${
                    selectedDemoRole === 'user' && loading
                      ? 'border-brand-500 bg-brand-50/80 ring-2 ring-brand-500/20'
                      : 'bg-white hover:bg-brand-50 border-slate-200 hover:border-brand-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 group-hover:text-brand-600">👤 Customer</span>
                    {selectedDemoRole === 'user' && loading && <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-ping" />}
                  </div>
                  <div className="text-[10px] text-slate-400">Rahul (Vehicle Owner)</div>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickLogin('driver@helpondrive.com', 'driver123', 'driver')}
                  className={`p-2.5 rounded-xl border text-left transition-all shadow-sm group relative ${
                    selectedDemoRole === 'driver' && loading
                      ? 'border-blue-500 bg-blue-50/80 ring-2 ring-blue-500/20'
                      : 'bg-white hover:bg-blue-50 border-slate-200 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 group-hover:text-blue-600">👨‍✈️ Chauffeur</span>
                    {selectedDemoRole === 'driver' && loading && <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping" />}
                  </div>
                  <div className="text-[10px] text-slate-400">Verified Driver</div>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickLogin('provider@helpondrive.com', 'provider123', 'provider')}
                  className={`p-2.5 rounded-xl border text-left transition-all shadow-sm group relative ${
                    selectedDemoRole === 'provider' && loading
                      ? 'border-amber-500 bg-amber-50/80 ring-2 ring-amber-500/20'
                      : 'bg-white hover:bg-amber-50 border-slate-200 hover:border-amber-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 group-hover:text-amber-600">👨‍🔧 Workshop</span>
                    {selectedDemoRole === 'provider' && loading && <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />}
                  </div>
                  <div className="text-[10px] text-slate-400">SpeedFix Garage</div>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickLogin('admin@helpondrive.com', 'admin123', 'admin')}
                  className={`p-2.5 rounded-xl border text-left transition-all shadow-sm group relative ${
                    selectedDemoRole === 'admin' && loading
                      ? 'border-purple-500 bg-purple-50/80 ring-2 ring-purple-500/20'
                      : 'bg-white hover:bg-purple-50 border-slate-200 hover:border-purple-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 group-hover:text-purple-600">👑 Admin</span>
                    {selectedDemoRole === 'admin' && loading && <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-ping" />}
                  </div>
                  <div className="text-[10px] text-slate-400">Central Control</div>
                </button>
              </div>
            </div>

            {/* Error Banner */}
            {error && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-medium text-center">
                {error}
              </div>
            )}

            {/* Credentials Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-brand-500 focus:bg-white font-medium"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-slate-700">Password</label>
                  <span className="text-[11px] text-brand-600 font-semibold cursor-pointer hover:underline">
                    Forgot password?
                  </span>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    required
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-brand-500 focus:bg-white font-medium"
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
                className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-brand-600/25 transition-all flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <span>Authenticating...</span>
                ) : (
                  <>
                    <span>Sign In to Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Footer Register Link */}
          <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
            <span>Don't have an account yet? </span>
            <Link to="/register" className="font-bold text-brand-600 hover:underline">
              Create an account
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
