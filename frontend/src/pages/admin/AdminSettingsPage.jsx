import { FiShield, FiUploadCloud } from 'react-icons/fi';

export default function AdminSettingsPage() {
  return (
    <>
      <div className="dashboard-title">
        <div>
          <h1>Settings</h1>
          <p className="muted mb-0">Platform configuration and operational preferences.</p>
        </div>
      </div>
      <div className="row g-3">
        <div className="col-lg-6">
          <section className="settings-panel">
            <h2 className="h5 fw-bold"><FiShield /> Security</h2>
            <div className="form-check form-switch my-3">
              <input className="form-check-input" type="checkbox" id="jwt" defaultChecked />
              <label className="form-check-label" htmlFor="jwt">JWT protected APIs</label>
            </div>
            <div className="form-check form-switch my-3">
              <input className="form-check-input" type="checkbox" id="cors" defaultChecked />
              <label className="form-check-label" htmlFor="cors">CORS restricted origins</label>
            </div>
          </section>
        </div>
        <div className="col-lg-6">
          <section className="settings-panel">
            <h2 className="h5 fw-bold"><FiUploadCloud /> Deployment</h2>
            <label className="form-label mt-2">Frontend target</label>
            <input className="form-control mb-3" defaultValue="Vercel" />
            <label className="form-label">Backend target</label>
            <input className="form-control" defaultValue="Render" />
          </section>
        </div>
      </div>
    </>
  );
}
