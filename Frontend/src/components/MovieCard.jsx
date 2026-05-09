import { useState } from 'react'

function MovieCard({ title, genre, rating, image }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      style={{
        ...styles.card,
        transform: hovered ? 'scale(1.06) translateY(-4px)' : 'scale(1)',
        boxShadow: hovered ? '0 20px 40px rgba(0,0,0,0.6)' : '0 4px 12px rgba(0,0,0,0.3)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div style={styles.imageWrap}>
        <img src={image} alt={title} style={styles.image} />
        {/* Hover overlay */}
        <div style={{
          ...styles.overlay,
          opacity: hovered ? 1 : 0,
        }}>
          <button style={styles.playBtn}>▶</button>
        </div>
        {/* Rating badge */}
        <div style={styles.ratingBadge}>⭐ {rating}</div>
      </div>

      {/* Info */}
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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