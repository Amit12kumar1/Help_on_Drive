import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';
import ProtectedRoute from './components/common/ProtectedRoute';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import UserLayout from './layouts/UserLayout';
import DriverLayout from './layouts/DriverLayout';
import ProviderLayout from './layouts/ProviderLayout';
import AdminLayout from './layouts/AdminLayout';

// Public Pages
import HomePage from './pages/public/HomePage';
import ServicesPage from './pages/public/ServicesPage';
import PublicRoadsideAssistancePage from './pages/public/PublicRoadsideAssistancePage';
import PublicHireDriverPage from './pages/public/PublicHireDriverPage';
import HowItWorksPage from './pages/public/HowItWorksPage';
import BecomeDriverPage from './pages/public/BecomeDriverPage';
import BecomeProviderPage from './pages/public/BecomeProviderPage';
import FAQPage from './pages/public/FAQPage';
import ContactPage from './pages/public/ContactPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';

// User Portal Pages
import UserDashboard from './pages/user/UserDashboard';
import MyVehiclesPage from './pages/user/MyVehiclesPage';
import RoadsideAssistancePage from './pages/user/RoadsideAssistancePage';
import HireDriverPage from './pages/user/HireDriverPage';
import LiveTrackingView from './pages/user/LiveTrackingView';
import MyBookingsPage from './pages/user/MyBookingsPage';
import EmergencyContactsPage from './pages/user/EmergencyContactsPage';
import UserPaymentsPage from './pages/user/UserPaymentsPage';
import UserSupportPage from './pages/user/UserSupportPage';

// Driver Portal Pages
import DriverDashboard from './pages/driver/DriverDashboard';
import IncomingBookingsPage from './pages/driver/IncomingBookingsPage';
import ActiveTripPage from './pages/driver/ActiveTripPage';
import DriverEarningsPage from './pages/driver/DriverEarningsPage';
import DriverProfilePage from './pages/driver/DriverProfilePage';

// Provider Portal Pages
import ProviderDashboard from './pages/provider/ProviderDashboard';
import RSAIncomingJobsPage from './pages/provider/RSAIncomingJobsPage';
import ActiveJobPage from './pages/provider/ActiveJobPage';
import ProviderEarningsPage from './pages/provider/ProviderEarningsPage';
import ProviderProfilePage from './pages/provider/ProviderProfilePage';

// Admin Portal Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import PartnerVerificationsPage from './pages/admin/PartnerVerificationsPage';
import PricingConfigPage from './pages/admin/PricingConfigPage';
import SOSMonitorPage from './pages/admin/SOSMonitorPage';
import AllBookingsPage from './pages/admin/AllBookingsPage';
import AdminComplaintsPage from './pages/admin/AdminComplaintsPage';
import UserDirectoryPage from './pages/admin/UserDirectoryPage';

export default function App() {
  return (
    <AuthProvider>
      <SocketProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Marketing & Info Routes */}
            <Route path="/" element={<PublicLayout />}>
              <Route index element={<HomePage />} />
              <Route path="about" element={<HomePage />} />
              <Route path="services" element={<ServicesPage />} />
              <Route path="roadside-assistance" element={<PublicRoadsideAssistancePage />} />
              <Route path="hire-driver" element={<PublicHireDriverPage />} />
              <Route path="how-it-works" element={<HowItWorksPage />} />
              <Route path="become-driver" element={<BecomeDriverPage />} />
              <Route path="become-provider" element={<BecomeProviderPage />} />
              <Route path="faq" element={<FAQPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
            </Route>

            {/* Customer / User Portal */}
            <Route
              path="/user"
              element={
                <ProtectedRoute allowedRoles={['user', 'admin']}>
                  <UserLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<UserDashboard />} />
              <Route path="vehicles" element={<MyVehiclesPage />} />
              <Route path="roadside-assistance" element={<RoadsideAssistancePage />} />
              <Route path="hire-driver" element={<HireDriverPage />} />
              <Route path="tracking" element={<LiveTrackingView />} />
              <Route path="bookings" element={<MyBookingsPage />} />
              <Route path="emergency-contacts" element={<EmergencyContactsPage />} />
              <Route path="payments" element={<UserPaymentsPage />} />
              <Route path="support" element={<UserSupportPage />} />
            </Route>

            {/* Driver Portal */}
            <Route
              path="/driver"
              element={
                <ProtectedRoute allowedRoles={['driver', 'admin']}>
                  <DriverLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<DriverDashboard />} />
              <Route path="requests" element={<IncomingBookingsPage />} />
              <Route path="active" element={<ActiveTripPage />} />
              <Route path="earnings" element={<DriverEarningsPage />} />
              <Route path="profile" element={<DriverProfilePage />} />
            </Route>

            {/* Service Provider Portal */}
            <Route
              path="/provider"
              element={
                <ProtectedRoute allowedRoles={['provider', 'admin']}>
                  <ProviderLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<ProviderDashboard />} />
              <Route path="jobs" element={<RSAIncomingJobsPage />} />
              <Route path="active" element={<ActiveJobPage />} />
              <Route path="earnings" element={<ProviderEarningsPage />} />
              <Route path="profile" element={<ProviderProfilePage />} />
            </Route>

            {/* Super Admin Control Center */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="verifications" element={<PartnerVerificationsPage />} />
              <Route path="pricing" element={<PricingConfigPage />} />
              <Route path="sos" element={<SOSMonitorPage />} />
              <Route path="bookings" element={<AllBookingsPage />} />
              <Route path="complaints" element={<AdminComplaintsPage />} />
              <Route path="users" element={<UserDirectoryPage />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </SocketProvider>
    </AuthProvider>
  );
}
