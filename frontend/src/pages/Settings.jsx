import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatusBadge from "../components/StatusBadge";

function Settings() {
  return (
    <div className="layout-shell">
      <Sidebar />
      <main className="content-shell">
        <Navbar title="Settings" />

        <section className="page-header-row">
          <div>
            <p className="eyebrow">Platform settings</p>
            <h2>Configure SentinelTrap</h2>
          </div>
        </section>

        <section className="settings-grid">
          <article className="panel panel-settings">
            <div className="panel-header">
              <div>
                <p className="eyebrow">Profile</p>
                <h2>Administrator details</h2>
              </div>
              <StatusBadge variant="success">Active</StatusBadge>
            </div>
            <div className="settings-card">
              <p><strong>Name</strong></p>
              <p>Security Admin</p>
            </div>
            <div className="settings-card">
              <p><strong>Email</strong></p>
              <p>admin@sentineltrap.io</p>
            </div>
          </article>

          <article className="panel panel-settings">
            <div className="panel-header">
              <div>
                <p className="eyebrow">Notification Settings</p>
                <h2>Alert delivery</h2>
              </div>
            </div>
            <div className="settings-card">
              <p>Email alerts</p>
              <StatusBadge variant="success">Enabled</StatusBadge>
            </div>
            <div className="settings-card">
              <p>SMS escalation</p>
              <StatusBadge variant="muted">Disabled</StatusBadge>
            </div>
          </article>

          <article className="panel panel-settings">
            <div className="panel-header">
              <div>
                <p className="eyebrow">API Configuration</p>
                <h2>Integration keys</h2>
              </div>
            </div>
            <div className="settings-card">
              <p>Endpoint</p>
              <p>http://localhost:8000/api/v1</p>
            </div>
            <div className="settings-card">
              <p>Client key</p>
              <p>••••••••••••••••••••</p>
            </div>
          </article>

          <article className="panel panel-settings">
            <div className="panel-header">
              <div>
                <p className="eyebrow">Theme</p>
                <h2>Appearance</h2>
              </div>
            </div>
            <div className="settings-card">
              <p>Mode</p>
              <StatusBadge variant="success">Dark</StatusBadge>
            </div>
            <div className="settings-card">
              <p>Accent</p>
              <p>Azure blue</p>
            </div>
          </article>
        </section>
      </main>
    </div>
  );
}

export default Settings;