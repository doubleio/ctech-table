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
              From {{ (firstSlider.value[0]).toFixed(2) }} {{ parameter }} to
              {{ (firstSlider.value[1]).toFixed(2) }} {{ parameter }}
            </div>

            <r-slider
              v-model="firstSlider.value"
              :tooltips="false"
              :lazy="false"
              :max="firstSlider.max"
              :min="firstSlider.min"
              :format="{decimals: 2}"
            ></r-slider>

            <div class="table__dd-list-values">
              <div class="table__values-item">
                <span>min</span>
                <div>{{ (firstSlider.value[0]).toFixed(2) }} ({{ parameter }})</div>
              </div>
              <div class="table__values-sep"></div>
              <div class="table__values-item">
                <span>max</span>
                <div>{{ (firstSlider.value[1]).toFixed(2) }} ({{ parameter }})</div>
              </div>
            </div>
            <div class="table__dd-list-btns">
              <div @click="clearFilter(firstSlider, secondSlider)">Clear</div>
              <button
                @click="setFilter(firstSlider, $refs.dd1)"
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
              From {{ (secondSlider.value[0]).toFixed(2) }} {{ parameter }} to
              {{ (secondSlider.value[1]).toFixed(2) }} {{ parameter }}
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
                <div>{{ (secondSlider.value[0]).toFixed(2) }} ({{ parameter }})</div>
              </div>
              <div class="table__values-sep"></div>
              <div class="table__values-item">
                <span>max</span>
                <div>{{ (secondSlider.value[1]).toFixed(2) }} ({{ parameter }})</div>
              </div>
            </div>
            <div class="table__dd-list-btns">
              <div @click="clearFilter(firstSlider, secondSlider)">Clear</div>
              <button
                @click="setFilter(secondSlider, $refs.dd2)"
                class="btn-primary sm color-white"
              >
                Apply
              </button>
            </div>
          </div>
        </template>
      </vue-collapsible-panel>

      <vue-collapsible-panel class="table__dd price" :expanded="false" ref="dd3">
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
      priceStatus: false,

      firstSlider: {
        tick: 'ODx',
        value: [0, 100],
        max: null,
        min: 0,
      },
      secondSlider: {
        tick: 'IDx',
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
    setVal(slider) {
      const elements = []
      elements.length = 0

      this.$props.tItems.forEach((item) => {
        elements.push(item[slider.tick])
      })

      const min = Math.min(...elements)
      const max = Math.max(...elements)

      slider.min = min
      slider.max = max
      slider.value[0] = min
      slider.value[1] = max
    },

    setAllValues() {
      this.setVal(this.firstSlider)
      this.setVal(this.secondSlider)
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
          this.priceStatus = res.ok
          return res.json()
        })
        .then((data) => data.info.rate)

      if (this.priceStatus !== false) {
        this.priceStatus = false
        const result = [...this.$props.fetchData].map((el, idx, arr) => {
          return (arr[idx].fields['Price/m'] = (
            el.fields['Price/m'] * currencyRes
          ).toFixed(2))
        })
        return result
      }
    },
  
    convert() {
      const convertValues = (val) => {
        [...this.$props.fetchData].map((el) => {
          el.fields['IDx'] = 
            val == true 
              ? el.fields['IDx'] * 25.4 
              : el.fields['IDx'] / 25.4
          el.fields['ODx'] = 
            val == true 
              ? el.fields['ODx'] * 25.4 
              : el.fields['ODx'] / 25.4 
          el.fields['Weight/m'] = 
            val == true 
              ? el.fields['Weight/m'] / 2.205 
              : el.fields['Weight/m'] * 2.205
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

      this.setVal(this.firstSlider, 'ODx')
      this.setVal(this.secondSlider, 'IDx')

      return this.$emit('parameters', {
        'val1': this.parameter,
        'val2': this.weight
      })
    },
  }
}
</script>