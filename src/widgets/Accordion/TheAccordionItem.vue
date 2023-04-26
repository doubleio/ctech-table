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