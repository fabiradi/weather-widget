import { WeatherCondition } from '../OpenWeatherMapProps'
import { Wrapper, Description, Image } from './Weather.styles'

interface WeatherProps {
  data: WeatherCondition
  showText?: boolean
}

interface AbstractProps extends WeatherProps {
  size: number
}

const AbstractWeather = ({ size = 75, data, showText }: AbstractProps) => {
  //const imageSrc = `//openweathermap.org/img/wn/${data.icon}@2x.png`
  const imageSrc = process.env.PUBLIC_URL + `/wn/${data.icon}.png`
  const text = `${data.description} (${data.main})`

  return (
    <Wrapper size={size}>
      <Image src={imageSrc} alt={text} title={text} size={size} />
      {showText && <Description size={size}>{data.description}</Description>}
    </Wrapper>
  )
}

const Tiny = (props: WeatherProps) => <AbstractWeather size={25} {...props} />
const Small = (props: WeatherProps) => <AbstractWeather size={50} {...props} />
const Large = (props: WeatherProps) => (
  <AbstractWeather size={75} {...props} showText />
)

export default { Tiny, Small, Large }
