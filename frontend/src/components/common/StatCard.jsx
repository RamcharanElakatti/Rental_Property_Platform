export default function StatCard({ icon, label, value, hint }) {
  return (
    <div className="stat-card">
      <span className="stat-icon">{icon}</span>
      <span className="text-muted small">{label}</span>
      <strong>{value}</strong>
      {hint ? <span className="small text-success">{hint}</span> : null}
    </div>
  );
}
