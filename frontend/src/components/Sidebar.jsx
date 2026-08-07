import { NavLink } from "react-router-dom";
import {
  FiShield,
  FiHome,
  FiDroplet,
  FiAlertTriangle,
  FiBarChart2,
  FiSettings,
} from "react-icons/fi";

const navItems = [
  { path: "/", label: "Dashboard", icon: <FiHome /> },
  { path: "/honeytokens", label: "Honeytokens", icon: <FiDroplet /> },
  { path: "/alerts", label: "Alerts", icon: <FiAlertTriangle /> },
  { path: "/analytics", label: "Analytics", icon: <FiBarChart2 /> },
  { path: "/settings", label: "Settings", icon: <FiSettings /> },
];

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <FiShield />
        <div>
          <strong>SentinelTrap</strong>
          <small>Threat detection hub</small>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <span className="nav-icon">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;