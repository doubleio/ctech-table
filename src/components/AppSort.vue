<template>
  <div class="table__th">
    <div class="table__th-item">
      <div>Product</div>
      <div class="table__th-item-ico">
        <product-ico @click="handleProductPopup"></product-ico>
        <transition name="fadeIn">
          <div class="table__th-item-popup" v-if="productPopupIsShow">
            <popup-up class="table__th-item-popup-dec"></popup-up>
            <div class="table__th-item-popup-title">Product dimension values</div>
            <img src="https://uploads-ssl.webflow.com/61b8adc853887c7e8a0e1d78/62a861fd31ad9f1311921d32_c-tech_tube_section.jpg" alt="">
            <close-ico @click="handleProductPopup" class="table__th-item-popup-close"></close-ico>
          </div>
        </transition>
      </div>
    </div>
    <label
      class="table__th-item sort"
      v-for="item, idx in keys"
      :key="idx"
      :class="currentSortType === item && (sortCount !== 0) ? 'first' : currentSortType === item && (sortCount !== 1) ? 'second' : ''"
      @click="sortItems(item, idx)"
    >
      <div>{{ item }}</div>
    </label>
    <div class="table__th-item center"><div>Action</div></div>
  </div>
</template>

<script>
import ProductIco from './icons/ProductIco.vue'
import CloseIco from './icons/CloseIco.vue'
import PopupUp from './icons/PopupUp.vue'
export default {
    components: {
      ProductIco,
      CloseIco,
      PopupUp
    },
    
    props: {
      filterItems: {
        type: Array
      },
      parameters: {
        type: Object
      }
    },

    data() {
      return {
        keys: ['IDx', 'IDy', 'ODx', 'ODy', 'Wall', 'Stiffness', 'Price/m', 'Weight/m'],
        currentSortType: null,
        sortCount: 0,
        productPopupIsShow: false,
      }
    },
    
    methods: {
      sortItems(type, idx) {
        this.currentSortType !== this.keys[idx] ? this.sortCount = 0 : ''
        this.currentSortType = type

        if (this.sortCount === 0) {
          this.$props.filterItems.sort((a, b) => {
            this.sortCount = 1
            return Number(a[type]) < Number(b[type]) ? 1 : -1
          })
        } else {
          this.$props.filterItems.sort((a, b) => {
            this.sortCount = 0
            return Number(a[type]) > Number(b[type]) ? 1 : -1
          })
        }
      },

      handleProductPopup() {
        if (!this.productPopupIsShow) {
          return this.productPopupIsShow = true
        }
        return this.productPopupIsShow = false
      }
    }
  }
</script>