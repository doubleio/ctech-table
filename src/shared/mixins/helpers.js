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
    checkMobile() {
      this.isMobile = window.innerWidth <= 768
    }
  }
}