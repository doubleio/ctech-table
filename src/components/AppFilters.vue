<template>
  <div class="table__filters">
    <vue-collapsible-panel-group accordion>
      <vue-collapsible-panel class="table__dd" :expanded="false" ref="dd1">
        <template #title>
          <div class="table__dd-toggle">Wall thickness</div>
        </template>
        <template #content class="table__dd-list">
          <div class="table__dd-list list">
            <div>
              From {{ (wallSlider.value[0]).toFixed(2) }} {{ parameter }} to
              {{ (wallSlider.value[1]).toFixed(2) }} {{ parameter }}
            </div>

            <r-slider
              v-model="wallSlider.value"
              :tooltips="false"
              :lazy="false"
              :max="wallSlider.max"
              :min="wallSlider.min"
              :format="{decimals: 2}"
              :step="0.01"
            ></r-slider>

            <div class="table__dd-list-values">
              <div class="table__values-item">
                <span>min</span>
                <div>{{ (wallSlider.value[0]).toFixed(2) }} ({{ parameter }})</div>
              </div>
              <div class="table__values-sep"></div>
              <div class="table__values-item">
                <span>max</span>
                <div>{{ (wallSlider.value[1]).toFixed(2) }} ({{ parameter }})</div>
              </div>
            </div>
            <div class="table__dd-list-btns">
              <div @click="clearFilter(wallSlider, IDSlider, ODSlider)">Clear</div>
              <button
                @click="setFilter(wallSlider, $refs.dd1)"
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
              From {{ (IDSlider.value[0]).toFixed(2) }} {{ parameter }} to
              {{ (IDSlider.value[1]).toFixed(2) }} {{ parameter }}
            </div>

            <r-slider
              v-model="IDSlider.value"
              :tooltips="false"
              :lazy="false"
              :max="IDSlider.max"
              :min="IDSlider.min"
            ></r-slider>

            <div class="table__dd-list-values">
              <div class="table__values-item">
                <span>min</span>
                <div>{{ (IDSlider.value[0]).toFixed(2) }} ({{ parameter }})</div>
              </div>
              <div class="table__values-sep"></div>
              <div class="table__values-item">
                <span>max</span>
                <div>{{ (IDSlider.value[1]).toFixed(2) }} ({{ parameter }})</div>
              </div>
            </div>
            <div class="table__dd-list-btns">
              <div @click="clearFilter(wallSlider, IDSlider, ODSlider)">Clear</div>
              <button
                @click="setFilter(IDSlider, $refs.dd2)"
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
          <div class="table__dd-toggle">Outside Diameter</div>
        </template>
        <template #content class="table__dd-list">
          <div class="table__dd-list list">
            <div>
              From {{ (ODSlider.value[0]).toFixed(2) }} {{ parameter }} to
              {{ (ODSlider.value[1]).toFixed(2) }} {{ parameter }}
            </div>

            <r-slider
              v-model="ODSlider.value"
              :tooltips="false"
              :lazy="false"
              :max="ODSlider.max"
              :min="ODSlider.min"
            ></r-slider>

            <div class="table__dd-list-values">
              <div class="table__values-item">
                <span>min</span>
                <div>{{ ODSlider.value[0] }} ({{ parameter }})</div>
              </div>
              <div class="table__values-sep"></div>
              <div class="table__values-item">
                <span>max</span>
                <div>{{ ODSlider.value[1] }} ({{ parameter }})</div>
              </div>
            </div>
            <div class="table__dd-list-btns">
              <div @click="clearFilter(wallSlider, IDSlider, ODSlider)">Clear</div>
              <button
                @click="setFilter(ODSlider, $refs.dd3)"
                class="btn-primary sm color-white"
              >
                Apply
              </button>
            </div>
          </div>
        </template>
      </vue-collapsible-panel>

      <vue-collapsible-panel class="table__dd price" :expanded="false" ref="dd4">
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
              @click="setPriceVal(key), convertPriceValue()"
            >
              {{ key }}
            </div>
          </div>
        </template>
      </vue-collapsible-panel>
    </vue-collapsible-panel-group>

    <div class="table__filters-radios-wrapper">
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
            style="opacity: 0; position: absolute; z-index: -1"
            v-model="radio"
            @change="convert"
          />
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
            style="opacity: 0; position: absolute; z-index: -1"
            v-model="radio"
            @change="convert"
          />
          <span class="table__radio-label w-form-label" for="1">Imperial</span>
          <div>lbs/inches</div>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import {
  VueCollapsiblePanelGroup,
  VueCollapsiblePanel,
} from '@dafcoe/vue-collapsible-panel'
import rSlider from '@vueform/slider'

export default {
  components: {
    VueCollapsiblePanelGroup,
    VueCollapsiblePanel,
    rSlider
  },

  props: {
    fetchData: {
      type: Array
    },
    tItems: {
      type: Array
    },
    loading: {
      type: Boolean
    },
    cTab: {
      type: Array
    }
  },

  emits: [
    'updatePrice', 
    'setFilter', 
    'clearFilter', 
    'parameters'
  ],

  data() {
    return {
      wallSlider: {
        tick: 'Wall',
        value: [0, 100],
        max: null,
        min: 0,
      },
      IDSlider: {
        tick: 'IDx',
        value: [0, 100],
        max: null,
        min: 0,
      },
      ODSlider: {
        tick: 'ODx',
        value: [0, 100],
        max: null,
        min: 0,
      },

      oldPrice: 'NZD',
      price: 'NZD',
      priceOptions: ['NZD', 'AUD', 'USD', 'EUR'],
      radio: '0',

      parameter: 'mm',
      weight: 'kg'
    }
  },

  mounted() {
    if (this.$props.loading) {
      this.setAllValues()
    }
  },

  updated() {
    if (this.$refs.dd1.isExpanded) {
      this.$refs.dd1.toggle()
    } else if (this.$refs.dd2.isExpanded) {
      this.$refs.dd2.toggle()
    }
  },

  watch: {
    cTab: {
      deep: true,
      handler() {
        setTimeout(() => {this.setAllValues()}, 100)
      }
    }
  },

  methods: {
    setSliderVal(slider) {
      const elements = [].map(el => Number(el).toFixed(1))
      elements.length = 0

      this.$props.tItems.forEach((item) => {
        elements.push(Number(item[slider.tick]))
      })

      slider.min = Math.min(...elements)
      slider.max = Math.max(...elements)
      slider.value[0] = Math.min(...elements)
      slider.value[1] = Math.max(...elements)
    },

    setAllValues() {
      this.setSliderVal(this.wallSlider)
      this.setSliderVal(this.IDSlider)
      this.setSliderVal(this.ODSlider)
    },
  
    setFilter(slider, dd) {
      dd.toggle()

      return this.$emit('setFilter', {
        slider: slider
      })
    },
  
    clearFilter(...sliders) {
      sliders.forEach(slider => {
        slider.value[0] = slider.min
        slider.value[1] = slider.max
      })

      this.$emit('clearFilter', {
        sliders: sliders,
      })
    },

    setPriceVal(val) {
      this.oldPrice = this.price
      this.price = val
      this.$refs.dd4.toggle()

      return this.$emit('updatePrice', this.price)
    },
  
    async convertPriceValue() {
      const currencyRes = await fetch(
        `
          https://api.exchangerate.host/convert?from=${this.oldPrice}&to=${this.price}&base=${this.priceOptions}
        `,
        {
          method: 'GET',
        }
      )
        .then((res) => {
          return res.json()
        })
        .then((data) => data.info.rate)
        .then((data) => {
          const result = [...this.$props.fetchData].map((el, idx, arr) => {
            return (arr[idx]['Price'] = (
              el['Price'] * data
            ).toFixed(2))
          })
          return result
        })
    },
  
    convert() {
      const convertValues = (val) => {
        [...this.$props.fetchData].map((item) => {
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
              ? (item['Wall'] * 25.4).toExponential(1)
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

      this.setSliderVal(this.wallSlider)
      this.setSliderVal(this.IDSlider)
      this.setSliderVal(this.ODSlider)

      return this.$emit('parameters', {
        'val1': this.parameter,
        'val2': this.weight
      })
    },
  }
}
</script>