import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  ArcElement
} from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Tooltip, Legend, Filler);

const palette = ['#147c72', '#d35f4b', '#2f6fed', '#d99a1b', '#5a7d4f', '#9a5b4f'];

export function BarChart({ title, values }) {
  const labels = Object.keys(values || {});
  const data = Object.values(values || {});
  return (
    <div className="chart-box">
      <h2 className="h6 fw-bold">{title}</h2>
      <Bar
        data={{
          labels,
          datasets: [{ label: title, data, backgroundColor: palette.slice(0, labels.length), borderRadius: 8 }]
        }}
        options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }}
        height={240}
      />
    </div>
  );
}

export function DoughnutChart({ title, values }) {
  const labels = Object.keys(values || {});
  const data = Object.values(values || {});
  return (
    <div className="chart-box">
      <h2 className="h6 fw-bold">{title}</h2>
      <Doughnut
        data={{
          labels,
          datasets: [{ data, backgroundColor: palette.slice(0, labels.length), borderWidth: 0 }]
        }}
        options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }}
        height={240}
      />
    </div>
  );
}

export function LineChart({ title, values }) {
  const labels = Object.keys(values || {});
  const data = Object.values(values || {});
  return (
    <div className="chart-box">
      <h2 className="h6 fw-bold">{title}</h2>
      <Line
        data={{
          labels,
          datasets: [{
            label: title,
            data,
            borderColor: '#147c72',
            backgroundColor: 'rgba(20, 124, 114, 0.16)',
            fill: true,
            tension: 0.35
          }]
        }}
        options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }}
        height={240}
      />
    </div>
  );
}
