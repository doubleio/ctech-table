<template>
    <div 
      v-for="item in data" 
      :key="item" 
      class="table__tb-item"
    >
      <div class="table__th-item">
        <div>{{ item['Product'] }}</div>
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
        <div>{{ Number(item['Stiffness']) }} {{ parameters.val1 }}</div>
      </div>
      <div class="table__th-item">
        <div>{{ priceFormat(item['Price/m'], currency) }}</div>
      </div>
      <div class="table__th-item">
        <div>{{ Number(item['Weight/m']) }} {{ parameters.val2 }}</div>
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
          'product': item['Product'],
          'shape': item['Shape'],
          'category': item['SCategory'],
          'IDx': Number(item['IDx']).toFixed(2),
          'IDy': Number(item['IDy']).toFixed(2),
          'ODx': Number(item['ODx']).toFixed(2),
          'ODy': Number(item['ODy']).toFixed(2),
          'wall': item['Wall'],
          'weight': item['Weight/m'],
        }

        return sessionStorage.setItem('params', JSON.stringify(query))
      }
    }
  }
</script>