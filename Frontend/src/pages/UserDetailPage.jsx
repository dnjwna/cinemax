import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import api from '../api'

function UserDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    api.get(`/users/${id}`)
      .then((res) => {
        setUser(res.data)
        setLoading(false)
      })
      .catch(() => {
        setError('User not found or failed to load.')
        setLoading(false)
      })
  }, [id])

  return (
    <div style={styles.layout}>
      <Sidebar />
      <main style={styles.main}>
        <button onClick={() => navigate('/users')} style={styles.back}>
          ← Back to Members
        </button>

        {loading && <div style={styles.status}>Loading user...</div>}
        {error && <div style={styles.errorMsg}>{error}</div>}

        {user && (
          <div style={styles.profileCard}>
            <div style={styles.avatarPlaceholder}>
              {user.name?.charAt(0).toUpperCase()}
            </div>
            <div style={styles.info}>
              <div style={styles.idBadge}>Member ID #{user.id}</div>
              <h2 style={styles.name}>{user.name}</h2>
              <p style={styles.email}>{user.email}</p>

              <div style={styles.divider} />

              <div style={styles.statsRow}>
                <StatBox label="Name" value={user.name} />
                <StatBox label="User ID" value={`#${user.id}`} />
                <StatBox label="Email" value={user.email} />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

function StatBox({ label, value }) {
  return (
    <div style={statStyles.box}>
      <div style={statStyles.label}>{label}</div>
      <div style={statStyles.value}>{value}</div>
    </div>
  )
}

const statStyles = {
  box: {
    backgroundColor: '#2a2a2a',
    borderRadius: '10px',
    padding: '16px 20px',
    flex: 1,
    minWidth: '120px',
  },
  label: { fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' },
  value: { fontSize: '15px', fontWeight: '600', color: '#fff', wordBreak: 'break-all' },
}

const styles = {
  layout: { display: 'flex', minHeight: '100vh', backgroundColor: '#141414' },
  main: { flex: 1, padding: '32px', overflowY: 'auto' },
  back: {
    backgroundColor: 'transparent',
    color: '#888',
    border: '1px solid #333',
    borderRadius: '8px',
    padding: '8px 16px',
    fontSize: '13px',
    cursor: 'pointer',
    marginBottom: '28px',
  },
  status: { color: '#888', fontSize: '15px', textAlign: 'center', marginTop: '80px' },
  errorMsg: {
    color: '#ff6b6b',
    backgroundColor: 'rgba(229,9,20,0.1)',
    padding: '14px',
    borderRadius: '8px',
  },
  profileCard: {
    backgroundColor: '#1f1f1f',
    border: '1px solid #2a2a2a',
    borderRadius: '16px',
    padding: '36px',
    maxWidth: '600px',
    display: 'flex',
    gap: '32px',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  avatarPlaceholder: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    backgroundColor: '#E50914',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '48px',
    fontWeight: '700',
    color: '#fff',
    flexShrink: 0,
    border: '3px solid #E50914',
  },
  info: { flex: 1, minWidth: '200px' },
  idBadge: {
    fontSize: '12px',
    color: '#E50914',
    backgroundColor: 'rgba(229,9,20,0.1)',
    display: 'inline-block',
    padding: '3px 10px',
    borderRadius: '4px',
    marginBottom: '10px',
  },
  name: { fontSize: '26px', fontWeight: '700', color: '#fff', marginBottom: '6px' },
  email: { fontSize: '14px', color: '#888', marginBottom: '4px' },
  divider: { height: '1px', backgroundColor: '#2a2a2a', margin: '20px 0' },
  statsRow: { display: 'flex', gap: '12px', flexWrap: 'wrap' },
}

export default UserDetailPage