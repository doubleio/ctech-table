<template>
	<div class="table__tb-item table-item__skeleton" v-for="(item, idx) in 50" :key="idx">
		<Skeleton class="table__th-item"></Skeleton>
		<Skeleton class="table__th-item"></Skeleton>
		<Skeleton class="table__th-item"></Skeleton>
		<Skeleton class="table__th-item"></Skeleton>
		<Skeleton class="table__th-item"></Skeleton>
		<Skeleton class="table__th-item"></Skeleton>
		<Skeleton class="table__th-item center btn"></Skeleton>
	</div>
</template>

<script>
	import Skeleton from 'primevue/skeleton'

	export default {
		components: {
			Skeleton,
		},
	}
</script>

<style>
	.table-item__skeleton {
		overflow: hidden;
		display: flex !important;
		gap: 10px !important;
		padding: 10px 0px !important;
	}

	.p-skeleton {
		background-color: #e2e8f0 !important;
	}

	:root {
		--p-skeleton-background: #e2e8f0;
		--p-skeleton-animation-background: rgba(255, 255, 255, 0.4);
	}
</style>
