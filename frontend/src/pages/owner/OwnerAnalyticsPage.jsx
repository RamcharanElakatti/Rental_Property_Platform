import { BarChart, DoughnutChart, LineChart } from '../../components/common/Charts.jsx';
import { ownerStats } from '../../data/demoData.js';

export default function OwnerAnalyticsPage() {
  return (
    <>
      <div className="dashboard-title">
        <div>
          <h1>Property Analytics</h1>
          <p className="muted mb-0">Monthly views, favourite count, and booking movement.</p>
        </div>
      </div>
      <div className="row g-3">
        <div className="col-lg-4"><LineChart title="Monthly Views" values={{ Jan: 900, Feb: 1160, Mar: 1280, Apr: 1600, May: 2100, Jun: 2800, Jul: 3180 }} /></div>
        <div className="col-lg-4"><BarChart title="Favourite Count" values={{ Apartment: 210, Villa: 186, Studio: 96, House: 242 }} /></div>
        <div className="col-lg-4"><DoughnutChart title="Bookings" values={ownerStats.bookingsByStatus} /></div>
      </div>
    </>
  );
}
