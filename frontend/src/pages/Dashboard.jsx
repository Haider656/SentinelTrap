import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import AlertCard from "../components/AlertCard";
import api from "../services/api";

function Dashboard() {
  const [tokens, setTokens] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [tokenResponse, alertResponse] = await Promise.all([
          api.get("/honeytokens"),
          api.get("/alerts"),
        ]);

        setTokens(tokenResponse.data);
        setAlerts(alertResponse.data);
      } catch (error) {
        console.error("Dashboard API error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();

    const interval = setInterval(() => {
      loadDashboard();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        background: "#0F172A",
        minHeight: "100vh",
      }}
    >
      <Sidebar />

      <div style={{ flex: 1, padding: "30px" }}>
        <Navbar />

        {/* STAT CARDS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px",
          }}
        >
          <StatCard
            title="Honeytokens"
            value={loading ? "..." : tokens.length}
            color="#3B82F6"
          />

          <StatCard
            title="Active Alerts"
            value={loading ? "..." : alerts.length}
            color="#EF4444"
          />

          <StatCard
            title="Detection Rate"
            value="97%"
            color="#22C55E"
          />

          <StatCard
            title="Threat Level"
            value={alerts.length > 0 ? "HIGH" : "LOW"}
            color={alerts.length > 0 ? "#EF4444" : "#22C55E"}
          />
        </div>

        {/* LOWER SECTION */}
        <div
          style={{
            marginTop: "30px",
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "20px",
          }}
        >
          {/* ATTACK TREND */}
          <div
            style={{
              background: "#1F2937",
              color: "white",
              padding: "20px",
              borderRadius: "12px",
            }}
          >
            <h2>📊 Attack Trend</h2>

            <div
              style={{
                height: "250px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#9CA3AF",
              }}
            >
              No attacks detected yet
            </div>
          </div>

          {/* ALERTS */}
          <div>
            <h2 style={{ color: "white" }}>
              🚨 Recent Alerts
            </h2>

            {alerts.length === 0 ? (
              <div
                style={{
                  background: "#1F2937",
                  padding: "20px",
                  borderRadius: "10px",
                  color: "#94A3B8",
                }}
              >
                No security alerts yet.
              </div>
            ) : (
              alerts.slice(0, 5).map((alert, index) => (
                <AlertCard
                  key={alert.id || index}
                  title={
                    alert.message ||
                    alert.title ||
                    "Security Alert"
                  }
                  severity={
                    alert.severity ||
                    "High"
                  }
                  time={
                    alert.created_at ||
                    alert.timestamp ||
                    "Recently"
                  }
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;