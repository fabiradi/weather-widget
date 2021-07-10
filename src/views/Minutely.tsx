import { AreaChart, Area, BarChart, Bar } from 'recharts'
//import SimpleBarGraph from '../components/SimpleBarGraph'
import { MinutelyProps } from '../OpenWeatherMapProps'

const WIDTH = 150

const getMax = (arr?: number[]) =>
  arr?.reduce((max, item) => Math.max(max, item), 0) || 0

const getSum = (arr?: number[]) =>
  arr?.reduce((sum, item) => sum + item, 0) || 0

const Minutely = ({ data }: { data?: MinutelyProps[] }) => {
  const max = getMax(data?.map((item) => item.precipitation))
  const sum = getSum(data?.map((item) => item.precipitation))

  return (
    <div>
      <div>
        Next Hour:{' '}
        <span style={{ color: sum > 0 ? '#c00' : '#090' }}>
          {sum?.toFixed(2)}mm
        </span>{' '}
        {max > 0 && <span style={{ opacity: 0.35 }}>(max: {max}mm)</span>}
      </div>
      {/* <SimpleBarGraph data={data} /> */}
      {/* <div style={{ display: 'flex' }}> */}
      <AreaChart width={WIDTH} height={100} data={data}>
        <Area
          dataKey="precipitation"
          type="monotoneY"
          stroke="#09f"
          fill="#09f"
          fillOpacity={0.35}
        />
      </AreaChart>
      <BarChart width={WIDTH} height={100} data={data} barCategoryGap={0}>
        <Bar dataKey="precipitation" fill="#09f" minPointSize={1} />
      </BarChart>
      {/* </div> */}
    </div>
  )
}

export default Minutely
