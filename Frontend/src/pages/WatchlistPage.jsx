import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import api from '../api'

function WatchlistPage() {
  const [watchlist, setWatchlist] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const fetchWatchlist = async () => {
    try {
      const res = await api.get('/watchlist')
      setWatchlist(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const removeFromWatchlist = async (movieId) => {
    try {
      await api.delete(`/watchlist/${movieId}`)
      setWatchlist(prev => prev.filter(w => w.movie_id !== movieId))
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchWatchlist()
  }, [])

  return (
    <div style={styles.layout}>
      <Sidebar />
      <main style={styles.main}>
        <div style={styles.header}>
          <div style={styles.titleWrap}>
            <div style={styles.accentBar} />
            <h1 style={styles.title}>My Watchlist</h1>
          </div>
          <span style={styles.count}>{watchlist.length} movies saved</span>
        </div>

        {loading ? (
          <div style={styles.empty}>Loading...</div>
        ) : watchlist.length === 0 ? (
          <div style={styles.emptyWrap}>
            <div style={styles.emptyIcon}>🎬</div>
            <p style={styles.emptyTitle}>Your watchlist is empty</p>
            <p style={styles.emptySubtitle}>Browse movies and add them to your list</p>
            <button style={styles.browseBtn} onClick={() => navigate('/')}>
              Browse Movies
            </button>
          </div>
        ) : (
          <div style={styles.list}>
            {watchlist.map((item, index) => (
              <WatchlistItem
                key={item.id}
                item={item}
                index={index}
                onRemove={() => removeFromWatchlist(item.movie_id)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

function WatchlistItem({ item, index, onRemove }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      style={{
        ...styles.item,
        backgroundColor: hovered ? '#242424' : '#1e1e1e',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span style={styles.index}>{String(index + 1).padStart(2, '0')}</span>

      <img src={item.image} alt={item.title} style={styles.poster} />

      <div style={styles.info}>
        <h3 style={styles.movieTitle}>{item.title}</h3>
        <div style={styles.meta}>
          {item.genre && <span style={styles.genre}>{item.genre}</span>}
          {item.year && <span style={styles.metaDot}>•</span>}
          {item.year && <span style={styles.year}>{item.year}</span>}
        </div>
        <div style={styles.rating}>⭐ {item.rating}</div>
      </div>

      <button
        style={{
          ...styles.removeBtn,
          opacity: hovered ? 1 : 0,
        }}
        onClick={onRemove}
      >
        Remove
      </button>
    </div>
  )
}

const styles = {
  layout: { display: 'flex', minHeight: '100vh', backgroundColor: '#1a1a1a' },
  main: { flex: 1, padding: '32px 28px', overflowY: 'auto' },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '28px',
  },
  titleWrap: { display: 'flex', alignItems: 'center', gap: '12px' },
  accentBar: { width: '4px', height: '28px', backgroundColor: '#E50914', borderRadius: '2px' },
  title: { fontSize: '24px', fontWeight: '800', color: '#fff', letterSpacing: '-0.5px' },
  count: { fontSize: '13px', color: '#555' },
  list: { display: 'flex', flexDirection: 'column', gap: '12px' },
  item: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '12px 16px',
    borderRadius: '12px',
    border: '1px solid #2a2a2a',
    transition: 'background-color 0.2s',
    cursor: 'default',
  },
  index: {
    fontSize: '13px',
    color: '#444',
    fontWeight: '700',
    minWidth: '24px',
    fontVariantNumeric: 'tabular-nums',
  },
  poster: {
    width: '48px',
    height: '68px',
    borderRadius: '8px',
    objectFit: 'cover',
    flexShrink: 0,
  },
  info: { flex: 1 },
  movieTitle: {
    fontSize: '15px',
    fontWeight: '700',
    color: '#fff',
    marginBottom: '4px',
  },
  meta: { display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' },
  genre: { fontSize: '12px', color: '#666' },
  metaDot: { fontSize: '12px', color: '#444' },
  year: { fontSize: '12px', color: '#666' },
  rating: { fontSize: '12px', color: '#f5c518', fontWeight: '600' },
  removeBtn: {
    backgroundColor: 'rgba(229,9,20,0.1)',
    border: '1px solid rgba(229,9,20,0.3)',
    color: '#E50914',
    fontSize: '12px',
    fontWeight: '600',
    padding: '6px 14px',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'opacity 0.2s',
    flexShrink: 0,
  },
  empty: { color: '#888', textAlign: 'center', marginTop: '100px' },
  emptyWrap: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '120px',
    gap: '12px',
  },
  emptyIcon: { fontSize: '48px', marginBottom: '8px' },
  emptyTitle: { fontSize: '18px', fontWeight: '700', color: '#fff' },
  emptySubtitle: { fontSize: '14px', color: '#666', marginBottom: '8px' },
  browseBtn: {
    backgroundColor: '#E50914',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    padding: '12px 28px',
    fontSize: '14px',
    fontWeight: '700',
    cursor: 'pointer',
  },
}

export default WatchlistPage