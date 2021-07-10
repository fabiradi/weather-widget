import useSWR from 'swr'
import { LoadingOutlined } from '@ant-design/icons'
import {} from '@material-ui/icons'

import { Current, Minutely, Hourly, Daily } from './views'
import { OpenWeatherMapOneCallProps } from './OpenWeatherMapProps'
import demo from './demo-data'

const ApiKey = '4299d8d17ded7d36f45aaf2d123a24fa'
const BASE_URL = 'https://api.openweathermap.org/data/2.5/onecall'

const params2query = (obj: Record<string, string | number>) =>
  Object.entries(obj)
    .map((p) => p.join('='))
    .join('&')

const OpenWeatherMap = ({ lat, lon }: { lat: number; lon: number }) => {
  const params = { lat, lon, appid: ApiKey, units: 'metric', lang: 'de' }
  const url = `${BASE_URL}?${params2query(params)}`

  const result = useSWR<OpenWeatherMapOneCallProps>(url)
  const { current, minutely, hourly, daily } = result.data || {}

  const handleReload = () => {
    result.mutate()
  }

  return (
    <>
      <h1>
        OpenWeatherMap{' '}
        {result.isValidating && (
          <LoadingOutlined style={{ color: '#008dff' }} />
        )}
      </h1>
      <div>
        {lat} {lon}
        <button onClick={handleReload}>Reload</button>
      </div>
      <div style={{ display: 'flex' }}>
        <Current data={current} />
        <div>
          <Minutely data={minutely} />
          <hr />
          <div style={{ opacity: 0.5 }}>Demo</div>
          <Minutely data={demo.minutely} />
        </div>
      </div>
      <Hourly data={hourly} />
      <Daily data={daily} />
    </>
  )
}

export default OpenWeatherMap
