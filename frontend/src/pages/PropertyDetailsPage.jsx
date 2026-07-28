import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiCalendar, FiHeart, FiMapPin, FiUser } from 'react-icons/fi';
import { FaBath, FaBed, FaParking, FaRulerCombined } from 'react-icons/fa';
import Navbar from '../components/layout/Navbar.jsx';
import StatusBadge from '../components/common/StatusBadge.jsx';
import PageLoader from '../components/common/PageLoader.jsx';
import PropertyCard from '../components/property/PropertyCard.jsx';
import { bookings, imageFor, properties as demoProperties } from '../data/demoData.js';
import { bookingApi, favouriteApi, propertyApi } from '../services/api.js';
import { currency } from '../utils/format.js';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';

export default function PropertyDetailsPage() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showVisit, setShowVisit] = useState(false);
  const [visit, setVisit] = useState({ preferredDate: '', preferredTime: '10:00' });
  const { hasRole, isAuthenticated } = useAuth();
  const toast = useToast();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        setProperty(await propertyApi.details(id));
      } catch {
        setProperty(demoProperties.find((item) => String(item.id) === String(id)) || demoProperties[0]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  useEffect(() => {
    if (!property) return;
    const current = JSON.parse(localStorage.getItem('prm_recently_viewed') || '[]').filter((item) => item.id !== property.id);
    localStorage.setItem('prm_recently_viewed', JSON.stringify([property, ...current].slice(0, 4)));
  }, [property]);

  if (loading) return <><Navbar /><PageLoader /></>;
  if (!property) return <><Navbar /><main className="section-band"><div className="container">Property not found.</div></main></>;

  const bookVisit = async (event) => {
    event.preventDefault();
    try {
      await bookingApi.create({ propertyId: property.id, ...visit });
      toast.success('Visit requested.');
    } catch {
      bookings.unshift({ id: Date.now(), property, preferredDate: visit.preferredDate, preferredTime: visit.preferredTime, status: 'PENDING' });
      toast.success('Demo visit requested.');
    }
    setShowVisit(false);
  };

  const addFavourite = async () => {
    try {
      await favouriteApi.add(property.id);
      toast.success('Property added to favourites.');
    } catch {
      toast.success('Property added to demo favourites.');
    }
  };

  const similar = demoProperties.filter((item) => item.id !== property.id && item.city === property.city).concat(demoProperties).slice(0, 3);
  const galleryImages = property.images?.length ? property.images : [imageFor.hero];

  return (
    <>
      <Navbar />
      <main className="section-band">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-8">
              <div id="propertyGallery" className="carousel slide detail-hero" data-bs-ride="carousel">
                <div className="carousel-inner">
                  {galleryImages.map((image, index) => (
                    <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={image}>
                      <img src={image} alt={`${property.title} ${index + 1}`} />
                    </div>
                  ))}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#propertyGallery" data-bs-slide="prev" aria-label="Previous image">
                  <span className="carousel-control-prev-icon" aria-hidden="true" />
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#propertyGallery" data-bs-slide="next" aria-label="Next image">
                  <span className="carousel-control-next-icon" aria-hidden="true" />
                </button>
              </div>
              <div className="detail-panel mt-4">
                <div className="d-flex justify-content-between flex-wrap gap-3">
                  <div>
                    <StatusBadge status={property.status} />
                    <h1 className="h2 fw-bold mt-2">{property.title}</h1>
                    <p className="property-location"><FiMapPin /> {property.address}, {property.city}, {property.state} {property.zipCode}</p>
                  </div>
                  <strong className="rent fs-3">{currency(property.rent)}<span>/mo</span></strong>
                </div>
                <div className="property-meta fs-6 mt-3">
                  <span><FaBed /> {property.bedrooms} bedrooms</span>
                  <span><FaBath /> {property.bathrooms} bathrooms</span>
                  <span><FaRulerCombined /> {property.area} sq ft</span>
                  <span><FaParking /> {property.parking ? 'Parking' : 'No parking'}</span>
                </div>
                <hr />
                <p>{property.description}</p>
                <h2 className="h5 fw-bold mt-4">Amenities</h2>
                <div className="amenity-list">
                  {property.amenities?.map((amenity) => <span className="amenity-pill" key={amenity.id}>{amenity.name}</span>)}
                </div>
                <h2 className="h5 fw-bold mt-4">Map</h2>
                <div className="map-placeholder">
                  <span>{property.latitude}, {property.longitude}</span>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="detail-panel sticky-lg-top" style={{ top: '92px' }}>
                <h2 className="h5 fw-bold">Owner Details</h2>
                <div className="d-flex align-items-center gap-3 my-3">
                  <img src={property.owner?.avatarUrl || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80'} alt={property.owner?.fullName} className="avatar-preview" />
                  <div>
                    <strong>{property.owner?.fullName}</strong>
                    <span className="d-block muted">{property.owner?.email}</span>
                    <span className="d-block muted">{property.owner?.phone}</span>
                  </div>
                </div>
                <div className="d-grid gap-2">
                  {isAuthenticated && hasRole('ROLE_TENANT') ? (
                    <button className="btn btn-primary" type="button" onClick={() => setShowVisit(true)}><FiCalendar /> Book Visit</button>
                  ) : (
                    <Link className="btn btn-primary" to="/login"><FiUser /> Login as tenant</Link>
                  )}
                  <button className="btn btn-outline-primary" type="button" onClick={addFavourite}><FiHeart /> Favourite</button>
                </div>
              </div>
            </div>
          </div>
          <div className="section-heading mt-5">
            <div>
              <h2>Recently Viewed</h2>
              <p className="muted mb-0">Comparable listings from the demo inventory.</p>
            </div>
          </div>
          <div className="property-grid">
            {similar.map((item) => <PropertyCard property={item} key={item.id} compact />)}
          </div>
        </div>
      </main>

      {showVisit ? (
        <div className="modal d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={bookVisit}>
                <div className="modal-header">
                  <h2 className="modal-title h5">Book Visit</h2>
                  <button className="btn-close" type="button" onClick={() => setShowVisit(false)} aria-label="Close" />
                </div>
                <div className="modal-body">
                  <label className="form-label">Preferred date</label>
                  <input type="date" className="form-control mb-3" value={visit.preferredDate} onChange={(event) => setVisit({ ...visit, preferredDate: event.target.value })} required />
                  <label className="form-label">Preferred time</label>
                  <input type="time" className="form-control" value={visit.preferredTime} onChange={(event) => setVisit({ ...visit, preferredTime: event.target.value })} required />
                </div>
                <div className="modal-footer">
                  <button className="btn btn-outline-secondary" type="button" onClick={() => setShowVisit(false)}>Cancel</button>
                  <button className="btn btn-primary" type="submit">Request visit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
