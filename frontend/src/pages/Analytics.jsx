import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import api from "../services/api";

function Analytics() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAlerts = async () => {
      try {
        const response = await api.get("/alerts");

        console.log("Analytics alerts:", response.data);

        setAlerts(response.data);
      } catch (error) {
        console.error("Analytics error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadAlerts();

    const interval = setInterval(() => {
      loadAlerts();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // -----------------------------
  // SEVERITY
  // -----------------------------

  const critical = alerts.filter(
    (a) => a.severity?.toLowerCase() === "critical"
  ).length;

  const high = alerts.filter(
    (a) => a.severity?.toLowerCase() === "high"
  ).length;

  const medium = alerts.filter(
    (a) => a.severity?.toLowerCase() === "medium"
  ).length;

  const low = alerts.filter(
    (a) => a.severity?.toLowerCase() === "low"
  ).length;

  // -----------------------------
  // STATUS
  // -----------------------------

  const blocked = alerts.filter(
    (a) => a.status?.toLowerCase() === "blocked"
  ).length;

  const detectionRate =
    alerts.length > 0
      ? Math.round((blocked / alerts.length) * 100)
      : 0;

  // -----------------------------
  // IP SOURCES
  // -----------------------------

  const sourceMap = {};

  alerts.forEach((alert) => {
    const ip = alert.ip_address || "Unknown";

    sourceMap[ip] = (sourceMap[ip] || 0) + 1;
  });

  const sources = Object.entries(sourceMap)
    .map(([source, count]) => ({
      source,
      count,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // -----------------------------
  // TOKEN TYPES
  // -----------------------------

  const tokenMap = {};

  alerts.forEach((alert) => {
    const token = alert.token_type || "Unknown";

    tokenMap[token] = (tokenMap[token] || 0) + 1;
  });

  const tokens = Object.entries(tokenMap)
    .map(([token, count]) => ({
      token,
      count,
    }))
    .sort((a, b) => b.count - a.count);

  return (
    <div className="app-shell">
      <Sidebar />

      <main className="main-content">
        <Navbar />

        {/* HEADER */}

        <section className="page-header-row">
          <div>
            <p className="eyebrow">
              Security analytics
            </p>

            <h2>
              Threat telemetry and trending insights
            </h2>
          </div>
        </section>

        {/* TOP STATS */}

        <section
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(4, minmax(0, 1fr))",
            gap: "20px",
            marginBottom: "20px",
          }}
        >
          <Stat
            title="Total Alerts"
            value={loading ? "..." : alerts.length}
          />

          <Stat
            title="Critical"
            value={loading ? "..." : critical}
          />

          <Stat
            title="High"
            value={loading ? "..." : high}
          />

          <Stat
            title="Blocked"
            value={loading ? "..." : blocked}
          />
        </section>

        {/* MAIN ANALYTICS */}

        <section className="analytics-grid">

          {/* ATTACK ACTIVITY */}

          <article className="panel">
            <div className="panel-header">
              <div>
                <p className="eyebrow">
                  Attack Activity
                </p>

                <h2>
                  Live security events
                </h2>
              </div>

              <span className="badge badge-soft">
                Live
              </span>
            </div>

            <div
              style={{
                padding: "30px 10px",
              }}
            >
              {alerts.length === 0 ? (
                <p>
                  No attacks detected yet.
                </p>
              ) : (
                <>
                  <strong
                    style={{
                      fontSize: "48px",
                    }}
                  >
                    {alerts.length}
                  </strong>

                  <p>
                    total security events recorded
                  </p>

                  <div
                    style={{
                      marginTop: "25px",
                      display: "flex",
                      gap: "8px",
                      flexWrap: "wrap",
                    }}
                  >
                    {alerts.map((alert) => (
                      <div
                        key={alert.id}
                        title={`${alert.token_type} - ${alert.severity}`}
                        style={{
                          width: "22px",
                          height: "22px",
                          borderRadius: "5px",
                          background:
                            alert.severity?.toLowerCase() ===
                            "critical"
                              ? "#ef4444"
                              : alert.severity?.toLowerCase() ===
                                "high"
                              ? "#f59e0b"
                              : "#3b82f6",
                        }}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </article>

          {/* TOP SOURCES */}

          <article className="panel">
            <div className="panel-header">
              <div>
                <p className="eyebrow">
                  Top Attack Sources
                </p>

                <h2>
                  High-volume origins
                </h2>
              </div>
            </div>

            {sources.length === 0 ? (
              <p>No attack sources recorded.</p>
            ) : (
              <ul className="metrics-list">
                {sources.map((item) => (
                  <li key={item.source}>
                    <span>{item.source}</span>

                    <strong>
                      {item.count}
                    </strong>
                  </li>
                ))}
              </ul>
            )}
          </article>

          {/* DETECTION RATE */}

          <article className="panel">
            <div className="panel-header">
              <div>
                <p className="eyebrow">
                  Detection Success Rate
                </p>

                <h2>
                  Defense performance
                </h2>
              </div>
            </div>

            <div className="metric-tile">
              <strong>
                {loading
                  ? "..."
                  : `${detectionRate}%`}
              </strong>

              <p>
                Alerts currently blocked by active
                defense.
              </p>
            </div>
          </article>

          {/* SEVERITY */}

          <article className="panel">
            <div className="panel-header">
              <div>
                <p className="eyebrow">
                  Threat Distribution
                </p>

                <h2>
                  Severity distribution
                </h2>
              </div>
            </div>

            <ul className="metrics-list">

              <li>
                <span>Critical</span>
                <strong>{critical}</strong>
              </li>

              <li>
                <span>High</span>
                <strong>{high}</strong>
              </li>

              <li>
                <span>Medium</span>
                <strong>{medium}</strong>
              </li>

              <li>
                <span>Low</span>
                <strong>{low}</strong>
              </li>

            </ul>
          </article>

        </section>

        {/* TOKEN INTELLIGENCE */}

        <section
          className="panel"
          style={{
            marginTop: "20px",
          }}
        >
          <div className="panel-header">
            <div>
              <p className="eyebrow">
                Honeytoken Intelligence
              </p>

              <h2>
                Most targeted honeytokens
              </h2>
            </div>
          </div>

          {tokens.length === 0 ? (
            <p>
              No honeytoken attacks recorded.
            </p>
          ) : (
            <ul className="metrics-list">
              {tokens.map((item) => (
                <li key={item.token}>
                  <span>{item.token}</span>

                  <strong>
                    {item.count} attack
                    {item.count !== 1 ? "s" : ""}
                  </strong>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* RECENT ACTIVITY */}

        <section
          className="panel"
          style={{
            marginTop: "20px",
          }}
        >
          <div className="panel-header">
            <div>
              <p className="eyebrow">
                Recent Activity
              </p>

              <h2>
                Latest detected attacks
              </h2>
            </div>
          </div>

          {alerts.length === 0 ? (
            <p>
              No recent attacks.
            </p>
          ) : (
            <ul className="metrics-list">
              {alerts
                .slice(0, 5)
                .map((alert) => (
                  <li key={alert.id}>
                    <span>
                      {alert.token_type}
                    </span>

                    <strong>
                      {alert.severity}
                    </strong>
                  </li>
                ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}

function Stat({ title, value }) {
  return (
    <div
      className="panel"
      style={{
        padding: "20px",
      }}
    >
      <p className="eyebrow">{title}</p>

      <strong
        style={{
          fontSize: "32px",
        }}
      >
        {value}
      </strong>
    </div>
  );
}

export default Analytics;