import { useEffect, useState } from 'react'

const API_KEY = '8f602c8e357d4d2eaca91654a37ca633'

function MovieDetailModal({ movieId, onClose, watchlist = [], onWatchlistChange }) {
  const [movie, setMovie] = useState(null)
  const [trailerKey, setTrailerKey] = useState(null)
  const [showTrailer, setShowTrailer] = useState(false)
  const [loading, setLoading] = useState(true)

  const isInWatchlist = watchlist.some(w => w.movie_id === movieId)

  useEffect(() => {
    if (!movieId) return
    setLoading(true)
    setMovie(null)
    setTrailerKey(null)
    setShowTrailer(false)

    Promise.all([
      fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`).then(r => r.json()),
      fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`).then(r => r.json()),
    ]).then(([movieData, videoData]) => {
      setMovie(movieData)
      const trailer = videoData.results?.find(v => v.type === 'Trailer' && v.site === 'YouTube')
        ?? videoData.results?.find(v => v.site === 'YouTube')  // fallback: video YouTube apapun
      setTrailerKey(trailer?.key ?? null)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [movieId])

  useEffect(() => {
    const handleKey = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) onClose()
  }

  const formatRuntime = mins => {
    if (!mins) return 'N/A'
    const h = Math.floor(mins / 60)
    const m = mins % 60
    return h > 0 ? `${h}h ${m}m` : `${m}m`
  }

  const formatDate = str => {
    if (!str) return 'N/A'
    return new Date(str).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric',
    })
  }

  return (
    <div className="cinemax-backdrop" style={styles.backdrop} onClick={handleBackdropClick}>
      <div className="cinemax-modal" style={styles.modal}>

        {/* Close button */}
        <button style={styles.closeBtn} onClick={onClose}>✕</button>

        {/* LOADING */}
        {loading && (
          <div style={styles.loadingWrap}>
            <div style={styles.skeletonBackdrop} />
            <div style={{ padding: '20px' }}>
              {[200, 120, '100%', '100%', '70%'].map((w, i) => (
                <div key={i} style={{ ...styles.skeleton, width: w, height: i === 0 ? 28 : 14, marginBottom: 12 }} />
              ))}
            </div>
          </div>
        )}

        {/* CONTENT */}
        {!loading && movie && (
          <>
            {/* Backdrop / Trailer area */}
            <div style={showTrailer && trailerKey ? styles.backdropWrapTrailer : styles.backdropWrap}>
              {showTrailer && trailerKey ? (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${trailerKey}?autoplay=1&rel=0`}
                  style={styles.trailerFrame}
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title="Trailer"
                />
              ) : (
                <>
                  {movie.backdrop_path
                    ? <img
                        src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
                        alt={movie.title}
                        style={styles.backdropImg}
                      />
                    : <div style={styles.backdropFallback} />
                  }
                  <div style={styles.backdropGradient} />

                </>
              )}

            </div>

            {/* Body */}
            <div style={styles.body}>
              {/* Poster + title */}
              <div style={styles.titleRow}>
                {movie.poster_path && (
                  <img
                    src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
                    alt={movie.title}
                    style={styles.poster}
                  />
                )}
                <div>
                  <div style={styles.movieTitle}>{movie.title}</div>
                  {movie.tagline ? (
                    <div style={styles.tagline}>"{movie.tagline}"</div>
                  ) : null}
                </div>
              </div>

              {/* Trailer button */}
              {trailerKey && !showTrailer && (
                <button style={styles.trailerBtn} onClick={() => setShowTrailer(true)}>
                  <span style={styles.trailerBtnIcon}>▶</span>
                  <span>Watch Trailer</span>
                </button>
              )}
              {showTrailer && (
                <button style={{ ...styles.trailerBtn, backgroundColor: 'transparent', border: '1px solid #444', color: '#aaa' }} onClick={() => setShowTrailer(false)}>
                  ✕ Close Trailer
                </button>
              )}

              {/* Meta row */}
              <div style={styles.metaRow}>
                <span style={{ ...styles.badge, ...styles.badgeRating }}>
                  ⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
                </span>
                <span style={styles.badge}>⏱ {formatRuntime(movie.runtime)}</span>
                <span style={styles.badge}>📅 {formatDate(movie.release_date)}</span>
              </div>

              {/* Genres */}
              {movie.genres?.length > 0 && (
                <div style={styles.genreRow}>
                  {movie.genres.map(g => (
                    <span key={g.id} style={styles.genreChip}>{g.name}</span>
                  ))}
                </div>
              )}

              {/* Overview */}
              {movie.overview && (
                <div style={{ marginBottom: 20 }}>
                  <div style={styles.sectionLabel}>Overview</div>
                  <p style={styles.overview}>{movie.overview}</p>
                </div>
              )}

              {/* Watchlist button — pakai pola yang sama kayak MovieCard */}
              <button
                style={{
                  ...styles.watchlistBtn,
                  backgroundColor: isInWatchlist ? 'transparent' : '#E50914',
                  color: isInWatchlist ? '#4ade80' : '#fff',
                  border: isInWatchlist ? '1px solid #4ade80' : 'none',
                }}
                onClick={onWatchlistChange}
              >
                {isInWatchlist ? '✓ In My List' : '+ My List'}
              </button>
            </div>
          </>
        )}

        {/* ERROR */}
        {!loading && !movie && (
          <div style={{ ...styles.loadingWrap, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p style={{ color: '#666' }}>Failed to load movie details.</p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes shimmer {
          0%   { background-position: -600px 0; }
          100% { background-position:  600px 0; }
        }
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.94) translateY(16px); }
          to   { opacity: 1; transform: scale(1)    translateY(0);     }
        }

        /* Custom scrollbar — Chrome/Safari */
        .cinemax-modal::-webkit-scrollbar {
          width: 4px;
        }
        .cinemax-modal::-webkit-scrollbar-track {
          background: transparent;
        }
        .cinemax-modal::-webkit-scrollbar-thumb {
          background: #333;
          border-radius: 4px;
        }
        .cinemax-modal::-webkit-scrollbar-thumb:hover {
          background: #444;
        }

        /* Mobile responsive */
        @media (max-width: 600px) {
          .cinemax-backdrop {
            padding: 0 !important;
            align-items: flex-end !important;
          }
          .cinemax-modal {
            max-height: 95vh !important;
            border-radius: 16px 16px 0 0 !important;
          }
        }
      `}</style>
    </div>
  )
}

const styles = {
  backdrop: {
    position: 'fixed',
    inset: 0,
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '16px',
    backgroundColor: 'rgba(0,0,0,0.75)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
  },
  modal: {
    position: 'relative',
    width: '100%',
    maxWidth: '900px',
    maxHeight: '90vh',
    overflowY: 'auto',
    borderRadius: '14px',
    backgroundColor: '#1e1e1e',
    border: '1px solid #2a2a2a',
    boxShadow: '0 32px 80px rgba(0,0,0,0.8)',
    animation: 'modalIn 0.28s cubic-bezier(0.34,1.56,0.64,1)',
    scrollbarWidth: 'thin',
    scrollbarColor: '#333 transparent',
  },
  closeBtn: {
    position: 'absolute',
    top: '12px',
    right: '12px',
    zIndex: 10,
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: 'rgba(0,0,0,0.6)',
    border: '1px solid rgba(255,255,255,0.15)',
    color: '#fff',
    fontSize: '14px',
    cursor: 'pointer',
  },
  backdropWrap: {
    position: 'relative',
    width: '100%',
    height: '240px',
    borderRadius: '14px 14px 0 0',
    overflow: 'hidden',
    transition: 'height 0.3s ease',
  },
  backdropWrapTrailer: {
    position: 'relative',
    width: '100%',
    paddingTop: '56.25%', // 16:9 aspect ratio
    borderRadius: '14px 14px 0 0',
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  backdropImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
    filter: 'brightness(0.65)',
  },
  backdropFallback: {
    width: '100%',
    height: '100%',
    background: 'linear-gradient(135deg, #1e1e1e, #2a2a2a)',
  },
  backdropGradient: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to top, #1e1e1e 0%, transparent 60%)',
  },
  body: {
    padding: '0 24px 24px',
    marginTop: '-48px',
    position: 'relative',
  },
  titleRow: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: '16px',
    marginBottom: '16px',
  },
  poster: {
    width: '72px',
    borderRadius: '8px',
    border: '2px solid #2a2a2a',
    flexShrink: 0,
    boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
  },
  movieTitle: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#fff',
    lineHeight: 1.2,
    marginBottom: '4px',
  },
  tagline: {
    fontSize: '12px',
    color: '#666',
    fontStyle: 'italic',
  },
  metaRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginBottom: '12px',
  },
  badge: {
    fontSize: '12px',
    fontWeight: '600',
    padding: '4px 10px',
    borderRadius: '6px',
    backgroundColor: 'rgba(255,255,255,0.07)',
    color: '#aaa',
    border: '1px solid #2a2a2a',
  },
  badgeRating: {
    color: '#f5c518',
    backgroundColor: 'rgba(245,197,24,0.1)',
    border: '1px solid rgba(245,197,24,0.25)',
  },
  genreRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px',
    marginBottom: '16px',
  },
  genreChip: {
    fontSize: '11px',
    fontWeight: '500',
    padding: '3px 10px',
    borderRadius: '20px',
    backgroundColor: 'rgba(229,9,20,0.12)',
    color: '#E50914',
    border: '1px solid rgba(229,9,20,0.25)',
  },
  sectionLabel: {
    fontSize: '10px',
    textTransform: 'uppercase',
    letterSpacing: '1.5px',
    color: '#444',
    fontWeight: '600',
    marginBottom: '6px',
  },
  overview: {
    fontSize: '13px',
    lineHeight: '1.7',
    color: '#999',
    margin: 0,
  },
  watchlistBtn: {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'opacity 0.2s',
  },
  loadingWrap: {
    minHeight: '300px',
  },
  skeletonBackdrop: {
    width: '100%',
    height: '240px',
    borderRadius: '14px 14px 0 0',
    background: 'linear-gradient(90deg, #242424 25%, #2a2a2a 50%, #242424 75%)',
    backgroundSize: '600px 100%',
    animation: 'shimmer 1.4s infinite',
  },
  trailerFrame: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    border: 'none',
    display: 'block',
  },
  trailerBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: '#E50914',
    border: 'none',
    borderRadius: '8px',
    color: '#fff',
    fontSize: '13px',
    fontWeight: '700',
    padding: '10px 20px',
    cursor: 'pointer',
    letterSpacing: '0.3px',
    boxShadow: '0 4px 20px rgba(229,9,20,0.4)',
    marginBottom: '14px',
  },
  trailerBtnIcon: {
    fontSize: '11px',
    paddingLeft: '2px',
  },
  stopTrailerBtn: {
    position: 'absolute',
    top: '10px',
    left: '10px',
    backgroundColor: 'rgba(0,0,0,0.7)',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: '6px',
    color: '#fff',
    fontSize: '12px',
    fontWeight: '600',
    padding: '5px 10px',
    cursor: 'pointer',
    backdropFilter: 'blur(4px)',
  },
  skeleton: {
    borderRadius: '6px',
    background: 'linear-gradient(90deg, #242424 25%, #2a2a2a 50%, #242424 75%)',
    backgroundSize: '600px 100%',
    animation: 'shimmer 1.4s infinite',
  },
}

export default MovieDetailModal