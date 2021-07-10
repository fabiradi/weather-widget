import { WeatherCondition } from '../OpenWeatherMapProps'

interface WeatherProps {
  data: WeatherCondition
  showText?: boolean
}

interface AbstractWeatherProps extends WeatherProps {
  size: number
}

const AbstractWeather = ({
  size = 75,
  data,
  showText,
}: AbstractWeatherProps) => {
  return (
    <div
      style={{
        fontSize: '85%',
        textAlign: 'center',
        width: size,
        WebkitHyphens: 'auto',
      }}
    >
      <div>
        <img
          src={`//openweathermap.org/img/wn/${data.icon}@2x.png`}
          alt={data.description}
          title={`${data.description} (${data.main})`}
          style={{ width: size, background: '#ccc', borderRadius: size / 10 }}
        />
      </div>
      {showText && (
        <div style={{ opacity: 0.5, fontSize: `${(size / 75) * 1.25}%` }}>
          {data.description}
        </div>
      )}
    </div>
  )
}

const Tiny = (props: WeatherProps) => <AbstractWeather size={25} {...props} />
const Small = (props: WeatherProps) => <AbstractWeather size={50} {...props} />
const Large = (props: WeatherProps) => <AbstractWeather size={75} {...props} showText />

export default { Tiny, Small, Large }
