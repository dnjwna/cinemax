import {
  MdOutlineExplore,
  MdOutlineBookmark,
  MdOutlineCalendarMonth,
  MdOutlineLogout,
} from "react-icons/md";

const navItems = [
  { icon: <MdOutlineExplore size={20} />, label: "Browse", active: true },
  { icon: <MdOutlineBookmark size={20} />, label: "Watchlist", active: false },
  {
    icon: <MdOutlineCalendarMonth size={20} />,
    label: "Coming Soon",
    active: false,
  },
];

function Sidebar() {
  const sidebarStyle = {
    width: "220px",
    minWidth: "220px",
    backgroundColor: "#111",
    display: "flex",
    flexDirection: "column",
    padding: "28px 0",
    height: "100vh",
    borderRight: "1px solid #2a2a2a",
  };

  const logoStyle = {
    padding: "0 24px",
    marginBottom: "36px",
  };

  const logoTextStyle = {
    fontSize: "22px",
    fontWeight: "bold",
    color: "#fff",
  };

  const logoAccentStyle = {
    color: "#E50914",
  };

  const sectionLabelStyle = {
    fontSize: "11px",
    color: "#555",
    padding: "0 24px",
    marginBottom: "10px",
    textTransform: "uppercase",
    letterSpacing: "1px",
  };

  const navListStyle = {
    listStyle: "none",
    marginBottom: "32px",
  };

  const dividerStyle = {
    height: "1px",
    backgroundColor: "#2a2a2a",
    margin: "8px 24px 24px",
  };

  const logoutStyle = {
    marginTop: "auto",
    padding: "0 24px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    color: "#888",
    fontSize: "14px",
    cursor: "pointer",
  };

  return (
    <aside style={sidebarStyle}>
      {/* Logo */}
      <div style={logoStyle}>
        <span style={logoTextStyle}>
          CINE<span style={logoAccentStyle}>MAX</span>
        </span>
      </div>

      {/* Nav */}
      <div style={sectionLabelStyle}>Menu</div>
      <ul style={navListStyle}>
        {navItems.map((item) => (
          <NavItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            active={item.active}
          />
        ))}
      </ul>

      <div style={dividerStyle} />

      {/* Logout */}
      <div style={logoutStyle}>
        <MdOutlineLogout size={20} />
        <span>Log Out</span>
      </div>
    </aside>
  );
}

function NavItem({ icon, label, active }) {
  const itemStyle = {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    padding: "12px 24px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: active ? "600" : "400",
    color: active ? "#fff" : "#888",
    backgroundColor: active ? "#2a2a2a" : "transparent",
    borderLeft: active ? "3px solid #E50914" : "3px solid transparent",
  };

  return (
    <li style={itemStyle}>
      <span>{icon}</span>
      <span>{label}</span>
    </li>
  );
}

export default Sidebar;
