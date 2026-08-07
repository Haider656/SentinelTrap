function StatCard({ title, value, color, accent }) {
  return (
    <div className="stat-card" style={{ "--accent-color": color }}>
      <div className="stat-card-top">
        <small>{title}</small>
        <span className="stat-value">{value}</span>
      </div>
      <p className="stat-card-note">{accent}</p>
    </div>
  );
}

export default StatCard;