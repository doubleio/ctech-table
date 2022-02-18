<template>
  <div class="table-wrapper">
    <div class="container">
      <div class="table">
        <div class="table__menu">
          <div class="table__menu-col1">
            <div class="fw-500">Browse other carbon tubes</div>
            <div class="table__tabs">
              <div
                class="table__tabs-item"
                :class="tab === currentTab ? 'active' : ''"
                v-for="tab in tabNames"
                :key="tab"
                @click="tabChange(tab)"
              >
                <div>{{ tab }}</div>
              </div>
            </div>
          </div>
          <div>
            <div class="fw-500">Other links</div>
            <app-links></app-links>
          </div>
        </div>
        <div class="table__content">
          <template v-if="tableItems.length !== 0">
            <div class="table__content-head">
              <div class="table__filters">
                <vue-collapsible-panel-group accordion>
                  <vue-collapsible-panel class="table__dd" :expanded="false" ref="dd1">
                    <template #title>
                      <div class="table__dd-toggle">Wall thickness</div>
                    </template>
                    <template #content class="table__dd-list">
                      <div class="table__dd-list list">
                        <div>
                          From {{ firstSlider.value[0] }} mm to
                          {{ firstSlider.value[1] }} mm
                        </div>

                        <r-slider
                          v-model="firstSlider.value"
                          :tooltips="false"
                          :lazy="false"
                          :max="firstSlider.max"
                          :min="firstSlider.min"
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
                          <div @click="resetFilter(firstSlider)">Clear</div>
                          <button
                            @click="filter(firstSlider, 'OD (All)', $refs.dd1)"
                            class="btn-primary sm color-white"
                          >
                            Apply
                          </button>
                        </div>
                      </div>
                    </template>
                  </vue-collapsible-panel>

                  <vue-collapsible-panel class="table__dd" :expanded="false" ref="dd2">
                    <template #title>
                      <div class="table__dd-toggle">Internal Diameter</div>
                    </template>
                    <template #content class="table__dd-list">
                      <div class="table__dd-list list">
                        <div>
                          From {{ secondSlider.value[0] }} mm to
                          {{ secondSlider.value[1] }} mm
                        </div>

                        <r-slider
                          v-model="secondSlider.value"
                          :tooltips="false"
                          :lazy="false"
                          :max="secondSlider.max"
                          :min="secondSlider.min"
                        ></r-slider>

                        <div class="table__dd-list-values">
                          <div class="table__values-item">
                            <span>min</span>
                            <div>{{ secondSlider.value[0] }} (mm)</div>
                          </div>
                          <div class="table__values-sep"></div>
                          <div class="table__values-item">
                            <span>max</span>
                            <div>{{ secondSlider.value[1] }} (mm)</div>
                          </div>
                        </div>
                        <div class="table__dd-list-btns">
                          <div @click="resetFilter(secondSlider)">Clear</div>
                          <button
                            @click="filter(secondSlider, 'ID (All)', $refs.dd2)"
                            class="btn-primary sm color-white"
                          >
                            Apply
                          </button>
                        </div>
                      </div>
                    </template>
                  </vue-collapsible-panel>

                  <vue-collapsible-panel class="table__dd" :expanded="false" ref="dd3">
                    <template #title>
                      <div class="table__dd-toggle">
                        {{ price }}
                      </div>
                    </template>
                    <template #content class="table__dd-list">
                      <div class="table__dd-list price">
                        <div
                          v-for="key in priceOptions"
                          :key="key"
                          class="table__dd-list-txt"
                          @click="setPriceValue(key)"
                        >
                          {{ key }}
                        </div>
                      </div>
                    </template>
                  </vue-collapsible-panel>
                </vue-collapsible-panel-group>

                <div class="table__filters-radios" aria-label="Email Form">
                  <label class="table__filters-radio">
                    <div 
                      class="table__filters-radio-check"
                      :class="{ 'w--redirected-checked': radio === '0' ? true : false }"
                    ></div>
                    <input 
                      type="radio" 
                      data-name="sort" 
                      name="sort" 
                      value="0" 
                      style="opacity:0;position:absolute;z-index:-1"
                      v-model="radio"
                      @change="convert('0')"
                    >
                    <span class="table__radio-label w-form-label" for="0">Metric</span>
                    <div>kg/mm</div>
                  </label>
                  <label class="table__filters-radio">
                    <div 
                      class="table__filters-radio-check"
                      :class="{ 'w--redirected-checked': radio === '1' ? true : false }"
                    ></div>
                    <input 
                      type="radio" 
                      name="sort" 
                      value="1" 
                      data-name="sort" 
                      style="opacity:0;position:absolute;z-index:-1"
                      v-model="radio"
                      @change="convert('1')"
                    >
                    <span class="table__radio-label w-form-label" for="1">Imperial</span>
                    <div>lbs/ft</div>
                  </label>
                </div>
              </div>

              <div>
                Showing {{ paginatedData.length }} of
                {{ tableItems.length }} Items
              </div>
            </div>
            <div class="table__content-info">

              <div class="table__th">
                <div class="table__th-item"><div>Product</div></div>
                <div
                  class="table__th-item sort"
                  :class="sortType('ID (All)') ? 'checked' : ''"
                  @click="sortItemsUp('ID (All)')"
                >
                  <div>Internal Diameter (mm)</div>
                </div>
                <div
                  class="table__th-item sort bottom"
                  :class="sortType('OD (All)') ? 'checked' : ''"
                  @click="sortItemsDown('OD (All)')"
                >
                  <div>Wall (mm)</div>
                </div>
                <div
                  class="table__th-item sort bottom"
                  :class="sortType('Price (NZD)') ? 'checked' : ''"
                  @click="sortItemsDown('Price (NZD)')"
                >
                  <div>Price Range/m</div>
                </div>
                <div
                  class="table__th-item sort bottom"
                  :class="sortType('Weight (All)') ? 'checked' : ''"
                  @click="sortItemsDown('Weight (All)')"
                >
                  <div>Weight per meter</div>
                </div>
                <div class="table__th-item center"><div>Action</div></div>
              </div>

              <div class="table__tb">

                <!-- Item -->
                <template v-if="reportWidth">
                  <div
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
                      <div>{{ priceFormat(item['Price (NZD)'], price) }}</div>
                    </div>
                    <div class="table__th-item">
                      <div>{{ item['Weight (All)'] }}</div>
                    </div>
                    <div class="table__th-item center btn">
                      <div>Get a quote</div>
                    </div>
                  </div>
                </template>
                <!-- /Item -->

                <!-- MobItem -->
                <template v-else>
                  <div 
                    v-for="item in paginatedData"
                    :key="item"
                    class="table__tb-item-mob"
                  >
                    <div class="table__tb-dd">
                      <div class="table__tb-dd-toggle">
                        <div>{{ item['Product Type'] }}</div>
                      </div>
                      <div class="table__tb-dd-list">
                        <div class="table__tb-dd-list-col1">
                          <div class="table__tb-dd-label">ID (mm)</div>
                          <div class="table__tb-dd-label">Wall (mm)</div>
                          <div class="table__tb-dd-label">Price Range/m</div>
                          <div class="table__tb-dd-label">Weight per m</div>
                          </div>
                        <div class="table__tb-dd-list-col2">
                          <div class="table__tb-dd-label">{{ item['ID (All)'] }}</div>
                          <div class="table__tb-dd-label">{{ item['OD (All)'] }}</div>
                          <div class="table__tb-dd-label">{{ priceFormat(item['Price (NZD)'], price) }}</div>
                          <div class="table__tb-dd-label">{{ item['Weight (All)'] }}</div>
                        </div>
                      </div>
                    </div>
                    <div class="table__th-item center btn"><div>Get a quote</div></div>
                  </div>
                </template>
                <!-- /MobItem -->
              </div>
            </div>
            <app-pagination
              v-if="tableItems.length > 100"
              :firstPage="isFirstPage"
              :lastPage="isLastPage"
              :items="tableItems"
              :perPage="perPage"
              :page="page"
              @prevPage="prevPage"
              @nextPage="nextPage"
              @goToPage="goToPage"
            ></app-pagination>
          </template>

          <div v-else style="display: flex; align-items: center; height: 100%">
            <img
              src="./assets/images/animation_500_kz0e525l.gif"
              style="margin: 0px auto"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  VueCollapsiblePanelGroup,
  VueCollapsiblePanel,
} from '@dafcoe/vue-collapsible-panel'
import VueSelect from 'vue-next-select'
import 'vue-next-select/dist/index.min.css'
import rSlider from '@vueform/slider'
import AppPagination from '@/components/AppPagination.vue'
import AppLinks from '@/components/AppLinks.vue'

import { pagination } from './mixins/pagination'
import { helpers } from './mixins/helpers'
import { sort } from './mixins/sort'

export default {
  components: {
    AppPagination,
    AppLinks,
    VueCollapsiblePanelGroup,
    VueCollapsiblePanel,
    VueSelect,
    rSlider,
  },

  mixins: [pagination, helpers, sort],

  data() {
    return {
      fetchItems: [],
      tableItems: [],
      offset: null,

      tabNames: null,
      currentTab: null,

      firstSlider: {
        value: [0, 100],
        max: null,
        min: 0
      },
      secondSlider: {
        value: [0, 100],
        max: null,
        min: 0
      },
      oldPrice: 'NZD',
      price: 'NZD',
      priceOptions: ['NZD', 'AUD', 'USD', 'EUR'],
      priceOptionsRates: null,
      radio: '0'
    }
  },

  async created() {
    this.init()
    sessionStorage.removeItem('loaded')
  },

  computed: {
    reportWidth() {
      if (window.innerWidth > 767) {
        return true
      } else {
        return false
      }
    }
  },

  updated() {
    Webflow.require('ix2')
  },

  methods: {
    async init() {
      const api =
        `https://api.airtable.com/v0/appHkRvpA0XNVEQ8f/dmitry_table` +
        `?api_key=keyEP1Ky8tJP7sodr` +
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
            this.init()
          } else {
            this.fetchItems.push(data.records)
            this.fetchItems = this.fetchItems.reduce((acc, it) => [...acc, ...it], [])
            this.getAllData()
            this.getNames()
            this.setCurrentTab()
            this.setVal(this.firstSlider, 'OD (All)')
            this.setVal(this.secondSlider, 'ID (All)')
            this.paginatedData
            this.convert()
            return false
          }
        })
      }
    },

    getAllData() {
      return this.tableItems = this.fetchItems.map((item) => item.fields)
    },

    tabChange(val) {
      this.getAllData()
      this.resetDd(this.firstSlider, this.secondSlider)
      this.currentSortType = null

      const result = this.tableItems.filter(
        (item) => item['Product Type'] == val
      )

      this.currentTab = val
      this.goToPage(1)

      return (this.tableItems = result)
    },

    setCurrentTab() {
      if (this.tabNames) {
        this.tabChange(this.tabNames[0])
        sessionStorage.setItem('loaded', true)
      }
    },

    getNames() {
      let result = this.tableItems.reduce((result, item) => {
        return result.includes(item['Product Type'])
          ? result
          : [...result, item['Product Type']]
      }, [])
      this.tabNames = result
      sessionStorage.setItem('ProductNames', JSON.stringify(result))
    },

    setVal(slider, val) {
      const elements = []
      this.tableItems.forEach((item) => {
        elements.push(Math.ceil(Number(item[val].replace(/[^0-9.]/g, ''))))
      })
      slider.value[1] = Math.max(...elements)
      slider.max = slider.value[1]
    },

    filter(slider, val, dd) {
      this.getAllData()

      const result = this.tableItems.filter((item) => {
        return (
          Math.ceil(Number(item[val].replace(/[^0-9.]/g, ''))) >= slider.value[0] &&
          Math.ceil(Number(item[val].replace(/[^0-9.]/g, ''))) <= slider.value[1] &&
          item['Product Type'] == this.currentTab
        )
      })

      dd.toggle()

      return this.tableItems = result
    },

    resetDd(dd1, dd2) {
      dd1.value[0] = dd1.min
      dd1.value[1] = dd1.max
      dd2.value[0] = dd2.min
      dd2.value[1] = dd2.max
    },

    resetFilter(slider) {
      this.tabChange(this.currentTab)

      slider.value[0] = slider.min
      slider.value[1] = slider.max
    },

    async setPriceValue(val) {
      this.oldPrice = this.price
      this.price = val

      const currencyRes = await fetch(`https://api.exchangerate.host/convert?from=${this.oldPrice}&to=${this.price}&base=${this.priceOptions}`, {
        method: 'GET',
      })
        .then(res => res.json())
        .then(data => this.priceOptionsRates = data.info.rate)

      if (currencyRes) {
        const values = [...this.fetchItems].map((el, idx, arr) => {
          return arr[idx].fields['Price (NZD)'] = Number(el.fields['Price (NZD)'] * this.priceOptionsRates).toFixed(2)
        })

        return values
      }
    },

    convert() {
      if (this.radio === '0') { 
        const values = [...this.fetchItems].map((el) => {
          if ((el.fields['ID (All)', 'OD (All)'].search(/[^0-9."]/g)) == -1) {
            el.fields['ID (All)'] = Number(el.fields['ID (All)'].replace('"', '') * 25.4).toFixed(1) + 'mm'
            el.fields['OD (All)'] = Number(el.fields['OD (All)'].replace('"', '') * 25.4).toFixed(1) + 'mm'
          }

          if ((el.fields['ID (All)', 'OD (All)'].search(/[^0-9.ft]/g)) == -1) {
            el.fields['ID (All)'] = Number(el.fields['ID (All)'].replace('ft', '') * 305).toFixed(1) + 'mm'
            el.fields['OD (All)'] = Number(el.fields['OD (All)'].replace('ft', '') * 305).toFixed(1) + 'mm'
          }

          if (el.fields['Weight (All)'].search(/[^0-9.lb]/g) == -1) {
            el.fields['Weight (All)'] = Number(el.fields['Weight (All)'].replace('lb', '') / 2.205).toFixed(2) + 'kg'
          }
        })

        return values
      } else {
        const values = [...this.fetchItems].map((el, idx, arr) => {
          if (el.fields['ID (All)'].search(/[^0-9.mm]/g) == -1) {
            el.fields['ID (All)'] = Number(el.fields['ID (All)'].replace('mm', '') / 305).toPrecision(2) + 'ft'
          }

          if (el.fields['OD (All)'].search(/[^0-9.mm]/g) == -1) {
            el.fields['OD (All)'] = Number(el.fields['OD (All)'].replace('mm', '') / 305).toPrecision(2) + 'ft'
          }

          if (el.fields['Weight (All)'].search(/[^0-9.kg]/g) == -1) {
            el.fields['Weight (All)'] = Number(el.fields['Weight (All)'].replace('kg', '') * 2.205).toPrecision(4) + 'lb'
          }

        })

        return values
      }
    }
  },
}
</script>

<style>
@import url('@vueform/slider/themes/default.css');
/* @import url('https://assets.website-files.com/61b8adc853887c7e8a0e1d78/css/ctech-dev.8f4eebdec.css'); */
</style>
