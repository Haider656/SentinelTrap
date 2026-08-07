import { FiBell, FiSearch, FiUser } from "react-icons/fi";

function Navbar({ title }) {
  return (
    <header className="topbar">
      <div>
        <p className="eyebrow">Live SOC dashboard</p>
        <h1>{title}</h1>
      </div>

      <div className="topbar-actions">
        <label className="search-box">
          <FiSearch />
          <input placeholder="Search alerts, tokens..." />
        </label>

        <button type="button" className="icon-btn" aria-label="Notifications">
          <FiBell />
          <span className="pulse" />
        </button>

        <button type="button" className="profile-btn">
          <div className="avatar">ST</div>
          <div className="profile-info">
            <strong>Admin</strong>
            <small>Security Ops</small>
          </div>
          <FiUser />
        </button>
      </div>
    </header>
  );
}

export default Navbar;