import { FiSearch, FiSliders } from 'react-icons/fi';

export default function PropertyFilters({ filters, setFilters, onSubmit, propertyTypes = [] }) {
  const update = (field, value) => setFilters((current) => ({ ...current, [field]: value }));

  return (
    <form className="filter-panel" onSubmit={onSubmit}>
      <div className="filter-title">
        <FiSliders />
        <span>Search rentals</span>
      </div>
      <div className="row g-2">
        <div className="col-12 col-xl-3">
          <label className="form-label">Keyword</label>
          <div className="input-group">
            <span className="input-group-text"><FiSearch /></span>
            <input className="form-control" value={filters.keyword || ''} onChange={(event) => update('keyword', event.target.value)} placeholder="Loft, garden, transit" />
          </div>
        </div>
        <div className="col-6 col-xl-2">
          <label className="form-label">City</label>
          <input className="form-control" value={filters.city || ''} onChange={(event) => update('city', event.target.value)} placeholder="Austin" />
        </div>
        <div className="col-6 col-xl-2">
          <label className="form-label">State</label>
          <input className="form-control" value={filters.state || ''} onChange={(event) => update('state', event.target.value)} placeholder="Texas" />
        </div>
        <div className="col-6 col-xl-1">
          <label className="form-label">Beds</label>
          <input type="number" min="0" className="form-control" value={filters.bedrooms || ''} onChange={(event) => update('bedrooms', event.target.value)} />
        </div>
        <div className="col-6 col-xl-1">
          <label className="form-label">Baths</label>
          <input type="number" min="1" className="form-control" value={filters.bathrooms || ''} onChange={(event) => update('bathrooms', event.target.value)} />
        </div>
        <div className="col-6 col-xl-1">
          <label className="form-label">Min rent</label>
          <input type="number" min="0" className="form-control" value={filters.minRent || ''} onChange={(event) => update('minRent', event.target.value)} />
        </div>
        <div className="col-6 col-xl-1">
          <label className="form-label">Max rent</label>
          <input type="number" min="0" className="form-control" value={filters.maxRent || ''} onChange={(event) => update('maxRent', event.target.value)} />
        </div>
        <div className="col-6 col-xl-1">
          <label className="form-label">Status</label>
          <select className="form-select" value={filters.availability || ''} onChange={(event) => update('availability', event.target.value)}>
            <option value="">Any</option>
            <option value="AVAILABLE">Available</option>
            <option value="OCCUPIED">Occupied</option>
            <option value="MAINTENANCE">Maintenance</option>
          </select>
        </div>
        <div className="col-12 col-xl-2">
          <label className="form-label">Type</label>
          <select className="form-select" value={filters.propertyTypeId || ''} onChange={(event) => update('propertyTypeId', event.target.value)}>
            <option value="">Any type</option>
            {propertyTypes.map((type) => <option key={type.id} value={type.id}>{type.name}</option>)}
          </select>
        </div>
      </div>
      <div className="d-flex justify-content-end mt-3">
        <button className="btn btn-primary" type="submit"><FiSearch /> Search</button>
      </div>
    </form>
  );
}
