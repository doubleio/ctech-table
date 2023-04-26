export const priceFormat = (format, price, style = 'currency') => {
  return new Intl.NumberFormat({}, {
    style: style,
    currency: price,
  }).format(format)
}
