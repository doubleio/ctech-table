<template>
  <div class="table__content">
    <template v-if="filterItems.length !== 0">
      <app-table-head></app-table-head>
      <app-table-body></app-table-body>
      <app-table-pagination></app-table-pagination>
    </template>

    <app-table-loader v-else-if="filterItems.length === 0 && !fetchError"></app-table-loader>
    <div v-else>Something went wrong. Reload the page or come back later</div>
  </div>
</template>

<script>
import AppTableBody from './AppTableBody.vue'
import AppTableHead from './AppTableHead.vue'
import AppTablePagination from './AppTablePagination.vue'
import AppTableLoader from './AppTableLoader.vue'

import { mapState } from 'pinia'
import { useStore } from '../../stores/index'

export default {
  components: { AppTableHead, AppTableBody, AppTablePagination, AppTableLoader },

  computed: {
    ...mapState(useStore, ['filterItems', 'fetchError'])
  },
}
</script>