import { onMounted, ref } from 'vue'

export const isMobile = () => {
  const isMobile = ref(false)

  const checkMobile = () => {
    isMobile.value = window.innerWidth <= 768
  }

  onMounted(() => {
    checkMobile()
    window.addEventListener('resize', () => checkMobile())
  })

  return isMobile.value
}

export const priceFormat = (format, price, style = 'currency') => {
  return new Intl.NumberFormat({}, {
    style: style,
    currency: price,
  }).format(format)
}