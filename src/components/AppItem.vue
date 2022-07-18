<template>
    <div v-for="item in data" :key="item" class="table__tb-item">
      <div class="table__th-item">
        <div>{{ item['Section'] }}</div>
      </div>
      <div class="table__th-item">
        <div>{{ Number(item['IDx']) }} {{ parameters.val1 }}</div>
      </div>
      <div class="table__th-item">
        <div>{{ Number(item['IDy']) }} {{ parameters.val1 }}</div>
      </div>
      <div class="table__th-item">
        <div>{{ Number(item['ODx']) }} {{ parameters.val1 }}</div>
      </div>
      <div class="table__th-item">
        <div>{{ Number(item['ODy']) }} {{ parameters.val1 }}</div>
      </div>
      <div class="table__th-item">
        <div>{{ Number(item['Wall']) }} {{ parameters.val1 }}</div>
      </div>
      <div class="table__th-item">
        <div>{{ Number(item['Carbon_Stiffness']) }} {{ parameters.val1 }}</div>
      </div>
      <div class="table__th-item">
        <div>{{ priceFormat(item['Price'], currency) }}</div>
      </div>
      <div class="table__th-item">
        <div>{{ Number(item['Weight']) }} {{ parameters.val2 }}</div>
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
  export default {
    props: {
      data: {
        type: Array
      },
      currency: {
        type: String
      },
      parameters: {
        type: Object
      }
    },

    methods: {
      setQueryParams(item) {
        let query = {
          'product': item['Section'],
          'shape': item['Shape'],
          'category': this.categoryValue(item['Laminate']),
          'IDx': Number(item['IDx']) + this.$props.parameters.val1,
          'IDy': Number(item['IDy']) + this.$props.parameters.val1,
          'ODx': Number(item['ODx']) + this.$props.parameters.val1,
          'ODy': Number(item['ODy']) + this.$props.parameters.val1,
          'wall': Number(item['Wall']) + this.$props.parameters.val1,
          'weight': Number(item['Weight']) + this.$props.parameters.val2,
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