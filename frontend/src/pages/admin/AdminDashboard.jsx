import { useEffect, useState } from 'react';
import { FiBookOpen, FiDollarSign, FiHome, FiUsers } from 'react-icons/fi';
import StatCard from '../../components/common/StatCard.jsx';
import DataTable from '../../components/common/DataTable.jsx';
import { BarChart, DoughnutChart } from '../../components/common/Charts.jsx';
import { adminStats, demoUsers } from '../../data/demoData.js';
import { adminApi } from '../../services/api.js';
import { dateTime } from '../../utils/format.js';

export default function AdminDashboard() {
  const [stats, setStats] = useState(adminStats);

  useEffect(() => {
    adminApi.dashboard().then(setStats).catch(() => setStats(adminStats));
  }, []);

  return (
    <>
      <div className="dashboard-title">
        <div>
          <h1>Admin Dashboard</h1>
          <p className="muted mb-0">Platform analytics, user activity, and operational controls.</p>
        </div>
      </div>
      <div className="row g-3 mb-4">
        <div className="col-md-3"><StatCard icon={<FiUsers />} label="Users" value={stats.totalUsers} /></div>
        <div className="col-md-3"><StatCard icon={<FiHome />} label="Properties" value={stats.totalProperties} /></div>
        <div className="col-md-3"><StatCard icon={<FiBookOpen />} label="Pending bookings" value={stats.pendingBookings} /></div>
        <div className="col-md-3"><StatCard icon={<FiDollarSign />} label="Revenue placeholder" value="$42k" /></div>
      </div>
      <div className="row g-3">
        <div className="col-lg-4"><BarChart title="Properties by City" values={stats.propertiesByCity} /></div>
        <div className="col-lg-4"><DoughnutChart title="Bookings" values={stats.bookingsByStatus} /></div>
        <div className="col-lg-4">
          <DataTable
            rows={demoUsers}
            columns={[
              { key: 'fullName', label: 'Recent Users', render: (row) => <strong>{row.fullName}</strong> },
              { key: 'email', label: 'Email' },
              { key: 'createdAt', label: 'Joined', render: (row) => dateTime(row.createdAt) }
            ]}
          />
        </div>
      </div>
    </>
  );
}
