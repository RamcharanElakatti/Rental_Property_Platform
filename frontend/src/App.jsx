import { Route, Routes } from 'react-router-dom';
import DashboardShell from './components/layout/DashboardShell.jsx';
import ProtectedRoute from './components/layout/ProtectedRoute.jsx';
import AdminBookingsPage from './pages/admin/AdminBookingsPage.jsx';
import AdminCategoriesPage from './pages/admin/AdminCategoriesPage.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import AdminPropertiesPage from './pages/admin/AdminPropertiesPage.jsx';
import AdminReportsPage from './pages/admin/AdminReportsPage.jsx';
import AdminSettingsPage from './pages/admin/AdminSettingsPage.jsx';
import AdminUsersPage from './pages/admin/AdminUsersPage.jsx';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage.jsx';
import LoginPage from './pages/auth/LoginPage.jsx';
import RegisterPage from './pages/auth/RegisterPage.jsx';
import ResetPasswordPage from './pages/auth/ResetPasswordPage.jsx';
import LandingPage from './pages/LandingPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import OwnerAnalyticsPage from './pages/owner/OwnerAnalyticsPage.jsx';
import OwnerBookingsPage from './pages/owner/OwnerBookingsPage.jsx';
import OwnerDashboard from './pages/owner/OwnerDashboard.jsx';
import OwnerPropertiesPage from './pages/owner/OwnerPropertiesPage.jsx';
import PropertiesPage from './pages/PropertiesPage.jsx';
import PropertyDetailsPage from './pages/PropertyDetailsPage.jsx';
import NotificationsPage from './pages/shared/NotificationsPage.jsx';
import ProfilePage from './pages/shared/ProfilePage.jsx';
import TenantBookingsPage from './pages/tenant/TenantBookingsPage.jsx';
import TenantDashboard from './pages/tenant/TenantDashboard.jsx';
import TenantFavouritesPage from './pages/tenant/TenantFavouritesPage.jsx';
import UnauthorizedPage from './pages/UnauthorizedPage.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/properties" element={<PropertiesPage />} />
      <Route path="/properties/:id" element={<PropertyDetailsPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />

      <Route element={<ProtectedRoute roles={['ROLE_TENANT']} />}>
        <Route path="/tenant" element={<DashboardShell role="tenant" />}>
          <Route index element={<TenantDashboard />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="favourites" element={<TenantFavouritesPage />} />
          <Route path="bookings" element={<TenantBookingsPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute roles={['ROLE_OWNER']} />}>
        <Route path="/owner" element={<DashboardShell role="owner" />}>
          <Route index element={<OwnerDashboard />} />
          <Route path="properties" element={<OwnerPropertiesPage />} />
          <Route path="bookings" element={<OwnerBookingsPage />} />
          <Route path="analytics" element={<OwnerAnalyticsPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute roles={['ROLE_ADMIN']} />}>
        <Route path="/admin" element={<DashboardShell role="admin" />}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsersPage />} />
          <Route path="properties" element={<AdminPropertiesPage />} />
          <Route path="bookings" element={<AdminBookingsPage />} />
          <Route path="categories" element={<AdminCategoriesPage />} />
          <Route path="reports" element={<AdminReportsPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
