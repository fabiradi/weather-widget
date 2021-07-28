import { Fragment } from 'react'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone' // dependent on utc plugin
import { renderTime, renderDayShort } from '../utils/time'
import styled from 'styled-components'
import {
  Line,
  ComposedChart,
  Area,
  XAxis,
  YAxis,
  LabelList,
  Tooltip,
  CartesianGrid,
} from 'recharts'

import { DailyProps } from '../OpenWeatherMapProps'
import Weather from '../components/Weather'

dayjs.extend(utc)
dayjs.extend(timezone)

const CombinedDays = ({ data }: { data: DailyProps[] }) => {
  return (
    <Table>
      <tbody>
        <tr>
          <th>Day</th>
          {data?.map((item, i) => (
            <th key={i}>{renderDayShort(item.dt)}</th>
          ))}
        </tr>
        <tr>
          <th>Rise</th>
          {data?.map((item, i) => (
            <td key={i}>{renderTime(item.sunrise)}</td>
          ))}
        </tr>
        <tr>
          <th>Set</th>
          {data?.map((item, i) => (
            <td key={i}>{renderTime(item.sunset)}</td>
          ))}
        </tr>
        <tr>
          <th>
            T.Max<Shy>Min</Shy>
          </th>
          {data?.map((item, i) => (
            <td key={i}>
              {item.temp.max}°C
              <Shy>{item.temp.min}°C</Shy>
            </td>
          ))}
        </tr>
        <tr>
          <th>T.Morn</th>
          {data?.map((item, i) => (
            <td key={i}>
              {item.temp.morn}°C
              <Shy>{item.feels_like.morn}°C</Shy>
            </td>
          ))}
        </tr>
        <tr>
          <th>T.Day</th>
          {data?.map((item, i) => (
            <td key={i}>
              {item.temp.day}°C
              <Shy>{item.feels_like.day}°C</Shy>
            </td>
          ))}
        </tr>
        <tr>
          <th>T.Eve</th>
          {data?.map((item, i) => (
            <td key={i}>
              {item.temp.eve}°C
              <Shy>{item.feels_like.eve}°C</Shy>
            </td>
          ))}
        </tr>
        <tr>
          <th>T.Night</th>
          {data?.map((item, i) => (
            <td key={i}>
              {item.temp.night}°C
              <Shy>{item.feels_like.night}°C</Shy>
            </td>
          ))}
        </tr>
        <tr>
          <th>Press</th>
          {data?.map((item, i) => (
            <td key={i}>{item.pressure}hPa</td>
          ))}
        </tr>
        <tr>
          <th>Hum.</th>
          {data?.map((item, i) => (
            <td key={i}>{item.humidity}%</td>
          ))}
        </tr>
        <tr>
          <th>Dew</th>
          {data?.map((item, i) => (
            <td key={i}>{item.dew_point}°C</td>
          ))}
        </tr>
        <tr>
          <th>Wind Speed</th>
          {data?.map((item, i) => (
            <td key={i}>{item.wind_speed} m/s</td>
          ))}
        </tr>
        <tr>
          <th>Wind Gust</th>
          {data?.map(
            (item, i) => item.wind_gust && <td key={i}>{item.wind_gust} m/s</td>
          )}
        </tr>
        <tr>
          <th>Wind Deg</th>
          {data?.map((item, i) => (
            <td key={i}>{item.wind_deg}°</td>
          ))}
        </tr>
        <tr>
          <th>Clouds</th>
          {data?.map((item, i) => (
            <td key={i}>{item.clouds}%</td>
          ))}
        </tr>
        <tr>
          <th>UVI</th>
          {data?.map((item, i) => (
            <td key={i}>{item.uvi}</td>
          ))}
        </tr>
        <tr>
          <th>Pop</th>
          {data?.map((item, i) => (
            <td key={i}>{(item.pop * 100).toFixed(0)}%</td>
          ))}
        </tr>
        <tr>
          <th>Rain</th>
          {data?.map((item, i) => (
            <td key={i}>{item.rain ? `${item.rain} mm` : ''}</td>
          ))}
        </tr>
        <tr>
          <th>Snow</th>
          {data?.map((item, i) => (
            <td key={i}>{item.snow ? `${item.snow} mm` : ''}</td>
          ))}
        </tr>
        <tr>
          <th>Weather</th>
          {data?.map((item) =>
            item.weather.map((witem, wi) => (
              <td key={wi}>
                <Weather.Small data={witem} showText />
              </td>
            ))
          )}
        </tr>
        <tr>
          <th>Weather</th>
          {data?.map((item) =>
            item.weather.map((witem, wi) => (
              <td key={wi}>
                <Weather.Large data={witem} />
              </td>
            ))
          )}
        </tr>
      </tbody>
    </Table>
  )
}

const Daily = ({ data }: { data?: DailyProps[] }) => {
  const chartdata = data?.map((item, idx, all) => {
    const prevItem = all[idx - 1]
    const nextItem = all[idx + 1]
    const isHigh =
      item.temp.max > prevItem?.temp.max && item.temp.max > nextItem?.temp.max
    const isLow =
      item.temp.max < prevItem?.temp.max && item.temp.max < nextItem?.temp.max
    const labelMax = `${item.temp.max.toFixed(0)} °C`

    return {
      ...item,
      //uvi: item.uvi > 0 ? item.uvi : null,
      // rain_mm: (item.rain && item.rain. item.rain['1h']) || 0,
      // name: renderTime(item.dt),
      labelMax: isHigh || isLow ? labelMax : '',
      //label: label,
      rain: item.rain ?? 0,
    }
  })

  return (
    <>
      <h3>Daily</h3>
      <ComposedChart
        width={600}
        height={250}
        data={chartdata}
        //barCategoryGap={15}
        barSize={20}
      >
        <Tooltip />
        <CartesianGrid />

        <YAxis yAxisId="pop" dataKey="pop" hide domain={[0, 1]} />
        <Area
          dataKey="pop"
          yAxisId="pop"
          //fill="url(#colorPop)" //fill="#99ccff"
          //stroke="#99ccff"
          fill="#99ccff"
          fillOpacity={0.35}
          strokeWidth={0}
          //strokeDasharray="2 4"
          type="monotone"
        />

        <YAxis yAxisId="rain" dataKey="rain" domain={[0, 20]} hide />
        {/* <Bar dataKey="rain" yAxisId="rain" fill="#3366ff" /> */}
        <Area
          dataKey="rain"
          yAxisId="rain"
          fill="#3366ff"
          fillOpacity={0.5}
          type="monotone"
          label={{ fill: '#3366ff', fontSize: 12, position: 'top' }}
        />

        <YAxis dataKey="temp.max" />
        <XAxis
          dataKey="dt"
          tickFormatter={renderDayShort}
          interval={0}
          axisLine={false}
        />
        <Line
          dataKey="dew_point"
          dot={false}
          stroke="#999"
          strokeWidth="2"
          strokeDasharray="3 2"
          type="natural"
        />
        <Line
          dataKey="temp.max"
          stroke="#0099ff"
          strokeWidth={3}
          dot={false}
          type="natural"
        >
          <LabelList dataKey="labelMax" position="top" />
        </Line>
        <Line
          dataKey="temp.min"
          stroke="#cc0000"
          strokeWidth={2}
          dot={false}
          type="natural"
        >
          {' '}
          <LabelList dataKey="labelMin" position="bottom" />
        </Line>
      </ComposedChart>
      {data && <CombinedDays data={data} />}
    </>
  )
}

const Table = styled.table`
  border: 1px solid #000;
  margin-right: 10px;
  border-collapse: collapse;
  white-space: pre;

  & th,
  & td {
    border: 1px solid #999;
    vertical-align: top;
  }
`

const Shy = styled.div`
  color: #999;
  font-size: 90%;
`

export default Daily
