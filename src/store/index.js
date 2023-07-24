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
      const start = (this.page - 1) * this.perPage;
      const end = this.page * this.perPage;
      return this.filterItems.slice(start, end);
    }
  },

  actions: {
    categoryTabChange(val) {
      const idx = this.categoryTabs.indexOf(val);

      if (idx !== -1) {
        if (this.categoryTabs.length === 1) {
          return '';
        }
        this.categoryTabs.splice(idx, 1);
      } else {
        this.categoryTabs.push(val);
      }

      this.handleFilterCategory();
    },

    handleFilterCategory() {
      const result = this.filterItems.filter(item => this.categoryTabs.includes(item['Laminate']));
      this.filterItems = result;
    },

    handleFilterTabs() {
      const result = this.fetchItems.filter(item => this.currentTab.includes(item['Shape']));
      this.filterItems = result;
      this.currentSortType = null;
      this.goToPage(1);
    },

    tabChange(val) {
      const idx = this.currentTab.indexOf(val);

      if (idx !== -1) {
        if (this.currentTab.length === 1) {
          return '';
        }
        this.currentTab.splice(idx, 1);
      } else {
        this.currentTab.push(val);
      }

      this.handleFilterTabs();
      this.currentSortType = null;
      this.goToPage(1);
    },

    setCurrentTab() {
      this.tabNames = [...new Set(this.fetchItems.map(item => item['Shape']))];
      this.categoryNames = [...new Set(this.fetchItems.map(item => item['Laminate']))];

      sessionStorage.setItem('ProductNames', JSON.stringify(this.tabNames));
      sessionStorage.setItem('CategoryNames', JSON.stringify(this.categoryNames));

      if (this.tabNames.length !== 0) {
        const tab = this.tabNames.find(el => location.pathname.search(el.toLowerCase()) !== -1) || 'Round';
        this.categoryTabs.push(this.categoryNames[0]);
        this.tabChange(tab);
      }

      sessionStorage.setItem('loaded', true)
    },

    goToPage(numPage) {
      if (numPage !== '...') {
        this.page = numPage;
      }
    },
  }
})