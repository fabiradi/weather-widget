import { AreaChart, Area, BarChart, Bar } from "recharts"
import SimpleBarGraph from "../components/SimpleBarGraph"

const Minutely = ({ data }) => {
  return (
    <>
      <h3>Minutely (2h)</h3>
      <SimpleBarGraph data={data} />
      <div style={{ display: "flex" }}>
        <AreaChart width={300} height={100} data={data}>
          <Area dataKey="precipitation" type="monotone" />
        </AreaChart>
        <BarChart width={300} height={100} data={data} barCategoryGap={1}>
          <Bar dataKey="precipitation" type="monotone" />
        </BarChart>
      </div>
    </>
  )
}

export default Minutely
