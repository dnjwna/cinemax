function Hero() {
  const heroStyle = {
    position: 'relative',
    height: '380px',
    margin: '20px',
    borderRadius: '16px',
    overflow: 'hidden',
    backgroundImage: 'url(https://image.tmdb.org/t/p/original/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center top',
    display: 'flex',
    alignItems: 'flex-end',
  }

  const overlayStyle = {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to right, rgba(0,0,0,0.85) 40%, transparent 100%)',
  }

  const contentStyle = {
    position: 'relative',
    zIndex: 1,
    padding: '36px',
    maxWidth: '420px',
  }

  const titleStyle = {
    fontSize: '42px',
    fontWeight: '900',
    lineHeight: '1.1',
    marginBottom: '12px',
    color: '#fff',
  }

  const metaStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '20px',
    fontSize: '13px',
    color: '#ccc',
  }

  const ratingBadgeStyle = {
    backgroundColor: '#f5c518',
    color: '#000',
    fontWeight: 'bold',
    fontSize: '12px',
    padding: '2px 8px',
    borderRadius: '4px',
  }

  const btnWatchStyle = {
    backgroundColor: '#E50914',
    color: '#fff',
    border: 'none',
    padding: '12px 28px',
    fontSize: '15px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    marginRight: '12px',
  }

  const btnListStyle = {
    backgroundColor: 'rgba(255,255,255,0.15)',
    color: '#fff',
    border: '1px solid rgba(255,255,255,0.3)',
    padding: '12px 24px',
    fontSize: '15px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
  }

  return (
    <div style={heroStyle}>
      <div style={overlayStyle} />
      <div style={contentStyle}>
        <h1 style={titleStyle}>Interstellar</h1>
        <div style={metaStyle}>
          <span style={ratingBadgeStyle}>IMDb</span>
          <span>8.7</span>
          <span>•</span>
          <span>🇺🇸 English</span>
          <span>•</span>
          <span>2014</span>
        </div>
        <div>
          <button style={btnWatchStyle}>▶ Watch</button>
          <button style={btnListStyle}>+ My List</button>
        </div>
      </div>
    </div>
  )
}

export default Hero