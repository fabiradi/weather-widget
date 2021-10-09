const params2query = (obj: Record<string, string | number>) =>
  Object.entries(obj)
    .map((p) => p.join('='))
    .join('&')

export default params2query
