import { useEffect, useState } from "react"
import Minutely from "./views/Minutely"
import Hourly from "./views/Hourly"
import Daily from "./views/Daily"

const ApiKey = "4299d8d17ded7d36f45aaf2d123a24fa"
const BASE_URL = "https://api.openweathermap.org/data/2.5/onecall"

const params2query = (obj) =>
  Object.entries(obj)
    .map((p) => p.join("="))
    .join("&")

const OpenWeatherMap = ({ lat, lon }) => {
  const params = { lat, lon, /*exclude: part,*/ appid: ApiKey, units: "metric" }
  const url = `${BASE_URL}?${params2query(params)}`

  const [result, setResult] = useState()
  const { current, minutely, hourly, daily } = result || {}

  useEffect(() => {
    fetch(url)
      .then((r) => r.json())
      .then(setResult)
  }, [url])

  console.log(current, hourly)

  const minutely2 = [
    { dt: 1622190188, precipitation: 0 },
    { dt: 1622190288, precipitation: 1 },
    { dt: 1622190388, precipitation: 3 },
    { dt: 1622190488, precipitation: 10 },
    { dt: 1622190588, precipitation: 15 },
    { dt: 1622190688, precipitation: 50 },
    { dt: 1622190788, precipitation: 43 },
    { dt: 1622190888, precipitation: 34 },
    { dt: 1622190988, precipitation: 19 },
    { dt: 1622191088, precipitation: 17 },
    { dt: 1622191188, precipitation: 12 },
    { dt: 1622191288, precipitation: 6 },
    { dt: 1622191388, precipitation: 3 },
    { dt: 1622191488, precipitation: 2 },
    { dt: 1622191588, precipitation: 1 },
    { dt: 1622191688, precipitation: 0 },
  ]

  return (
    <div>
      <p>
        {lat}, {lon}
      </p>
      <Minutely data={minutely} />
      <Hourly data={hourly} current={current} />
      <Daily data={daily} />
    </div>
  )
}

export default OpenWeatherMap
