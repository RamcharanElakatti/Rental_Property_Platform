import { Link } from 'react-router-dom';
import { FiBell, FiBookOpen, FiClock, FiHeart } from 'react-icons/fi';
import StatCard from '../../components/common/StatCard.jsx';
import DataTable from '../../components/common/DataTable.jsx';
import { LineChart } from '../../components/common/Charts.jsx';
import StatusBadge from '../../components/common/StatusBadge.jsx';
import { bookings, notifications, properties } from '../../data/demoData.js';
import { currency, dateTime } from '../../utils/format.js';

export default function TenantDashboard() {
  return (
    <>
      <div className="dashboard-title">
        <div>
          <h1>Tenant Dashboard</h1>
          <p className="muted mb-0">Shortlist rentals, track visit requests, and review updates.</p>
        </div>
        <Link className="btn btn-primary" to="/properties">Search Properties</Link>
      </div>
      <div className="row g-3 mb-4">
        <div className="col-md-3"><StatCard icon={<FiHeart />} label="Favourite properties" value="12" hint="+3 this week" /></div>
        <div className="col-md-3"><StatCard icon={<FiBookOpen />} label="Bookings" value={bookings.length} hint="2 upcoming" /></div>
        <div className="col-md-3"><StatCard icon={<FiClock />} label="Recently viewed" value={properties.length} /></div>
        <div className="col-md-3"><StatCard icon={<FiBell />} label="Unread notifications" value={notifications.filter((item) => !item.read).length} /></div>
      </div>
      <div className="row g-3">
        <div className="col-lg-5">
          <LineChart title="Monthly Views" values={{ Mar: 4, Apr: 8, May: 13, Jun: 11, Jul: 18 }} />
        </div>
        <div className="col-lg-7">
          <DataTable
            rows={bookings}
            columns={[
              { key: 'property', label: 'Property', render: (row) => <strong>{row.property.title}</strong> },
              { key: 'preferredDate', label: 'Visit', render: (row) => `${row.preferredDate} ${row.preferredTime}` },
              { key: 'rent', label: 'Rent', render: (row) => currency(row.property.rent) },
              { key: 'status', label: 'Status', render: (row) => <StatusBadge status={row.status} /> },
              { key: 'createdAt', label: 'Requested', render: (row) => dateTime(row.createdAt) }
            ]}
          />
        </div>
      </div>
    </>
  );
}
