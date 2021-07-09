import { AlertsProps } from '../OpenWeatherMapProps'
import dayjs from 'dayjs'
import styled from 'styled-components'

const Alerts = ({ data }: { data?: AlertsProps[] }) =>
  data ? (
    <div>
      <h3>Alerts</h3>
      {data.map((item, i) => (
        <div key={i}>
          <div>
            <h3>
              {item.event} <Shy>({item.sender_name})</Shy>
            </h3>
            <div>
              {dayjs(item.start).format('YYYY-MM-DD, HH:mm')}{' '}
              <Shy>(until {dayjs(item.end).format('YYYY-MM-DD, HH:mm')})</Shy>
            </div>
            <pre style={{ whiteSpace: 'pre-wrap' }}>{item.description}</pre>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <Shy>No Alerts</Shy>
  )

const Shy = styled.span`
  color: #666;
`

export default Alerts
