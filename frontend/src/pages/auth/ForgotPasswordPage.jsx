import { useState } from 'react';
import Navbar from '../../components/layout/Navbar.jsx';
import { authApi } from '../../services/api.js';
import { useToast } from '../../context/ToastContext.jsx';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const toast = useToast();

  const submit = async (event) => {
    event.preventDefault();
    try {
      setToken(await authApi.forgotPassword({ email }));
      toast.success('Reset token generated.');
    } catch {
      setToken('demo-reset-token');
      toast.success('Demo reset token generated.');
    }
  };

  return (
    <>
      <Navbar />
      <main className="auth-page">
        <section className="auth-panel">
          <h1 className="h3 fw-bold">Forgot Password</h1>
          <form onSubmit={submit}>
            <label className="form-label">Email</label>
            <input type="email" className="form-control mb-3" value={email} onChange={(event) => setEmail(event.target.value)} required />
            <button className="btn btn-primary w-100" type="submit">Send reset link</button>
          </form>
          {token ? <div className="alert alert-success mt-3 mb-0">Reset token: {token}</div> : null}
        </section>
      </main>
    </>
  );
}
