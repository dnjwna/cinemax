import { useState, useEffect } from 'react'
import api from '../api'

const API_KEY = '8f602c8e357d4d2eaca91654a37ca633'

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])
  return isMobile
}

function Hero({ watchlist = [], onWatchlistChange }) {
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(false)
  const isMobile = useIsMobile()

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`)
      .then(res => res.json())
      .then(data => {
        const m = data.results[0]
        setMovie({
          id: m.id,
          title: m.title,
          overview: m.overview,
          rating: m.vote_average.toFixed(1),
          year: m.release_date?.slice(0, 4),
          genre: '',
          image: `https://image.tmdb.org/t/p/w500${m.poster_path}`,
          backdrop: `https://image.tmdb.org/t/p/original${m.backdrop_path}`,
        })
      })
      .catch(() => {})
  }, [])

  const isInWatchlist = movie ? watchlist.some(w => w.movie_id === movie.id) : false

  const toggleWatchlist = async () => {
    if (!movie) return
    setLoading(true)
    try {
      if (isInWatchlist) {
        await api.delete(`/watchlist/${movie.id}`)
      } else {
        await api.post('/watchlist', {
          movie_id: movie.id,
          title: movie.title,
          genre: movie.genre,
          rating: movie.rating,
          year: movie.year,
          image: movie.image,
        })
      }
      onWatchlistChange?.()
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (!movie) return <div style={{ ...styles.skeleton, margin: isMobile ? '12px 12px 0' : '20px 20px 0' }} />

  return (
    <div style={{
      ...styles.hero,
      height: isMobile ? '320px' : '420px',
      margin: isMobile ? '12px 12px 0' : '20px 20px 0',
    }}>
      <div style={{ ...styles.bg, backgroundImage: `url(${movie.backdrop})` }} />
      <div style={styles.gradientLeft} />
      <div style={styles.gradientBottom} />
      <div style={{
        ...styles.content,
        padding: isMobile ? '20px' : '40px',
        maxWidth: isMobile ? '100%' : '500px',
      }}>
        {!isMobile && <div style={styles.badge}>🔥 Featured Today</div>}
        <h1 style={{
          ...styles.title,
          fontSize: isMobile ? '24px' : '48px',
          marginBottom: isMobile ? '8px' : '12px',
        }}>{movie.title}</h1>

        {!isMobile && (
          <p style={styles.description}>
            {movie.overview?.slice(0, 150)}{movie.overview?.length > 150 ? '...' : ''}
          </p>
        )}

        <div style={{ ...styles.meta, marginBottom: isMobile ? '16px' : '24px' }}>
          <span style={styles.imdb}>IMDb {movie.rating}</span>
          <span style={styles.dot}>•</span>
          <span style={styles.metaText}>{movie.year}</span>
        </div>

        <div style={{ ...styles.buttons, gap: isMobile ? '8px' : '12px' }}>
          <button
            style={{
              ...styles.btnWatch,
              padding: isMobile ? '10px 20px' : '13px 32px',
              fontSize: isMobile ? '13px' : '14px',
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#ff0a16'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#E50914'}
          >
            ▶ Watch Now
          </button>
          <button
            style={{
              ...styles.btnList,
              padding: isMobile ? '10px 16px' : '13px 24px',
              fontSize: isMobile ? '13px' : '14px',
              backgroundColor: isInWatchlist ? 'rgba(229,9,20,0.3)' : 'rgba(255,255,255,0.1)',
              border: isInWatchlist ? '1px solid rgba(229,9,20,0.5)' : '1px solid rgba(255,255,255,0.2)',
            }}
            onClick={toggleWatchlist}
            disabled={loading}
          >
            {isInWatchlist ? '✓ In My List' : '+ My List'}
          </button>
        </div>
      </div>
    </div>
  )
}

const styles = {
  skeleton: {
    height: '320px',
    borderRadius: '20px',
    backgroundColor: '#1e1e1e',
  },
  hero: {
    position: 'relative',
    borderRadius: '16px',
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
    fontWeight: '900',
    lineHeight: '1.1',
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
  buttons: { display: 'flex' },
  btnWatch: {
    backgroundColor: '#E50914',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: '700',
    letterSpacing: '0.3px',
    transition: 'background-color 0.2s',
  },
  btnList: {
    color: '#fff',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'all 0.2s',
    backdropFilter: 'blur(10px)',
  },
}

export default Hero