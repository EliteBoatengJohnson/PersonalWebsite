// Usage: v-reveal | v-reveal="'left'" | v-reveal="{ variant: 'clip', delay: 150 }"
// Variants: up (default), left, right, scale, clip
let observer

function getObserver() {
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in')
            observer.unobserve(entry.target) // animate once
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    )
  }
  return observer
}

export const vReveal = {
  mounted(el, { value }) {
    const opts = typeof value === 'object' && value ? value : { variant: value }
    const { variant = 'up', delay = 0 } = opts
    el.classList.add('reveal', `reveal--${variant}`)
    el.style.setProperty('--d', `${delay}ms`)
    getObserver().observe(el)
  },
  unmounted(el) {
    observer?.unobserve(el)
  },
}
