import { MinutelyProps } from './OpenWeatherMapProps'

const minutely: MinutelyProps[] = [
  0, 0, 1, 3, 1, 15, 5, 43, 34, 19, 17, 12, 6, 3, 2, 1, 0, 0, 2, 3, 5, 6, 9, 7,
  8, 6, 5, 2, 3, 2, 1, 0, 9, 0, 0, 0, 0, 9, 12, 23, 43, 42, 42, 41, 39, 37, 32,
  29, 27, 21, 17, 15, 13, 11, 9, 2, 5, 8, 7, 3, 4,
].map((item, i) => ({ dt: 1622190088 + i * 100, precipitation: item / 100 }))

export default { minutely }
