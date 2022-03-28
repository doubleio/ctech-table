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
        return this.filterItems.sort(function(a, b) {
          return a[type] < b[type] ? 1 : -1
        })
      } else {
        this.currentSortType = null
        return this.filterItems.sort(function(a, b) {
          return a[type] > b[type] ? 1 : -1
        })
      }
    },

    sortItemsDown(type) {
      if (this.currentSortType !== type) {
        this.currentSortType = type
        return this.filterItems.sort(function(a, b) {
          return a[type] > b[type] ? 1 : -1
        })
      } else {
        this.currentSortType = null
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