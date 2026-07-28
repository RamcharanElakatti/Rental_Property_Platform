import { useEffect, useState } from 'react';
import PropertyCard from '../../components/property/PropertyCard.jsx';
import { paged, properties } from '../../data/demoData.js';
import { favouriteApi } from '../../services/api.js';
import { useToast } from '../../context/ToastContext.jsx';

export default function TenantFavouritesPage() {
  const [items, setItems] = useState(properties.slice(0, 2));
  const toast = useToast();

  useEffect(() => {
    favouriteApi.list().then((page) => setItems(page.content)).catch(() => setItems(paged(properties.slice(0, 2)).content));
  }, []);

  const remove = async (property) => {
    try {
      await favouriteApi.remove(property.id);
    } catch {
      // Demo mode updates local state only.
    }
    setItems((current) => current.filter((item) => item.id !== property.id));
    toast.success('Favourite removed.');
  };

  return (
    <>
      <div className="dashboard-title">
        <div>
          <h1>Favourite Properties</h1>
          <p className="muted mb-0">Saved rentals ready for follow-up.</p>
        </div>
      </div>
      <div className="property-grid">
        {items.map((property) => <PropertyCard property={property} key={property.id} onFavourite={remove} />)}
      </div>
    </>
  );
}
