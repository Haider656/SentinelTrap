import StatusBadge from "./StatusBadge";

function HoneytokenCard({ name, type, status, lastTriggered, actionLabel }) {
  const variant =
    status === "Active"
      ? "success"
      : status === "Dormant"
      ? "muted"
      : "warning";

  return (
    <div className="honeytoken-card">
      <div>
        <h3>{name}</h3>
        <p>{type}</p>
      </div>
      <div className="honeytoken-card-meta">
        <StatusBadge variant={variant}>{status}</StatusBadge>
        <span>{lastTriggered}</span>
      </div>
      <button type="button" className="ghost-btn">
        {actionLabel}
      </button>
    </div>
  );
}

export default HoneytokenCard;