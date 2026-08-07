function StatusBadge({ children, variant = "default" }) {
  return <span className={`status-badge ${variant}`}>{children}</span>;
}

export default StatusBadge;