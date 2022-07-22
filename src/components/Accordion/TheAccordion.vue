<template>
  <div class="accordion">
    <slot></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      accordion: {
        count: 0,
        active: null
      }
    }
  },

  provide() {
    return { accordion: this.accordion }
  }
}
</script>