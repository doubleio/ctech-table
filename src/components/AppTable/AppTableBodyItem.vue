<template>
    <div v-for="item in paginatedData" :key="item" class="table__tb-item">
      <div class="table__th-item">
        <div>{{ item['Section'] }}</div>
      </div>
      <div class="table__th-item">
        <div>{{ Number(item['IDx']) }} {{ parameter }}</div>
      </div>
      <div class="table__th-item">
        <div>{{ Number(item['IDy']) }} {{ parameter }}</div>
      </div>
      <div class="table__th-item">
        <div>{{ Number(item['ODx']) }} {{ parameter }}</div>
      </div>
      <div class="table__th-item">
        <div>{{ Number(item['ODy']) }} {{ parameter }}</div>
      </div>
      <div class="table__th-item">
        <div>{{ Number(item['Wall']) }} {{ parameter }}</div>
      </div>
      <div class="table__th-item">
        <div>{{ Number(item['Carbon_Stiffness']) }} {{ parameter }}</div>
      </div>
      <div class="table__th-item">
        <div>{{ priceFormat(item['Price'], price) }}</div>
      </div>
      <div class="table__th-item">
        <div>{{ Number(item['Weight']) }} {{ weight }}</div>
      </div>
      <a 
        href="#modal=open" 
        class="table__th-item center btn" 
        @click="setQueryParams(item)"
      >
        <div>Get a quote</div>
      </a>
    </div>
</template>

<script>
import { mapState } from 'pinia'
import { useStore } from '../../stores/index'

  export default {
   computed: {
    ...mapState(useStore, ['paginatedData', 'price', 'parameter', 'weight'])
   },

    methods: {
      setQueryParams(item) {
        let query = {
          'product': item['Section'],
          'shape': item['Shape'],
          'category': this.categoryValue(item['Laminate']),
          'IDx': Number(item['IDx']) + this.parameter,
          'IDy': Number(item['IDy']) + this.parameter,
          'ODx': Number(item['ODx']) + this.parameter,
          'ODy': Number(item['ODy']) + this.parameter,
          'wall': Number(item['Wall']) + this.parameter,
          'weight': Number(item['Weight']) + this.weight,
        }

        return sessionStorage.setItem('params', JSON.stringify(query))
      },

      categoryValue(val) {
        if (val === 'Std Modulus Laminate') {
          return 'Standard modulus laminate'
        }
        return val
      }
    }
  }
</script>