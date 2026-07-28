import { useEffect, useState } from 'react';
import DataTable from '../../components/common/DataTable.jsx';
import StatusBadge from '../../components/common/StatusBadge.jsx';
import { bookings as demoBookings } from '../../data/demoData.js';
import { bookingApi } from '../../services/api.js';
import { currency, dateTime } from '../../utils/format.js';
import { useToast } from '../../context/ToastContext.jsx';

export default function TenantBookingsPage() {
  const [items, setItems] = useState(demoBookings);
  const toast = useToast();

  useEffect(() => {
    bookingApi.mine().then((page) => setItems(page.content)).catch(() => setItems(demoBookings));
  }, []);

  const cancel = async (booking) => {
    try {
      await bookingApi.cancel(booking.id);
    } catch {
      // Demo mode updates local state only.
    }
    setItems((current) => current.map((item) => item.id === booking.id ? { ...item, status: 'CANCELLED' } : item));
    toast.success('Visit cancelled.');
  };

  return (
    <>
      <div className="dashboard-title">
        <div>
          <h1>Booking History</h1>
          <p className="muted mb-0">Visit requests and owner responses.</p>
        </div>
      </div>
      <DataTable
        rows={items}
        columns={[
          { key: 'property', label: 'Property', render: (row) => <strong>{row.property.title}</strong> },
          { key: 'city', label: 'Location', render: (row) => `${row.property.city}, ${row.property.state}` },
          { key: 'rent', label: 'Rent', render: (row) => currency(row.property.rent) },
          { key: 'preferredDate', label: 'Visit', render: (row) => `${row.preferredDate} ${row.preferredTime}` },
          { key: 'status', label: 'Status', render: (row) => <StatusBadge status={row.status} /> },
          { key: 'createdAt', label: 'Requested', render: (row) => dateTime(row.createdAt) },
          { key: 'action', label: 'Action', render: (row) => row.status === 'PENDING' || row.status === 'APPROVED' ? <button className="btn btn-sm btn-outline-danger" type="button" onClick={() => cancel(row)}>Cancel</button> : null }
        ]}
      />
    </>
  );
}
