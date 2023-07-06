/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'

export const useFetch = (
  url
) => {
  const [state, setState] = useState({
    data: undefined,
    isLoading: true,
    error: undefined,
  })

  const fetchData = async (abortController) => {
    try {
      setState((prevState) => ({
        ...prevState,
        isLoading: true,
      }))

      const res = await fetch(url.toString(), {
        signal: abortController.signal,
      })
      const data = await res.json()

      setState((prevState) => ({
        ...prevState,
        data,
        isLoading: false,
      }))
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        isLoading: false,
        error:
          error instanceof Error
            ? error.name !== 'AbortError'
              ? error
              : undefined
            : new Error('Unknown error'),
      }))
    }
  }

  useEffect(() => {
    const abortController = new AbortController()

    fetchData(abortController)

    return () => abortController.abort()
  }, [url.toString()])

  return state
}