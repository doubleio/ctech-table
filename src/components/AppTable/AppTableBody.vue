<template>
  <div class="table__content-wrapper">
    <div class="table__th">
      <div class="table__th-item">
        <div>Product</div>
        <div class="table__th-item-ico">
          <icon-product @click="handleProductPopup()"></icon-product>
          <transition name="fadeIn">
            <div class="table__th-item-popup" v-if="productPopupIsShow">
              <icon-popup-up class="table__th-item-popup-dec"></icon-popup-up>
              <div class="table__th-item-popup-title">Product dimension values</div>
              <img class="table__th-item-popup-img" src="https://uploads-ssl.webflow.com/61b8adc853887c7e8a0e1d78/62ba2feaa4656c5bbae93160_Website%20Final%20Concept%201%201.jpg" alt="">
              <icon-close @click="handleProductPopup()" class="table__th-item-popup-close"></icon-close>
            </div>
          </transition>
        </div>
      </div>
      <label
        class="table__th-item sort"
        v-for="item, idx in keys"
        :key="idx"
        @click="sortItems(item, idx)"
      >
        <div>{{ item }}</div>
        <div class="table__th-item-icon">
          <icon-accordion :isColor="currentSortType === item && (sortCount !== 0) ? '#B42318' : null"></icon-accordion>
          <icon-accordion :isColor="currentSortType === item && (sortCount !== 1) ? '#B42318' : null"></icon-accordion>
        </div>
      </label>
      <div class="table__th-item center"><div>Action</div></div>
    </div>
    <div class="table__content-info">
      <div class="table__tb">
        <app-table-body-item></app-table-body-item>
      </div>
    </div>
  </div>
</template>

<script>
import IconProduct from '../icons/IconProduct.vue'
import IconClose from '../icons/IconClose.vue'
import IconPopupUp from '../icons/IconPopupUp.vue'
import AppTableBodyItem from './AppTableBodyItem.vue'
import IconAccordion from '../icons/IconAccordion.vue'
import { mapWritableState } from 'pinia'
import { useStore } from '../../stores/index'

export default {
  components: {
    IconProduct,
    IconClose,
    IconPopupUp,
    AppTableBodyItem,
    IconAccordion
  },

  data() {
    return {
      keys: ['IDx', 'IDy', 'ODx', 'ODy', 'Wall', 'Stiffness', 'Price/m', 'Weight/m'],
      sortCount: 0,
      productPopupIsShow: false,
    }
  },

  computed: {
    ...mapWritableState(useStore, ['filterItems', 'currentSortType']),
  },
  
  methods: {
    itemType(type) { 
      if (type === 'Stiffness') {
        return 'Carbon_Stiffness'
      } else if (type === 'Price/m') {
        return 'Price'
      } else if (type === 'Weight/m') {
        return 'Weight'
      }
      return type
    },
    
    sortItems(type, idx) {  
      if (this.currentSortType !== this.keys[idx]) {
        this.sortCount = 0
      }
      this.currentSortType = type

      if (this.sortCount === 0) {
        return this.filterItems.sort((a, b) => {
          this.sortCount = 1
          return Number(a[this.itemType(type)]) < Number(b[this.itemType(type)]) ? 1 : -1
        })
      } else {
        return this.filterItems.sort((a, b) => {
          this.sortCount = 0
          return Number(a[this.itemType(type)]) > Number(b[this.itemType(type)]) ? 1 : -1
        })
      }
    },

    handleProductPopup() {
      if (!this.productPopupIsShow) {
        this.productPopupIsShow = true
      }
      this.productPopupIsShow = false
    }
  }
}
</script>