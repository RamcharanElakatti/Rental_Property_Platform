import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';

export default function RegisterPage() {
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', password: '', role: 'TENANT' });
  const { register } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const submit = async (event) => {
    event.preventDefault();
    try {
      const user = await register(form);
      toast.success('Account created.');
      navigate(user.roles.includes('ROLE_OWNER') ? '/owner' : '/tenant');
    } catch {
      toast.error('Registration failed.');
    }
  };

  return (
    <>
      <Navbar />
      <main className="auth-page">
        <section className="auth-panel">
          <h1 className="h3 fw-bold">Create Account</h1>
          <form onSubmit={submit}>
            <label className="form-label">Full name</label>
            <input className="form-control mb-3" value={form.fullName} onChange={(event) => setForm({ ...form, fullName: event.target.value })} required />
            <label className="form-label">Email</label>
            <input type="email" className="form-control mb-3" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} required />
            <label className="form-label">Phone</label>
            <input className="form-control mb-3" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} />
            <label className="form-label">Password</label>
            <input type="password" className="form-control mb-3" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} minLength="6" required />
            <label className="form-label">Role</label>
            <select className="form-select mb-3" value={form.role} onChange={(event) => setForm({ ...form, role: event.target.value })}>
              <option value="TENANT">Tenant</option>
              <option value="OWNER">Property Owner</option>
            </select>
            <button className="btn btn-primary w-100" type="submit">Register</button>
          </form>
          <p className="small mt-3 mb-0">Already registered? <Link to="/login">Login</Link></p>
        </section>
      </main>
    </>
  );
}
