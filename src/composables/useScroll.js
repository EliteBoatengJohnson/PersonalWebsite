import { ref, onMounted, onBeforeUnmount } from 'vue'

// Shared state so every component reads the same rAF-throttled values.
const scrollY = ref(0)
const progress = ref(0)
let users = 0
let ticking = false

function update() {
  scrollY.value = window.scrollY
  const max = document.documentElement.scrollHeight - window.innerHeight
  progress.value = max > 0 ? window.scrollY / max : 0
  ticking = false
}

function onScroll() {
  if (!ticking) {
    ticking = true
    requestAnimationFrame(update)
  }
}

export function useScroll() {
  onMounted(() => {
    if (users++ === 0) {
      window.addEventListener('scroll', onScroll, { passive: true })
      window.addEventListener('resize', onScroll, { passive: true })
    }
    update()
  })
  onBeforeUnmount(() => {
    if (--users === 0) {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  })
  return { scrollY, progress }
}
