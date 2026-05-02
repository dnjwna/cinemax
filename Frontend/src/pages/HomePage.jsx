import { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import Hero from '../components/Hero'
import MovieList from '../components/MovieList'

const API_KEY = '8f602c8e357d4d2eaca91654a37ca633'

const GENRE_MAP = {
  28: 'Action', 12: 'Adventure', 16: 'Animation',
  35: 'Comedy', 80: 'Crime', 99: 'Documentary',
  18: 'Drama', 10751: 'Family', 14: 'Fantasy',
  36: 'History', 27: 'Horror', 10402: 'Music',
  9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi',
  10770: 'TV Movie', 53: 'Thriller', 10752: 'War', 37: 'Western',
}

function HomePage() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`)
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.results.map((movie) => ({
          id: movie.id,
          title: movie.title,
          genre: movie.genre_ids.slice(0, 2).map((id) => GENRE_MAP[id]).join(', '),
          rating: movie.vote_average.toFixed(1),
          year: movie.release_date?.slice(0, 4),
          image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        }))
        setMovies(formatted)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div style={styles.layout}>
      <Sidebar />
      <main style={styles.main}>
        <Hero />
        {loading ? (
          <div style={styles.loading}>Loading movies...</div>
        ) : (
          <MovieList movies={movies} label="Popular Movies" />
        )}
      </main>
    </div>
  )
}

const styles = {
  layout: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#1a1a1a',
  },
  main: {
    flex: 1,
    overflowY: 'auto',
    backgroundColor: '#1a1a1a',
  },
  loading: {
    color: '#fff',
    textAlign: 'center',
    marginTop: '100px',
    fontSize: '18px',
  },
}

export default HomePage
