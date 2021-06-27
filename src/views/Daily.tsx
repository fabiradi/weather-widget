import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone' // dependent on utc plugin
import { renderTime, renderDay } from '../utils/time'

dayjs.extend(utc)
dayjs.extend(timezone)

type TimeStamp = number

type DailyProps = {
  /** Time of the forecasted data, Unix, UTC */
  dt: TimeStamp
  /** Sunrise time, Unix, UTC */
  sunrise: TimeStamp
  /** Sunset time, Unix, UTC */
  sunset: TimeStamp
  /** The time of when the moon rises for this day, Unix, UTC */
  moonrise: number
  /** The time of when the moon sets for this day, Unix, UTC */
  moonset: number
  /** Moon phase
   *
   * - `0` and `1` are 'new moon'
   * - `0.25` is 'first quarter moon'
   * - `0.5` is 'full moon'
   * - 0.75` is 'last quarter moon'
   *
   * The periods in between are called
   * 'waxing crescent',
   * 'waxing gibous',
   * 'waning gibous',
   * and 'waning crescent',
   * respectively.
   * */
  moon_phase: number
  /** Units – default: kelvin, metric: Celsius, imperial: Fahrenheit. How to change units used */
  temp: {
    /** Morning temperature. */
    morn: number
    /** Day temperature. */
    day: number
    /** Evening temperature. */
    eve: number
    /** Night temperature. */
    night: number
    /** Min daily temperature. */
    min: number
    /** Max daily temperature. */
    max: number
  }
  feels_like: {
    /** Morning temperature. */
    morn: number
    /** Day temperature. */
    day: number
    /** Evening temperature. */
    eve: number
    /** Night temperature. */
    night: number
  }
  /** Atmospheric pressure on the sea level, hPa */
  pressure: number
  /** Humidity, % */
  humidity: number
  /** Atmospheric temperature (varying according to pressure and humidity) below which water droplets begin to condense and dew can form. Units – default: kelvin, metric: Celsius, imperial: Fahrenheit. */
  dew_point: number
}

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
    <table border="1" style={{ marginRight: 10 }}>
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

const Daily = ({ data }: { data: DailyProps[] }) => {
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
