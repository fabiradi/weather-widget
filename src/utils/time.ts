import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone" // dependent on utc plugin

dayjs.extend(utc)
dayjs.extend(timezone)

const renderTime = (ts: number) =>
  dayjs(ts * 1000)
    .tz("Europe/Berlin")
    .format("HH:mm")

const renderDay = (ts: number) =>
  dayjs(ts * 1000)
    .tz("Europe/Berlin")
    .format("ddd, DD.MM.")

const renderDate = (ts: number) =>
  dayjs(ts * 1000)
    .tz("Europe/Berlin")
    .format("DD.MM.")

export { renderTime, renderDate, renderDay }
