import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Sidebar from '../components/Sidebar'

const BASE_URL = 'https://reqres.in/api'

function UserDetailPage() {
  const { id } = useParams()
  const { token } = useAuth()
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(`${BASE_URL}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'x-api-key': 'reqres-free-v1',
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error('User not found')
        return res.json()
      })
      .then((data) => {
        setUser(data.data)
        setLoading(false)
      })
      .catch(() => {
        setError('User not found or failed to load.')
        setLoading(false)
      })
  }, [id, token])

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
            <div style={styles.avatarWrap}>
              <img src={user.avatar} alt={user.first_name} style={styles.avatar} />
            </div>
            <div style={styles.info}>
              <div style={styles.idBadge}>Member ID #{user.id}</div>
              <h2 style={styles.name}>
                {user.first_name} {user.last_name}
              </h2>
              <p style={styles.email}>{user.email}</p>

              <div style={styles.divider} />

              <div style={styles.statsRow}>
                <StatBox label="First Name" value={user.first_name} />
                <StatBox label="Last Name" value={user.last_name} />
                <StatBox label="User ID" value={`#${user.id}`} />
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
  value: { fontSize: '16px', fontWeight: '600', color: '#fff' },
}

const styles = {
  layout: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#141414',
  },
  main: {
    flex: 1,
    padding: '32px',
    overflowY: 'auto',
  },
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
  avatarWrap: {
    flexShrink: 0,
  },
  avatar: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    objectFit: 'cover',
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
