function AlertCard({ title, severity, time, source, detail }) {
  const severityClass =
    severity === "Critical"
      ? "status-danger"
      : severity === "High"
      ? "status-warning"
      : severity === "Medium"
      ? "status-muted"
      : "status-success";

  return (
    <article className="alert-card">
      <div className="alert-card-header">
        <div>
          <h3>{title}</h3>
          <p>{source}</p>
        </div>
        <span className={`status-badge ${severityClass}`}>{severity}</span>
      </div>

      <p className="alert-detail">{detail}</p>
      <div className="alert-meta">
        <span>{time}</span>
      </div>
    </article>
  );
}

export default AlertCard;