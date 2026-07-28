import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar.jsx';

export default function UnauthorizedPage() {
  return (
    <>
      <Navbar />
      <main className="auth-page">
        <section className="auth-panel text-center">
          <h1 className="h3 fw-bold">Unauthorized</h1>
          <p className="muted">Your account does not have access to this area.</p>
          <Link className="btn btn-primary" to="/">Go home</Link>
        </section>
      </main>
    </>
  );
}
