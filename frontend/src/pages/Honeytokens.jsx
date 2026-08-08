import { useEffect, useState } from "react";
import api from "../services/api";

function Honeytokens() {
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHoneytokens = async () => {
      try {
        const response = await api.get("/honeytokens");
        setTokens(response.data);
        setError("");
      } catch (err) {
        console.error("Failed to fetch honeytokens:", err);
        setError("Unable to load honeytokens.");
      } finally {
        setLoading(false);
      }
    };

    fetchHoneytokens();

    const interval = setInterval(() => {
      fetchHoneytokens();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0F172A",
        color: "white",
        padding: "30px",
      }}
    >
      <h1>🍯 Honeytokens</h1>

      <p style={{ color: "#94A3B8" }}>
        Monitor deployed deception tokens.
      </p>

      {loading && <p>Loading honeytokens...</p>}

      {error && (
        <p style={{ color: "#EF4444" }}>
          {error}
        </p>
      )}

      {!loading && !error && (
        <div style={{ marginTop: "25px" }}>
          {tokens.map((token) => (
            <div
              key={token.id}
              style={{
                background: "#1E293B",
                padding: "20px",
                borderRadius: "12px",
                marginBottom: "15px",
                borderLeft: "4px solid #3B82F6",
              }}
            >
              <h2>{token.type}</h2>

              <p>
                <strong>ID:</strong> {token.id}
              </p>

              <p>
                <strong>Value:</strong>{" "}
                <code>{token.value}</code>
              </p>

              <p>
                <strong>Status:</strong>{" "}
                <span
                  style={{
                    color:
                      token.status === "Active"
                        ? "#22C55E"
                        : "#F59E0B",
                  }}
                >
                  {token.status}
                </span>
              </p>

              {token.last_triggered && (
                <p>
                  <strong>Last Triggered:</strong>{" "}
                  {new Date(token.last_triggered).toLocaleString()}
                </p>
              )}

              <p>
                <strong>Created:</strong>{" "}
                {new Date(token.created_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Honeytokens;