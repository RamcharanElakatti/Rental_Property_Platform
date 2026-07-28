import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { FiBarChart2, FiBell, FiBookOpen, FiGrid, FiHeart, FiHome, FiLogOut, FiSettings, FiUsers } from 'react-icons/fi';
import { MdApartment } from 'react-icons/md';
import { useAuth } from '../../context/AuthContext.jsx';

const navs = {
  tenant: [
    { to: '/tenant', label: 'Dashboard', icon: <FiGrid />, end: true },
    { to: '/tenant/profile', label: 'Profile', icon: <FiUsers /> },
    { to: '/tenant/favourites', label: 'Favourites', icon: <FiHeart /> },
    { to: '/tenant/bookings', label: 'Bookings', icon: <FiBookOpen /> },
    { to: '/tenant/notifications', label: 'Notifications', icon: <FiBell /> }
  ],
  owner: [
    { to: '/owner', label: 'Dashboard', icon: <FiGrid />, end: true },
    { to: '/owner/properties', label: 'Properties', icon: <MdApartment /> },
    { to: '/owner/bookings', label: 'Requests', icon: <FiBookOpen /> },
    { to: '/owner/analytics', label: 'Analytics', icon: <FiGrid /> },
    { to: '/owner/profile', label: 'Profile', icon: <FiUsers /> }
  ],
  admin: [
    { to: '/admin', label: 'Dashboard', icon: <FiGrid />, end: true },
    { to: '/admin/users', label: 'Users', icon: <FiUsers /> },
    { to: '/admin/properties', label: 'Properties', icon: <MdApartment /> },
    { to: '/admin/bookings', label: 'Bookings', icon: <FiBookOpen /> },
    { to: '/admin/categories', label: 'Categories', icon: <FiHome /> },
    { to: '/admin/reports', label: 'Reports', icon: <FiBarChart2 /> },
    { to: '/admin/notifications', label: 'Notifications', icon: <FiBell /> },
    { to: '/admin/settings', label: 'Settings', icon: <FiSettings /> }
  ]
};

export default function DashboardShell({ role }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="dashboard-layout">
      <aside className="dashboard-sidebar">
        <NavLink to="/" className="sidebar-brand">Property Rental Marketplace</NavLink>
        <div className="sidebar-user">
          <img src={user?.avatarUrl || 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80'} alt={user?.fullName || 'User'} />
          <div>
            <strong>{user?.fullName}</strong>
            <span>{user?.email}</span>
          </div>
        </div>
        <nav className="sidebar-nav">
          {navs[role].map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className={({ isActive }) => isActive ? 'active' : ''}>
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <button className="btn btn-outline-light w-100 mt-auto" type="button" onClick={handleLogout}><FiLogOut /> Logout</button>
      </aside>
      <main className="dashboard-main">
        <Outlet />
      </main>
    </div>
  );
}
