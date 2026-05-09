import { useState, useEffect } from 'react'
import MovieCard from './MovieCard'

const DEFAULT_VISIBLE = 8

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])
  return isMobile
}

function MovieList({ movies, label, watchlist = [], onWatchlistChange, onMovieClick }) {
  const [expanded, setExpanded] = useState(false)
  const isMobile = useIsMobile()
  const visibleMovies = expanded ? movies : movies.slice(0, DEFAULT_VISIBLE)

  return (
    <section style={styles.section}>
      <div style={styles.header}>
        <div style={styles.titleWrap}>
          <div style={styles.accentBar} />
          <span style={styles.label}>{label}</span>
          <span style={styles.count}>{movies.length} movies</span>
        </div>
        <button style={styles.seeAllBtn} onClick={() => setExpanded(!expanded)}>
          {expanded ? '← Less' : `See All →`}
        </button>
      </div>

      <div style={expanded
        ? { display: 'grid', gridTemplateColumns: isMobile ? 'repeat(3, 1fr)' : 'repeat(auto-fill, minmax(155px, 1fr))', gap: '10px' }
        : { display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '8px', scrollbarWidth: 'none' }
      }>
        {visibleMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            {...movie}
            watchlist={watchlist}
            onWatchlistChange={onWatchlistChange}
            onMovieClick={onMovieClick}
            compact={isMobile}
          />
        ))}
      </div>

      {!expanded && movies.length > DEFAULT_VISIBLE && (
        <div style={styles.fadeHint}>
          <button style={styles.expandBtn} onClick={() => setExpanded(true)}>
            Show all {movies.length} movies ↓
          </button>
        </div>
      )}
    </section>
  )
}

const styles = {
  section: { padding: '20px 12px 32px' },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '14px',
  },
  titleWrap: { display: 'flex', alignItems: 'center', gap: '10px' },
  accentBar: { width: '4px', height: '20px', backgroundColor: '#E50914', borderRadius: '2px' },
  label: { fontSize: '16px', fontWeight: '700', color: '#fff', letterSpacing: '-0.3px' },
  count: { fontSize: '12px', color: '#555', fontWeight: '400' },
  seeAllBtn: {
    fontSize: '12px',
    color: '#E50914',
    cursor: 'pointer',
    fontWeight: '600',
    background: 'none',
    border: '1px solid rgba(229,9,20,0.3)',
    borderRadius: '6px',
    padding: '5px 12px',
  },
  fadeHint: { display: 'flex', justifyContent: 'center', marginTop: '20px' },
  expandBtn: {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid #2a2a2a',
    color: '#888',
    fontSize: '13px',
    padding: '10px 24px',
    borderRadius: '8px',
    cursor: 'pointer',
  },
}

export default MovieList