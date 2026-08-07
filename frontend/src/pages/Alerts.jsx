import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatusBadge from "../components/StatusBadge";

const alerts = [
  {
    id: "A-001",
    alert: "Suspicious SSH brute force",
    severity: "Critical",
    source: "203.0.113.12",
    timestamp: "4 min ago",
    status: "Open",
  },
  {
    id: "A-002",
    alert: "API key misuse detected",
    severity: "High",
    source: "54.223.11.9",
    timestamp: "18 min ago",
    status: "Investigating",
  },
  {
    id: "A-003",
    alert: "Credential leak pattern",
    severity: "Medium",
    source: "172.16.0.55",
    timestamp: "38 min ago",
    status: "Acknowledged",
  },
  {
    id: "A-004",
    alert: "Red team decoy hit",
    severity: "Low",
    source: "10.4.7.19",
    timestamp: "1 hr ago",
    status: "Resolved",
  },
];

function Alerts() {
  return (
    <div className="layout-shell">
      <Sidebar />
      <main className="content-shell">
        <Navbar title="Alerts" />

        <section className="page-header-row">
          <div>
            <p className="eyebrow">Threat operations</p>
            <h2>Alert feed & incident details</h2>
          </div>
          <button type="button" className="primary-btn">
            Export report
          </button>
        </section>

        <section className="panel panel-alerts-overview">
          <div className="alert-summary">
            <div>
              <p>Total Alerts</p>
              <strong>24</strong>
            </div>
            <div>
              <p>Critical</p>
              <strong>6</strong>
            </div>
            <div>
              <p>High</p>
              <strong>11</strong>
            </div>
            <div>
              <p>Resolved</p>
              <strong>7</strong>
            </div>
          </div>
        </section>

        <section className="panel panel-table">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Alerts table</p>
              <h2>Latest security events</h2>
            </div>
            <span className="badge badge-soft">Real-time</span>
          </div>

          <div className="table-shell">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Alert</th>
                  <th>Severity</th>
                  <th>Source IP</th>
                  <th>Timestamp</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {alerts.map((item) => (
                  <tr key={item.id}>
                    <td>{item.alert}</td>
                    <td>
                      <StatusBadge
                        variant={
                          item.severity === "Critical"
                            ? "danger"
                            : item.severity === "High"
                            ? "warning"
                            : item.severity === "muted"
                        }
                      >
                        {item.severity}
                      </StatusBadge>
                    </td>
                    <td>{item.source}</td>
                    <td>{item.timestamp}</td>
                    <td>{item.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Alerts;