export const pagination = {
  data() {
    return {
      isFirstPage: true,
      isLastPage: false,

      perPage: 100,
      page: 1,
    }
  },

  watch: {
    page(val) {
      val === 1 
        ? this.isFirstPage = true 
        : this.isFirstPage = false
      
      val === Math.ceil(this.tableItems.length / this.perPage)
        ? this.isLastPage = true
        : this.isLastPage = false
    }
  },

  computed: {
    paginatedData() {
      let tempData = this.tableItems
      tempData = tempData.slice(
        (this.page - 1) * this.perPage,
        this.page * this.perPage
      )
      return tempData
    },
  },

  methods: {
    nextPage() {
      if (this.page !== Math.ceil(this.tableItems.length / this.perPage)) {
        this.page += 1
      }
    },

    prevPage() {
      if (this.page !== 1) {
        this.page -= 1
      }
    },

    goToPage(numPage) {
      this.page = numPage
    },
  }
}
