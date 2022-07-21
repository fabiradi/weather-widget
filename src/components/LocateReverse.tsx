import { useEffect, useMemo } from 'react'
import styled from 'styled-components'
import useSWR from 'swr'
import useApiKey from '../hooks/useApiKey'

import { ReverseGeocodingProps } from '../OpenWeatherMapProps'

const BASE_URL = 'https://api.openweathermap.org/geo/1.0/reverse'
interface LocationProps {
  lat: number
  lon: number
}

const fetcher = (url: string) => {
  // console.log('fetcher', { url })
  return fetch(url).then((r) => r.json())
}

const Location = ({ lat, lon }: LocationProps) => {
  const [apiKey] = useApiKey()
  // console.log({ lat, lon, apiKey })
  const url = useMemo(
    () => `${BASE_URL}?lat=${lat}&lon=${lon}&limit=10&appid=${apiKey}`,
    [lat, lon, apiKey]
  )
  const result = useSWR<ReverseGeocodingProps[]>(apiKey ? url : null, fetcher, {
    //refreshInterval: 30 * 60 * 1000, // 30 minutes
    //loadingTimeout: 10 * 1000,
    revalidateOnFocus: false,
    //focusThrottleInterval: 10 * MINUTES,
    shouldRetryOnError: false,
  })

  useEffect(() => {
    console.log('Location', result.data)
  }, [result.data])

  const locationName = result.isValidating ? '...' : result.data?.[0]?.name

  return (
    <Wrapper title={`${lat.toFixed(3)}, ${lon.toFixed(3)}`}>
      {result.isValidating ? <Loading>Loading ...</Loading> : locationName}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: inline-block;
  margin-right: 0.25em;
`

const Loading = styled.span`
  color: #999;
`

export default Location
