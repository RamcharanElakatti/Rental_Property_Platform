import { useEffect, useState } from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import DataTable from '../../components/common/DataTable.jsx';
import StatusBadge from '../../components/common/StatusBadge.jsx';
import { notifications as demoNotifications, paged } from '../../data/demoData.js';
import { notificationApi } from '../../services/api.js';
import { dateTime } from '../../utils/format.js';
import { useToast } from '../../context/ToastContext.jsx';

export default function NotificationsPage() {
  const [items, setItems] = useState(demoNotifications);
  const toast = useToast();

  useEffect(() => {
    notificationApi.list().then((page) => setItems(page.content)).catch(() => setItems(paged(demoNotifications).content));
  }, []);

  const markRead = async (notification) => {
    try {
      await notificationApi.markRead(notification.id);
    } catch {
      // Demo mode keeps the interaction local.
    }
    setItems((current) => current.map((item) => item.id === notification.id ? { ...item, read: true } : item));
    toast.success('Notification marked as read.');
  };

  return (
    <>
      <div className="dashboard-title">
        <div>
          <h1>Notifications</h1>
          <p className="muted mb-0">Booking updates, new listings, and account activity.</p>
        </div>
      </div>
      <DataTable
        rows={items}
        columns={[
          { key: 'title', label: 'Title', render: (row) => <strong>{row.title}</strong> },
          { key: 'message', label: 'Message' },
          { key: 'type', label: 'Type', render: (row) => <StatusBadge status={row.type.replace('BOOKING_', '')} /> },
          { key: 'createdAt', label: 'Created', render: (row) => dateTime(row.createdAt) },
          { key: 'read', label: 'Read', render: (row) => row.read ? 'Yes' : <button className="btn btn-sm btn-outline-primary" type="button" onClick={() => markRead(row)}><FiCheckCircle /> Mark read</button> }
        ]}
      />
    </>
  );
}
