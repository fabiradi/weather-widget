import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone" // dependent on utc plugin

dayjs.extend(utc)
dayjs.extend(timezone)

const renderTime = (ts) =>
  dayjs(ts * 1000)
    .tz("Europe/Berlin")
    .format("HH:mm")

export { renderTime }
