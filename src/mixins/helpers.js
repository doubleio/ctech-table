export const helpers = {
  methods: {
    priceFormat(val, price) {
      return new Intl.NumberFormat({}, {
        style: 'currency', 
        currency: price,
      }).format(val)
    }
  }
}