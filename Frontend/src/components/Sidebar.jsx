import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  MdOutlineExplore,
  MdOutlineBookmark,
  MdOutlineCalendarMonth,
  MdOutlinePeople,
  MdOutlineLogout,
} from 'react-icons/md'
import { useAuth } from '../context/AuthContext'

function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { logout, isLoggedIn } = useAuth()

  const navItems = [
    { icon: <MdOutlineExplore size={20} />, label: 'Browse', path: '/' },
    { icon: <MdOutlinePeople size={20} />, label: 'Members', path: '/users' },
    { icon: <MdOutlineBookmark size={20} />, label: 'Watchlist', path: '/watchlist' },
  ]

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <aside style={styles.sidebar}>
      <div style={styles.logo}>
        <span style={styles.logoText}>
          CINE<span style={styles.accent}>MAX</span>
        </span>
      </div>

      <div style={styles.sectionLabel}>Menu</div>
      <ul style={styles.navList}>
        {navItems.map((item) => (
          <NavItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            active={location.pathname === item.path}
            onClick={() => navigate(item.path)}
          />
        ))}
      </ul>

      <div style={styles.divider} />

      {isLoggedIn && (
        <div style={styles.logout} onClick={handleLogout}>
          <MdOutlineLogout size={20} />
          <span>Log Out</span>
        </div>
      )}
    </aside>
  )
}

function NavItem({ icon, label, active, onClick }) {
  const [hovered, setHovered] = useState(false)

  return (
    <li
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        padding: '12px 24px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: active ? '600' : '400',
        color: active ? '#fff' : hovered ? '#ddd' : '#888',
        backgroundColor: active ? '#2a2a2a' : 'transparent',
        borderLeft: active ? '3px solid #E50914' : '3px solid transparent',
        transition: 'all 0.15s',
      }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </li>
  )
}

const styles = {
  sidebar: {
    width: '220px',
    minWidth: '220px',
    backgroundColor: '#111',
    display: 'flex',
    flexDirection: 'column',
    padding: '28px 0',
    height: '100vh',
    position: 'sticky',
    top: 0,
    borderRight: '1px solid #2a2a2a',
  },
  logo: { padding: '0 24px', marginBottom: '36px' },
  logoText: { fontSize: '22px', fontWeight: 'bold', color: '#fff' },
  accent: { color: '#E50914' },
  sectionLabel: {
    fontSize: '11px', color: '#555', padding: '0 24px',
    marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px',
  },
  navList: { listStyle: 'none', marginBottom: '32px' },
  divider: { height: '1px', backgroundColor: '#2a2a2a', margin: '8px 24px 24px' },
  logout: {
    marginTop: 'auto', padding: '0 24px', display: 'flex',
    alignItems: 'center', gap: '12px', color: '#888', fontSize: '14px', cursor: 'pointer',
  },
}

export default Sidebar
