<template>
  <div class="table-wrapper">
    <div class="container">
      <div class="table">
        <app-menu></app-menu>
        <app-table></app-table>
      </div>
    </div>
  </div>
</template>

<script>
import AppMenu from './components/AppMenu/AppMenu.vue'
import AppTable from './components/AppTable/AppTable.vue'
import AppMenuLinks from './components/AppMenu/AppMenuLinks.vue'
import { api } from './api/table-request'
import { mapActions, mapWritableState } from 'pinia'
import { useStore } from './stores/index'

export default {
  components: {
    AppMenu,
    AppTable,
    AppMenuLinks
  },

  created() {
    this.init()
    sessionStorage.removeItem('loaded')
  },

  computed: {
    ...mapWritableState(useStore, ['fetchItems', 'filterItems', 'loadingStatus', 'fetchError'])
  },

  methods: {
    ...mapActions(useStore, ['setCurrentTab']),

    async init() {
      await fetch(api(), {
        method: 'GET',
      })
        .then((res) => {
          return res.json()
        })
        .then((data) => {
          this.fetchItems = data.data
          this.filterItems = data.data
          this.setCurrentTab()
          this.loadingStatus = true
        })
        .catch((err) => {
          this.fetchError = true
        })
    }
  },
}
</script>