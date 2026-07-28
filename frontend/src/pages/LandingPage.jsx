import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowRight, FiMapPin, FiSearch } from 'react-icons/fi';
import Navbar from '../components/layout/Navbar.jsx';
import PropertyCard from '../components/property/PropertyCard.jsx';
import { categories, imageFor, properties } from '../data/demoData.js';

const locations = [
  { city: 'Austin', count: 132 },
  { city: 'Chicago', count: 118 },
  { city: 'Charlotte', count: 94 },
  { city: 'San Jose', count: 81 }
];

export default function LandingPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState({ keyword: '', city: '', maxRent: '' });

  const submit = (event) => {
    event.preventDefault();
    const params = new URLSearchParams(Object.entries(search).filter(([, value]) => value));
    navigate(`/properties?${params.toString()}`);
  };

  return (
    <>
      <Navbar />
      <section className="hero" style={{ backgroundImage: `url(${imageFor.hero})` }}>
        <div className="container hero-inner">
          <h1>Property Rental Marketplace</h1>
          <p>Search verified rentals, book visits, manage listings, and keep every rental workflow in one polished platform.</p>
          <form className="hero-search" onSubmit={submit}>
            <div className="row g-2 align-items-end">
              <div className="col-md-4">
                <label className="form-label">What are you looking for?</label>
                <input className="form-control" value={search.keyword} onChange={(event) => setSearch({ ...search, keyword: event.target.value })} placeholder="Apartment, villa, studio" />
              </div>
              <div className="col-md-3">
                <label className="form-label">City</label>
                <input className="form-control" value={search.city} onChange={(event) => setSearch({ ...search, city: event.target.value })} placeholder="Austin" />
              </div>
              <div className="col-md-3">
                <label className="form-label">Max rent</label>
                <input type="number" className="form-control" value={search.maxRent} onChange={(event) => setSearch({ ...search, maxRent: event.target.value })} placeholder="3500" />
              </div>
              <div className="col-md-2 d-grid">
                <button className="btn btn-primary" type="submit"><FiSearch /> Search</button>
              </div>
            </div>
          </form>
        </div>
      </section>

      <section className="section-band">
        <div className="container">
          <div className="section-heading">
            <div>
              <h2>Popular Locations</h2>
              <p className="muted mb-0">High-demand rental markets with fresh inventory.</p>
            </div>
            <Link className="btn btn-outline-primary" to="/properties">Browse all <FiArrowRight /></Link>
          </div>
          <div className="row g-3">
            {locations.map((location) => (
              <div className="col-6 col-lg-3" key={location.city}>
                <Link to={`/properties?city=${encodeURIComponent(location.city)}`} className="location-card d-block">
                  <FiMapPin className="text-primary" />
                  <strong>{location.city}</strong>
                  <span className="muted">{location.count} listings</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-band alt">
        <div className="container">
          <div className="section-heading">
            <div>
              <h2>Featured Properties</h2>
              <p className="muted mb-0">Homes with strong demand and owner-ready availability.</p>
            </div>
          </div>
          <div className="property-grid">
            {properties.slice(0, 3).map((property) => <PropertyCard property={property} key={property.id} />)}
          </div>
        </div>
      </section>

      <section className="section-band">
        <div className="container">
          <div className="section-heading">
            <div>
              <h2>How It Works</h2>
              <p className="muted mb-0">A clear flow for tenants, owners, and admins.</p>
            </div>
          </div>
          <div className="row g-3">
            {['Search with filters', 'Book a property visit', 'Owner reviews request', 'Move from shortlist to lease'].map((step, index) => (
              <div className="col-md-3" key={step}>
                <div className="step-card">
                  <span className="badge text-bg-primary mb-3">{index + 1}</span>
                  <strong>{step}</strong>
                  <p className="muted mb-0 mt-2">Structured records, notifications, and role-based dashboards keep the workflow moving.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-band alt">
        <div className="container">
          <div className="section-heading">
            <div>
              <h2>Top Property Categories</h2>
              <p className="muted mb-0">Inventory organized for quick comparison.</p>
            </div>
          </div>
          <div className="row g-3">
            {categories.map((category) => (
              <div className="col-6 col-lg" key={category.id}>
                <Link to={`/properties?keyword=${category.name}`} className="category-tile d-block">
                  <strong>{category.name}</strong>
                  <span className="muted">{category.description}</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-band">
        <div className="container">
          <div className="section-heading">
            <div>
              <h2>Latest Properties</h2>
              <p className="muted mb-0">Recently listed rentals from verified owners.</p>
            </div>
          </div>
          <div className="property-grid">
            {properties.map((property) => <PropertyCard property={property} key={property.id} compact />)}
          </div>
        </div>
      </section>

      <section className="section-band alt">
        <div className="container">
          <div className="row g-3">
            {['Saved us two weekends of property visits.', 'The owner dashboard made approvals painless.', 'Admin reports are clean and immediately useful.'].map((quote, index) => (
              <div className="col-md-4" key={quote}>
                <div className="testimonial-card">
                  <p className="mb-3">"{quote}"</p>
                  <strong>{['Priya M.', 'Daniel R.', 'Sofia L.'][index]}</strong>
                  <span className="d-block muted">{['Tenant', 'Property Owner', 'Marketplace Admin'][index]}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="section-band py-4">
        <div className="container d-flex flex-wrap justify-content-between gap-3">
          <strong>Property Rental Marketplace</strong>
          <span className="muted">Secure rental workflows for tenants, owners, and admins.</span>
        </div>
      </footer>
    </>
  );
}
