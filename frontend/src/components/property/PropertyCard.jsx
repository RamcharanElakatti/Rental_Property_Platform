import { Link } from 'react-router-dom';
import { FiHeart, FiMapPin } from 'react-icons/fi';
import { FaBath, FaBed, FaRulerCombined } from 'react-icons/fa';
import StatusBadge from '../common/StatusBadge.jsx';
import { currency } from '../../utils/format.js';

export default function PropertyCard({ property, onFavourite, compact = false }) {
  const cover = property.images?.[0] || 'https://images.unsplash.com/photo-1560184897-ae75f418493e?auto=format&fit=crop&w=1200&q=80';
  return (
    <article className={`property-card ${compact ? 'property-card-compact' : ''}`}>
      <Link to={`/properties/${property.id}`} className="property-image-link" aria-label={`View ${property.title}`}>
        <img src={cover} alt={property.title} className="property-card-image" />
      </Link>
      <div className="property-card-body">
        <div className="d-flex justify-content-between align-items-start gap-2">
          <div>
            <StatusBadge status={property.status} />
            <h3 className="property-title">
              <Link to={`/properties/${property.id}`}>{property.title}</Link>
            </h3>
          </div>
          {onFavourite ? (
            <button className="icon-button" type="button" onClick={() => onFavourite(property)} aria-label="Add to favourites" title="Add to favourites">
              <FiHeart />
            </button>
          ) : null}
        </div>
        <p className="property-location"><FiMapPin /> {property.city}, {property.state}</p>
        <div className="property-meta">
          <span><FaBed /> {property.bedrooms} bd</span>
          <span><FaBath /> {property.bathrooms} ba</span>
          <span><FaRulerCombined /> {property.area} sq ft</span>
        </div>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <strong className="rent">{currency(property.rent)}<span>/mo</span></strong>
          <Link className="btn btn-sm btn-outline-primary" to={`/properties/${property.id}`}>Details</Link>
        </div>
      </div>
    </article>
  );
}
