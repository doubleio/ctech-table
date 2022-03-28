<template>
    <div 
      v-for="item in pData" 
      :key="item" 
      class="table__tb-item"
    >
      <div class="table__th-item">
        <div>{{ item['Product'] }}</div>
      </div>
      <div class="table__th-item">
        <div>{{ (item['IDx']).toFixed(2) }} {{ parameterOptions.val1 }}</div>
      </div>
      <div class="table__th-item">
        <div>{{ (item['ODx']).toFixed(2) }} {{ parameterOptions.val1 }}</div>
      </div>
      <div class="table__th-item">
        <div>{{ priceFormat(item['Price/m'], price) }}</div>
      </div>
      <div class="table__th-item">
        <div>{{ (item['Weight/m']).toFixed(2) }} {{ parameterOptions.val2 }}</div>
      </div>
      <div class="table__th-item center btn">
        <div>Get a quote</div>
      </div>
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

    updated() {
      this.pData = this.data
      this.price = this.currency
      this.parameterOptions = this.parameters
    },

    
    data() {
      return {
        pData: this.data,
        price: this.currency,
        parameterOptions: this.parameters
      }
    }
  }
</script>