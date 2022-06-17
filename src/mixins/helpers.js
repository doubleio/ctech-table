export const helpers = {
  data() {
    return {
      isMobile: false,
    }
  },

  mounted() {
    this.checkMobile()
    window.addEventListener('resize', () => this.checkMobile())
  },

  methods: {
    priceFormat(val, price) {
      return new Intl.NumberFormat({}, {
        style: 'currency', 
        currency: price,
      }).format(val)
    },

    checkMobile() {
      if (window.innerWidth <= 768) {
        return this.isMobile = true
      }
      return this.isMobile = false
    }
  }
}