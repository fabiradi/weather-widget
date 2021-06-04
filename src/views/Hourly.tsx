import { renderTime } from "../utils/time"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  ComposedChart,
  Area,
  XAxis,
  YAxis,
  LabelList,
  Tooltip,
  Legend,
  CartesianGrid,
  ReferenceLine,
} from "recharts"

const hourlyProps = [
  "dt",
  "temp",
  "feels_like",
  "pressure",
  "humidity",
  "dew_point",
  "weather",
  "uvi",
  "clouds",
  "pop",
  "rain",
  "snow",
  "visibility",
  "wind_speed",
  "wind_deg",
  "wind_gust",
]

const translations = {
  de: {
    temp: "Temperatur",
    feels_like: "gefühlte Temp.",
    pressure: "Luftdruck",
    humidity: "Luftfeuchtigkeit",
    uvi: "UV-Index",
    pop: "Regen?",
  },
}

const uvCategory = (value) => {
  switch (Math.floor(value)) {
    case 0:
      return "transparent"
    case 1:
      return "#369b28"
    case 2:
      return "#9bc307"
    case 3:
      return "#fff200"
    case 4:
      return "#fed200"
    case 5:
      return "#f7ad00"
    case 6:
      return "#ee8200"
    case 7:
      return "#e9600a"
    case 8:
      return "#d8001d"
    case 9:
      return "#ff0099"
    case 10:
      return "#b54cff"
    case 11:
    default:
      return "#998cff"
  }
}

const Percentage = ({ value, color = "#999" }) => (
  <>
    <div
      style={{ background: color, opacity: value / 100, height: "1em" }}
    ></div>
    <div style={{ fontSize: "75%", color: "#999", textAlign: "center" }}>
      {value ? `${Number.parseInt(value, 10)} %` : null}
    </div>
  </>
)

const render = (key, value) => {
  switch (key) {
    case "dt":
      return renderTime(value)
    case "temp":
    case "feels_like":
    case "dew_point":
      return `${value /*.toFixed(2)*/} °C`
    case "pressure":
      return value //`${value} hPa`
    case "humidity":
      return `${value} %`
    case "clouds":
      return <Percentage value={value} color="#666" />
    case "wind_speed":
    case "wind_gust":
      return `${value} m/s`
    case "wind_deg":
      return `${value} °`
    case "visibility":
      return `${(value / 1000).toFixed(0)}km`
    case "uvi":
      return (
        <div style={{ background: uvCategory(value) }}>{value.toFixed(2)}</div>
      )
    case "pop":
      //return value ? `${Math.round(value * 100)} %` : "–"
      return (
        value !== undefined && <Percentage value={value * 100} color="#09f" />
      )
    case "weather":
      return value?.map((item, i) => (
        <div key={i} style={{ fontSize: "85%", textAlign: "center" }}>
          {item.main}{" "}
          {/*<div style={{ opacity: 0.5 }}>{item.description}</div>*/}
          <div>
            <img
              src={`http://openweathermap.org/img/wn/${item.icon}@2x.png`}
              alt={item.description}
              title={item.description}
              style={{ width: 30, background: "#ccc", borderRadius: 10 }}
            />
          </div>
        </div>
      ))
    case "rain":
    case "snow":
      return value ? `${value?.["1h"]} mm` : ""
    default:
      return (
        <pre style={{ textAlign: "left" }}>
          {JSON.stringify(value, null, 2)}
        </pre>
      )
  }
}

const Hourly = ({ data, current }) => {
  const pivot = {}
  if (data) {
    hourlyProps.forEach((key) => (pivot[key] = []))
    data?.forEach((element) => {
      Object.keys(pivot).forEach((key) => {
        pivot[key].push(element[key])
      })
    })
  }

  const chartdata = data?.map((item, idx, all) => {
    const prevItem = all[idx - 1]
    const nextItem = all[idx + 1]
    const isHigh = item.temp > prevItem?.temp && item.temp > nextItem?.temp
    const isLow = item.temp < prevItem?.temp && item.temp < nextItem?.temp
    const label = `${item.temp.toFixed(0)} °C`

    return {
      ...item,
      //uvi: item.uvi > 0 ? item.uvi : null,
      rain_mm: (item.rain && item.rain["1h"]) || 0,
      name: renderTime(item.dt),
      label: isHigh || isLow ? label : "",
    }
  })

  //console.log(chartdata)
  const midnights = chartdata
    ?.map((item, i) => (item.name === "00:00" ? i : null))
    .filter((item) => item)

  const UvDot = (props) => {
    //console.log(props)
    const { cx, cy, r, value } = props

    return (
      <circle
        cx={cx}
        cy={cy}
        r={r * 2}
        stroke="none" //{stroke}
        strokeWidth={1}
        fill={uvCategory(value[1] || value)}
      />
    )
  }

  return (
    <>
      <h3>Hourly (48h)</h3>
      <pre>
        {renderTime(current?.sunrise)} - {renderTime(current?.sunset)}
      </pre>
      <ComposedChart
        width={800}
        height={300}
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

        <XAxis dataKey="name" interval={6} axisLine={false} />
        <Tooltip />
        <CartesianGrid />

        {midnights?.map((item, i) => (
          <ReferenceLine
            key={i}
            x={item}
            stroke="#666"
            strokeWidth={2}
            strokeDasharray="10 5"
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

        <YAxis dataKey="temp" />
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
      <h3>uvi</h3>
      <BarChart width={300} height={100} data={data} barCategoryGap={1}>
        <Bar dataKey="uvi" />
      </BarChart>

      <table className={"table"}>
        <tbody>
          {pivot &&
            Object.entries(pivot).map(([key, values]) => (
              <tr key={key}>
                <th>{translations.de[key] || key}</th>
                {values?.map((value, idx) => (
                  <td key={idx} className="value">
                    {render(key, value)}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </>
  )
}

export default Hourly
