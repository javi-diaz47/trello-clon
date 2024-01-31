export const getItem = <T>(key: string) => {
  try {
    const data = localStorage.getItem(key)

    if (!data) throw new Error()

    const newState = JSON.parse(data) as T

    return newState
  } catch (err) {
    console.error(err)
  }
}

export const saveItem = <T>(key: string, newState: T) => {
  localStorage.setItem(key, JSON.stringify(newState))
}

export const removeItem = (key: string) => {
  localStorage.removeItem(key)
}
