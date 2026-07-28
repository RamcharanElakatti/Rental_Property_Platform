import { useEffect, useState } from 'react';
import { FiEdit, FiPlus, FiSave, FiTrash2, FiX } from 'react-icons/fi';
import DataTable from '../../components/common/DataTable.jsx';
import PageLoader from '../../components/common/PageLoader.jsx';
import { amenities as demoAmenities, categories as demoCategories, propertyTypes as demoTypes } from '../../data/demoData.js';
import { referenceApi } from '../../services/api.js';
import { useToast } from '../../context/ToastContext.jsx';

const groups = {
  categories: {
    label: 'Categories',
    singular: 'Category',
    data: demoCategories,
    list: referenceApi.categories,
    create: referenceApi.createCategory,
    update: referenceApi.updateCategory,
    remove: referenceApi.deleteCategory
  },
  propertyTypes: {
    label: 'Property Types',
    singular: 'Property type',
    data: demoTypes,
    list: referenceApi.propertyTypes,
    create: referenceApi.createPropertyType,
    update: referenceApi.updatePropertyType,
    remove: referenceApi.deletePropertyType
  },
  amenities: {
    label: 'Amenities',
    singular: 'Amenity',
    data: demoAmenities,
    list: referenceApi.amenities,
    create: referenceApi.createAmenity,
    update: referenceApi.updateAmenity,
    remove: referenceApi.deleteAmenity
  }
};

const blankForm = { name: '', description: '', icon: '' };

export default function AdminCategoriesPage() {
  const [active, setActive] = useState('categories');
  const [items, setItems] = useState(groups.categories.data);
  const [form, setForm] = useState(blankForm);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setEditing(null);
      setForm(blankForm);
      try {
        setItems(await groups[active].list());
      } catch {
        setItems(groups[active].data);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [active]);

  const edit = (row) => {
    setEditing(row);
    setForm({
      name: row.name || '',
      description: row.description || '',
      icon: row.icon || ''
    });
  };

  const resetForm = () => {
    setEditing(null);
    setForm(blankForm);
  };

  const save = async (event) => {
    event.preventDefault();
    const payload = {
      name: form.name.trim(),
      description: form.description.trim(),
      icon: form.icon.trim()
    };
    try {
      const saved = editing
        ? await groups[active].update(editing.id, payload)
        : await groups[active].create(payload);
      setItems((current) => editing
        ? current.map((item) => item.id === editing.id ? saved : item)
        : [saved, ...current]);
    } catch {
      const saved = { id: editing?.id || Date.now(), ...payload };
      setItems((current) => editing
        ? current.map((item) => item.id === editing.id ? saved : item)
        : [saved, ...current]);
    }
    resetForm();
    toast.success(`${groups[active].singular} ${editing ? 'updated' : 'saved'}.`);
  };

  const remove = async (row) => {
    try {
      await groups[active].remove(row.id);
    } catch {
      // Demo mode updates local state only.
    }
    setItems((current) => current.filter((item) => item.id !== row.id));
    if (editing?.id === row.id) {
      resetForm();
    }
    toast.success('Reference item deleted.');
  };

  return (
    <>
      <div className="dashboard-title">
        <div>
          <h1>Manage Categories</h1>
          <p className="muted mb-0">Categories, property types, and amenities.</p>
        </div>
      </div>
      <div className="settings-panel mb-3">
        <div className="btn-group mb-3" role="group" aria-label="Reference data tabs">
          {Object.entries(groups).map(([key, group]) => (
            <button className={`btn ${active === key ? 'btn-primary' : 'btn-outline-primary'}`} type="button" key={key} onClick={() => setActive(key)}>{group.label}</button>
          ))}
        </div>
        <form className="row g-2" onSubmit={save}>
          <div className="col-md-4">
            <input className="form-control" placeholder="Name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required />
          </div>
          <div className="col-md-4">
            <input className="form-control" placeholder="Description" value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} />
          </div>
          <div className="col-md-2">
            <input className="form-control" placeholder="Icon" value={form.icon} onChange={(event) => setForm({ ...form, icon: event.target.value })} />
          </div>
          <div className="col-md-2 d-flex gap-2">
            <button className="btn btn-primary flex-grow-1" type="submit">{editing ? <FiSave /> : <FiPlus />} {editing ? 'Update' : 'Add'}</button>
            {editing ? <button className="icon-button" type="button" onClick={resetForm} aria-label="Cancel edit" title="Cancel edit"><FiX /></button> : null}
          </div>
        </form>
      </div>
      {loading ? <PageLoader /> : (
        <DataTable
          rows={items}
          columns={[
            { key: 'name', label: 'Name', render: (row) => <strong>{row.name}</strong> },
            { key: 'description', label: 'Description', render: (row) => row.description || row.icon || 'Reference item' },
            {
              key: 'action',
              label: 'Action',
              render: (row) => (
                <div className="d-flex gap-2">
                  <button className="icon-button" type="button" onClick={() => edit(row)} aria-label="Edit" title="Edit"><FiEdit /></button>
                  <button className="icon-button" type="button" onClick={() => remove(row)} aria-label="Delete" title="Delete"><FiTrash2 /></button>
                </div>
              )
            }
          ]}
        />
      )}
    </>
  );
}
