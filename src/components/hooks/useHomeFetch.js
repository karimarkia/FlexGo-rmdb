import { useState, useEffect } from 'react'
import { POPULAR_END_POINT } from '../../config'
import axios from 'axios'

export const useHomeFetch = () => {
  const [state, setstate] = useState({ movies: [] })
  const [errors, setErrors] = useState(false)
  const [loading, setLoading] = useState(false)

  const fetchMovies = async (endpoint) => {
    setLoading(true)
    setErrors(false)

    const isLoadMore = endpoint.search('page')

    try {
      const res = await axios.get(endpoint)
      setstate((prev) => ({
        ...prev,
        movies:
          isLoadMore !== -1
            ? [...prev.movies, ...res.data.results]
            : [...res.data.results],
        heroImage: prev.heroImage || res.data.results[0],
        currentPage: res.data.page,
        totalPages: res.data.total_pages,
      }))
    } catch (error) {
      setErrors(true)
      console.log(error)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchMovies(POPULAR_END_POINT)
  }, [])

  return [{ state, loading, errors }, fetchMovies]
}
