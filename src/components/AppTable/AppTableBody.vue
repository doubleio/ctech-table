<template>
  <div class="table__content-wrapper">
    <div class="table__th">
      <div class="table__th-item">
        <div>Product</div>
        <div class="table__th-item-ico">
          <product-ico @click="handleProductPopup"></product-ico>
          <transition name="fadeIn">
            <div class="table__th-item-popup" v-if="productPopupIsShow">
              <popup-up class="table__th-item-popup-dec"></popup-up>
              <div class="table__th-item-popup-title">Product dimension values</div>
              <img class="table__th-item-popup-img" src="https://uploads-ssl.webflow.com/61b8adc853887c7e8a0e1d78/62ba2feaa4656c5bbae93160_Website%20Final%20Concept%201%201.jpg" alt="">
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
    <div class="table__content-info">
      <div class="table__tb">
        <app-table-body-item></app-table-body-item>
      </div>
    </div>
  </div>
</template>

<script>
import ProductIco from '../icons/ProductIco.vue'
import CloseIco from '../icons/CloseIco.vue'
import PopupUp from '../icons/PopupUp.vue'
import AppTableBodyItem from './AppTableBodyItem.vue'

import { mapWritableState } from 'pinia'
import { useStore } from '../../stores/index'

export default {
    components: {
      ProductIco,
      CloseIco,
      PopupUp,
      AppTableBodyItem
    },

    data() {
      return {
        keys: ['IDx', 'IDy', 'ODx', 'ODy', 'Wall', 'Stiffness', 'Price/m', 'Weight/m'],
        sortCount: 0,
        productPopupIsShow: false,
      }
    },

    computed: {
      ...mapWritableState(useStore, ['filterItems', 'currentSortType'])
    },
    
    methods: {
      sortItems(type, idx) {  
        this.currentSortType !== this.keys[idx] ? this.sortCount = 0 : ''
        this.currentSortType = type

        const itemType = 
          type === 'Stiffness' ? 'Carbon_Stiffness' :
          type === 'Price/m' ? 'Price' :
          type === 'Weight/m' ? 'Weight' : type

        if (this.sortCount === 0) {
          return this.filterItems.sort((a, b) => {
            this.sortCount = 1
            return Number(a[itemType]) < Number(b[itemType]) ? 1 : -1
          })
        } else {
          return this.filterItems.sort((a, b) => {
            this.sortCount = 0
            return Number(a[itemType]) > Number(b[itemType]) ? 1 : -1
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