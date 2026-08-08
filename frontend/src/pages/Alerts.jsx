import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import api from "../services/api";

function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadAlerts = async () => {
      try {
        console.log("Fetching alerts...");

        const response = await api.get("/alerts");

        console.log("Alerts received:", response.data);

        setAlerts(response.data);
      } catch (err) {
        console.error("ALERT API ERROR:", err);
        setError(err.message);
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

  const critical = alerts.filter(
    (a) => a.severity?.toLowerCase() === "critical"
  ).length;

  const high = alerts.filter(
    (a) => a.severity?.toLowerCase() === "high"
  ).length;

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#0F172A",
        color: "white",
      }}
    >
      <Sidebar />

      <main
        style={{
          flex: 1,
          padding: "30px",
        }}
      >
        <Navbar />

        <div style={{ marginTop: "30px" }}>
          <p
            style={{
              color: "#60A5FA",
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}
          >
            Threat Operations
          </p>

          <h1 style={{ fontSize: "36px" }}>
            Alert Feed & Incident Details
          </h1>
        </div>

        {/* SUMMARY */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px",
            marginTop: "30px",
          }}
        >
          <SummaryCard
            title="Total Alerts"
            value={loading ? "..." : alerts.length}
          />

          <SummaryCard
            title="Critical"
            value={loading ? "..." : critical}
          />

          <SummaryCard
            title="High"
            value={loading ? "..." : high}
          />

          <SummaryCard
            title="Blocked"
            value={
              loading
                ? "..."
                : alerts.filter(
                    (a) => a.status?.toLowerCase() === "blocked"
                  ).length
            }
          />
        </div>

        {/* ALERTS */}
        <div
          style={{
            background: "#1E293B",
            borderRadius: "15px",
            padding: "25px",
            marginTop: "30px",
            overflowX: "auto",
          }}
        >
          <h2>🚨 Latest Security Events</h2>

          {loading && (
            <p style={{ color: "#94A3B8" }}>
              Loading alerts...
            </p>
          )}

          {error && (
            <p style={{ color: "#EF4444" }}>
              Backend error: {error}
            </p>
          )}

          {!loading && !error && alerts.length === 0 && (
            <p style={{ color: "#94A3B8" }}>
              No security alerts detected.
            </p>
          )}

          {!loading && alerts.length > 0 && (
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                marginTop: "20px",
              }}
            >
              <thead>
                <tr style={{ color: "#94A3B8" }}>
                  <th style={cellStyle}>TOKEN</th>
                  <th style={cellStyle}>SEVERITY</th>
                  <th style={cellStyle}>ATTACKER</th>
                  <th style={cellStyle}>IP ADDRESS</th>
                  <th style={cellStyle}>ACTION</th>
                  <th style={cellStyle}>STATUS</th>
                  <th style={cellStyle}>TIME</th>
                </tr>
              </thead>

              <tbody>
                {alerts.map((alert) => (
                  <tr key={alert.id}>
                    <td style={cellStyle}>
                      {alert.token_type}
                    </td>

                    <td style={cellStyle}>
                      <span
                        style={{
                          color:
                            alert.severity === "Critical"
                              ? "#EF4444"
                              : alert.severity === "High"
                              ? "#F59E0B"
                              : "#22C55E",
                          fontWeight: "bold",
                        }}
                      >
                        {alert.severity}
                      </span>
                    </td>

                    <td style={cellStyle}>
                      {alert.attacker}
                    </td>

                    <td style={cellStyle}>
                      {alert.ip_address}
                    </td>

                    <td style={cellStyle}>
                      {alert.action}
                    </td>

                    <td style={cellStyle}>
                      {alert.status}
                    </td>

                    <td style={cellStyle}>
                      {new Date(
                        alert.timestamp
                      ).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}

function SummaryCard({ title, value }) {
  return (
    <div
      style={{
        background: "#1E293B",
        borderRadius: "12px",
        padding: "25px",
      }}
    >
      <p style={{ color: "#94A3B8" }}>{title}</p>

      <strong style={{ fontSize: "36px" }}>
        {value}
      </strong>
    </div>
  );
}

const cellStyle = {
  padding: "18px 12px",
  textAlign: "left",
  borderBottom: "1px solid #334155",
};

export default Alerts;