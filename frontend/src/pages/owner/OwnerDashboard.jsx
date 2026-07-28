import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiBookOpen, FiCheckCircle, FiEye, FiHome, FiInbox, FiXCircle } from 'react-icons/fi';
import StatCard from '../../components/common/StatCard.jsx';
import DataTable from '../../components/common/DataTable.jsx';
import { BarChart, DoughnutChart } from '../../components/common/Charts.jsx';
import StatusBadge from '../../components/common/StatusBadge.jsx';
import { bookings, ownerStats } from '../../data/demoData.js';
import { ownerApi } from '../../services/api.js';

export default function OwnerDashboard() {
  const [stats, setStats] = useState(ownerStats);

  useEffect(() => {
    ownerApi.dashboard().then(setStats).catch(() => setStats(ownerStats));
  }, []);

  return (
    <>
      <div className="dashboard-title">
        <div>
          <h1>Owner Dashboard</h1>
          <p className="muted mb-0">Listing health, booking decisions, and engagement.</p>
        </div>
        <Link className="btn btn-primary" to="/owner/properties">Add Property</Link>
      </div>
      <div className="row g-3 mb-4">
        <div className="col-md-4 col-xl-2"><StatCard icon={<FiHome />} label="Total properties" value={stats.totalProperties} /></div>
        <div className="col-md-4 col-xl-2"><StatCard icon={<FiCheckCircle />} label="Active listings" value={stats.activeListings} /></div>
        <div className="col-md-4 col-xl-2"><StatCard icon={<FiInbox />} label="Pending" value={stats.pendingBookings} /></div>
        <div className="col-md-4 col-xl-2"><StatCard icon={<FiBookOpen />} label="Approved" value={stats.approvedBookings} /></div>
        <div className="col-md-4 col-xl-2"><StatCard icon={<FiXCircle />} label="Rejected" value={stats.rejectedBookings} /></div>
        <div className="col-md-4 col-xl-2"><StatCard icon={<FiEye />} label="Views" value={stats.totalViews} /></div>
      </div>
      <div className="row g-3">
        <div className="col-lg-4"><DoughnutChart title="Bookings" values={stats.bookingsByStatus} /></div>
        <div className="col-lg-4"><BarChart title="Monthly Views" values={{ Mar: 1200, Apr: 1600, May: 2100, Jun: 2800, Jul: 3180 }} /></div>
        <div className="col-lg-4">
          <DataTable
            rows={bookings}
            columns={[
              { key: 'property', label: 'Property', render: (row) => <strong>{row.property.title}</strong> },
              { key: 'tenant', label: 'Tenant', render: (row) => row.tenant.fullName },
              { key: 'status', label: 'Status', render: (row) => <StatusBadge status={row.status} /> }
            ]}
          />
        </div>
      </div>
    </>
  );
}
