import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone' // dependent on utc plugin
import { renderTime, renderDay } from '../utils/time'
import styled from 'styled-components'

import { DailyProps } from '../OpenWeatherMapProps'
import Weather from '../components/Weather'

dayjs.extend(utc)
dayjs.extend(timezone)

const SingleDay = ({ data }: { data: DailyProps }) => {
  return (
    <Table>
      <tbody>
        <tr>
          <th colSpan={2}>{renderDay(data.dt)}</th>
        </tr>
        <tr>
          <th>Rise/Set</th>
          <td>
            {renderTime(data.sunrise)} / {renderTime(data.sunset)}
          </td>
        </tr>
        <tr>
          <th>T.Min/Max</th>
          <td>
            {data.temp.min}°C / {data.temp.max}°C
          </td>
        </tr>
        <tr>
          <th>T.Morn</th>
          <td>
            {data.temp.morn}°C ({data.feels_like.morn}°C)
          </td>
        </tr>
        <tr>
          <th>T.Day</th>
          <td>
            {data.temp.day}°C ({data.feels_like.day}°C)
          </td>
        </tr>
        <tr>
          <th>T.Eve</th>
          <td>
            {data.temp.eve}°C ({data.feels_like.eve}°C)
          </td>
        </tr>
        <tr>
          <th>T.Night</th>
          <td>
            {data.temp.night}°C ({data.feels_like.night}°C)
          </td>
        </tr>
        <tr>
          <th>Press</th>
          <td>{data.pressure}hPa</td>
        </tr>
        <tr>
          <th>Hum.</th>
          <td>{data.humidity}%</td>
        </tr>
        <tr>
          <th>Dew</th>
          <td>{data.dew_point}°C</td>
        </tr>
        <tr>
          <th>Wind Speed</th>
          <td>{data.wind_speed} m/s</td>
        </tr>
        {data.wind_gust && (
          <tr>
            <th>Wind Gust</th>
            <td>{data.wind_gust} m/s</td>
          </tr>
        )}
        <tr>
          <th>Wind Deg</th>
          <td>{data.wind_deg}°</td>
        </tr>
        <tr>
          <th>Clouds</th>
          <td>{data.clouds}%</td>
        </tr>
        <tr>
          <th>UVI</th>
          <td>{data.uvi}</td>
        </tr>
        <tr>
          <th>Pop</th>
          <td>{(data.pop * 100).toFixed(0)}%</td>
        </tr>
        <tr>
          <th>Rain</th>
          <td>{data.rain ? `${data.rain} mm` : ''}</td>
        </tr>
        <tr>
          <th>Snow</th>
          <td>{data.snow ? `${data.snow} mm` : ''}</td>
        </tr>
        <tr>
          <th>Weather</th>
          {data.weather.map((item, i) => (
            <td key={i}>
              <Weather.Small data={item} />
            </td>
          ))}
        </tr>
        <tr>
          <th>Weather</th>
          {data.weather.map((item, i) => (
            <td key={i}>
              <Weather.Large data={item} />
            </td>
          ))}
        </tr>
      </tbody>
    </Table>
  )
}

const Daily = ({ data }: { data?: DailyProps[] }) => {
  console.log(data)
  return (
    <>
      <h3>Daily</h3>
      <div style={{ whiteSpace: 'pre', display: 'flex' }}>
        {data?.map((item, i) => (
          <SingleDay key={i} data={item} />
        ))}
      </div>
    </>
  )
}

const Table = styled.table`
  border: 1px solid #000;
  margin-right: 10px;
  border-collapse: collapse;

  & th,
  & td {
    border: 1px solid #999;
  }
`

export default Daily
