import { useState, useEffect } from 'react'
import OpenWeatherMap from './OpenWeatherMap'

import './styles.css'

const LAT = 51.75
const LON = 8.39

const App = () => {
  const [location, setLocation] = useState({ lat: LAT, lon: LON })

  const getLocation = () => {
    if (!navigator.geolocation) {
      console.debug('Geolocation is not supported by your browser')
    } else {
      //console.debug('Locating…')
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const location = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          }
          console.log('🌍', location)
          setLocation(location)
        },
        () => {
          console.warn('Fallback for geolocation')
        }
      )
    }
  }

  useEffect(() => {
    getLocation()
  }, [])

  return (
    <>
      <button
        style={{ float: 'right', top: 10, right: 10 }}
        onClick={getLocation}
      >
        Update Location
      </button>
      <OpenWeatherMap lat={location.lat} lon={location.lon} />
    </>
  )
}

export default App
