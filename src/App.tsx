import OpenWeatherMap from "./OpenWeatherMap"

import "./styles.css"

const LAT = 51.75
const LON = 8.39

export default function App() {
  return (
    <div className="App">
      <OpenWeatherMap lat={LAT} lon={LON} />
    </div>
  )
}
