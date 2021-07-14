import { useState } from 'react'
import useSWR from 'swr'
import { LoadingOutlined } from '@ant-design/icons'

import {
  Today,
  Current,
  Minutely,
  Hourly,
  Daily,
  Alerts,
  Raw,
  Location,
} from './views'
import { OpenWeatherMapOneCallProps } from './OpenWeatherMapProps'
import demo from './demoData'

const ApiKey = '4299d8d17ded7d36f45aaf2d123a24fa'
const BASE_URL = 'https://api.openweathermap.org/data/2.5/onecall'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const params2query = (obj: Record<string, string | number>) =>
  Object.entries(obj)
    .map((p) => p.join('='))
    .join('&')

const OpenWeatherMap = ({ lat, lon }: { lat: number; lon: number }) => {
  const params = { lat, lon, appid: ApiKey, units: 'metric', lang: 'de' }
  const url = `${BASE_URL}?${params2query(params)}`

  const [isDemo, setIsDemo] = useState(false)
  const demoResult = {
    data: demo.full as OpenWeatherMapOneCallProps,
    mutate: () => {
      console.log('demo: fake reloading')
    },
    isValidating: false,
  }

  const liveResult = useSWR<OpenWeatherMapOneCallProps>(url, fetcher, {
    refreshInterval: 30 * 1000,
    //loadingTimeout: 10 * 1000,
  })
  const result = isDemo ? demoResult : liveResult
  const { current, minutely, hourly, daily, alerts } = result.data || {}

  const handleReload = () => {
    result.mutate()
  }

  return (
    <>
      <h1>
        Open Weather:{' '}
        <Location lat={lat} lon={lon} />
        {result.isValidating && (
          <LoadingOutlined style={{ color: '#008dff' }} />
        )}
        <div style={{ fontSize: '50%', fontWeight: 'normal' }}>
          {lat.toFixed(2)} / {lon.toFixed(2)}
          <button onClick={handleReload}>Reload</button>
          <label>
            <input
              type="checkbox"
              checked={isDemo}
              onChange={(e) => setIsDemo(e.target.checked)}
            />{' '}
            Demo?
          </label>
        </div>
      </h1>
      <div style={{ display: 'flex' }}>
        <div>
          <Today current={current} hourly={hourly?.[0]} daily={daily?.[0]} />
          <Current data={current} />
        </div>
        <Minutely data={minutely} />
      </div>
      {alerts && <Alerts data={alerts} />}
      <Hourly data={hourly} />
      <Daily data={daily} />
      <Raw data={result.data} />
    </>
  )
}

export default OpenWeatherMap
