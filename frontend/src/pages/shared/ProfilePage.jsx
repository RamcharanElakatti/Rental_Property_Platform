import { useState } from 'react';
import { FiUpload } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import { userApi } from '../../services/api.js';
import { roleLabel } from '../../utils/format.js';

export default function ProfilePage() {
  const { user, updateCurrentUser } = useAuth();
  const [form, setForm] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    avatarUrl: user?.avatarUrl || ''
  });
  const toast = useToast();

  const save = async (event) => {
    event.preventDefault();
    try {
      const updated = await userApi.updateProfile(form);
      updateCurrentUser(updated);
      toast.success('Profile updated.');
    } catch {
      const updated = { ...user, ...form };
      updateCurrentUser(updated);
      toast.success('Demo profile updated.');
    }
  };

  const upload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const data = new FormData();
    data.append('file', file);
    try {
      const updated = await userApi.uploadAvatar(data);
      setForm({ ...form, avatarUrl: updated.avatarUrl });
      updateCurrentUser(updated);
      toast.success('Profile image uploaded.');
    } catch {
      const avatarUrl = URL.createObjectURL(file);
      setForm({ ...form, avatarUrl });
      updateCurrentUser({ ...user, avatarUrl });
      toast.success('Demo profile image updated.');
    }
  };

  return (
    <>
      <div className="dashboard-title">
        <div>
          <h1>Profile</h1>
          <p className="muted mb-0">{roleLabel(user?.roles)} account settings.</p>
        </div>
      </div>
      <section className="settings-panel">
        <div className="row g-4">
          <div className="col-lg-4">
            <img className="avatar-preview mb-3" src={form.avatarUrl || 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80'} alt={user?.fullName} />
            <label className="btn btn-outline-primary">
              <FiUpload /> Upload image
              <input type="file" className="d-none" accept="image/*" onChange={upload} />
            </label>
          </div>
          <div className="col-lg-8">
            <form onSubmit={save}>
              <label className="form-label">Full name</label>
              <input className="form-control mb-3" value={form.fullName} onChange={(event) => setForm({ ...form, fullName: event.target.value })} required />
              <label className="form-label">Email</label>
              <input type="email" className="form-control mb-3" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} required />
              <label className="form-label">Phone</label>
              <input className="form-control mb-3" value={form.phone || ''} onChange={(event) => setForm({ ...form, phone: event.target.value })} />
              <label className="form-label">Avatar URL</label>
              <input className="form-control mb-3" value={form.avatarUrl || ''} onChange={(event) => setForm({ ...form, avatarUrl: event.target.value })} />
              <button className="btn btn-primary" type="submit">Save profile</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
