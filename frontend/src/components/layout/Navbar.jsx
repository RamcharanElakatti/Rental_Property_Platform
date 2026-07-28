import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FiLogOut, FiMenu, FiMoon, FiSearch, FiSun, FiUser } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext.jsx';
import { useTheme } from '../../context/ThemeContext.jsx';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const { darkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const dashboardPath = user?.roles?.includes('ROLE_ADMIN') ? '/admin' : user?.roles?.includes('ROLE_OWNER') ? '/owner' : '/tenant';

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg app-navbar sticky-top">
      <div className="container">
        <Link className="navbar-brand" to="/">Property Rental Marketplace</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" aria-label="Toggle navigation">
          <FiMenu />
        </button>
        <div className="collapse navbar-collapse" id="mainNav">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
            <li className="nav-item"><NavLink className="nav-link" to="/properties"><FiSearch /> Search</NavLink></li>
            <li className="nav-item">
              <button className="icon-button" type="button" onClick={toggleTheme} aria-label="Toggle dark mode" title="Toggle dark mode">
                {darkMode ? <FiSun /> : <FiMoon />}
              </button>
            </li>
            {isAuthenticated ? (
              <>
                <li className="nav-item"><NavLink className="nav-link" to={dashboardPath}><FiUser /> Dashboard</NavLink></li>
                <li className="nav-item"><button className="btn btn-outline-secondary btn-sm" type="button" onClick={handleLogout}><FiLogOut /> Logout</button></li>
              </>
            ) : (
              <>
                <li className="nav-item"><NavLink className="nav-link" to="/login">Login</NavLink></li>
                <li className="nav-item"><NavLink className="btn btn-primary btn-sm" to="/register">Create account</NavLink></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
