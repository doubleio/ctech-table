<template>
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 18 18" fill="none">
    <path d="M1 9C1 4.58172 4.58172 1 9 1C13.4183 1 17 4.58172 17 9C17 13.4183 13.4183 17 9 17C4.58172 17 1 13.4183 1 9Z" fill="#F9F5FF"/>
    <circle cx="9" cy="9" r="3" fill="#B42318" v-if="isChecked"/>
    <path 
      d="M9 16C5.13401 16 2 12.866 2 9H0C0 13.9706 4.02944 18 9 18V16ZM16 9C16 12.866 12.866 16 9 16V18C13.9706 18 18 13.9706 18 9H16ZM9 2C12.866 2 16 5.13401 16 9H18C18 4.02944 13.9706 0 9 0V2ZM9 0C4.02944 0 0 4.02944 0 9H2C2 5.13401 5.13401 2 9 2V0Z" 
      :fill="isChecked ? '#B42318' : '#D0D5DD'"
    />
  </svg>
</template>

<script>
export default {
  props: {
    isChecked: {
      type: Boolean,
    }
  }
}
</script>