import { useState, useEffect } from 'react'
import OpenWeatherMap from './OpenWeatherMap'

import './styles.css'

const LAT = 51.7573
const LON = 8.4003

const App = () => {
  const [location, setLocation] = useState({ lat: LAT, lon: LON })
  const [isLocating, setIsLocating] = useState(false)

  const getLocation = () => {
    if (!navigator.geolocation) {
      console.debug('Geolocation is not supported by your browser')
    } else {
      console.debug('Locating…')
      setIsLocating(true)
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const location = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          }
          console.log('🌍', location)
          setLocation(location)
          setIsLocating(false)
        },
        () => {
          console.warn('Fallback for geolocation')
          setIsLocating(false)
        }
      )
    }
  }

  useEffect(getLocation, [])

  return (
    <>
      <button
        style={{ float: 'right', top: 10, right: 10 }}
        onClick={getLocation}
        disabled={isLocating}
      >
        Update Location{isLocating ? '...' : ''}
      </button>
      <OpenWeatherMap lat={location.lat} lon={location.lon} />
    </>
  )
}

export default App
