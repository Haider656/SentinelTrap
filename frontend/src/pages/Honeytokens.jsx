import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import HoneytokenCard from "../components/HoneytokenCard";
import StatusBadge from "../components/StatusBadge";

const tokens = [
  {
    name: "Prod DB Honeytoken",
    type: "Database",
    status: "Active",
    lastTriggered: "8 minutes ago",
    owner: "DB Team",
  },
  {
    name: "AWS Key Canary",
    type: "Cloud API",
    status: "Dormant",
    lastTriggered: "2 days ago",
    owner: "Cloud Ops",
  },
  {
    name: "Shared Drive Decoy",
    type: "File Share",
    status: "Active",
    lastTriggered: "12 minutes ago",
    owner: "Infra",
  },
  {
    name: "Service Account Token",
    type: "Credential",
    status: "Suspended",
    lastTriggered: "Never",
    owner: "SecOps",
  },
];

const tableData = [
  {
    token: "Finance API Key",
    type: "API Key",
    status: "Active",
    lastTriggered: "5 min ago",
  },
  {
    token: "RDP Honeypot",
    type: "Network",
    status: "Active",
    lastTriggered: "13 min ago",
  },
  {
    token: "GCP Service Token",
    type: "Cloud API",
    status: "Dormant",
    lastTriggered: "1 day ago",
  },
  {
    token: "Legacy Admin Password",
    type: "Credential",
    status: "Suspended",
    lastTriggered: "Never",
  },
];

function Honeytokens() {
  return (
    <div className="layout-shell">
      <Sidebar />
      <main className="content-shell">
        <Navbar title="Honeytokens" />

        <section className="page-header-row">
          <div>
            <p className="eyebrow">Deception inventory</p>
            <h2>Honeytoken assets overview</h2>
          </div>
          <button type="button" className="primary-btn">
            Add new token
          </button>
        </section>

        <section className="honeytoken-grid">
          {tokens.map((item) => (
            <HoneytokenCard
              key={item.name}
              name={item.name}
              type={item.type}
              status={item.status}
              lastTriggered={item.lastTriggered}
              actionLabel="Review"
            />
          ))}
        </section>

        <section className="panel panel-table">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Honeytoken catalog</p>
              <h2>Active deception assets</h2>
            </div>
            <span className="badge badge-primary">4 total</span>
          </div>

          <div className="table-shell">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Token Name</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Last Triggered</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {tableData.map((row) => (
                  <tr key={row.token}>
                    <td>{row.token}</td>
                    <td>{row.type}</td>
                    <td>
                      <StatusBadge
                        variant={
                          row.status === "Active"
                            ? "success"
                            : row.status === "Suspended"
                            ? "danger"
                            : "muted"
                        }
                      >
                        {row.status}
                      </StatusBadge>
                    </td>
                    <td>{row.lastTriggered}</td>
                    <td>
                      <button type="button" className="ghost-btn small">
                        View
                      </button>
                    </td>
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

export default Honeytokens;