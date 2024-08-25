<template>
	<div class="table__pagination" v-if="filterItems.length > 0">
		<button type="button" class="table__arrow" @click="prevPage" :disabled="isFirstPage">
			<icon-arrow class="table__arrow-ico"></icon-arrow>
			<div>Previous</div>
		</button>
		<div class="table__pagination-numbers">
			<button
				type="button"
				class="table__numbers-btn"
				v-for="item in pagination(page, paginatedNumbers)"
				:key="item[0]"
				@click="goToPage(item)"
				:class="item === page ? 'active' : ''"
			>
				{{ item }}
			</button>
		</div>
		<button type="button" class="table__arrow" @click="nextPage" :disabled="isLastPage">
			<div>Next</div>
			<icon-arrow class="table__arrow-ico v2" style="transform: rotate(180deg)"></icon-arrow>
		</button>
	</div>
</template>

<script>
	import { mapActions, mapState, mapWritableState } from 'pinia'
	import { useStore } from '@/store/index'
	import IconArrow from '../icons/IconArrow.vue'

	export default {
		components: { IconArrow },

		computed: {
			...mapState(useStore, ['filterItems']),

			...mapWritableState(useStore, ['isLastPage', 'isFirstPage', 'perPage', 'page']),

			paginatedNumbers() {
				return Math.ceil(this.filterItems.length / this.perPage)
			},
		},

		watch: {
			page(val) {
				val === 1 ? (this.isFirstPage = true) : (this.isFirstPage = false)

				val === this.paginatedNumbers ? (this.isLastPage = true) : (this.isLastPage = false)
			},
		},

		methods: {
			...mapActions(useStore, ['goToPage']),

			pagination(currentPage, lastPage) {
				let delta = window.innerWidth <= 768 ? 0 : 1
				const range = Array(lastPage)
					.fill()
					.map((_, index) => index + 1)
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
				return (this.renderItems = render)
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
		},
	}
</script>
