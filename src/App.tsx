import { useState, useEffect } from 'react'
import OpenWeatherMap from './OpenWeatherMap'

import './styles.css'

const LAT = 51.7573
const LON = 8.4003

const LOCATIONS = [
  { name: 'Lindau', lat: 47.55, lon: 9.69 },
  { name: 'Schwangau', lat: 47.5604, lon: 10.7721 },
  { name: 'Garmisch', lat: 47.4921, lon: 11.0958 },
]

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
          console.warn('Fallback for geolocation: not allowed')
          alert('Geolocation not allowed')
          setIsLocating(false)
        },
        {
          maximumAge: 60 * 5 * 60 * 1000, // 5 minutes
        }
      )
    }
  }

  useEffect(() => {
    //getLocation()
  }, [])

  return (
    <div style={{ padding: 10 }}>
      <button
        style={{ float: 'right', top: 10, right: 10 }}
        onClick={getLocation}
        disabled={isLocating}
      >
        Update Location{isLocating ? '...' : ''}
      </button>
      {LOCATIONS.map((item) => (
        <div style={{ float: 'right', clear: 'both' }} key={item.name}>
          <button onClick={() => setLocation({ lat: item.lat, lon: item.lon })}>
            {item.name}
          </button>
        </div>
      ))}
      <OpenWeatherMap lat={location.lat} lon={location.lon} />
    </div>
  )
}

export default App
