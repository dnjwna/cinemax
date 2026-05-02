import { useState } from 'react'

function MovieCard({ title, genre, rating, image }) {
  const [hovered, setHovered] = useState(false)

  const cardStyle = {
    borderRadius: '12px',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'transform 0.2s',
    transform: hovered ? 'scale(1.04)' : 'scale(1)',
    backgroundColor: '#222',
    flexShrink: 0,
    width: '160px',
  }

  const imageStyle = {
    width: '100%',
    height: '220px',
    objectFit: 'cover',
    display: 'block',
  }

  const infoStyle = {
    padding: '10px 12px',
  }

  const titleStyle = {
    fontSize: '13px',
    fontWeight: '600',
    color: '#fff',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    marginBottom: '4px',
  }

  const genreStyle = {
    fontSize: '11px',
    color: '#888',
  }

  const ratingStyle = {
    fontSize: '11px',
    color: '#f5c518',
    marginTop: '4px',
  }

  return (
    <div
      style={cardStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img src={image} alt={title} style={imageStyle} />
      <div style={infoStyle}>
        <div style={titleStyle}>{title}</div>
        <div style={genreStyle}>{genre}</div>
        <div style={ratingStyle}>⭐ {rating}</div>
      </div>
    </div>
  )
}

export default MovieCard