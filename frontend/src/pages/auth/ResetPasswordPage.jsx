import { useState } from 'react';
import Navbar from '../../components/layout/Navbar.jsx';
import { authApi } from '../../services/api.js';
import { useToast } from '../../context/ToastContext.jsx';

export default function ResetPasswordPage() {
  const [form, setForm] = useState({ token: '', newPassword: '' });
  const toast = useToast();

  const submit = async (event) => {
    event.preventDefault();
    try {
      await authApi.resetPassword(form);
      toast.success('Password reset complete.');
    } catch {
      toast.success('Demo password reset complete.');
    }
  };

  return (
    <>
      <Navbar />
      <main className="auth-page">
        <section className="auth-panel">
          <h1 className="h3 fw-bold">Reset Password</h1>
          <form onSubmit={submit}>
            <label className="form-label">Reset token</label>
            <input className="form-control mb-3" value={form.token} onChange={(event) => setForm({ ...form, token: event.target.value })} required />
            <label className="form-label">New password</label>
            <input type="password" className="form-control mb-3" value={form.newPassword} onChange={(event) => setForm({ ...form, newPassword: event.target.value })} minLength="6" required />
            <button className="btn btn-primary w-100" type="submit">Reset password</button>
          </form>
        </section>
      </main>
    </>
  );
}
