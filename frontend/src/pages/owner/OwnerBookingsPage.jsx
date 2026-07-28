import { useEffect, useState } from 'react';
import DataTable from '../../components/common/DataTable.jsx';
import StatusBadge from '../../components/common/StatusBadge.jsx';
import { bookings as demoBookings } from '../../data/demoData.js';
import { bookingApi, ownerApi } from '../../services/api.js';
import { useToast } from '../../context/ToastContext.jsx';

export default function OwnerBookingsPage() {
  const [items, setItems] = useState(demoBookings);
  const toast = useToast();

  useEffect(() => {
    ownerApi.bookings().then((page) => setItems(page.content)).catch(() => setItems(demoBookings));
  }, []);

  const update = async (booking, status) => {
    try {
      await bookingApi.updateStatus(booking.id, { status });
    } catch {
      // Demo mode updates local state only.
    }
    setItems((current) => current.map((item) => item.id === booking.id ? { ...item, status } : item));
    toast.success(`Booking ${status.toLowerCase()}.`);
  };

  return (
    <>
      <div className="dashboard-title">
        <div>
          <h1>Tenant Requests</h1>
          <p className="muted mb-0">Approve or reject visit requests.</p>
        </div>
      </div>
      <DataTable
        rows={items}
        columns={[
          { key: 'property', label: 'Property', render: (row) => <strong>{row.property.title}</strong> },
          { key: 'tenant', label: 'Tenant', render: (row) => row.tenant.fullName },
          { key: 'visit', label: 'Visit', render: (row) => `${row.preferredDate} ${row.preferredTime}` },
          { key: 'status', label: 'Status', render: (row) => <StatusBadge status={row.status} /> },
          {
            key: 'actions',
            label: 'Actions',
            render: (row) => row.status === 'PENDING' ? (
              <div className="d-flex gap-2">
                <button className="btn btn-sm btn-outline-primary" type="button" onClick={() => update(row, 'APPROVED')}>Approve</button>
                <button className="btn btn-sm btn-outline-danger" type="button" onClick={() => update(row, 'REJECTED')}>Reject</button>
              </div>
            ) : null
          }
        ]}
      />
    </>
  );
}
