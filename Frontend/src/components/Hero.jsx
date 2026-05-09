import { useState, useEffect } from 'react'

const API_KEY = '8f602c8e357d4d2eaca91654a37ca633'

function Hero() {
  const [movie, setMovie] = useState(null)

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`)
      .then(res => res.json())
      .then(data => {
        const m = data.results[0]
        setMovie({
          title: m.title,
          overview: m.overview,
          rating: m.vote_average.toFixed(1),
          year: m.release_date?.slice(0, 4),
          backdrop: `https://image.tmdb.org/t/p/original${m.backdrop_path}`,
        })
      })
      .catch(() => {})
  }, [])

  if (!movie) return <div style={styles.skeleton} />

  return (
    <div style={styles.hero}>
      <div style={{ ...styles.bg, backgroundImage: `url(${movie.backdrop})` }} />
      <div style={styles.gradientLeft} />
      <div style={styles.gradientBottom} />
      <div style={styles.content}>
        <div style={styles.badge}>🔥 Featured Today</div>
        <h1 style={styles.title}>{movie.title}</h1>
        <p style={styles.description}>
          {movie.overview?.slice(0, 150)}{movie.overview?.length > 150 ? '...' : ''}
        </p>
        <div style={styles.meta}>
          <span style={styles.imdb}>IMDb {movie.rating}</span>
          <span style={styles.dot}>•</span>
          <span style={styles.metaText}>{movie.year}</span>
        </div>
        <div style={styles.buttons}>
          <button
            style={styles.btnWatch}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#ff0a16'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#E50914'}
          >
            ▶ Watch Now
          </button>
          <button
            style={styles.btnList}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
          >
            + My List
          </button>
        </div>
      </div>
    </div>
  )
}

const styles = {
  skeleton: {
    height: '420px',
    margin: '20px 20px 0',
    borderRadius: '20px',
    backgroundColor: '#1e1e1e',
  },
  hero: {
    position: 'relative',
    height: '420px',
    margin: '20px 20px 0',
    borderRadius: '20px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'flex-end',
  },
  bg: {
    position: 'absolute',
    inset: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center top',
  },
  gradientLeft: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to right, rgba(10,10,10,0.97) 30%, rgba(10,10,10,0.6) 60%, transparent 100%)',
  },
  gradientBottom: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to top, rgba(26,26,26,1) 0%, transparent 40%)',
  },
  content: {
    position: 'relative',
    zIndex: 2,
    padding: '40px',
    maxWidth: '500px',
  },
  badge: {
    display: 'inline-block',
    backgroundColor: 'rgba(229,9,20,0.2)',
    border: '1px solid rgba(229,9,20,0.5)',
    color: '#ff6b6b',
    fontSize: '11px',
    fontWeight: '700',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    padding: '4px 12px',
    borderRadius: '20px',
    marginBottom: '14px',
  },
  title: {
    fontSize: '48px',
    fontWeight: '900',
    lineHeight: '1.05',
    marginBottom: '12px',
    color: '#fff',
    letterSpacing: '-1px',
    textShadow: '0 2px 20px rgba(0,0,0,0.5)',
  },
  description: {
    fontSize: '14px',
    color: '#aaa',
    lineHeight: '1.6',
    marginBottom: '16px',
    maxWidth: '380px',
  },
  meta: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '24px',
    fontSize: '13px',
  },
  imdb: {
    backgroundColor: '#f5c518',
    color: '#000',
    fontWeight: '800',
    fontSize: '11px',
    padding: '3px 8px',
    borderRadius: '4px',
  },
  dot: { color: '#555' },
  metaText: { color: '#bbb' },
  buttons: { display: 'flex', gap: '12px' },
  btnWatch: {
    backgroundColor: '#E50914',
    color: '#fff',
    border: 'none',
    padding: '13px 32px',
    fontSize: '14px',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: '700',
    letterSpacing: '0.3px',
    transition: 'background-color 0.2s',
  },
  btnList: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    color: '#fff',
    border: '1px solid rgba(255,255,255,0.2)',
    padding: '13px 24px',
    fontSize: '14px',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'background-color 0.2s',
    backdropFilter: 'blur(10px)',
  },
}

export default Hero