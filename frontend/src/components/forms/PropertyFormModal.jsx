import { useEffect, useState } from 'react';
import { FiSave, FiX } from 'react-icons/fi';
import { amenities as demoAmenities, categories as demoCategories, propertyTypes as demoTypes } from '../../data/demoData.js';
import { referenceApi } from '../../services/api.js';

const blank = {
  title: '',
  description: '',
  rent: '',
  deposit: '',
  bedrooms: 1,
  bathrooms: 1,
  area: '',
  floor: 1,
  parking: true,
  balcony: true,
  propertyTypeId: 1,
  categoryId: 1,
  city: '',
  state: '',
  address: '',
  zipCode: '',
  latitude: '',
  longitude: '',
  imageUrls: '',
  amenityIds: [1, 2, 7],
  status: 'AVAILABLE'
};

export default function PropertyFormModal({ open, property, onClose, onSubmit }) {
  const [form, setForm] = useState(blank);
  const [imageFiles, setImageFiles] = useState([]);
  const [referenceData, setReferenceData] = useState({
    amenities: demoAmenities,
    categories: demoCategories,
    propertyTypes: demoTypes
  });

  useEffect(() => {
    setImageFiles([]);
    if (!property) {
      setForm(blank);
      return;
    }
    setForm({
      ...blank,
      ...property,
      rent: property.rent || '',
      deposit: property.deposit || '',
      propertyTypeId: property.propertyType?.id || 1,
      categoryId: property.category?.id || 1,
      imageUrls: property.images?.join('\n') || '',
      amenityIds: property.amenities?.map((item) => item.id) || []
    });
  }, [property, open]);

  useEffect(() => {
    if (!open) return;
    Promise.all([
      referenceApi.amenities(),
      referenceApi.categories(),
      referenceApi.propertyTypes()
    ]).then(([amenities, categories, propertyTypes]) => {
      setReferenceData({ amenities, categories, propertyTypes });
    }).catch(() => {
      setReferenceData({
        amenities: demoAmenities,
        categories: demoCategories,
        propertyTypes: demoTypes
      });
    });
  }, [open]);

  if (!open) return null;

  const update = (field, value) => setForm((current) => ({ ...current, [field]: value }));
  const toggleAmenity = (id) => {
    setForm((current) => ({
      ...current,
      amenityIds: current.amenityIds.includes(id)
        ? current.amenityIds.filter((item) => item !== id)
        : [...current.amenityIds, id]
    }));
  };

  const submit = (event) => {
    event.preventDefault();
    onSubmit({
      ...form,
      rent: Number(form.rent),
      deposit: Number(form.deposit),
      bedrooms: Number(form.bedrooms),
      bathrooms: Number(form.bathrooms),
      area: Number(form.area),
      floor: Number(form.floor),
      latitude: form.latitude === '' ? null : Number(form.latitude),
      longitude: form.longitude === '' ? null : Number(form.longitude),
      imageUrls: form.imageUrls.split('\n').map((url) => url.trim()).filter(Boolean)
    }, imageFiles);
  };

  return (
    <div className="modal d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-xl modal-dialog-scrollable">
        <div className="modal-content">
          <form onSubmit={submit}>
            <div className="modal-header">
              <h2 className="modal-title h5">{property ? 'Edit property' : 'Add property'}</h2>
              <button type="button" className="btn-close" onClick={onClose} aria-label="Close" />
            </div>
            <div className="modal-body">
              <div className="row g-3">
                <div className="col-md-8">
                  <label className="form-label">Title</label>
                  <input className="form-control" value={form.title} onChange={(event) => update('title', event.target.value)} required />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Status</label>
                  <select className="form-select" value={form.status} onChange={(event) => update('status', event.target.value)}>
                    <option value="AVAILABLE">Available</option>
                    <option value="OCCUPIED">Occupied</option>
                    <option value="MAINTENANCE">Maintenance</option>
                  </select>
                </div>
                <div className="col-12">
                  <label className="form-label">Description</label>
                  <textarea className="form-control" rows="3" value={form.description} onChange={(event) => update('description', event.target.value)} required />
                </div>
                {['rent', 'deposit', 'bedrooms', 'bathrooms', 'area', 'floor'].map((field) => (
                  <div className="col-6 col-lg-2" key={field}>
                    <label className="form-label text-capitalize">{field}</label>
                    <input type="number" className="form-control" value={form[field]} onChange={(event) => update(field, event.target.value)} required />
                  </div>
                ))}
                <div className="col-md-3">
                  <label className="form-label">Property type</label>
                  <select className="form-select" value={form.propertyTypeId} onChange={(event) => update('propertyTypeId', Number(event.target.value))}>
                    {referenceData.propertyTypes.map((type) => <option value={type.id} key={type.id}>{type.name}</option>)}
                  </select>
                </div>
                <div className="col-md-3">
                  <label className="form-label">Category</label>
                  <select className="form-select" value={form.categoryId} onChange={(event) => update('categoryId', Number(event.target.value))}>
                    {referenceData.categories.map((category) => <option value={category.id} key={category.id}>{category.name}</option>)}
                  </select>
                </div>
                <div className="col-md-3">
                  <label className="form-label">City</label>
                  <input className="form-control" value={form.city} onChange={(event) => update('city', event.target.value)} required />
                </div>
                <div className="col-md-3">
                  <label className="form-label">State</label>
                  <input className="form-control" value={form.state} onChange={(event) => update('state', event.target.value)} required />
                </div>
                <div className="col-md-8">
                  <label className="form-label">Address</label>
                  <input className="form-control" value={form.address} onChange={(event) => update('address', event.target.value)} required />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Zip code</label>
                  <input className="form-control" value={form.zipCode} onChange={(event) => update('zipCode', event.target.value)} />
                </div>
                <div className="col-md-3">
                  <div className="form-check form-switch mt-4">
                    <input className="form-check-input" type="checkbox" checked={form.parking} onChange={(event) => update('parking', event.target.checked)} id="parking" />
                    <label className="form-check-label" htmlFor="parking">Parking</label>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-check form-switch mt-4">
                    <input className="form-check-input" type="checkbox" checked={form.balcony} onChange={(event) => update('balcony', event.target.checked)} id="balcony" />
                    <label className="form-check-label" htmlFor="balcony">Balcony</label>
                  </div>
                </div>
                <div className="col-md-3">
                  <label className="form-label">Latitude</label>
                  <input type="number" step="0.0001" className="form-control" value={form.latitude || ''} onChange={(event) => update('latitude', event.target.value)} />
                </div>
                <div className="col-md-3">
                  <label className="form-label">Longitude</label>
                  <input type="number" step="0.0001" className="form-control" value={form.longitude || ''} onChange={(event) => update('longitude', event.target.value)} />
                </div>
                <div className="col-12">
                  <label className="form-label">Image URLs</label>
                  <textarea className="form-control" rows="3" value={form.imageUrls} onChange={(event) => update('imageUrls', event.target.value)} />
                </div>
                <div className="col-12">
                  <label className="form-label">Upload Images</label>
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    multiple
                    onChange={(event) => setImageFiles(Array.from(event.target.files || []))}
                  />
                  {imageFiles.length ? (
                    <div className="small muted mt-2">
                      {imageFiles.map((file) => file.name).join(', ')}
                    </div>
                  ) : null}
                </div>
                <div className="col-12">
                  <label className="form-label">Amenities</label>
                  <div className="amenity-list">
                    {referenceData.amenities.map((amenity) => (
                      <label className="amenity-pill" key={amenity.id}>
                        <input type="checkbox" className="form-check-input me-2" checked={form.amenityIds.includes(amenity.id)} onChange={() => toggleAmenity(amenity.id)} />
                        {amenity.name}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-outline-secondary" onClick={onClose}><FiX /> Cancel</button>
              <button type="submit" className="btn btn-primary"><FiSave /> Save property</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
