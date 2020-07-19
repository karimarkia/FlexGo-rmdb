import React from 'react'
import { Link } from '@reach/router'
import { StyledMovieThumb } from '../styles/StyledMovieThumb'

const MoviesThumb = ({ image, clickable, movieId }) => {
  return (
    <StyledMovieThumb>
      {clickable ? (
        <Link to={`/${movieId}`}>
          <img src={image} className="clickable" alt="movieThumb" />
        </Link>
      ) : (
        <img src={image} alt="movieThumb" />
      )}
    </StyledMovieThumb>
  )
}

export default MoviesThumb
