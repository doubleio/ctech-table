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
	import AppMenu from '@/widgets/AppMenu/AppMenu.vue'
	import AppTable from '@/widgets/AppTable/AppTable.vue'
	import { mapActions, mapWritableState } from 'pinia'
	import { useStore } from '@/store/index'
	import { supabase } from '../shared/api/supabase'

	export default {
		components: {
			AppMenu,
			AppTable,
		},

		async created() {
			const cachedData = sessionStorage.getItem('fetchedData')
			if (cachedData !== null) {
				this.fetchItems = JSON.parse(cachedData)
				this.setCurrentTab()
				this.loadingStatus = true
				sessionStorage.removeItem('loaded')
			} else {
				await this.init()
			}
		},

		computed: {
			...mapWritableState(useStore, ['fetchItems', 'filterItems', 'loadingStatus', 'fetchError']),
		},

		methods: {
			...mapActions(useStore, ['setCurrentTab']),

			async init() {
				try {
					const { data: table } = await supabase
						.from('table [22.12.2023]')
						.select('Laminate, Shape, Section, Wall, IDx, IDy, ODx, ODy, Weight, Carbon_Stiffness')
					this.fetchItems = table
					this.filterItems = table
					await this.setCurrentTab()
					this.loadingStatus = true
					sessionStorage.setItem('fetchedData', JSON.stringify(table))
				} catch (error) {
					this.fetchError = true
				}
			},
		},
	}
</script>
