import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar.jsx';

export default function NotFoundPage() {
  return (
    <>
      <Navbar />
      <main className="auth-page">
        <section className="auth-panel text-center">
          <h1 className="h3 fw-bold">Page Not Found</h1>
          <p className="muted">The page you opened is not available.</p>
          <Link className="btn btn-primary" to="/">Go home</Link>
        </section>
      </main>
    </>
  );
}
