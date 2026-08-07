import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import AlertCard from "../components/AlertCard";

const stats = [
  {
    title: "Total Honeytokens",
    value: "125",
    color: "#3B82F6",
    accent: "Monitoring active decoys",
  },
  {
    title: "Active Alerts",
    value: "8",
    color: "#EF4444",
    accent: "High-priority detections",
  },
  {
    title: "Detection Rate",
    value: "97%",
    color: "#22C55E",
    accent: "Successful coverage",
  },
  {
    title: "Threat Level",
    value: "HIGH",
    color: "#F59E0B",
    accent: "Elevated response posture",
  },
];

const recentAlerts = [
  {
    title: "AWS Key Triggered",
    severity: "Critical",
    time: "2 minutes ago",
    source: "us-east-1 / AWS IAM",
    detail: "Unauthorized access detected on exposed key.",
  },
  {
    title: "Database Honeytoken Triggered",
    severity: "High",
    time: "15 minutes ago",
    source: "10.12.34.9",
    detail: "Honeytoken credential exfiltration attempt.",
  },
  {
    title: "Honeytoken File Accessed",
    severity: "Low",
    time: "1 hour ago",
    source: "172.16.0.21",
    detail: "Decoy file opened from internal host.",
  },
];

function Dashboard() {
  return (
    <div className="layout-shell">
      <Sidebar />
      <main className="content-shell">
        <Navbar title="Dashboard" />

        <section className="stats-grid">
          {stats.map((stat) => (
            <StatCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              color={stat.color}
              accent={stat.accent}
            />
          ))}
        </section>

        <section className="dashboard-grid">
          <article className="panel panel-graph">
            <div className="panel-header">
              <div>
                <p className="eyebrow">Attack Trend</p>
                <h2>Suspicious activity heatmap</h2>
              </div>
              <span className="badge badge-primary">Live</span>
            </div>
            <div className="chart-placeholder">
              <div className="chart-axis" />
              <div className="chart-line" />
              <div className="chart-dot dot-1" />
              <div className="chart-dot dot-2" />
              <div className="chart-dot dot-3" />
              <div className="chart-dot dot-4" />
              <div className="chart-dot dot-5" />
            </div>
            <div className="chart-footer">
              <span>Threat events</span>
              <span>Last 24 hours</span>
            </div>
          </article>

          <article className="panel panel-alerts">
            <div className="panel-header">
              <div>
                <p className="eyebrow">Recent Alerts</p>
                <h2>Latest security events</h2>
              </div>
              <span className="badge badge-soft">8 new</span>
            </div>

            <div className="alert-list">
              {recentAlerts.map((alert) => (
                <AlertCard key={alert.title} {...alert} />
              ))}
            </div>
          </article>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;