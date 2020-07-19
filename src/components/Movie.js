import React from 'react'
import Navigation from './Layout/Navigation'
import MovieInfoBar from './Layout/MovieInfoBar'
import MovieInfo from './Layout/MovieInfo'
import Grid from './Layout/Grid'
import Actors from './Layout/Actors'
import Spinner from './Layout/Spinner'

// custom hook
import { useMovieFetch } from './hooks/useMovieFetch'

const Movie = ({ movieId }) => {
  const [movie, loading, errors] = useMovieFetch(movieId)

  if (errors) return <div> Something Went Worng ...</div>
  if (loading) return <Spinner />

  return (
    <div>
      <Navigation movieName={movie.original_title} />
      <MovieInfo movie={movie} />
      <MovieInfoBar
        time={movie.runtime}
        budget={movie.budget}
        revenue={movie.revenue}
      />
      <Grid header="Actors">
        {movie.actors.map((actor, index) => (
          <Actors key={index} actor={actor} />
        ))}
      </Grid>
    </div>
  )
}

export default Movie
