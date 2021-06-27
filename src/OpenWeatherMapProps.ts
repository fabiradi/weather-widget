export type CurrentProps = {
  /** Current time, Unix, UTC */
  dt: number
  /** Sunrise time, Unix, UTC */
  sunrise: number
  /** Sunset time, Unix, UTC */
  sunset: number
  /** Temperature. Units - default: kelvin, metric: Celsius, imperial: Fahrenheit. How to change units used */
  temp: number
  /** Temperature. This temperature parameter accounts for the human perception of weather. Units – default: kelvin, metric: Celsius, imperial: Fahrenheit. */
  feels_like: number
  /** Atmospheric pressure on the sea level, hPa */
  pressure: number
  /** Humidity, % */
  humidity: number
  /** Atmospheric temperature (varying according to pressure and humidity) below which water droplets begin to condense and dew can form. Units – default: kelvin, metric: Celsius, imperial: Fahrenheit. */
  dew_point: number
  /** Cloudiness, % */
  clouds: number
  /** Current UV index */
  uvi: number
  /** Average visibility, metres */
  visibility: number
  /** Wind speed. Wind speed. Units – default: metre/sec, metric: metre/sec, imperial: miles/hour. How to change units used */
  wind_speed: number
  /** (where available) Wind gust. Units – default: metre/sec, metric: metre/sec, imperial: miles/hour. How to change units used */
  wind_gust?: number
  /** Wind direction, degrees (meteorological) */
  wind_deg: number
  rain?: {
    /** (where available) Rain volume for last hour, mm */
    "1h": number
  }
  /** (where available) Snow volume for last hour, mm */
  snow?: {
    "1h": number
  }
  weather: Array<{
    /** Weather condition id */
    id: number
    /** Group of weather parameters (Rain, Snow, Extreme etc.) */
    main: string
    /** Weather condition within the group (full list of weather conditions). Get the output in your language */
    description: string
    /** Weather icon id. How to get icons */
    icon: string
  }>
}

export type MinutelyProps = {
  /** Time of the forecasted data, unix, UTC */
  dt: number
  /** Precipitation volume, mm */
  precipitation: number
}

export type OpenWeatherMapOneCallProps = {
  /** Geographical coordinates of the location (latitude) */
  lat: number
  /** Geographical coordinates of the location (longitude) */
  lon: number
  /** Timezone name for the requested location */
  timezone: string
  /** Shift in seconds from UTC */
  timezone_offset: number
  /**  */
  current: CurrentProps
  /** Minute forecast weather data API response */
  minutely: MinutelyProps[]
}
