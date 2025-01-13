import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
  state: () => ({
    fetchItems: [],
    filterItems: [],
    loadingStatus: false,
    fetchError: false,

    tabNames: null,
    currentTab: [],

    categoryNames: null,
    categoryTabs: [],

    price: 'NZD',
    parameter: 'mm',
    weight: 'kg',

    isFirstPage: true,
    isLastPage: false,
    perPage: 100,
    page: 1,

    currentSortType: null,

    isFilterChanged: false
  }),

  getters: {
    paginatedData() {
      const start = (this.page - 1) * this.perPage
      const end = this.page * this.perPage
      return this.filterItems.slice(start, end)
    }
  },

  actions: {
    handleFilter() {
      this.isFilterChanged = true

      const result = this.fetchItems.filter(item => {
        const shapeMatch = !this.currentTab.length || this.currentTab.includes(item.Shape)
        const laminateMatch = !this.categoryTabs.length || this.categoryTabs.includes(item.Laminate)
        return shapeMatch && laminateMatch
      })

      this.filterItems = result
      this.currentSortType = null
      this.goToPage(1)

      setTimeout(() => {
        this.isFilterChanged = false
      }, 500)
    },

    categoryTabChange(val) {
      const idx = this.categoryTabs.indexOf(val)
      if (idx !== -1) {
        if (this.categoryTabs.length === 1) return
        this.categoryTabs.splice(idx, 1)
      } else {
        this.categoryTabs.push(val)
      }

      this.handleFilter()
    },

    tabChange(val) {
      const idx = this.currentTab.indexOf(val)
      if (idx !== -1) {
        if (this.currentTab.length === 1) return
        this.currentTab.splice(idx, 1)
      } else {
        this.currentTab.push(val)
      }

      this.handleFilter()
    },

    setCurrentTab() {
      this.tabNames = [...new Set(this.fetchItems.map(item => item.Shape))]
      this.categoryNames = [...new Set(this.fetchItems.map(item => item.Laminate))]

      sessionStorage.setItem('ProductNames', JSON.stringify(this.tabNames))
      sessionStorage.setItem('CategoryNames', JSON.stringify(this.categoryNames))

      if (this.tabNames.length) {
        const tab = this.tabNames.find(el => location.pathname.includes(el.toLowerCase())) || 'Round'
        this.categoryTabs.push(this.categoryNames[0])
        this.tabChange(tab)
      }

      sessionStorage.setItem('loaded', true)
    },

    goToPage(numPage) {
      if (numPage !== '...') {
        this.page = numPage
      }
    }
  }
})
