import OpenWeatherMap from "./OpenWeatherMap"

import "./styles.css"

const LAT = 51.75792768331104
const LON = 8.399898647883113

export default function App() {
  return (
    <div className="App">
      <h1>OpenWeatherMap</h1>
      <OpenWeatherMap lat={LAT} lon={LON} />
    </div>
  )
}
