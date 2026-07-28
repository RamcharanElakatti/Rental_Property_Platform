import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import Navbar from '../../components/layout/Navbar.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';

export default function LoginPage() {
  const [form, setForm] = useState({ email: 'tenant@globalco.test', password: 'password', rememberMe: true });
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();

  const submit = async (event) => {
    event.preventDefault();
    try {
      const user = await login(form);
      toast.success('Welcome back.');
      const roleHome = user.roles.includes('ROLE_ADMIN') ? '/admin' : user.roles.includes('ROLE_OWNER') ? '/owner' : '/tenant';
      navigate(location.state?.from?.pathname || roleHome, { replace: true });
    } catch {
      toast.error('Login failed. Check your credentials.');
    }
  };

  return (
    <>
      <Navbar />
      <main className="auth-page">
        <section className="auth-panel">
          <h1 className="h3 fw-bold">Login</h1>
          <p className="muted">Use a marketplace account to continue.</p>
          <form onSubmit={submit}>
            <label className="form-label">Email</label>
            <input type="email" className="form-control mb-3" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} required />
            <label className="form-label">Password</label>
            <input type="password" className="form-control mb-3" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} required minLength="6" />
            <div className="form-check mb-3">
              <input className="form-check-input" type="checkbox" checked={form.rememberMe} onChange={(event) => setForm({ ...form, rememberMe: event.target.checked })} id="rememberMe" />
              <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
            </div>
            <button className="btn btn-primary w-100" type="submit"><FiLogIn /> Login</button>
          </form>
          <div className="d-flex justify-content-between mt-3 small">
            <Link to="/forgot-password">Forgot password?</Link>
            <Link to="/register">Create account</Link>
          </div>
          <div className="alert alert-light border mt-3 mb-0 small">
            Demo users: tenant@globalco.test, owner@globalco.test, admin@globalco.test. Password: password
          </div>
        </section>
      </main>
    </>
  );
}
