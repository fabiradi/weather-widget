import { useState } from 'react'
import { OpenWeatherMapOneCallProps } from '../OpenWeatherMapProps'

const Raw = ({ data }: { data?: OpenWeatherMapOneCallProps }) => {
  const [show, setShow] = useState(false)
  const { current, minutely, hourly, daily, alerts } = data || {}
  const rawData = { current, minutely, hourly, daily, alerts }

  return (
    <>
      <h3>
        Raw{' '}
        <button onClick={() => setShow((s) => !s)}>
          {show ? 'hide' : 'show'}
        </button>
      </h3>
      {show && (
        <div style={{ display: 'flex' }}>
          {data
            ? Object.entries(rawData).map(([key, item]) => (
                <div key={key} style={{ flex: 1 }}>
                  <h4 style={{ textTransform: 'capitalize' }}>{key}</h4>
                  <pre>{JSON.stringify(item, undefined, 2)}</pre>
                </div>
              ))
            : 'No Data'}
        </div>
      )}
    </>
  )
}

export default Raw
