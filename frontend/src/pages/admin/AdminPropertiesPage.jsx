import { useEffect, useState } from 'react';
import DataTable from '../../components/common/DataTable.jsx';
import StatusBadge from '../../components/common/StatusBadge.jsx';
import { paged, properties as demoProperties } from '../../data/demoData.js';
import { adminApi } from '../../services/api.js';
import { currency } from '../../utils/format.js';

export default function AdminPropertiesPage() {
  const [items, setItems] = useState(demoProperties);

  useEffect(() => {
    adminApi.properties().then((page) => setItems(page.content)).catch(() => setItems(paged(demoProperties).content));
  }, []);

  return (
    <>
      <div className="dashboard-title">
        <div>
          <h1>Manage Properties</h1>
          <p className="muted mb-0">All marketplace listings and moderation status.</p>
        </div>
      </div>
      <DataTable
        rows={items}
        columns={[
          { key: 'title', label: 'Property', render: (row) => <strong>{row.title}</strong> },
          { key: 'owner', label: 'Owner', render: (row) => row.owner.fullName },
          { key: 'city', label: 'City', render: (row) => `${row.city}, ${row.state}` },
          { key: 'rent', label: 'Rent', render: (row) => currency(row.rent) },
          { key: 'category', label: 'Category', render: (row) => row.category.name },
          { key: 'status', label: 'Status', render: (row) => <StatusBadge status={row.status} /> }
        ]}
      />
    </>
  );
}
