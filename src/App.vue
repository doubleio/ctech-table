<template>
  <div class="table-wrapper">
    <div class="container">
      <div class="table">
        <div class="table__menu">
          <div class="fw-500">Browse other carbon tubes</div>
          <div class="table__tabs">
            <div
              class="table__tabs-item"
              :class="tab === currentTab ? 'active' : ''"
              v-for="tab in tabNames"
              :key="tab"
              @click="tabChange(tab)"
            >
              <img
                src="https://assets.website-files.com/61b8adc853887c7e8a0e1d78/61f300b47dd0687945841ba3_table-square.svg"
                loading="lazy"
                alt=""
                class="table__item-ico"
              />
              <div>{{ tab }}</div>
            </div>
          </div>
          <div class="fw-500">Other links</div>
          <app-links></app-links>
        </div>
        <div class="table__content">
          <div class="table__content-head">
            <div class="table__filters">
              
              <vue-collapsible-panel-group accordion>

                <vue-collapsible-panel class="table__dd" :expanded="false">
                  <template #title>
                    <div class="table__dd-toggle">
                      Wall thickness
                    </div>
                  </template>
                  <template #content class="table__dd-list">
                    <div class="table__dd-list list">
                      <div>From {{ firstSlider.value[0] }} mm to {{ firstSlider.value[1] }} mm</div>

                      <r-slider 
                        v-model="firstSlider.value"
                        :tooltips="false"
                        :lazy="false"
                      ></r-slider>

                      <div class="table__dd-list-values">
                        <div class="table__values-item">
                          <span>min</span>
                          <div>{{ firstSlider.value[0] }} (mm)</div>
                        </div>
                        <div class="table__values-sep"></div>
                        <div class="table__values-item">
                          <span>max</span>
                          <div>{{ firstSlider.value[1] }} (mm)</div>
                        </div>
                      </div>
                      <div class="table__dd-list-btns">
                        <div>Clear</div>
                        <button @click="filterWall" class="btn-primary sm color-white">Apply</button>
                      </div>
                    </div>
                  </template>
                </vue-collapsible-panel>

                <vue-collapsible-panel class="table__dd" :expanded="false">
                  <template #title>
                    <div class="table__dd-toggle">
                      Internal Diameter
                    </div>
                  </template>
                  <template #content class="table__dd-list">
                    <div class="table__dd-list list">
                      Panel A TitlePanel A TitlePanel A TitlePanel A Title
                    </div>
                  </template>
                </vue-collapsible-panel>

                <vue-collapsible-panel class="table__dd" :expanded="false">
                  <template #title>
                    <div class="table__dd-toggle">
                      {{ price }}
                    </div>
                  </template>
                  <template #content class="table__dd-list">
                    <div class="table__dd-list price">
                      <div
                        v-for="key in PriceOptions" 
                        :key="key"
                        class="table__dd-list-txt"
                        @click="setPriceValue(key)"
                      >{{ key }}</div>
                    </div>
                  </template>
                </vue-collapsible-panel>

              </vue-collapsible-panel-group>
            </div>
            <div>
              Showing {{ paginatedData.length }} of
              {{ tableItems ? tableItems.length : '' }} Items
            </div>
          </div>
          <div
            v-if="!isLoading"
            style="display: flex; align-items: center; height: 100%"
          >
            <img
              src="./assets/images/animation_500_kz0e525l.gif"
              alt=""
              style="margin: 0px auto"
            />
          </div>
          <div class="table__content-info" v-else>
            <div class="table__th">
              <div class="table__th-item"><div>Product</div></div>
              <div 
                class="table__th-item sort" 
                @click="sortItems('ID (All)')"
                :class="isChecked('ID (All)') ? 'checked' : ''"
              ><div>Internal Diameter (mm)</div></div>
              <div 
                class="table__th-item sort bottom" 
                :class="isChecked('OD (Wall)') ? 'checked' : ''"
                @click="sortItems('OD (All)')"
              ><div>Wall (mm)</div></div>
              <div 
                class="table__th-item sort bottom" 
                :class="isChecked('Price (NZD)') ? 'checked' : ''"
                @click="sortItems('Price (NZD)')"
              ><div>Price Range/m</div></div>
              <div 
                class="table__th-item sort bottom" 
                :class="isChecked('Weight (All)') ? 'checked' : ''"
                @click="sortItems('Weight (All)')"
              ><div>Weight per meter</div></div>
              <div 
                class="table__th-item center"
              ><div>Action</div></div>
            </div>
            <div class="table__tb">
              <!-- Item -->
              <h1 v-if="!tableItems">loading</h1>
              <div
                v-else
                v-for="item in paginatedData"
                :key="item"
                class="table__tb-item"
              >
                <div class="table__th-item">
                  <div>{{ item['Product Type'] }}</div>
                </div>
                <div class="table__th-item">
                  <div>{{ item['ID (All)'] }}</div>
                </div>
                <div class="table__th-item">
                  <div>{{ item['OD (All)'] }}</div>
                </div>
                <div class="table__th-item">
                  <div>{{ item['Price (NZD)'] }}</div>
                </div>
                <div class="table__th-item">
                  <div>{{ item['Weight (All)'] }}</div>
                </div>
                <div class="table__th-item center btn">
                  <div>{{ item['Action'] }}</div>
                </div>
              </div>
              <!-- /Item -->
            </div>
          </div>
          <app-pagination 
            v-show="paginatedData.length"
            :firstPage="isFirstPage"
            :lastPage="isLastPage"
            :items="tableItems"
            :perPage="perPage"
            :page="page"
            @prevPage="prevPage"
            @nextPage="nextPage"
            @goToPage="goToPage"
          ></app-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import appDdList from './components/appDdList.vue'
import {
  VueCollapsiblePanelGroup,
  VueCollapsiblePanel,
} from '@dafcoe/vue-collapsible-panel'
import VueSelect from 'vue-next-select'
import 'vue-next-select/dist/index.min.css'
import AppPagination from './components/appPagination.vue'
import AppLinks from './components/appLinks.vue'
import rSlider from '@vueform/slider'

export default {
  components: { 
    appDdList, 
    VueSelect, 
    VueCollapsiblePanelGroup, 
    VueCollapsiblePanel,
    AppPagination,
    AppLinks,
    rSlider
  },
  data() {
    return {
      fetchItems: [],
      offset: null,

      tableItems: [],
      tabNames: null,
      currentTab: null,
      currentType: [],
      isLoading: false,

      perPage: 100,
      page: 1,
      isFirstPage: true,
      isLastPage: false,

      firstSlider: {
        value: [0, 100],
        elements: []
      },
      secondSlider: {
        value: [0, 100]
      },

      InternalDiameter: 2,
      price: '$ NZD',
      PriceOptions: ['$ NZD', 'AUD', 'USD', 'EURO']
    }
  },

  created() {
    this.fetchData()
  },

  computed: {
    paginatedData() {
      return this.tableItems.slice(
        (this.page - 1) * this.perPage,
        this.page * this.perPage
      )
    },

    setCurrentTab() {
      if (this.tabNames) {
        this.tabChange(this.tabNames[0])
      }
    },
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

  methods: {
    async fetchData() {
      const api =
        `https://api.airtable.com/v0/appHkRvpA0XNVEQ8f/dmitry_table` +
        '?api_key=keyEP1Ky8tJP7sodr' +
        `&view=Grid%20view` +
        `&offset=${this.offset ? this.offset : ''}`

      const res = await fetch(api, {
        method: 'GET',
      })

      if (res.ok) {
        res.json().then((data) => {
          if (data.offset !== undefined) {
            this.fetchItems.push(data.records)
            this.offset = data.offset
            this.fetchData()
          } else {
            this.fetchItems.push(data.records)
            this.getAllData()
            this.setVal()
            this.getNames()
            this.setCurrentTab
            this.paginatedData
            this.isLoading = true
            return false
          }
        })
      }
    },

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

    getAllData() {
      this.tableItems = [].concat.apply([], this.fetchItems)
      return (this.tableItems = this.tableItems.map((item) => item.fields))
    },

    tabChange(val) {
      this.getAllData()
      const result = this.tableItems.filter(
        (item) => item['Product Type'] == val
      )
      this.tableItems = result
      this.currentTab = val
      this.page = 1
    },

    getNames() {
      let result = this.tableItems.reduce((result, item) => {
        return result.includes(item['Product Type'])
          ? result
          : [...result, item['Product Type']]
      }, [])
      this.tabNames = result
    },

    setVal() {
      this.tableItems.forEach(item => {
        const el = item['OD (All)'].replace(/[^0-9.]/g, '')
        this.firstSlider.elements.push(Math.ceil(Number(el)))
      })
      this.firstSlider.value[0] = Math.min(...this.firstSlider.elements)
      this.firstSlider.value[1] = Math.max(...this.firstSlider.elements)
    },

    isChecked(type) {
      return this.currentType.find(item => item === type)
    },

    sortItems(type) {
      const item = this.currentType.find(item => item === type)
      if (item !== type) {
        this.currentType.push(type)
        return this.tableItems.sort(function(a, b) {
          const aF = a[type]
          const aB = b[type]
          return aF < aB ? 1 : -1
        })
      } else {
        let itemIdx = this.currentType.findIndex(itemName => itemName === type)
        this.currentType.splice(itemIdx, 1)
        return this.tableItems.sort(function(a, b) {
          const aF = a[type]
          const aB = b[type]
          return aF > aB ? 1 : -1
        })
      }
    },

    setPriceValue(val) {
      return this.price = val
    },

    filterWall() {
      const items = this.paginatedData
      const result = items.filter(item => {
        const el = item['OD (All)'].replace(/[^0-9.]/g, '')
        console.log(el)
        return Number(el) >= this.firstSlider.value[0] 
            && Number(el) <= this.firstSlider.value[1]
      })

      return this.tableItems = result
    }
  },
}
</script>
<style>
@import url('@vueform/slider/themes/default.css');
@import url('https://assets.website-files.com/61b8adc853887c7e8a0e1d78/css/ctech-dev.193a29eb4.css');
</style>
