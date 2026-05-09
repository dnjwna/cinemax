import { useState } from 'react'
import MovieCard from './MovieCard'

const DEFAULT_VISIBLE = 8

function MovieList({ movies, label }) {
  const [expanded, setExpanded] = useState(false)

  const visibleMovies = expanded ? movies : movies.slice(0, DEFAULT_VISIBLE)

  return (
    <section style={styles.section}>
      <div style={styles.header}>
        <div style={styles.titleWrap}>
          <div style={styles.accentBar} />
          <span style={styles.label}>{label}</span>
          <span style={styles.count}>{movies.length} movies</span>
        </div>
        <button
          style={styles.seeAllBtn}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? '← Show Less' : `See All ${movies.length} →`}
        </button>
      </div>

      <div style={expanded ? styles.gridExpanded : styles.gridCollapsed}>
        {visibleMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            genre={movie.genre}
            rating={movie.rating}
            year={movie.year}
            image={movie.image}
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
  section: {
    padding: '24px 20px 32px',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '16px',
  },
  titleWrap: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  accentBar: {
    width: '4px',
    height: '20px',
    backgroundColor: '#E50914',
    borderRadius: '2px',
  },
  label: {
    fontSize: '17px',
    fontWeight: '700',
    color: '#fff',
    letterSpacing: '-0.3px',
  },
  count: {
    fontSize: '12px',
    color: '#555',
    fontWeight: '400',
  },
  seeAllBtn: {
    fontSize: '12px',
    color: '#E50914',
    cursor: 'pointer',
    fontWeight: '600',
    letterSpacing: '0.3px',
    background: 'none',
    border: '1px solid rgba(229,9,20,0.3)',
    borderRadius: '6px',
    padding: '5px 12px',
  },
  gridCollapsed: {
    display: 'flex',
    gap: '14px',
    overflowX: 'auto',
    paddingBottom: '8px',
    scrollbarWidth: 'none',
  },
  gridExpanded: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '14px',
  },
  fadeHint: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  },
  expandBtn: {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid #2a2a2a',
    color: '#888',
    fontSize: '13px',
    padding: '10px 24px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '500',
  },
}

export default MovieList