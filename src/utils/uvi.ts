const uvCategoryColor = (value: number, transparentColor?: string) => {
  switch (Math.floor(value)) {
    case 0:
      return transparentColor || 'transparent'
    case 1:
      return '#369b28'
    case 2:
      return '#9bc307'
    case 3:
      return '#fff200'
    case 4:
      return '#fed200'
    case 5:
      return '#f7ad00'
    case 6:
      return '#ee8200'
    case 7:
      return '#e9600a'
    case 8:
      return '#d8001d'
    case 9:
      return '#ff0099'
    case 10:
      return '#b54cff'
    case 11:
    default:
      return '#998cff'
  }
}

export { uvCategoryColor }
