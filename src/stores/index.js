import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
  state: () => {
    return {
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
    }
  },

  getters: {
    paginatedData() {
      let tempData = this.filterItems
      tempData = tempData.slice(
        (this.page - 1) * this.perPage,
        this.page * this.perPage
      )
      return tempData
    }
  },

  actions: {
    categoryTabChange(val) {
      let idx = this.categoryTabs.indexOf(val)

      if (idx !== -1) {
        this.categoryTabs.length === 1 ? '' : this.categoryTabs.splice(idx, 1)
      } else {
        this.categoryTabs.push(val)
      }

      this.handleFilterCategory()
    },

    handleFilterCategory() {
      const result = [...this.filterItems].filter((item) => {
        return this.categoryTabs.includes(item['Laminate'])
      })

      if (result.length === 0) {
        return
      }

      return this.filterItems = result
    },

    handleFilterTabs() {
      const result = [...this.fetchItems].filter(
        (item) => this.currentTab.includes(item['Shape'])
      )

      this.filterItems = result
      return this.handleFilterCategory()
    },

    tabChange(val) {
      let idx = this.currentTab.indexOf(val)

      if (idx !== -1) {
        this.currentTab.length === 1 ? '' : this.currentTab.splice(idx, 1)
      } else {
        this.currentTab.push(val)
      }
      
      this.handleFilterTabs()
      this.currentSortType = null
      this.goToPage(1)
    },

    setCurrentTab() {
      this.tabNames = [...new Set(this.fetchItems.map(item => item['Shape']))]
      this.categoryNames = [...new Set(this.fetchItems.map(item => item['Laminate']))]

      sessionStorage.setItem('ProductNames', JSON.stringify(this.tabNames))
      sessionStorage.setItem('CategoryNames', JSON.stringify(this.categoryNames))

      if (this.tabNames.length !== 0) {
        let tab = this.tabNames.filter(el => location.pathname.search(el.toLowerCase()) !== -1)[0] || 'Round'
        this.categoryTabs.push(this.categoryNames[0])
        this.tabChange(tab)
      }

      return sessionStorage.setItem('loaded', true)
    },

    goToPage(numPage) {
      if (numPage === '...') {
        return
      }
      return this.page = numPage
    },
  }
})