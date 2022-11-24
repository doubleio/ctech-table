<template>
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
          >
            <component :isColor="currentTab.find(el => el === tab) ? '#FFFFFF' : null" :is="'iconMenu' + tab"></component>
            <div>{{ tab }}</div>
            <div 
              class="table__tabs-item-check" 
              :style="{ 'opacity': currentTab.find(el => el === tab) ? '1' : '0' }"
            >
              <icon-check></icon-check>
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
                <icon-check></icon-check>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <template v-if="!isMobile">
      <app-menu-links></app-menu-links>
    </template>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useStore } from '../../stores/index'
import AppMenuLinks from './AppMenuLinks.vue'
import IconCheck from '../icons/IconCheck.vue'
import IconMenuRound from '../icons/IconMenu/IconMenuRound.vue'
import IconMenuSquare from '../icons/IconMenu/IconMenuSquare.vue'
import IconMenuRectangular from '../icons/IconMenu/IconMenuRectangular.vue'
import IconMenuAerofoil from '../icons/IconMenu/IconMenuAerofoil.vue'

export default {
  components: {
    AppMenuLinks,
    IconCheck,
    'IconMenuRound': IconMenuRound,
    'IconMenuSquare': IconMenuSquare,
    'IconMenuRectangular': IconMenuRectangular,
    'IconMenuAerofoil/Elliptical': IconMenuAerofoil
  },

  computed: {
    ...mapState(useStore, ['fetchItems', 'filterItems', 'tabNames', 'currentTab', 'categoryNames', 'categoryTabs']),
  },

  methods: {
    ...mapActions(useStore, ['tabChange', 'categoryTabChange'])
  }
}
</script>