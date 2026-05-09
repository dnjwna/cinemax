import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  MdOutlineExplore,
  MdOutlineBookmark,
  MdOutlinePeople,
  MdOutlineLogout,
} from 'react-icons/md'
import { useAuth } from '../context/AuthContext'

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])
  return isMobile
}

const navItems = [
  { icon: <MdOutlineExplore size={22} />, label: 'Browse', path: '/' },
  { icon: <MdOutlinePeople size={22} />, label: 'Members', path: '/users' },
  { icon: <MdOutlineBookmark size={22} />, label: 'Watchlist', path: '/watchlist' },
]

function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { logout, isLoggedIn } = useAuth()
  const isMobile = useIsMobile()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  if (isMobile) {
    return (
      <>
        {/* Spacer so content doesn't hide behind bottom nav */}
        <div style={{ height: 64 }} />
        <nav style={mobileStyles.nav}>
          {navItems.map((item) => {
            const active = location.pathname === item.path
            return (
              <button
                key={item.label}
                style={{
                  ...mobileStyles.navItem,
                  color: active ? '#E50914' : '#555',
                }}
                onClick={() => navigate(item.path)}
              >
                <span style={{ display: 'flex', justifyContent: 'center' }}>{item.icon}</span>
                <span style={mobileStyles.navLabel}>{item.label}</span>
                {active && <div style={mobileStyles.activeIndicator} />}
              </button>
            )
          })}
          {isLoggedIn && (
            <button
              style={{ ...mobileStyles.navItem, color: '#555' }}
              onClick={handleLogout}
            >
              <span style={{ display: 'flex', justifyContent: 'center' }}>
                <MdOutlineLogout size={22} />
              </span>
              <span style={mobileStyles.navLabel}>Logout</span>
            </button>
          )}
        </nav>
      </>
    )
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

const mobileStyles = {
  nav: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    height: '64px',
    backgroundColor: '#111',
    borderTop: '1px solid #2a2a2a',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    zIndex: 999,
    backdropFilter: 'blur(12px)',
  },
  navItem: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '3px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '8px 0',
    position: 'relative',
    transition: 'color 0.15s',
  },
  navLabel: {
    fontSize: '10px',
    fontWeight: '500',
    letterSpacing: '0.2px',
  },
  activeIndicator: {
    position: 'absolute',
    top: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '20px',
    height: '2px',
    backgroundColor: '#E50914',
    borderRadius: '0 0 2px 2px',
  },
}

export default Sidebar