<template>
  <div class="accordion__item">
    <div 
      class="accordion__item-head"
      :class="{ 'accordion__item-head_active': visible }"
      @click="open"
    >
      <slot name="accordion-head"></slot>
    </div>

    <transition 
      name="accordion"
      @enter="start"
      @after-enter="end"
      @before-leave="start"
      @after-leave="end"
    >
      <div 
        class="accordion__item-body"
        v-if="visible"
      >
        <slot name="accordion-body"></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  inject: ['accordion'],
  
  data() {
    return {
      index: null
    }
  },

  created () {
    this.index = this.accordion.count++
  },

  computed: {
    visible() {
      return this.index == this.accordion.active
    }
  },

  methods: {
    open() {
      if (this.visible) {
        this.accordion.active = null
      } else {
        this.accordion.active = this.index
      }
    },

    start(el) {
      el.style.height = el.scrollHeight + 'px'
    },

    end(el) {
      el.style.height = 0 + 'px'
    }
  },
}
</script>

<style scoped>
.accordion__item {
  cursor: pointer;
  position: relative;
}

.accordion__item-head {
  display: flex;
  justify-content: space-between;
}

.accordion__item-body {
  margin-top: 8px;
  position: absolute;
  z-index: 1001;
  height: 0px;
}

.accordion-enter-active,
.accordion-leave-active {
  will-change: height, opacity;
  transition: height 0.3s ease, opacity 0.3s ease;
  overflow: hidden;
}

.accordion-enter,
.accordion-leave-to {
  height: 0 !important;
  opacity: 0;
}
</style>