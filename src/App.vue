<script setup>
import { computed } from 'vue'
import { useScroll } from './composables/useScroll'
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import JourneySection from './components/JourneySection.vue'
import ContactSection from './components/ContactSection.vue'
import SiteFooter from './components/SiteFooter.vue'

const { progress } = useScroll()
const bar = computed(() => ({ transform: `scaleX(${progress.value})` }))
</script>

<template>
  <div class="progress" :style="bar" aria-hidden="true"></div>
  <NavBar />
  <main>
    <HeroSection />
    <AboutSection />
    <JourneySection />
    <ContactSection />
  </main>
  <SiteFooter />
</template>

<style scoped>
.progress {
  position: fixed; top: 0; left: 0; right: 0; height: 3px; z-index: 60;
  background: var(--butter); transform-origin: left; transform: scaleX(0);
}
</style>
