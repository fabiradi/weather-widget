import * as React from 'react'
import styled from 'styled-components'

import { renderTime } from '../utils/time'
import { CurrentProps } from '../OpenWeatherMapProps'
import Weather from '../components/Weather'

const Current = ({ data }: { data?: CurrentProps }) => {
  return (
    <div>
      <h3>Current</h3>
      <StyledTable>
        <tbody>
          <Row label="dt">{renderTime(data?.dt)}</Row>
          <Row
            label="Sun"
            data={`${renderTime(data?.sunrise)} - ${renderTime(data?.sunset)}`}
          />
          <Row label="temp">
            {data?.temp}°C ({data?.feels_like}°C)
          </Row>
          <Row label="pressure">{data?.pressure} hPa</Row>
          <Row label="humidity">{data?.humidity} %</Row>
          <Row label="dew_point">{data?.dew_point}°C</Row>
          <Row label="uvi">{data?.uvi}</Row>
          <Row label="clouds">{data?.clouds} %</Row>
          <Row label="visibility">{data?.visibility} m</Row>
          <Row label="wind_speed">{data?.wind_speed} m/s</Row>
          <Row label="wind_deg">{data?.wind_deg} °</Row>
          {data?.wind_gust && (
            <Row label="wind_gust">{data?.wind_gust} m/s</Row>
          )}
          {data?.weather.map((item, i) => (
            <Row label="weather small" key={i}>
              <Weather.Small data={item} showText />
            </Row>
          ))}
          {data?.weather.map((item, i) => (
            <Row label="weather large" key={i}>
              <Weather.Large data={item} />
            </Row>
          ))}
          {data?.rain && <Row label="rain">{data?.rain?.['1h']}mm</Row>}
          {data?.snow && <Row label="rain">{data?.snow?.['1h']}mm</Row>}
        </tbody>
      </StyledTable>
      {/*
      <pre>{JSON.stringify(data, null, 2)}</pre>
      */}
    </div>
  )
}

const StyledTable = styled.table`
  border-collapse: collapse;

  & th,
  & td {
    border: 1px solid #999;
  }
`

const Row = ({
  label,
  data,
  children,
}: {
  label?: string
  data?: React.ReactNode
  children?: React.ReactNode
}) => (
  <tr>
    <th>{label}</th>
    <td>
      {data}
      {children}
    </td>
  </tr>
)

export default Current
