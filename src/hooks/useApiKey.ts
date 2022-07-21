import { useState, useEffect, useCallback, useMemo } from 'react'

type Setter = (newValue: string) => void

const STORAGE_KEY = 'apiKey'

const useApiKey = (): [string, Setter] => {
  const [key, setKey] = useState<string>(process.env.REACT_APP_API_KEY || '')

  useEffect(() => {
    console.log('Check Key')
    const savedKey = localStorage.getItem(STORAGE_KEY)
    if (savedKey) {
      setKey(savedKey)
    }
  }, [])

  const changeKey = useCallback(
    (newValue: string) => {
      if (newValue) {
        console.log('setItem', newValue)
        localStorage.setItem(STORAGE_KEY, newValue)
      } else {
        console.log('removeItem', newValue)
        localStorage.removeItem(STORAGE_KEY)
      }

      if (key !== newValue) {
        setKey(newValue || process.env.REACT_APP_API_KEY || '')
      }
    },
    [key]
  )

  // console.debug('render useApiKey')

  const returnValue = useMemo<[string, Setter]>(
    () => [key, changeKey],
    [key, changeKey]
  )
  return returnValue
}

export default useApiKey
