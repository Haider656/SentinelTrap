import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";

const sources = [
  { source: "104.16.99.52", count: 42 },
  { source: "203.0.113.44", count: 31 },
  { source: "54.210.5.18", count: 24 },
  { source: "172.16.0.1", count: 18 },
];

function Analytics() {
  return (
    <div className="layout-shell">
      <Sidebar />
      <main className="content-shell">
        <Navbar title="Analytics" />

        <section className="page-header-row">
          <div>
            <p className="eyebrow">Security analytics</p>
            <h2>Threat telemetry and trending insights</h2>
          </div>
        </section>

        <section className="analytics-grid">
          <article className="panel">
            <div className="panel-header">
              <div>
                <p className="eyebrow">Attack Trend</p>
                <h2>Behavioral signal score</h2>
              </div>
            </div>
            <div className="chart-placeholder chart-large">
              <Loader label="Building trend model" />
            </div>
          </article>

          <article className="panel">
            <div className="panel-header">
              <div>
                <p className="eyebrow">Top Attack Sources</p>
                <h2>High-volume origins</h2>
              </div>
            </div>

            <ul className="metrics-list">
              {sources.map((item) => (
                <li key={item.source}>
                  <span>{item.source}</span>
                  <strong>{item.count}</strong>
                </li>
              ))}
            </ul>
          </article>

          <article className="panel">
            <div className="panel-header">
              <div>
                <p className="eyebrow">Detection Success Rate</p>
                <h2>Coverage performance</h2>
              </div>
            </div>
            <div className="metric-tile">
              <strong>97%</strong>
              <p>Real-time detection coverage across current deployment.</p>
            </div>
          </article>

          <article className="panel">
            <div className="panel-header">
              <div>
                <p className="eyebrow">Threat Distribution</p>
                <h2>Severity distribution</h2>
              </div>
            </div>
            <div className="chart-placeholder small-chart">
              <Loader label="Analyzing threat mix" />
            </div>
          </article>
        </section>
      </main>
    </div>
  );
}

export default Analytics;