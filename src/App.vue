<template>
  <div class="table-wrapper">
    <div class="container">
      <div class="table">
        <div class="table__menu">
          <div class="table__menu-col1" v-if="filterItems.length !== 0">
            <div class="fw-700">Select Shape</div>
            <div class="table__menu-items">
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
                  <div 
                    class="table__tabs-item-check" 
                    :style="{ 'opacity': currentTab.find(el => el === tab.product) ? '1' : '0' }"
                  >
                    <check-ico></check-ico>
                  </div>
                </div>
              </div>
              <div class="table__categories">
                <div class="fw-700">Select Laminate type</div>
                <div class="table__categories-wrapper">
                  <div 
                    class="table__tabs-item table__tabs-item--category"
                    v-for="category, idx in categories"
                    :key="idx"
                    :class="categoryTabs.find(el => el === category.patch) ? 'active' : ''"
                    @click="categoryTabChange(category.patch, idx)"
                  >
                    <span 
                      class="table__radio-label-big w-form-label"
                    >{{ category.name }}</span>
                    <div 
                      class="table__tabs-item-check"
                      :style="{ 'opacity': categoryTabs.find(el => el === category.patch) ? '1' : '0' }"
                    >
                      <check-ico></check-ico>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="!isMobile">
            <div class="fw-700">Other links</div>
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
                @clearFilter="handleFilterCategory"
              ></app-filters>

              <div>
                Showing {{ paginatedData.length }} of
                <span class="underline">{{ filterItems.length }} Items</span>
              </div>
            </div>
            <div class="table__content-wrapper">
              <app-sort
                :filterItems="filterItems"
                :parameters="parameters"
              ></app-sort>
              <div class="table__content-info">
                <div class="table__tb">
                  <app-item
                    :data="paginatedData"
                    :currency="price"
                    :parameters="parameters"
                  ></app-item>
                </div>
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
        <div
          class="table__menu"
          v-if="isMobile"
        >
          <div class="fw-700">Other links</div>
            <app-links></app-links>
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
import CheckIco from './components/icons/CheckIco.vue'

export default {
  components: {
    AppPagination,
    AppLinks,
    AppItem,
    AppFilters,
    AppSort,
    AppLoader,
    CheckIco
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

      categories: [
        { name: 'Standard Modulus Laminate', patch: 'Std Modulus Laminate' },
        { name: 'High Modulus Laminate', patch: 'High Modulus Laminate' },
        { name: '100% Cloth Laminate', patch: '100% Cloth Laminate' }
      ],
      categoryTabs: ['Std Modulus Laminate']
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
      this.handleFilterCategory()
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
      this.handleFilterTabs()

      const result = this.filterItems.filter((item) => {
        return this.categoryTabs.includes(item['SCategory'])
      })

      if (result.length === 0) {
        return
      }

      return this.filterItems = result
    },

    handleFilterTabs() {
      this.getAllItems()
      const result = this.filterItems.filter(
        (item) => this.currentTab.includes(item['FCategory'])
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
      this.handleFilterCategory()
    },

    setCurrentTab() {
      const seen = {}
      const result = []
      let j = 0

      for (let i = 0; i < this.filterItems.length; i++) {
        const item = this.filterItems[i]
        const itemType = typeof(item)
        const key = `${itemType}_${item['FCategory']}`

        if (!seen[key]) {
          seen[key] = 1
          result[j++] = {
            'product': item['FCategory'], 
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
          const re = location.pathname !== '/' 
            ? new RegExp(location.pathname.split('/product-type/')[1].split('-carbon-fibre-tube')[0], 'ig') 
            : ''

          if (tabItem.search(re) !== -1 && location.pathname !== '/') {
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