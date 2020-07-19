import React, { useState } from 'react'
import HeroImg from '../components/Layout/HeroImg'
import SearchBar from '../components/Layout/SearchBar'
import MoviesThumb from '../components/Layout/MoviesThumb'
import LoadMoreBtn from '../components/Layout/LoadMoreBtn'
import Grid from '../components/Layout/Grid'
import Spinner from '../components/Layout/Spinner'
import {
  BACKDROP_SIZE,
  IMAGE_BASE_URL,
  POSTER_SIZE,
  POPULAR_END_POINT,
  SEARCH_END_POINT,
} from '../config'

import NoImage from './images/no_image.jpg'

// Custom Hook
import { useHomeFetch } from '../components/hooks/useHomeFetch'

const Home = () => {
  const [{ state, loading, errors }, fetchMovies] = useHomeFetch()
  const [searchTerm, setSearchTerm] = useState('')

  if (errors) return <div>Something Went Wrong ...</div>
  if (!state.movies[0]) return <Spinner />

  const searchMovies = (search) => {
    const endpoint = search ? SEARCH_END_POINT + search : POPULAR_END_POINT
    setSearchTerm(search)
    fetchMovies(endpoint)
  }

  // load more function
  const loadMoreMovies = () => {
    const searchEndpoint = `${SEARCH_END_POINT}&query=${searchTerm}&page=${
      state.currentPage + 1
    }`
    const popularEndpoint = `${POPULAR_END_POINT}&page=${state.currentPage + 1}`
    const endpoint = searchTerm ? searchEndpoint : popularEndpoint

    fetchMovies(endpoint)
  }

  return (
    <div>
      {!searchTerm && (
        <HeroImg
          image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.heroImage.backdrop_path}`}
          title={state.heroImage.title}
          text={state.heroImage.overview}
        />
      )}
      <SearchBar callback={searchMovies} />
      <Grid header={searchTerm ? 'Search Results' : 'Popular Movies'}>
        {state.movies.map((movie) => (
          <MoviesThumb
            key={movie.id}
            image={
              movie.poster_path
                ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                : NoImage
            }
            clickable
            movieId={movie.id}
          />
        ))}
      </Grid>
      {loading && <Spinner />}
      {state.currentPage < state.totalPages && !loading && (
        <LoadMoreBtn text={'Load More'} callback={loadMoreMovies} />
      )}
    </div>
  )
}

export default Home
