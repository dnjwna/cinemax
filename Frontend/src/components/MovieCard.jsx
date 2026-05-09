import { useState } from 'react'
import api from '../api'

function MovieCard({ title, genre, rating, image, id, year, watchlist = [], onWatchlistChange, onMovieClick }) {
  const [hovered, setHovered] = useState(false)
  const [loading, setLoading] = useState(false)

  const isInWatchlist = watchlist.some(w => w.movie_id === id)

  const toggleWatchlist = async (e) => {
    e.stopPropagation()
    setLoading(true)
    try {
      if (isInWatchlist) {
        await api.delete(`/watchlist/${id}`)
      } else {
        await api.post('/watchlist', { movie_id: id, title, genre, rating, year, image })
      }
      onWatchlistChange?.()
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        ...styles.card,
        boxShadow: hovered ? '0 20px 40px rgba(0,0,0,0.6)' : '0 4px 12px rgba(0,0,0,0.3)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onMovieClick?.(id)}  // ← buka modal
    >
      <div style={{
        ...styles.imageWrap,
        transform: hovered ? 'scale(1.06)' : 'scale(1)',
        transition: 'transform 0.25s ease',
        overflow: 'hidden',
      }}>
        <img src={image} alt={title} style={styles.image} />

        {/* Hover overlay */}
        <div style={{ ...styles.overlay, opacity: hovered ? 1 : 0 }}>
          <button style={styles.playBtn}>▶</button>
        </div>

        {/* Rating badge */}
        <div style={styles.ratingBadge}>⭐ {rating}</div>

        {/* Bookmark button */}
        <button
          style={{
            ...styles.bookmarkBtn,
            opacity: hovered || isInWatchlist ? 1 : 0,
            backgroundColor: isInWatchlist ? '#E50914' : 'rgba(0,0,0,0.75)',
            color: '#fff',
            fontWeight: '800',
            fontSize: '15px',
          }}
          onClick={toggleWatchlist}
          disabled={loading}
          title={isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
        >
          {isInWatchlist ? '✓' : '+'}
        </button>
      </div>

      <div style={styles.info}>
        <div style={styles.title}>{title}</div>
        <div style={styles.genre}>{genre}</div>
      </div>
    </div>
  )
}

const styles = {
  card: {
    borderRadius: '12px',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'transform 0.25s ease, box-shadow 0.25s ease',
    backgroundColor: '#1e1e1e',
    flexShrink: 0,
    width: '155px',
    border: '1px solid #2a2a2a',
  },
  imageWrap: {
    position: 'relative',
    width: '100%',
    height: '220px',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.55)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'opacity 0.2s ease',
  },
  playBtn: {
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    backgroundColor: '#E50914',
    border: 'none',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
    paddingLeft: '3px',
  },
  ratingBadge: {
    position: 'absolute',
    top: '8px',
    right: '8px',
    backgroundColor: 'rgba(0,0,0,0.75)',
    color: '#f5c518',
    fontSize: '11px',
    fontWeight: '700',
    padding: '3px 7px',
    borderRadius: '6px',
    backdropFilter: 'blur(4px)',
  },
  bookmarkBtn: {
    position: 'absolute',
    top: '8px',
    left: '8px',
    backgroundColor: 'rgba(0,0,0,0.75)',
    border: 'none',
    borderRadius: '6px',
    padding: '4px 7px',
    fontSize: '13px',
    cursor: 'pointer',
    transition: 'opacity 0.2s, background-color 0.2s',
    backdropFilter: 'blur(4px)',
  },
  info: {
    padding: '10px 12px 12px',
  },
  title: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#fff',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    marginBottom: '4px',
  },
  genre: {
    fontSize: '11px',
    color: '#666',
  },
}

export default MovieCard