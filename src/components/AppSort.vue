<template>
  <div class="table__th">
    <div class="table__th-item"><div>Product</div></div>
    <div
      class="table__th-item sort"
      :class="sortType('IDx') ? 'checked' : ''"
      @click="sortItemsUp('IDx')"
    >
      <div>Internal Diameter ({{ parameters.val1 }})</div>
    </div>
    <div
      class="table__th-item sort bottom"
      :class="sortType('ODx') ? 'checked' : ''"
      @click="sortItemsDown('ODx')"
    >
      <div>Wall ({{ parameters.val1 }})</div>
    </div>
    <div
      class="table__th-item sort bottom"
      :class="sortType('Price/m') ? 'checked' : ''"
      @click="sortItemsDown('Price/m')"
    >
      <div>Price Range/m</div>
    </div>
    <div
      class="table__th-item sort bottom"
      :class="sortType('Weight/m') ? 'checked' : ''"
      @click="sortItemsDown('Weight/m')"
    >
      <div>Weight per meter</div>
    </div>
    <div class="table__th-item center"><div>Action</div></div>
  </div>
</template>

<script>
  export default {
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
        currentSortType: null
      }
    },
    
    methods: {
      sortItemsUp(type) {
        if (this.currentSortType !== type) {
          this.currentSortType = type
          return this.$props.filterItems.sort(function(a, b) {
            return a[type] < b[type] ? 1 : -1
          })
        } else {
          this.currentSortType = null
          return this.$props.filterItems.sort(function(a, b) {
            return a[type] > b[type] ? 1 : -1
          })
        }
      },

      sortItemsDown(type) {
        if (this.currentSortType !== type) {
          this.currentSortType = type
          return this.$props.filterItems.sort(function(a, b) {
            return a[type] > b[type] ? 1 : -1
          })
        } else {
          this.currentSortType = null
        }
      },

      sortType(val) {
        if (this.currentSortType === val) {
          return true
        } else {
          return false
        }
      }
    }
  }
</script>