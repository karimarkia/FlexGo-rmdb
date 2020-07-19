import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { API_KEY, API_URL } from '../../config'

export const useMovieFetch = (movieId) => {
  const [state, setstate] = useState({})
  const [loading, setLoading] = useState(true)
  const [errors, setErrors] = useState(false)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setErrors(false)

    try {
      const endpoint = `${API_URL}movie/${movieId}?api_key=${API_KEY}`
      const res = await axios.get(endpoint)
      const creditsEndpoint = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`
      const criditRes = await axios.get(creditsEndpoint)
      const res2 = criditRes.data

      const directors = res2.crew.filter((member) => member.job === 'Director')

      setstate({
        ...res.data,
        actors: res2.crew,
        directors,
      })

    } catch (error) {
      setErrors(true)
    }
    setLoading(false)
  }, [movieId])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return [state, loading, errors]
}
