<template>
  <div class="table__pagination">
    <div class="table__arrow" @click="prevPage" :disabled="isFirstPage">
      <img
        src="https://assets.website-files.com/61b8adc853887c7e8a0e1d78/61f300b3134114d64c7ef6d8_table-arrow-left.svg"
        loading="lazy"
        alt=""
        class="table__arrow-ico"
      />
      <div>Previous</div>
    </div>
    <div class="table__pagination-numbers">
      <div
        class="table__numbers-btn"
        v-for="item in pagination(page, paginatedNumbers)"
        :key="item[0]"
        @click="goToPage(item)"
        :class="item === page ? 'active' : ''"
      >{{ item }}</div>
    </div>
    <div class="table__arrow" @click="nextPage" :disabled="isLastPage">
      <div>Next</div>
      <img
        src="https://assets.website-files.com/61b8adc853887c7e8a0e1d78/61f300b392aaf7f52fc30682_table-arrow-right.svg"
        loading="lazy"
        alt=""
        class="table__arrow-ico v2"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapWritableState } from 'pinia'
import { useStore } from '../../stores/index'

export default {
  computed: {
    ...mapState(useStore, ['filterItems']),
    ...mapWritableState(useStore, ['isLastPage', 'isFirstPage', 'perPage', 'page']),

    paginatedNumbers() {
      return Math.ceil(this.filterItems.length / this.perPage)
    },
  },

  watch: {
    page(val) {
      val === 1 
        ? this.isFirstPage = true 
        : this.isFirstPage = false
      
      val === this.paginatedNumbers
        ? this.isLastPage = true
        : this.isLastPage = false
    }
  },

  methods: {
    ...mapActions(useStore, ['goToPage']),

    pagination(currentPage, lastPage) {
      let delta = window.innerWidth <= 768 ? 0 : 1
      const range = Array(lastPage).fill().map((_, index) => index + 1)

      const render = range.reduce((pages, page) => {
        if (page === 1 || page === lastPage) {
          return [...pages, page]
        }

        if (page - delta <= currentPage && page + delta >= currentPage) {
          return [...pages, page]
        }

        if (pages[pages.length - 1] !== '...') {
          return [...pages, '...']
        }

        return pages
      }, [])

      return this.renderItems = render
    },

    nextPage() {
      if (this.page !== this.paginatedNumbers) {
        this.page += 1
      }
    },

    prevPage() {
      if (this.page !== 1) {
        this.page -= 1
      }
    },
  }
}
</script>
