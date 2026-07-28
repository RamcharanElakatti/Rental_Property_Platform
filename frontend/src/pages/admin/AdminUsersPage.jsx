import { useEffect, useState } from 'react';
import DataTable from '../../components/common/DataTable.jsx';
import StatusBadge from '../../components/common/StatusBadge.jsx';
import { demoUsers, paged } from '../../data/demoData.js';
import { adminApi } from '../../services/api.js';
import { roleLabel } from '../../utils/format.js';
import { useToast } from '../../context/ToastContext.jsx';

export default function AdminUsersPage() {
  const [role, setRole] = useState('');
  const [items, setItems] = useState(demoUsers);
  const toast = useToast();

  useEffect(() => {
    const params = role ? { role } : {};
    adminApi.users(params).then((page) => setItems(page.content)).catch(() => {
      const filtered = role ? demoUsers.filter((user) => user.roles.includes(`ROLE_${role}`)) : demoUsers;
      setItems(paged(filtered).content);
    });
  }, [role]);

  const toggle = async (user) => {
    try {
      await adminApi.setUserStatus(user.id, !user.enabled);
    } catch {
      // Demo mode updates local state only.
    }
    setItems((current) => current.map((item) => item.id === user.id ? { ...item, enabled: !item.enabled } : item));
    toast.success('User status updated.');
  };

  return (
    <>
      <div className="dashboard-title">
        <div>
          <h1>Manage Users</h1>
          <p className="muted mb-0">Owners, tenants, and administrator accounts.</p>
        </div>
        <select className="form-select w-auto" value={role} onChange={(event) => setRole(event.target.value)} aria-label="Filter users by role">
          <option value="">All users</option>
          <option value="OWNER">Owners</option>
          <option value="TENANT">Tenants</option>
          <option value="ADMIN">Admins</option>
        </select>
      </div>
      <DataTable
        rows={items}
        columns={[
          { key: 'fullName', label: 'Name', render: (row) => <strong>{row.fullName}</strong> },
          { key: 'email', label: 'Email' },
          { key: 'phone', label: 'Phone' },
          { key: 'role', label: 'Role', render: (row) => roleLabel(row.roles) },
          { key: 'enabled', label: 'Status', render: (row) => <StatusBadge status={row.enabled ? 'ACTIVE' : 'DISABLED'} /> },
          { key: 'action', label: 'Action', render: (row) => <button className="btn btn-sm btn-outline-primary" type="button" onClick={() => toggle(row)}>{row.enabled ? 'Disable' : 'Enable'}</button> }
        ]}
      />
    </>
  );
}
