import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

function UsersPage() {
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    setError('')

    fetch(`https://reqres.in/api/users?page=${page}`, {
      headers: { 'x-api-key': 'reqres-free-v1' },
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.data || [])
        setTotalPages(data.total_pages || 1)
        setLoading(false)
      })
      .catch(() => {
        setError('Failed to load users.')
        setLoading(false)
      })
  }, [page])

  return (
    <div style={styles.layout}>
      <Sidebar />
      <main style={styles.main}>
        <div style={styles.header}>
          <h1 style={styles.title}>Members</h1>
          <p style={styles.subtitle}>Browse all registered members</p>
        </div>

        {loading && <div style={styles.status}>Loading users...</div>}
        {error && <div style={styles.errorMsg}>{error}</div>}

        {!loading && !error && (
          <>
            <div style={styles.grid}>
              {users.map((user) => (
                <UserCard
                  key={user.id}
                  user={user}
                  onClick={() => navigate(`/users/${user.id}`)}
                />
              ))}
            </div>

            <div style={styles.pagination}>
              <button
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page === 1}
                style={{ ...styles.pageBtn, opacity: page === 1 ? 0.4 : 1 }}
              >
                ← Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  style={{
                    ...styles.pageBtn,
                    backgroundColor: p === page ? '#E50914' : '#2a2a2a',
                    border: p === page ? 'none' : '1px solid #333',
                  }}
                >
                  {p}
                </button>
              ))}

              <button
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                disabled={page === totalPages}
                style={{ ...styles.pageBtn, opacity: page === totalPages ? 0.4 : 1 }}
              >
                Next →
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  )
}

function UserCard({ user, onClick }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...styles.card,
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        borderColor: hovered ? '#E50914' : '#2a2a2a',
      }}
    >
      <img src={user.avatar} alt={user.first_name} style={styles.avatar} />
      <div style={styles.info}>
        <div style={styles.name}>{user.first_name} {user.last_name}</div>
        <div style={styles.email}>{user.email}</div>
        <div style={styles.badge}>ID #{user.id}</div>
      </div>
    </div>
  )
}

const styles = {
  layout: { display: 'flex', minHeight: '100vh', backgroundColor: '#141414' },
  main: { flex: 1, padding: '32px', overflowY: 'auto' },
  header: { marginBottom: '28px' },
  title: { fontSize: '26px', fontWeight: '700', color: '#fff', marginBottom: '6px' },
  subtitle: { color: '#888', fontSize: '14px' },
  status: { color: '#888', fontSize: '15px', textAlign: 'center', marginTop: '60px' },
  errorMsg: {
    color: '#ff6b6b',
    backgroundColor: 'rgba(229,9,20,0.1)',
    padding: '14px',
    borderRadius: '8px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
    gap: '16px',
  },
  card: {
    backgroundColor: '#1f1f1f',
    border: '1px solid #2a2a2a',
    borderRadius: '12px',
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  avatar: { width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 },
  info: { flex: 1, minWidth: 0 },
  name: { fontSize: '15px', fontWeight: '600', color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
  email: { fontSize: '12px', color: '#888', marginTop: '3px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
  badge: {
    display: 'inline-block', fontSize: '11px', color: '#E50914',
    backgroundColor: 'rgba(229,9,20,0.1)', borderRadius: '4px', padding: '2px 8px', marginTop: '6px',
  },
  pagination: { display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginTop: '36px' },
  pageBtn: {
    backgroundColor: '#2a2a2a', color: '#fff', border: '1px solid #333',
    borderRadius: '8px', padding: '8px 16px', fontSize: '13px', cursor: 'pointer',
  },
}

export default UsersPage
