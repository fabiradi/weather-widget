type UtcTime = number
export type WeatherCondition = {
  /** Weather condition id */
  id: number
  /** Group of weather parameters (Rain, Snow, Extreme etc.) */
  main: string
  /** Weather condition within the group (full list of weather conditions). Get the output in your language */
  description: string
  /** Weather icon id. How to get icons */
  icon: string
}

export type CurrentProps = {
  /** Current time, Unix, UTC */
  dt: UtcTime
  /** Sunrise time, Unix, UTC */
  sunrise: UtcTime
  /** Sunset time, Unix, UTC */
  sunset: UtcTime
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
    '1h': number
  }
  /** (where available) Snow volume for last hour, mm */
  snow?: {
    '1h': number
  }
  weather: Array<WeatherCondition>
}

export type MinutelyProps = {
  /** Time of the forecasted data, unix, UTC */
  dt: UtcTime
  /** Precipitation volume, mm */
  precipitation: number
}

export type HourlyProps = {
  /** Time of the forecasted data, Unix, UTC */
  dt: UtcTime
  /** Temperature. Units – default: kelvin, metric: Celsius, imperial: Fahrenheit. */
  temp: number
  /** Temperature. This accounts for the human perception of weather. Units – default: kelvin, metric: Celsius, imperial: Fahrenheit. */
  feels_like: number
  /** Atmospheric pressure on the sea level, hPa */
  pressure: number
  /** Humidity, % */
  humidity: number
  /** Atmospheric temperature (varying according to pressure and humidity) below which water droplets begin to condense and dew can form. Units – default: kelvin, metric: Celsius, imperial: Fahrenheit. */
  dew_point: number
  /** UV index */
  uvi: number
  /** Cloudiness, % */
  clouds: number
  /** Average visibility, metres */
  visibility: number
  /** Wind speed. Units – default: metre/sec, metric: metre/sec, imperial: miles/hour.How to change units used */
  wind_speed: number
  /** (where available) Wind gust. Units – default: metre/sec, metric: metre/sec, imperial: miles/hour. How to change units used */
  wind_gust?: number
  /** Wind direction, degrees (meteorological) */
  wind_deg: number
  /** Probability of precipitation */
  pop: number
  rain?: {
    /** (where available) Rain volume for last hour, mm */
    '1h': number
  }
  snow?: {
    /** (where available) Snow volume for last hour, mm */
    '1h': number
  }
  weather: Array<WeatherCondition>
}

export type DailyProps = {
  /** Time of the forecasted data, Unix, UTC */
  dt: UtcTime
  /** Sunrise time, Unix, UTC */
  sunrise: UtcTime
  /** Sunset time, Unix, UTC */
  sunset: UtcTime
  /** The time of when the moon rises for this day, Unix, UTC */
  moonrise: UtcTime
  /** The time of when the moon sets for this day, Unix, UTC */
  moonset: UtcTime
  /** Moon phase
   *
   * - `0` and `1` are 'new moon'
   * - `0.25` is 'first quarter moon'
   * - `0.5` is 'full moon'
   * - 0.75` is 'last quarter moon'
   *
   * The periods in between are called
   * 'waxing crescent',
   * 'waxing gibous',
   * 'waning gibous',
   * and 'waning crescent',
   * respectively.
   * */
  moon_phase: number
  /** Units – default: kelvin, metric: Celsius, imperial: Fahrenheit. How to change units used */
  temp: {
    /** Morning temperature. */
    morn: number
    /** Day temperature. */
    day: number
    /** Evening temperature. */
    eve: number
    /** Night temperature. */
    night: number
    /** Min daily temperature. */
    min: number
    /** Max daily temperature. */
    max: number
  }
  /** This accounts for the human perception of weather. Units – default: kelvin, metric: Celsius, imperial: Fahrenheit. How to change units used */
  feels_like: {
    /** Morning temperature. */
    morn: number
    /** Day temperature. */
    day: number
    /** Evening temperature. */
    eve: number
    /** Night temperature. */
    night: number
  }
  /** Atmospheric pressure on the sea level, hPa */
  pressure: number
  /** Humidity, % */
  humidity: number
  /** Atmospheric temperature (varying according to pressure and humidity) below which water droplets begin to condense and dew can form. Units – default: kelvin, metric: Celsius, imperial: Fahrenheit. */
  dew_point: number
  /** Wind speed. Units – default: metre/sec, metric: metre/sec, imperial: miles/hour. How to change units used */
  wind_speed: number
  /** (where available) Wind gust. Units – default: metre/sec, metric: metre/sec, imperial: miles/hour. How to change units used */
  wind_gust?: number
  /** Wind direction, degrees (meteorological) */
  wind_deg: number
  /** Cloudiness, % */
  clouds: number
  /** The maximum value of UV index for the day */
  uvi: number
  /** Probability of precipitation */
  pop: number
  /** (where available) Precipitation volume, mm */
  rain?: number
  /** (where available) Snow volume, mm */
  snow?: number
  weather: WeatherCondition[]
}

export type AlertsProps = {
  /** Name of the alert source. Please read here the full list of alert sources */
  sender_name: string
  /** Alert event name */
  event: string
  /** Date and time of the start of the alert, Unix, UTC */
  start: UtcTime
  /** Date and time of the end of the alert, Unix, UTC */
  end: UtcTime
  /** Description of the alert */
  description: string
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
  /** Hourly forecast weather data API response */
  hourly: HourlyProps[]
  /** Daily forecast weather data API response */
  daily: DailyProps[]
  /** National weather alerts data from major national weather warning systems */
  alerts: AlertsProps[]
}
