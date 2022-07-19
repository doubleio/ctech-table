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
                  :class="currentTab.find(el => el === tab) ? 'active' : ''"
                  v-for="tab in tabNames"
                  :key="tab"
                  @click="tabChange(tab, idx)"
                  :data-shape="tab"
                >
                  <div>{{ tab }}</div>
                  <div 
                    class="table__tabs-item-check" 
                    :style="{ 'opacity': currentTab.find(el => el === tab) ? '1' : '0' }"
                  >
                    <check-ico></check-ico>
                  </div>
                </div>
              </div>
              <div class="table__categories" v-if="categoryNames.length !== 0">
                <div class="fw-700">Select Laminate type</div>
                <div class="table__categories-wrapper">
                  <div 
                    class="table__tabs-item table__tabs-item--category"
                    v-for="category, idx in categoryNames"
                    :key="idx"
                    :class="categoryTabs.find(el => el === category) ? 'active' : ''"
                    @click="categoryTabChange(category, idx)"
                  >
                    <span 
                      class="table__radio-label-big w-form-label"
                    >{{ category }}</span>
                    <div 
                      class="table__tabs-item-check"
                      :style="{ 'opacity': categoryTabs.find(el => el === category) ? '1' : '0' }"
                    >
                      <check-ico></check-ico>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <template v-if="!isMobile">
            <app-links></app-links>
          </template>
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
import CheckIco from './components/icons/CheckIco.vue'
import { pagination } from './mixins/pagination'
import { api } from './api/airtable-request'

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
      loadingStatus: false,
      fetchError: false,

      tabNames: null,
      currentTab: [],

      categoryNames: null,
      categoryTabs: [],

      price: 'NZD',
      parameters: {
        'val1': 'mm',
        'val2': 'kg'
      }
    }
  },

  created() {
    this.init()
    sessionStorage.removeItem('loaded')
  },

  mounted() {
    this.getParameters()
  },

  methods: {
    async init() {
      const res = await fetch(api(), {
        method: 'GET',
      })

      if (res.ok) {
        res.json().then((data) => {
          this.fetchItems = data.data
          this.setCurrentTab()
          return this.loadingStatus = true
        })
      } else {
        return this.fetchError = true
      }
    },

    getAllItems() {
      return this.filterItems = this.fetchItems
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
        return this.categoryTabs.includes(item['Laminate'])
      })

      if (result.length === 0) {
        return
      }

      return this.filterItems = result
    },

    handleFilterTabs() {
      this.getAllItems()
      const result = this.filterItems.filter(
        (item) => this.currentTab.includes(item['Shape'])
      )

      return this.filterItems = result
    },

    tabChange(val) {
      this.currentSortType = null

      let idx = this.currentTab.indexOf(val)

      if (idx !== -1) {
        this.currentTab.length === 1 ? '' : this.currentTab.splice(idx, 1)
      } else {
        this.currentTab.push(val)
      }
      
      this.handleFilterTabs()
      this.handleFilterCategory()
      this.goToPage(1)
    },

    setCurrentTab() {
      this.tabNames = [...new Set(this.fetchItems.map(item => item['Shape']))]
      this.categoryNames = [...new Set(this.fetchItems.map(item => item['Laminate']))]

      sessionStorage.setItem('ProductNames', JSON.stringify(this.tabNames))
      sessionStorage.setItem('CategoryNames', JSON.stringify(this.categoryNames))
      
      if (this.tabNames.length > 0) {
        const re = location.pathname !== '/' 
          ? new RegExp(location.pathname.split('/product-type/')[1].split('-carbon-fibre-tube')[0], 'ig') 
          : ''

        const tab = this.tabNames.find(el => el.search(re) !== -1)

        this.categoryTabs.push(this.categoryNames[0])
        tab ? this.tabChange(tab) : this.tabChange(this.tabNames[0])

        return sessionStorage.setItem('loaded', true)
      }
    },
  },
}
</script>