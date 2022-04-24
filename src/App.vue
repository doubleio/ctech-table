<template>
  <div class="table-wrapper">
    <div class="container">
      <div class="table">
        <div class="table__menu">
          <div class="table__menu-col1" v-if="filterItems.length !== 0">
            <div class="fw-500">Browse other carbon tubes</div>
            <div class="table__tabs">
              <div
                class="table__tabs-item"
                :class="currentTab.find(el => el === tab.product) ? 'active' : ''"
                v-for="tab in tabNames"
                :key="tab"
                @click="tabChange(tab.product, idx)"
                :data-shape="tab.shape"
              >
                <div>{{ tab.product }}</div>
              </div>
            </div>
          </div>
          <div>
            <div class="fw-500">Other links</div>
            <app-links></app-links>
          </div>
        </div>
        <div class="table__content">
          <template v-if="filterItems.length !== 0">
            <div class="table__content-head">
              <app-filters
                :fetchData="fetchItems"
                :tItems="filterItems"
                :loading="loadingStatus"
                :cTab="currentTab"
                @updatePrice="getPrice"
                @setFilter="handleFilterValues"
                @parameters="getParameters"
                @clearFilter="handleFilterTabs"
              ></app-filters>

              <div>
                Showing {{ paginatedData.length }} of
                {{ filterItems.length }} Items
              </div>
            </div>
            <div class="table__content-info">

              <app-sort
                :filterItems="filterItems"
                :parameters="parameters"
              ></app-sort>

              <div class="table__tb">
                <app-item
                  :data="paginatedData"
                  :currency="price"
                  :parameters="parameters"
                ></app-item>
              </div>
            </div>
            <app-pagination
              v-if="filterItems.length > 100"
              :firstPage="isFirstPage"
              :lastPage="isLastPage"
              :items="filterItems"
              :perPage="perPage"
              :page="page"
              @prevPage="prevPage"
              @nextPage="nextPage"
              @goToPage="goToPage"
              ref="paginationItem"
            ></app-pagination>
          </template>

          <app-loader v-else></app-loader>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppPagination from '@/components/AppPagination.vue'
import AppLinks from '@/components/AppLinks.vue'
import AppItem from '@/components/AppItem.vue'
import AppFilters from '@/components/AppFilters.vue'
import AppSort from '@/components/AppSort.vue'
import AppLoader from '@/components/AppLoader.vue'

import { pagination } from './mixins/pagination'
import { api } from './api/airtable-request'

export default {
  components: {
    AppPagination,
    AppLinks,
    AppItem,
    AppFilters,
    AppSort,
    AppLoader
  },

  mixins: [pagination],

  data() {
    return {
      fetchItems: [],
      filterItems: [],
      offset: null,
      loadingStatus: false,

      tabNames: null,
      currentTab: [],

      price: 'NZD',
      parameters: {
        'val1': 'mm',
        'val2': 'kg'
      },
    }
  },

  async created() {
    this.init()
    sessionStorage.removeItem('loaded')
  },

  mounted() {
    this.getParameters()
  },

  methods: {
    async init() {
      const res = await fetch(api(this.offset), {
        method: 'GET',
      })

      if (res.ok) {
        res.json().then((data) => {
          if (data.offset !== undefined) {
            this.fetchItems.push(data.records)
            this.offset = data.offset
            this.init()
          } else {
            this.fetchItems.push(data.records)
            this.fetchItems = this.fetchItems.reduce((acc, it) => [...acc, ...it], [])
            this.getAllItems()
            this.setCurrentTab()
            return this.loadingStatus = true
          }
        })
      } else {
        alert('Something went wrong, reload the page')
      }
    },

    getAllItems() {
      return this.filterItems = this.fetchItems.map((item) => item.fields)
    },

    getPrice(value) {
      this.price = value
    },

    getParameters(data) {
      if (data !== undefined) {
        this.parameters = data
      } else {
        return
      }
    },

    handleFilterValues(e) {
      this.handleFilterTabs()
      const slider = e.slider
      const sliderValue = e.slider.tick

      const result = this.filterItems.filter((item) => {
        return (
          item[sliderValue]
            >= slider.value[0] &&
          item[sliderValue]
            <= slider.value[1]
        )
      })

      return this.filterItems = result
    },

    handleFilterTabs() {
      this.getAllItems()
      const result = this.filterItems.filter(
        (item) => this.currentTab.includes(item['Product'])
      )

      return this.filterItems = result
    },

    tabChange(val) {
      this.goToPage(1)
      this.currentSortType = null

      let idx = this.currentTab.indexOf(val)

      if (idx !== -1) {
        this.currentTab.length === 1 ? '' : this.currentTab.splice(idx, 1)
      } else {
        this.currentTab.push(val)
      }
      
      this.handleFilterTabs()
    },

    setCurrentTab() {
      const seen = {}
      const result = []
      let j = 0

      for (let i = 0; i < this.filterItems.length; i++) {
        const item = this.filterItems[i]
        const itemType = typeof(item)
        const key = `${itemType}_${item['Product']}`

        if (!seen[key]) {
          seen[key] = 1
          result[j++] = {
            'product': item['Product'], 
            'shape': item['Shape']
          }
        }
      }

      this.tabNames = result
      sessionStorage.setItem('ProductNames', JSON.stringify(result))
      
      if (result.length > 0) {
        sessionStorage.setItem('loaded', true)
        this.tabNames.forEach((el) => {
          const tabItem = el.shape
          const re = new RegExp(location.pathname.split('/product-type/')[1].split('-tube')[0], 'ig')

          if (tabItem.search(re) !== -1) {
            this.tabChange(el.product)
          } else {
            this.tabChange(this.tabNames[0].product)
          }
        })
      }
    },
  },
}
</script>

<style>
@import url('https://assets.website-files.com/61b8adc853887c7e8a0e1d78/css/ctech-dev.3236b9fe5.css');
</style>
