import { useState, useCallback } from 'react'

export const useLocalStorage = <T,>(key: string, initialState: T) => {
  const [state, setState] = useState(initialState)

  const getItem = useCallback(() => {
    try {
      const data = localStorage.getItem(key)

      if (!data) throw new Error()

      const newState = JSON.parse(data) as T

      return newState
    } catch (err) {
      console.error(err)
    }
  }, [key])

  const saveItem = (newState: T) => {
    localStorage.setItem(key, JSON.stringify(newState))
    setState(newState)
  }

  const removeItem = () => {
    localStorage.removeItem(key)
  }

  return {
    state,
    getItem,
    saveItem,
    removeItem,
  }
}
