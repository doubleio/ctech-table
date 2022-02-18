export const sort = {
  data() {
    return {
      currentSortType: null
    }
  },
  
  methods: {
    sortItemsUp(type) {
      if (this.currentSortType !== type) {
        this.currentSortType = type
        return this.tableItems.sort(function(a, b) {
          const firstVal = Math.floor(String(a[type]).replace(/[^0-9]/g, ''))
          const secondVal = Math.floor(String(b[type]).replace(/[^0-9]/g, ''))
          return firstVal < secondVal ? 1 : -1
        })
      } else {
        this.currentSortType = null
        return this.setCurrentTab()
      }
    },

    sortItemsDown(type) {
      if (this.currentSortType !== type) {
        this.currentSortType = type
        return this.tableItems.sort(function(a, b) {
          const firstVal = Math.ceil(String(a[type]).replace(/[^0-9]/g, ''))
          const secondVal = Math.floor(String(b[type]).replace(/[^0-9]/g, ''))
          return firstVal > secondVal ? 1 : -1
        })
      } else {
        this.currentSortType = null
        return this.setCurrentTab()
      }
    },

    sortType(val) {
      if (this.currentSortType === val) {
        return true
      } else {
        return false
      }
    }
  }
}