<template>
  <div class="table__pagination">
    <div class="table__arrow" @click="$emit('prevPage')" :disabled="firstPage">
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
        @click="$emit('goToPage', item)"
        :class="item === page ? 'active' : ''"
      >{{ item }}</div>
    </div>
    <div class="table__arrow" @click="$emit('nextPage')" :disabled="lastPage">
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
export default {
  props: {
    items: {
      type: Array
    },
    firstPage: {
      type: Boolean
    },
    lastPage: {
      type: Boolean
    },
    perPage: {
      type: Number
    },
    page: {
      type: Number
    },
  },

  data() {
    return {
      renderItems: null,
    }
  },

  computed: {
    paginatedNumbers() {
      return Math.ceil(this.$props.items.length / this.$props.perPage)
    },
  },

  methods: {
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
    }
  }
}
</script>
