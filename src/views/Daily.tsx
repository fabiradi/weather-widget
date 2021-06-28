import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone' // dependent on utc plugin
import { renderTime, renderDay } from '../utils/time'

import { DailyProps } from '../OpenWeatherMapProps'

dayjs.extend(utc)
dayjs.extend(timezone)

const SingleDay = ({ data }: { data: DailyProps }) => {
  const {
    dt,
    sunrise,
    sunset,
    temp,
    feels_like,
    pressure,
    humidity,
    dew_point,
  } = data

  return (
    <table style={{ border: '1px solid #000', marginRight: 10 }}>
      <tbody>
        <tr>
          <th colSpan={3}>{renderDay(dt)}</th>
        </tr>
        <tr>
          <th>Sun</th>
          <td>{renderTime(sunrise)}</td>
          <td>{renderTime(sunset)}</td>
        </tr>
        <tr>
          <th>T.Min/Max</th>
          <td>{temp.min}°C</td>
          <td>{temp.max}°C</td>
        </tr>
        <tr>
          <th>T.Morn</th>
          <td>{temp.morn}°C</td>
          <td>({feels_like.morn}°C)</td>
        </tr>
        <tr>
          <th>T.Day</th>
          <td>{temp.day}°C</td>
          <td>({feels_like.day}°C)</td>
        </tr>
        <tr>
          <th>T.Eve</th>
          <td>{temp.eve}°C</td>
          <td>({feels_like.eve}°C)</td>
        </tr>
        <tr>
          <th>T.Night</th>
          <td>{temp.night}°C</td>
          <td>({feels_like.night}°C)</td>
        </tr>
        <tr>
          <th>Press</th>
          <td>{pressure}hPa</td>
        </tr>
        <tr>
          <th>Hum.</th>
          <td>{humidity}%</td>
        </tr>
        <tr>
          <th>Dew</th>
          <td>{dew_point}°C</td>
        </tr>
        <tr>
          <th></th>
          <td></td>
        </tr>
        <tr>
          <th></th>
          <td></td>
        </tr>
      </tbody>
    </table>
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

export default Daily
