import { AreaChart, Area, BarChart, Bar } from "recharts"
import SimpleBarGraph from "../components/SimpleBarGraph"
import { MinutelyProps } from "../OpenWeatherMapProps"

const getMax = (arr?: number[]) =>
  arr?.reduce((max, item) => Math.max(max, item), 0) || 0

const getSum = (arr?: number[]) =>
  arr?.reduce((sum, item) => sum + item, 0) || 0

const Minutely = ({ data }: { data?: MinutelyProps[] }) => {
  const max = getMax(data?.map((item) => item.precipitation))
  const sum = getSum(data?.map((item) => item.precipitation))

  return (
    <div>
      <h3>
        Next Hour:{" "}
        <span style={{ color: sum > 0 ? "#c00" : "#090" }}>
          {sum?.toFixed(2)}mm
        </span>{" "}
        {max > 0 && <span style={{ opacity: 0.35 }}>(max: {max}mm)</span>}
      </h3>
      <SimpleBarGraph data={data} />
      <div style={{ display: "flex" }}>
        <AreaChart width={300} height={100} data={data}>
          <Area
            dataKey="precipitation"
            type="monotoneY"
            stroke="#09f"
            fill="#09f"
            fillOpacity={0.35}
          />
        </AreaChart>
        <BarChart width={300} height={100} data={data} barCategoryGap={0}>
          <Bar dataKey="precipitation" fill="#09f" minPointSize={1} />
        </BarChart>
      </div>
    </div>
  )
}

export default Minutely
