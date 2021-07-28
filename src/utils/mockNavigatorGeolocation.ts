// see https://stackoverflow.com/a/67019816/1652629
export const mockNavigatorGeolocation = () => {
  const clearWatchMock = jest.fn()
  const getCurrentPositionMock = jest.fn()
  const watchPositionMock = jest.fn()

  const geolocation = {
    clearWatch: clearWatchMock,
    getCurrentPosition: getCurrentPositionMock,
    watchPosition: watchPositionMock,
  }

  Object.defineProperty(global.navigator, 'geolocation', {
    value: geolocation,
  })

  return { clearWatchMock, getCurrentPositionMock, watchPositionMock }
}
