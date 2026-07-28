import { useEffect, useState } from 'react';
import DataTable from '../../components/common/DataTable.jsx';
import StatusBadge from '../../components/common/StatusBadge.jsx';
import { bookings as demoBookings } from '../../data/demoData.js';
import { adminApi } from '../../services/api.js';

export default function AdminBookingsPage() {
  const [items, setItems] = useState(demoBookings);

  useEffect(() => {
    adminApi.bookings().then((page) => setItems(page.content)).catch(() => setItems(demoBookings));
  }, []);

  return (
    <>
      <div className="dashboard-title">
        <div>
          <h1>Manage Bookings</h1>
          <p className="muted mb-0">Visit requests across the whole platform.</p>
        </div>
      </div>
      <DataTable
        rows={items}
        columns={[
          { key: 'property', label: 'Property', render: (row) => <strong>{row.property.title}</strong> },
          { key: 'tenant', label: 'Tenant', render: (row) => row.tenant.fullName },
          { key: 'owner', label: 'Owner', render: (row) => row.property.owner.fullName },
          { key: 'visit', label: 'Visit', render: (row) => `${row.preferredDate} ${row.preferredTime}` },
          { key: 'status', label: 'Status', render: (row) => <StatusBadge status={row.status} /> }
        ]}
      />
    </>
  );
}
