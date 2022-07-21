<template>
  <div class="table__content-head">
    <div class="table__filters">
      <the-accordion ref="accordion">
        <the-accordion-item 
          v-for="slider in sliders" 
          :key="slider"
          :isOpen="slider.isOpen"
          class="table__dd"
        >
          <template v-slot:accordion-head>
            <div class="table__dd-toggle">{{ slider.title }}</div>
          </template>
          <template v-slot:accordion-body>
            <div class="table__dd-list list">
              <div>
                From {{ (slider.value[0]).toFixed(2) }} {{ parameter }} to
                {{ (slider.value[1]).toFixed(2) }} {{ parameter }}
              </div>

              <r-slider
                v-model="slider.value"
                :tooltips="false"
                :lazy="false"
                :max="slider.max"
                :min="slider.min"
                :format="{decimals: 2}"
                :step="slider.step"
              ></r-slider>

              <div class="table__dd-list-values">
                <div class="table__values-item">
                  <span>min</span>
                  <div>{{ (slider.value[0]).toFixed(2) }} ({{ parameter }})</div>
                </div>
                <div class="table__values-sep"></div>
                <div class="table__values-item">
                  <span>max</span>
                  <div>{{ (slider.value[1]).toFixed(2) }} ({{ parameter }})</div>
                </div>
              </div>
              <div class="table__dd-list-btns">
                <div @click="clearFilter()">Clear</div>
                <button
                  @click="setFilter(slider)"
                  class="btn-primary sm color-white"
                >
                  Apply
                </button>
              </div>
            </div>
          </template>
        </the-accordion-item>

        <the-accordion-item class="table__dd price">
          <template v-slot:accordion-head>
            <div class="table__dd-toggle">{{ price }}</div>
          </template>
          <template v-slot:accordion-body>
            <div class="table__dd-list price">
              <div
                class="table__dd-list-txt"
                v-for="key in priceOptions"
                :key="key"
                @click="setPriceVal(key), convertPriceValue()"
              >{{ key }}</div>
            </div>
          </template>
        </the-accordion-item>
      </the-accordion>

      <div class="table__filters-radios-wrapper">
        <div class="table__filters-radios">
          <label class="table__filters-radio" v-for="(item, idx) in convertItems" :key="idx">
            <div
              class="table__filters-radio-check"
              :class="{ 'is-checked': radio === item.value ? true : false }"
            ></div>
            <input
              type="radio"
              name="sort"
              style="display: none;"
              :value="item.value"
              v-model="radio"
              @change="convert"
            />
            <span class="table__radio-label" :for="item.value">{{ item.title1 }}</span>
            <div>{{ item.title2 }}</div>
          </label>
        </div>
      </div>
    </div>

    <div>
      Showing {{ paginatedData.length }} of
      <span class="underline">{{ filterItems.length }} Items</span>
    </div>
  </div>
</template>

<script>
import rSlider from '@vueform/slider'
import TheAccordion from '../Accordion/TheAccordion.vue'
import TheAccordionItem from '../Accordion/TheAccordionItem.vue'
import { mapState, mapWritableState, mapActions } from 'pinia'
import { useStore } from '../../stores/index'

export default {
  components: {
    rSlider,
    TheAccordion,
    TheAccordionItem
  },

  data() {
    return {
      isAccordionOpen: null,
      sliders: [
        {
          title: 'Wall thickness',
          tick: 'Wall',
          value: [0, 100],
          max: 100,
          min: 0,
          step: 0.01
        },
        {
          title: 'Internal Diameter',
          tick: 'IDx',
          value: [0, 100],
          max: 100,
          min: 0,
          step: 1
        },
        {
          title: 'Outside Diameter',
          tick: 'ODx',
          value: [0, 100],
          max: 100,
          min: 0,
          step: 1
        }
      ],

      oldPrice: 'NZD',
      priceOptions: ['NZD', 'AUD', 'USD', 'EUR'],

      radio: '0',
      convertItems: [
        {
          title1: 'Metric',
          title2: 'kg/mm',
          value: '0'
        },
        {
          title1: 'Imperial',
          title2: 'lbs/inches',
          value: '1'
        }
      ]
    }
  },

  mounted() {
    this.setSliderVal()
  },

  watch: {
    currentTab: {
      deep: true,
      handler() {
        this.$refs.accordion.accordion.active = null
        this.setSliderVal()
      }
    }
  },

  computed: {
    ...mapState(useStore, ['paginatedData', 'currentTab']),
    ...mapWritableState(useStore, ['fetchItems', 'filterItems', 'price', 'parameter', 'weight'])
  },

  methods: {
    ...mapActions(useStore, ['handleFilterCategory']),

    setSliderVal() {
      this.sliders.forEach(slider => {
        let min = Math.min.apply(Math, this.filterItems.map(item => item[slider.tick]))
        let max = Math.max.apply(Math, this.filterItems.map(item => item[slider.tick]))

        slider.min = min
        slider.max = max
        slider.value[0] = min
        slider.value[1] = max
      })
    },
  
    setFilter(slider) {
      this.handleFilterCategory()

      const result = this.filterItems.filter((item) => {
        return (
          item[slider.tick]
            >= slider.value[0] &&
          item[slider.tick]
            <= slider.value[1]
        )
      })

      this.$refs.accordion.accordion.active = null

      return this.filterItems = result
    },
  
    clearFilter() {
      this.sliders.forEach(slider => {
        slider.value[0] = slider.min
        slider.value[1] = slider.max
      })
      this.$refs.accordion.accordion.active = null
      this.handleFilterCategory()
    },

    setPriceVal(val) {
      this.oldPrice = this.price
      this.price = val
      this.$refs.accordion.accordion.active = null
    },
  
    async convertPriceValue() {
      await fetch(`https://api.exchangerate.host/convert?from=${this.oldPrice}&to=${this.price}&base=${this.priceOptions}`,
        {
          method: 'GET',
        }
      )
        .then((res) => {
          return res.json()
        })
        .then((data) => {
          const result = [...this.fetchItems].map((el, idx, arr) => {
            return (arr[idx]['Price'] = (
              el['Price'] * data.info.rate
            ).toFixed(2))
          })
          return result
        })
    },
  
    convert() {
      const convertValues = (val) => {
        [...this.fetchItems].map((item) => {
          item['IDx'] = 
            val == true 
              ? (item['IDx'] * 25.4).toExponential(2)
              : (item['IDx'] / 25.4).toExponential(2)
          item['IDy'] = 
            val == true 
              ? (item['IDy'] * 25.4).toExponential(2)
              : (item['IDy'] / 25.4).toExponential(2)
          item['ODx'] = 
            val == true 
              ? (item['ODx'] * 25.4).toExponential(2)
              : (item['ODx'] / 25.4 ).toExponential(2)
          item['ODy'] = 
            val == true 
              ? (item['ODy'] * 25.4).toExponential(2)
              : (item['ODy'] / 25.4 ).toExponential(2)
          item['Wall'] = 
            val == true 
              ? (item['Wall'] * 25.4).toFixed(1)
              : (item['Wall'] / 25.4).toExponential(1)
          item['Carbon_Stiffness'] = 
            val == true 
              ? (item['Carbon_Stiffness'] * 25.4).toExponential(2)
              : (item['Carbon_Stiffness'] / 25.4).toExponential(2)
          item['Weight'] = 
            val == true 
              ? (item['Weight'] / 2.205).toExponential(2)
              : (item['Weight'] * 2.205).toExponential(2)
        })
      }

      if (this.radio === '0') {
        this.parameter = 'mm'
        this.weight = 'kg'
        convertValues(true)
      } else {
        this.parameter = 'in'
        this.weight = 'lb'
        convertValues(false)
      }

      this.$refs.accordion.accordion.active = null
      this.setSliderVal()
    },
  }
}
</script>

<style scoped>
.btn-primary {
  margin: 0;
}
</style>