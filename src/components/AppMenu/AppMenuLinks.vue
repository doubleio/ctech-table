<template>
  <div>
    <div class="fw-700">Other links</div>
    <div class="table__links">
      <a href="/about" class="table__tabs-item is-link">
        <icon-menu-about></icon-menu-about>
        <div>About C-tech</div>
      </a>
      <a href="#surface-finishes" class="table__tabs-item is-link">
        <icon-menu-surface></icon-menu-surface>
        <div>Surface finishes</div>
      </a>
      <a href="/shipping-delivery" class="table__tabs-item is-link">
        <icon-menu-shipping></icon-menu-shipping>
        <div>Shipping &amp; delivery</div>
      </a>
      <a href="#faq" class="table__tabs-item is-link">
        <icon-menu-faq></icon-menu-faq>
        <div>FAQs</div>
      </a>
    </div>
  </div>
</template>

<script>
import IconMenuAbout from '../icons/IconMenu/IconMenuAbout.vue'
import IconMenuSurface from '../icons/IconMenu/IconMenuSurface.vue'
import IconMenuShipping from '../icons/IconMenu/IconMenuShipping.vue'
import IconMenuFaq from '../icons/IconMenu/IconMenuFaq.vue'

export default {
  components: {
    IconMenuAbout,
    IconMenuSurface,
    IconMenuShipping,
    IconMenuFaq
  }
}
</script>
