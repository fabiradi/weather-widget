import { useState } from 'react'
import useSWR, { SWRResponse } from 'swr'
import styled from 'styled-components'
import { LoadingOutlined, ReloadOutlined } from '@ant-design/icons'

import { params2query } from './utils'

import { Today, Current, Minutely, Hourly, Daily, Alerts, Raw } from './views'
import { LocateReverse } from './components'
import { OpenWeatherMapOneCallProps } from './OpenWeatherMapProps'
import demo from './demoData'
import useApiKey from './hooks/useApiKey'
import ChangeApiKey from './components/ChangeApiKey'

const SECONDS = 1000
const MINUTES = 60 * SECONDS
const BASE_URL = 'https://api.openweathermap.org/data/2.5/onecall'

const fetcher = (url: string) =>
  fetch(url).then(async (res) => {
    // console.debug('fetch')
    const { ok, status, statusText } = res
    // console.log({ ok, status, statusText })
    const result = await res.json()
    return ok
      ? result
      : Promise.reject({ status, statusText, ...result, url })
  })

const demoFetcher = (url: string) => {
  return demo.full
  new Promise<SWRResponse<OpenWeatherMapOneCallProps, Error>>((resolve) => {
    console.log('demoFetcher', { url })
    /*
    resolve({
      /*
      demo.full
      revalidate: () =>
        new Promise<boolean>((resolve) => {
          console.log('demo: revalidate()')
          resolve(true)
        }),
      mutate: () =>
        new Promise<OpenWeatherMapOneCallProps>((resolve) => {
          console.log('demo: mutate()')
          resolve(demo.full)
        }),
      isValidating: false,
    })
      */
  })
}

const OpenWeatherMap = ({ lat, lon }: { lat: number; lon: number }) => {
  const [apiKey, setApiKey] = useApiKey()
  const [isDemo, setIsDemo] = useState(false)

  const params = { lat, lon, units: 'metric', lang: 'de', appid: apiKey }
  const url = apiKey ? `${BASE_URL}?${params2query(params)}` : null

  const result = useSWR<OpenWeatherMapOneCallProps>(
    url,
    isDemo ? demoFetcher : fetcher,
    {
      //refreshInterval: 30 * 60 * 1000, // 30 minutes
      //loadingTimeout: 10 * 1000,
      focusThrottleInterval: 10 * MINUTES,
      shouldRetryOnError: false,
      onSuccess: (data, key, config) =>
        console.log('🟢 onSuccess', { data, key, config }),
      onError: (err, key, config) =>
        console.log('🔴 onError', { err, key, config }),
    }
  )

  //const { data, error } = result
  // console.log('🐶', { apiKey, result })
  //const result = isDemo ? demoResult : liveResult
  const { current, minutely, hourly, daily, alerts } = result.data || {}

  const handleReload = () => result.mutate()

  if (result.isValidating) return <div>Loading ...</div>

  if (result.error)
    return (
      <div style={{ padding: 10, background: '#fcc' }}>
        <h3 style={{ marginTop: 0, color: '#c00' }}>
          Error {result.error.status}: {result.error.statusText}
        </h3>
        <div>{result.error.message}</div>
        <p style={{ color: 'rgba(0, 0, 0, 0.65)' }}>
          <code style={{ whiteSpace: 'pre-line', wordBreak: 'break-all' }}>
            {result.error.url}
          </code>
        </p>
        <ChangeApiKey currentKey={apiKey} onKeyChange={setApiKey} />
      </div>
    )

  return (
    <>
      {!apiKey && (
        <>
          <div>Warning: Missing API Key</div>
          <ChangeApiKey
            onKeyChange={(newKey) => {
              setApiKey(newKey)
            }}
          />
          <hr />
        </>
      )}
      <>
        {!result.data ? (
          <>
            No Data?{' '}
            <button onClick={() => setIsDemo(true)}>Switch to Demo</button>
          </>
        ) : (
          <>
            <PreHead>
              Open Weather Map
              <label style={{ whiteSpace: 'pre' }}>
                <input
                  type="checkbox"
                  checked={isDemo}
                  onChange={(e) => setIsDemo(e.target.checked)}
                />{' '}
                Demo?
              </label>
            </PreHead>
            <Head>
              {isDemo ? (
                'DEMO'
              ) : (
                <>
                  <LocateReverse lat={lat} lon={lon} />
                  {result.isValidating ? (
                    <LoadingOutlined style={{ color: '#008dff' }} />
                  ) : (
                    <ReloadOutlined
                      style={{
                        cursor: 'pointer',
                        color: '#999',
                        outline: 'none',
                      }}
                      onClick={handleReload}
                    />
                  )}
                </>
              )}
              <span
                style={{
                  opacity: 0.5,
                  marginLeft: '0.5em',
                  fontSize: '50%',
                  fontWeight: 'normal',
                }}
              >
                {lat.toFixed(2)}, {lon.toFixed(2)}
              </span>
            </Head>
            <div style={{ display: 'flex' }}>
              <div>
                <Today
                  current={current}
                  hourly={hourly?.[0]}
                  daily={daily?.[0]}
                />
                <Current data={current} />
              </div>
              <Minutely data={minutely} />
            </div>
            {alerts && <Alerts data={alerts} />}
            <Hourly data={hourly} />
            <Daily data={daily} />
            <Raw data={result.data} />
          </>
        )}
      </>
    </>
  )
}

const PreHead = styled.div`
  color: #999;
`

const Head = styled.h1`
  color: #444;
  font-size: 175%;
  margin: 0 0 20px;
`

export default OpenWeatherMap
