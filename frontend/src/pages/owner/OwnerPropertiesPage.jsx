import { useEffect, useState } from 'react';
import { FiEdit, FiPlus, FiTrash2 } from 'react-icons/fi';
import DataTable from '../../components/common/DataTable.jsx';
import StatusBadge from '../../components/common/StatusBadge.jsx';
import PropertyFormModal from '../../components/forms/PropertyFormModal.jsx';
import { amenities, categories, paged, properties as demoProperties, propertyTypes } from '../../data/demoData.js';
import { ownerApi, propertyApi } from '../../services/api.js';
import { currency } from '../../utils/format.js';
import { useToast } from '../../context/ToastContext.jsx';

export default function OwnerPropertiesPage() {
  const [items, setItems] = useState(demoProperties);
  const [editing, setEditing] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const toast = useToast();

  useEffect(() => {
    ownerApi.properties().then((page) => setItems(page.content)).catch(() => setItems(paged(demoProperties).content));
  }, []);

  const save = async (payload, imageFiles = []) => {
    try {
      let saved = editing ? await propertyApi.update(editing.id, payload) : await propertyApi.create(payload);
      if (imageFiles.length) {
        const data = new FormData();
        imageFiles.forEach((file) => data.append('files', file));
        try {
          saved = await propertyApi.uploadImages(saved.id, data);
        } catch {
          toast.info('Property saved. Image upload can be retried from the property editor.');
        }
      }
      setItems((current) => editing ? current.map((item) => item.id === editing.id ? saved : item) : [saved, ...current]);
    } catch {
      const mapped = {
        ...payload,
        id: editing?.id || Date.now(),
        propertyType: propertyTypes.find((item) => item.id === Number(payload.propertyTypeId)),
        category: categories.find((item) => item.id === Number(payload.categoryId)),
        amenities: amenities.filter((item) => payload.amenityIds.includes(item.id)),
        images: [...payload.imageUrls, ...imageFiles.map((file) => URL.createObjectURL(file))],
        owner: demoProperties[0].owner,
        viewCount: editing?.viewCount || 0,
        favouriteCount: editing?.favouriteCount || 0,
        createdAt: editing?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setItems((current) => editing ? current.map((item) => item.id === editing.id ? mapped : item) : [mapped, ...current]);
    }
    setModalOpen(false);
    setEditing(null);
    toast.success('Property saved.');
  };

  const remove = async (property) => {
    try {
      await propertyApi.remove(property.id);
    } catch {
      // Demo mode updates local state only.
    }
    setItems((current) => current.filter((item) => item.id !== property.id));
    toast.success('Property deleted.');
  };

  return (
    <>
      <div className="dashboard-title">
        <div>
          <h1>CRUD Property</h1>
          <p className="muted mb-0">Add, edit, delete, and monitor property status.</p>
        </div>
        <button className="btn btn-primary" type="button" onClick={() => { setEditing(null); setModalOpen(true); }}><FiPlus /> Add Property</button>
      </div>
      <DataTable
        rows={items}
        columns={[
          { key: 'title', label: 'Property', render: (row) => <strong>{row.title}</strong> },
          { key: 'city', label: 'City', render: (row) => `${row.city}, ${row.state}` },
          { key: 'rent', label: 'Rent', render: (row) => currency(row.rent) },
          { key: 'status', label: 'Status', render: (row) => <StatusBadge status={row.status} /> },
          { key: 'views', label: 'Views', render: (row) => row.viewCount },
          { key: 'favourites', label: 'Favourites', render: (row) => row.favouriteCount },
          {
            key: 'actions',
            label: 'Actions',
            render: (row) => (
              <div className="d-flex gap-2">
                <button className="icon-button" type="button" onClick={() => { setEditing(row); setModalOpen(true); }} aria-label="Edit property" title="Edit property"><FiEdit /></button>
                <button className="icon-button" type="button" onClick={() => remove(row)} aria-label="Delete property" title="Delete property"><FiTrash2 /></button>
              </div>
            )
          }
        ]}
      />
      <PropertyFormModal open={modalOpen} property={editing} onClose={() => setModalOpen(false)} onSubmit={save} />
    </>
  );
}
