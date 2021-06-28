import { WeatherCondition } from '../OpenWeatherMapProps'

const Small = ({ data }: { data: WeatherCondition }) => (
  <div style={{ fontSize: '85%', textAlign: 'center' }}>
    {data.main}
    {/*
    <div style={{ opacity: 0.5 }}>{data.description}</div>
    */}
    <div>
      <img
        src={`http://openweathermap.org/img/wn/${data.icon}@2x.png`}
        alt={data.description}
        title={data.description}
        style={{ width: 30, background: '#ccc', borderRadius: 10 }}
      />
    </div>
  </div>
)

const Large = ({ data }: { data: WeatherCondition }) => (
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
