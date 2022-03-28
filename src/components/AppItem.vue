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
        <div>{{ (item['IDx']).toFixed(2) }} {{ parameters.val1 }}</div>
      </div>
      <div class="table__th-item">
        <div>{{ (item['ODx']).toFixed(2) }} {{ parameters.val1 }}</div>
      </div>
      <div class="table__th-item">
        <div>{{ priceFormat(item['Price/m'], currency) }}</div>
      </div>
      <div class="table__th-item">
        <div>{{ (item['Weight/m']).toFixed(2) }} {{ parameters.val2 }}</div>
      </div>
      <a href="#modal=open" class="table__th-item center btn">
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
  }
</script>