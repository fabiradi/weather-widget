import { WeatherCondition } from '../OpenWeatherMapProps'

interface SmallProps {
  data: WeatherCondition
  showText?: boolean
}

interface LargeProps {
  data: WeatherCondition
}

const Small = ({ data, showText }: SmallProps) => (
  <div
    style={{
      fontSize: '85%',
      textAlign: 'center',
      width: 50,
      WebkitHyphens: 'auto',
    }}
  >
    {/* {data.main} */}
    <div>
      <img
        src={`http://openweathermap.org/img/wn/${data.icon}@2x.png`}
        alt={data.description}
        title={`${data.description} (${data.main})`}
        style={{ width: 50, background: '#ccc', borderRadius: 10 }}
      />
    </div>
    {showText && (
      <div style={{ opacity: 0.5, fontSize: '80%' }}>{data.description}</div>
    )}
  </div>
)

const Large = ({ data }: LargeProps) => (
  <div style={{ fontSize: '85%', textAlign: 'center' }} title={data.main}>
    <div>
      <img
        src={`http://openweathermap.org/img/wn/${data.icon}@2x.png`}
        alt={data.description}
        title={data.description}
        style={{ width: 75, background: '#ccc', borderRadius: 10 }}
      />
    </div>
    <div style={{ opacity: 0.5 }}>{data.description}</div>
  </div>
)

export default { Small, Large }
