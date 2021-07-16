import styled from 'styled-components'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTemperatureHigh,
  faTemperatureLow,
  faSun,
  faArrowUp,
  faArrowDown,
  faTint,
  faUmbrella,
  faWind,
  faCloud,
} from '@fortawesome/free-solid-svg-icons'

import { renderTime } from '../utils/time'
import { uvCategoryColor } from '../utils/uvi'
import { CurrentProps, DailyProps, HourlyProps } from '../OpenWeatherMapProps'
import Weather from '../components/Weather'

const iconStyle = { marginRight: 5 }

interface TodayProps {
  current?: CurrentProps
  hourly?: HourlyProps
  daily?: DailyProps
}

const Today = ({ current, daily, hourly }: TodayProps) => {
  const {
    temp: currentTemp,
    dew_point,
    humidity,
    sunrise,
    sunset,
    uvi,
    clouds,
    rain,
    wind_speed,
    wind_gust,
    pressure,
    visibility,
  } = current || {}
  const { pop, rain: rainHourly } = hourly || {}
  const { temp } = daily || {}
  const weather = current?.weather?.[0]

  return (
    <div style={{ display: 'flex' }}>
      {weather && <Weather.Small data={weather} showText />}
      <div style={{ marginLeft: '0.5em' }}>
        <div style={{ display: 'flex' }}>
          <CurrentTemp>
            {currentTemp ? Math.round(currentTemp) : '--'}
            <span>°C</span>
          </CurrentTemp>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              marginLeft: '0.5em',
            }}
          >
            <MaxTemp>
              <FontAwesomeIcon icon={faTemperatureHigh} style={iconStyle} />
              {temp?.max ? Math.round(temp.max) : '--'}°C
            </MaxTemp>
            <MinTemp>
              <FontAwesomeIcon icon={faTemperatureLow} style={iconStyle} />
              {temp?.min ? Math.round(temp.min) : '--'}°C
            </MinTemp>
          </div>
        </div>
        <DewPoint>
          {/* <FontAwesomeIcon icon={faThermometerEmpty} /> */}
          <FontAwesomeIcon icon={faTint} style={iconStyle} />
          <strong>{dew_point ? dew_point.toFixed(1) : '--'}°C</strong>
          {' · '}
          {humidity} %
        </DewPoint>
        {rain && (
          <div style={{ color: '#c00' }}>
            <FontAwesomeIcon icon={faUmbrella} style={iconStyle} />
            {rain['1h']} mm
          </div>
        )}
        {pop ? (
          <div style={{ color: '#369' }}>
            <FontAwesomeIcon icon={faUmbrella} style={iconStyle} />
            {(pop * 100).toFixed(0)} %{' '}
            {rainHourly && `(${rainHourly['1h']} mm)`}
          </div>
        ) : (
          ''
        )}
        {wind_speed && (
          <div
            style={{
              fontSize: '85%',
              color: '#999',
              // marginTop: '0.5em',
              // paddingTop: '0.5em',
              // borderTop: '1px dotted #ccc',
            }}
          >
            <FontAwesomeIcon icon={faWind} style={iconStyle} />
            {wind_speed} m/s {wind_gust && `(${wind_gust} m/s)`}
          </div>
        )}
        <div style={{ fontSize: '85%' }}>
          <span style={{ color: '#999' }}>
            <FontAwesomeIcon
              icon={faSun}
              style={{ ...iconStyle, color: uvCategoryColor(uvi || 0, '#999') }}
            />
            {uvi}
          </span>
          {clouds && (
            <span
              style={{
                color: '#999',
                marginLeft: '0.5em',
                paddingLeft: '0.5em',
                borderLeft: '1px solid #ccc',
              }}
            >
              {' '}
              <FontAwesomeIcon icon={faCloud} style={iconStyle} />
              {clouds} %
            </span>
          )}
        </div>
        <div
          style={{
            color: '#999',
            fontSize: '85%',
            marginTop: '0.5em',
            paddingTop: '0.5em',
            borderTop: '1px dotted #ccc',
          }}
        >
          <FontAwesomeIcon icon={faArrowUp} style={iconStyle} />
          {renderTime(sunrise)}{' '}
          <span
            style={{
              marginLeft: '0.5em',
              paddingLeft: '0.5em',
              borderLeft: '1px solid #ccc',
            }}
          >
            <FontAwesomeIcon icon={faArrowDown} style={iconStyle} />
            {renderTime(sunset)}
          </span>
        </div>
        <div
          style={{
            color: '#999',
            fontSize: '85%',
            marginTop: '0.5em',
            // paddingTop: '0.5em',
            // borderTop: '1px dotted #ccc',
          }}
        >
          <span>{pressure} hPa</span>
          {visibility ? (
            <span
              style={{
                marginLeft: '0.5em',
                paddingLeft: '0.5em',
                borderLeft: '1px solid #ccc',
              }}
            >
              {(visibility / 1000).toFixed(0)} km
            </span>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  )
}

const CurrentTemp = styled.div`
  font-size: 250%;
`

const MaxTemp = styled.div`
  color: #666;
  font-weight: bold;
  font-size: 85%;
`

const MinTemp = styled.div`
  color: #999;
  font-size: 75%;
`

const DewPoint = styled.div`
  color: #666;
`

export default Today
