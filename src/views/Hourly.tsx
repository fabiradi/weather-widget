import { useState } from 'react'
import { renderDay, renderTime } from '../utils/time'
import { uvCategoryColor } from '../utils/uvi'
import {
  Line,
  Bar,
  ComposedChart,
  Area,
  XAxis,
  YAxis,
  LabelList,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
  DotProps,
} from 'recharts'

import { HourlyProps, WeatherCondition } from '../OpenWeatherMapProps'
import Weather from '../components/Weather'

const hourlyProps = [
  'dt',
  'temp',
  'feels_like',
  'pressure',
  'humidity',
  'dew_point',
  'weather',
  'uvi',
  'clouds',
  'pop',
  'rain',
  'snow',
  'visibility',
  'wind_speed',
  'wind_deg',
  'wind_gust',
]

const translations: { de: Record<string, string> } = {
  de: {
    temp: 'Temperatur',
    feels_like: 'gefühlte Temp.',
    pressure: 'Luftdruck',
    humidity: 'Luftfeuchtigkeit',
    uvi: 'UV-Index',
    pop: 'Regen?',
  },
}

const Percentage = ({
  value,
  color = '#999',
}: {
  value: number
  color: string
}) => (
  <>
    <div
      style={{ background: color, opacity: value / 100, height: '1em' }}
    ></div>
    <div style={{ fontSize: '75%', color: '#999', textAlign: 'center' }}>
      {value ? `${value.toFixed(0)} %` : undefined}
    </div>
  </>
)

const render = (key: string, row: HourlyProps) => {
  switch (key) {
    case 'dt':
      return renderTime(row?.dt)
    case 'temp':
      return `${row.temp /*.toFixed(2)*/} °C`
    case 'feels_like':
      return `${row.feels_like /*.toFixed(2)*/} °C`
    case 'dew_point':
      return `${row.dew_point /*.toFixed(2)*/} °C`
    case 'pressure':
      return row.pressure //`${value} hPa`
    case 'humidity':
      return `${row.humidity} %`
    case 'clouds':
      return <Percentage value={row.clouds} color="#666" />
    case 'wind_speed':
      return `${row.wind_speed} m/s`
    case 'wind_gust':
      return `${row.wind_gust} m/s`
    case 'wind_deg':
      return `${row.wind_deg} °`
    case 'visibility':
      return `${(row.visibility / 1000).toFixed(0)}km`
    case 'uvi':
      return (
        <div style={{ background: uvCategoryColor(row.uvi) }}>
          {row.uvi.toFixed(2)}
        </div>
      )
    case 'pop':
      //return value ? `${Math.round(value * 100)} %` : "–"
      return (
        row.pop !== undefined && (
          <Percentage value={row.pop * 100} color="#09f" />
        )
      )
    case 'weather':
      return row.weather?.map((item: WeatherCondition, i: number) => (
        <Weather.Tiny key={i} data={item} />
      ))
    case 'rain':
      return row.rain ? `${row.rain['1h']} mm` : ''
    case 'snow':
      return row.snow ? `${row.snow['1h']} mm` : ''
    default:
      return <pre style={{ textAlign: 'left' }}>value for "{key}"?</pre>
  }
}

const Hourly = ({ data }: { data?: HourlyProps[] }) => {
  const [showDetails, setShowDetails] = useState(false)

  const chartdata = data?.map((item, idx, all) => {
    const prevItem = all[idx - 1]
    const nextItem = all[idx + 1]
    const isHigh = item.temp > prevItem?.temp && item.temp > nextItem?.temp
    const isLow = item.temp < prevItem?.temp && item.temp < nextItem?.temp
    const label = `${item.temp.toFixed(0)} °C`

    return {
      ...item,
      //uvi: item.uvi > 0 ? item.uvi : null,
      rain_mm: (item.rain && item.rain['1h']) || 0,
      name: renderTime(item.dt),
      label: isHigh || isLow ? label : '',
    }
  })

  //console.log(chartdata)
  const midnights = chartdata
    ?.map((item, i) => (item.name === '00:00' ? { dt: item.dt, i } : undefined))
    .filter((item) => item?.i)

  return (
    <>
      <h3>
        Hourly (48h){' '}
        <button onClick={() => setShowDetails((s) => !s)}>
          {showDetails ? 'hide details' : 'show details'}
        </button>
      </h3>
      <ComposedChart
        width={390}
        height={250}
        data={chartdata}
        barCategoryGap={1}
      >
        <defs>
          <linearGradient id="colorPop" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#99ccff" stopOpacity={1} />
            <stop offset="100%" stopColor="#99ccff" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorUvi" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#998cff" />
            <stop offset="10%" stopColor="#b54cff" />
            <stop offset="20%" stopColor="#ff0099" />
            <stop offset="30%" stopColor="#d8001d" />
            <stop offset="40%" stopColor="#e9600a" />
            <stop offset="50%" stopColor="#ee8200" />
            <stop offset="60%" stopColor="#f7ad00" />
            <stop offset="70%" stopColor="#fed200" />
            <stop offset="80%" stopColor="#fff200" />
            <stop offset="90%" stopColor="#9bc307" />
            <stop offset="100%" stopColor="#369b28" />
            {/*<stop stopColor="transparent" />*/}
          </linearGradient>
        </defs>

        <XAxis dataKey="name" /*interval={4}*/ axisLine={false} />
        <Tooltip />
        <CartesianGrid />

        {midnights?.map((item, i) => (
          <ReferenceLine
            key={i}
            x={item?.i}
            stroke="#666"
            strokeWidth={2}
            strokeDasharray="10 5"
            label={'' + (item ? renderDay(item.dt) : '')}
          />
        ))}

        <YAxis yAxisId="uvi" dataKey="pop" hide domain={[0, 11]} />
        <Line
          dataKey="uvi"
          yAxisId="uvi"
          dot={<UvDot />}
          //fill="url(#colorUvi)"
          fill="#999"
          fillOpacity={0.15}
          stroke="rgba(0, 0, 0, 0.2)"
          strokeWidth={1}
          type="monotone"
        />

        <YAxis yAxisId="pop" dataKey="pop" hide domain={[0, 1]} />
        <Area
          dataKey="pop"
          yAxisId="pop"
          fill="url(#colorPop)" //fill="#99ccff"
          stroke="#99ccff"
          strokeDasharray="2 4"
        />

        <YAxis yAxisId="rain" dataKey="rain_mm" domain={[0, 10]} hide />
        <Bar dataKey="rain_mm" yAxisId="rain" fill="#3366ff" />

        <YAxis dataKey="temp" hide />
        <Line
          dataKey="dew_point"
          dot={false}
          stroke="#999"
          strokeWidth="2"
          //strokeDasharray="3 2"
          type="natural"
        />
        <Line
          dataKey="temp"
          stroke="#0099ff"
          strokeWidth={3}
          dot={false}
          type="natural"
        >
          <LabelList dataKey="label" position="top" />
        </Line>
        <Line
          dataKey="feels_like"
          dot={false}
          stroke="#0099ff"
          strokeDasharray="3 2"
          type="natural"
        />
      </ComposedChart>

      {showDetails && (
        <table className={'table'}>
          <tbody>
            {/*
          <tr>
            <th>dt</th>
            {data?.map((item, i) => (
              <td key={i}>{renderTime(item.dt)}</td>
            ))}
          </tr>
          */}
            {hourlyProps.map((key) => (
              <tr key={key}>
                <th>{translations.de[key] || key}</th>
                {data?.map((row, idx) => (
                  <td key={idx} className="value">
                    {render(key, row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  )
}

interface PayloadProps extends HourlyProps {
  label: string
}

interface LineDotProps extends DotProps {
  value?: number
  payload?: PayloadProps
}

const UvDot = (props: LineDotProps) => {
  const { cx, cy, r, value } = props

  return (
    <circle
      cx={cx}
      cy={cy}
      r={r ?? 0 * 2}
      stroke="none" //{stroke}
      strokeWidth={1}
      //fill={uvCategory(value[1] || value)} FIXME: Wehen to use array here?
      fill={uvCategoryColor(value || 0)}
    />
  )
}

export default Hourly
