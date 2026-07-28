import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/layout/Navbar.jsx';
import PropertyCard from '../components/property/PropertyCard.jsx';
import PropertyFilters from '../components/property/PropertyFilters.jsx';
import PageLoader from '../components/common/PageLoader.jsx';
import { propertyTypes as demoTypes, properties as demoProperties, paged } from '../data/demoData.js';
import { favouriteApi, propertyApi, referenceApi } from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';

export default function PropertiesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState(Object.fromEntries(searchParams.entries()));
  const [propertyTypes, setPropertyTypes] = useState(demoTypes);
  const [page, setPage] = useState(paged([]));
  const [loading, setLoading] = useState(true);
  const { hasRole } = useAuth();
  const toast = useToast();

  useEffect(() => {
    referenceApi.propertyTypes().then(setPropertyTypes).catch(() => setPropertyTypes(demoTypes));
  }, []);

  useEffect(() => {
    setFilters(Object.fromEntries(searchParams.entries()));
    const load = async () => {
      setLoading(true);
      try {
        setPage(await propertyApi.list(Object.fromEntries(searchParams.entries())));
      } catch {
        const activeFilters = Object.fromEntries(searchParams.entries());
        const filtered = demoProperties.filter((property) => {
          const keyword = activeFilters.keyword?.toLowerCase();
          const city = activeFilters.city?.toLowerCase();
          const state = activeFilters.state?.toLowerCase();
          const minRent = Number(activeFilters.minRent || 0);
          const maxRent = Number(activeFilters.maxRent || 0);
          return (!keyword || `${property.title} ${property.description} ${property.category.name}`.toLowerCase().includes(keyword))
            && (!city || property.city.toLowerCase().includes(city))
            && (!state || property.state.toLowerCase().includes(state))
            && (!minRent || property.rent >= minRent)
            && (!activeFilters.bedrooms || property.bedrooms >= Number(activeFilters.bedrooms))
            && (!activeFilters.bathrooms || property.bathrooms >= Number(activeFilters.bathrooms))
            && (!activeFilters.propertyTypeId || property.propertyType.id === Number(activeFilters.propertyTypeId))
            && (!activeFilters.availability || property.status === activeFilters.availability)
            && (!maxRent || property.rent <= maxRent);
        });
        const [sortField = 'createdAt', sortDirection = 'desc'] = (activeFilters.sort || 'createdAt,desc').split(',');
        const sorted = [...filtered].sort((left, right) => {
          const leftValue = left[sortField];
          const rightValue = right[sortField];
          const direction = sortDirection === 'asc' ? 1 : -1;
          if (sortField === 'rent') return (leftValue - rightValue) * direction;
          return String(leftValue).localeCompare(String(rightValue)) * direction;
        });
        setPage(paged(sorted));
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [searchParams]);

  const results = useMemo(() => page.content || [], [page]);

  const submit = (event) => {
    event.preventDefault();
    const params = Object.fromEntries(Object.entries(filters).filter(([, value]) => value !== '' && value !== undefined));
    setSearchParams(params);
  };

  const updateSort = (sort) => {
    const nextFilters = { ...filters, sort };
    const params = Object.fromEntries(Object.entries(nextFilters).filter(([, value]) => value !== '' && value !== undefined));
    setFilters(nextFilters);
    setSearchParams(params);
  };

  const addFavourite = async (property) => {
    if (!hasRole('ROLE_TENANT')) {
      toast.info('Login as a tenant to save favourites.');
      return;
    }
    try {
      await favouriteApi.add(property.id);
      toast.success('Property added to favourites.');
    } catch {
      toast.success('Property added to demo favourites.');
    }
  };

  return (
    <>
      <Navbar />
      <main className="section-band">
        <div className="container">
          <div className="section-heading">
            <div>
              <h1 className="h2 fw-bold mb-1">Search Properties</h1>
              <p className="muted mb-0">Filter by location, rent, bedrooms, bathrooms, type, and availability.</p>
            </div>
          </div>
          <PropertyFilters filters={filters} setFilters={setFilters} onSubmit={submit} propertyTypes={propertyTypes} />
          {loading ? <PageLoader /> : (
            <>
              <div className="d-flex justify-content-between align-items-center mt-4 mb-3">
                <strong>{page.totalElements} rentals found</strong>
                <select className="form-select w-auto" aria-label="Sort properties" value={filters.sort || 'createdAt,desc'} onChange={(event) => updateSort(event.target.value)}>
                  <option value="createdAt,desc">Newest first</option>
                  <option value="rent,asc">Rent low to high</option>
                  <option value="rent,desc">Rent high to low</option>
                </select>
              </div>
              <div className="property-grid">
                {results.map((property) => <PropertyCard property={property} key={property.id} onFavourite={addFavourite} />)}
              </div>
              {results.length === 0 ? <div className="glass-panel p-4 text-center mt-4">No matching rentals found.</div> : null}
            </>
          )}
        </div>
      </main>
    </>
  );
}
