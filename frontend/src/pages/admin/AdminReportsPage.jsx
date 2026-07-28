import { useEffect, useMemo, useState } from 'react';
import { FiBookOpen, FiHeart, FiHome, FiUsers } from 'react-icons/fi';
import { BarChart, DoughnutChart } from '../../components/common/Charts.jsx';
import DataTable from '../../components/common/DataTable.jsx';
import StatCard from '../../components/common/StatCard.jsx';
import StatusBadge from '../../components/common/StatusBadge.jsx';
import { adminReports } from '../../data/demoData.js';
import { adminApi } from '../../services/api.js';
import { roleLabel } from '../../utils/format.js';

export default function AdminReportsPage() {
  const [report, setReport] = useState(adminReports);

  useEffect(() => {
    adminApi.reports().then(setReport).catch(() => setReport(adminReports));
  }, []);

  const roleRows = useMemo(() => Object.entries(report.usersByRole || {}).map(([role, total]) => ({
    id: role,
    role,
    total
  })), [report.usersByRole]);

  const statusRows = useMemo(() => [
    { id: 'available', label: 'Available properties', status: 'AVAILABLE', total: report.activeListings },
    { id: 'occupied', label: 'Occupied properties', status: 'OCCUPIED', total: report.occupiedProperties },
    { id: 'maintenance', label: 'Maintenance properties', status: 'MAINTENANCE', total: report.maintenanceProperties },
    { id: 'pending', label: 'Pending bookings', status: 'PENDING', total: report.pendingBookings },
    { id: 'approved', label: 'Approved bookings', status: 'APPROVED', total: report.approvedBookings },
    { id: 'rejected', label: 'Rejected bookings', status: 'REJECTED', total: report.rejectedBookings },
    { id: 'completed', label: 'Completed bookings', status: 'COMPLETED', total: report.completedBookings },
    { id: 'cancelled', label: 'Cancelled bookings', status: 'CANCELLED', total: report.cancelledBookings }
  ], [report]);

  return (
    <>
      <div className="dashboard-title">
        <div>
          <h1>Reports</h1>
          <p className="muted mb-0">Operational snapshots for users, listings, visits, and saved properties.</p>
        </div>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-md-3"><StatCard icon={<FiUsers />} label="Users" value={report.totalUsers} /></div>
        <div className="col-md-3"><StatCard icon={<FiHome />} label="Properties" value={report.totalProperties} /></div>
        <div className="col-md-3"><StatCard icon={<FiBookOpen />} label="Bookings" value={report.totalBookings} /></div>
        <div className="col-md-3"><StatCard icon={<FiHeart />} label="Favourites" value={report.favourites} /></div>
      </div>

      <div className="row g-3">
        <div className="col-lg-4"><BarChart title="Properties by City" values={report.propertiesByCity} /></div>
        <div className="col-lg-4"><DoughnutChart title="Properties by Status" values={report.propertiesByStatus} /></div>
        <div className="col-lg-4"><DoughnutChart title="Bookings by Status" values={report.bookingsByStatus} /></div>
      </div>

      <div className="row g-3 mt-1">
        <div className="col-lg-5">
          <DataTable
            rows={roleRows}
            columns={[
              { key: 'role', label: 'Role', render: (row) => <strong>{roleLabel([row.role])}</strong> },
              { key: 'total', label: 'Users' }
            ]}
          />
        </div>
        <div className="col-lg-7">
          <DataTable
            rows={statusRows}
            columns={[
              { key: 'label', label: 'Metric', render: (row) => <strong>{row.label}</strong> },
              { key: 'status', label: 'Status', render: (row) => <StatusBadge status={row.status} /> },
              { key: 'total', label: 'Total' }
            ]}
          />
        </div>
      </div>
    </>
  );
}
