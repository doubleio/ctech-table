<template>
	<div class="table__content-head">
		<div class="table__filters">
			<div class="table__filters">
				<div v-for="slider in sliders" :key="slider" class="table__dd">
					<div class="table__dd-title">{{ slider.title }}</div>
					<div class="">
						<div class="table__dd-list-values">
							<div class="table__values-item">
								<span>min</span>
								<span class="table__values-item-span"> ({{ parameter }})</span>
								<InputNumber
									class="table__values-item-input"
									v-model="slider.value[0]"
									:max="slider.max"
									:min="slider.min"
									fluid
									:minFractionDigits="2"
									@update:modelValue="handleFilterItem"
								/>
							</div>
							<div class="table__values-sep"></div>
							<div class="table__values-item">
								<span>max</span>
								<span class="table__values-item-span"> ({{ parameter }})</span>
								<InputNumber
									class="table__values-item-input"
									v-model="slider.value[1]"
									:max="slider.max"
									:min="slider.min"
									:minFractionDigits="2"
									@update:modelValue="handleFilterItem"
									fluid
								/>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="table__filters-radios-wrapper">
				<div class="table__filters-radios">
					<label class="table__filters-radio" v-for="(item, idx) in convertItems" :key="idx">
						<icon-checkbox
							class="table__filters-radio-check"
							:isChecked="radio === item.value"
						></icon-checkbox>
						<input
							type="radio"
							name="sort"
							style="display: none"
							:value="item.value"
							v-model="radio"
							@change="convert"
						/>
						<div>
							<span class="table__radio-label" :for="item.value">{{ item.title1 }}</span>
							<div>{{ item.title2 }}</div>
						</div>
					</label>
				</div>
			</div>
			<button class="table__filters-btn" @click="clearFilter()">Clear</button>
		</div>

		<div>
			Showing {{ paginatedData.length }} of
			<span class="underline">{{ filterItems.length }} Items</span>
		</div>
	</div>
</template>

<script>
	import rSlider from '@vueform/slider'
	import TheAccordion from '../Accordion/TheAccordion.vue'
	import TheAccordionItem from '../Accordion/TheAccordionItem.vue'
	import { mapState, mapWritableState, mapActions } from 'pinia'
	import { useStore } from '../../store/index'
	import IconCheckbox from '../icons/IconCheckbox.vue'
	import IconAccordion from '../icons/IconAccordion.vue'
	import InputNumber from 'primevue/inputnumber'
	import { watchThrottled } from '@vueuse/core'

	export default {
		components: {
			rSlider,
			TheAccordion,
			TheAccordionItem,
			IconCheckbox,
			IconAccordion,
			InputNumber,
		},

		data() {
			return {
				isAccordionOpen: null,
				sliders: [
					{
						title: 'Internal Diameter',
						tick: 'IDx',
						value: [0, 100],
						max: 100,
						min: 0,
						step: 1,
					},
					{
						title: 'Wall thickness',
						tick: 'Wall',
						value: [0, 100],
						max: 100,
						min: 0,
						step: 0.01,
					},
				],

				oldPrice: 'NZD',
				priceOptions: ['NZD', 'AUD', 'USD', 'EUR'],

				radio: '0',
				convertItems: [
					{
						title1: 'Metric',
						title2: 'kg/mm',
						value: '0',
					},
					{
						title1: 'Imperial',
						title2: 'lbs/inches',
						value: '1',
					},
				],
			}
		},

		mounted() {
			this.setSliderVal()

			watchThrottled(
				() => this.sliders.map((slider) => slider.value.slice()),
				() => {
					this.handleFilterItem()
				},
				{ throttle: 1500, deep: true }
			)
		},

		watch: {
			currentTab: {
				deep: true,
				handler() {
					this.setSliderVal()
				},
			},
		},

		computed: {
			...mapState(useStore, ['paginatedData', 'currentTab']),
			...mapWritableState(useStore, ['fetchItems', 'filterItems', 'price', 'parameter', 'weight']),
		},

		methods: {
			...mapActions(useStore, ['handleFilter']),

			setSliderVal() {
				this.sliders.forEach((slider) => {
					let min = Math.min.apply(
						Math,
						[...this.filterItems].map((item) => item[slider.tick])
					)
					let max = Math.max.apply(
						Math,
						[...this.filterItems].map((item) => item[slider.tick])
					)

					slider.min = min
					slider.max = max
					slider.value[0] = min
					slider.value[1] = max
				})
			},

			handleFilterItem() {
				const result = this.fetchItems.filter((item) => {
					// Фильтр по табам и категориям
					const shape = item.Shape ? item.Shape.toLowerCase() : ''
					const laminate = item.Laminate ? item.Laminate.toLowerCase() : ''
					const tabMatch =
						!this.currentTab.length || this.currentTab.some((tab) => tab.toLowerCase() === shape)
					const categoryMatch =
						!this.categoryTabs.length ||
						this.categoryTabs.some((ct) => ct.toLowerCase() === laminate)
					// Фильтр по слайдерам
					const sliderMatch = this.sliders.every((slider) => {
						return item[slider.tick] >= slider.value[0] && item[slider.tick] <= slider.value[1]
					})

					return tabMatch && categoryMatch && sliderMatch
				})
				this.filterItems = result
			},

			clearFilter() {
				this.sliders.forEach((slider) => {
					slider.value[0] = slider.min
					slider.value[1] = slider.max
				})
				this.handleFilter()
			},

			convert() {
				const multiplier = this.radio === '0' ? 25.4 : 1 / 25.4
				;[...this.fetchItems].forEach((item) => {
					item['IDx'] = (item['IDx'] * multiplier).toExponential(2)
					item['IDy'] = (item['IDy'] * multiplier).toExponential(2)
					item['Wall'] = (item['Wall'] * multiplier).toExponential(1)

					const weightMultiplier = this.radio === '0' ? 1 / 2.205 : 2.205
					item['Weight'] = (item['Weight'] * weightMultiplier).toExponential(2)
				})

				this.setSliderVal()
				this.parameter = this.radio === '0' ? 'mm' : 'in'
				this.weight = this.radio === '0' ? 'kg' : 'lb'
			},
		},
	}
</script>

<style scoped>
	.btn-primary {
		margin: 0;
	}
</style>
