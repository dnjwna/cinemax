import MovieCard from './MovieCard'

function MovieList({ movies, label }) {
  const sectionStyle = {
    padding: '8px 20px 24px',
  }

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '16px',
  }

  const labelStyle = {
    fontSize: '18px',
    fontWeight: '700',
    color: '#fff',
  }

  const accentLineStyle = {
    flex: 1,
    height: '3px',
    backgroundColor: '#E50914',
    borderRadius: '2px',
    maxWidth: '60px',
  }

  const gridStyle = {
    display: 'flex',
    gap: '14px',
    overflowX: 'auto',
    paddingBottom: '8px',
  }

  return (
    <section style={sectionStyle}>
      <div style={headerStyle}>
        <span style={labelStyle}>{label}</span>
        <div style={accentLineStyle} />
      </div>
      <div style={gridStyle}>
        {movies.map((movie) => (
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
    </section>
  )
}

export default MovieList