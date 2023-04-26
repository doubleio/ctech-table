<template>
  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="7" viewBox="0 0 13 7" fill="none">
    <path d="M6.71095 6.97656L12.56 0.530045H0.861886L6.71095 6.97656Z" :fill="isColor || '#90979A'"/>
  </svg>
</template>

<script>
export default {
  props: {
    isColor: {
      type: String,
    }
  }
}
</script>