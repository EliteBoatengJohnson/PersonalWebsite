<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { nav, site } from '../data/content'
import { useScroll } from '../composables/useScroll'
import PillButton from './PillButton.vue'

const { scrollY } = useScroll()
const scrolled = computed(() => scrollY.value > 40)
const active = ref('hero')
let io

onMounted(() => {
  // Highlight the link of whichever section is crossing the middle of the viewport.
  io = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && (active.value = e.target.id)),
    { rootMargin: '-45% 0px -50% 0px' }
  )
  nav.forEach(({ id }) => {
    const el = document.getElementById(id)
    if (el) io.observe(el)
  })
})
onBeforeUnmount(() => io?.disconnect())
</script>

<template>
  <header class="nav" :class="{ scrolled }">
    <a class="brand" href="#hero" aria-label="Home">
      <svg width="30" height="26" viewBox="0 0 30 26" fill="none" aria-hidden="true">
        <path d="M2 2l10 11L2 24M28 2L18 13l10 11" stroke="currentColor" stroke-width="4" />
      </svg>
      {{ site.brand }}
    </a>
    <nav class="links" aria-label="Primary">
      <a v-for="n in nav" :key="n.id" :href="`#${n.id}`" :class="{ active: active === n.id }">{{ n.label }}</a>
    </nav>
    <PillButton label="View my work" href="#work" />
  </header>
</template>

<style scoped>
.nav {
  position: fixed; inset: 0 0 auto 0; z-index: 50;
  display: flex; align-items: center; gap: 40px;
  padding: 24px 36px;
  transition: background 0.4s, padding 0.4s var(--ease);
}
.nav.scrolled { background: rgba(92, 10, 20, 0.92); backdrop-filter: blur(10px); padding-block: 12px; }
.brand { display: flex; align-items: center; gap: 6px; font: 800 34px/1 'Archivo', sans-serif; }
.links { display: flex; gap: 36px; flex: 1; font-weight: 600; }
.links a { position: relative; padding-block: 4px; }
.links a::after {
  content: ''; position: absolute; left: 0; right: 0; bottom: 0; height: 2px;
  background: var(--butter); transform: scaleX(0); transform-origin: left;
  transition: transform 0.4s var(--ease);
}
.links a:hover::after, .links a.active::after { transform: scaleX(1); }
@media (max-width: 900px) {
  .links { display: none; }
  .nav { justify-content: space-between; padding-inline: 20px; }
}
</style>
