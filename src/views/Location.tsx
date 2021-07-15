import { useMemo } from 'react'
import styled from 'styled-components'
import useSWR from 'swr'

import { ReverseGeocodingProps } from '../OpenWeatherMapProps'

const ApiKey = '4299d8d17ded7d36f45aaf2d123a24fa'
const BASE_URL = 'https://api.openweathermap.org/geo/1.0/reverse'
interface LocationProps {
  lat: number
  lon: number
}

const Location = ({ lat, lon }: LocationProps) => {
  const url = useMemo(
    () => `${BASE_URL}?lat=${lat}&lon=${lon}&limit=10&appid=${ApiKey}`,
    [lat, lon]
  )
  const result = useSWR<ReverseGeocodingProps[]>(url)

  const locationName = result.isValidating ? '...' : result.data?.[0].name

  return (
    <Wrapper title={`${lat.toFixed(3)}, ${lon.toFixed(3)}`}>
      {result.isValidating ? <Loading>Loading ...</Loading> : locationName}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: inline-block;
  /*
  float: right;
  position: absolute;
  top: 30px;
  right: 10px;
  */
`

const Loading = styled.span`
  color: #999;
`

export default Location
