import { useMemo } from 'react'
import styled from 'styled-components'
import useSWR from 'swr'

const ApiKey = '4299d8d17ded7d36f45aaf2d123a24fa'
const BASE_URL = 'https://api.openweathermap.org/geo/1.0/reverse'

type ReverseGeocodingProps = {
  /** Name of the found location */
  name: string
  local_names: {
    /** Internal field */
    ascii: string
    /** Internal field */
    feature_name: string
    /** Name of the found location in different languages. The list of names can be different for different locations. */
    de?: string
    /** Name of the found location in different languages. The list of names can be different for different locations. */
    en?: string
  }[]
  /** Geographical coordinates of the found location (latitude) */
  lat: number
  /** Geographical coordinates of the found location (longitude) */
  lon: number
  /** Country of the found location */
  country: string
  /** (where available) State of the found location */
  state?: string
}

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
