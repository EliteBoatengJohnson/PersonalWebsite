<script setup>
import { footerCols, site } from '../data/content'
import PillButton from './PillButton.vue'
</script>

<template>
  <footer id="services" class="wrap">
    <div v-reveal="'scale'" class="footer">
      <h2>Let's bring<br />ideas to life</h2>
      <PillButton label="Contact me now" href="#contact" />
      <div class="cols">
        <div v-for="c in footerCols" :key="c.title" class="col">
          <h4>{{ c.title }}</h4>
          <a v-for="[label, href] in c.links" :key="label" :href="href">{{ label }}</a>
        </div>
      </div>
      <div class="legal">
        <span>© 2026 {{ site.brand }}. All rights reserved.</span>
        <span><a href="#">Terms &amp; conditions</a><a href="#">Privacy policy</a></span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.wrap { background: var(--butter); padding: 20px; }
.footer { background: var(--wine); padding: 60px 40px 24px; text-align: center; display: grid; justify-items: center; gap: 20px; }
h2 { font-size: clamp(40px, 5vw, 64px); font-weight: 800; }
.cols { display: grid; grid-template-columns: repeat(3, 1fr); width: 100%; margin-top: 50px; text-align: left; }
.col { display: grid; gap: 10px; justify-items: start; font-weight: 600; font-size: 14px; }
.col a { transition: transform 0.3s var(--ease), opacity 0.3s; }
.col a:hover { transform: translateX(4px); opacity: 0.75; }
.col:nth-child(2) { justify-items: center; }
.col:last-child { justify-items: end; }
.col h4 { font: 400 9px 'Chakra Petch', sans-serif; opacity: 0.6; margin-bottom: 4px; }
.legal { display: flex; justify-content: space-between; width: 100%; font-size: 8px; opacity: 0.7; margin-top: 50px; }
.legal a { margin-left: 14px; }

@media (max-width: 900px) {
  .footer { padding-inline: 20px; }
  .cols { grid-template-columns: 1fr; gap: 28px; }
  .col, .col:nth-child(2), .col:last-child { justify-items: start; }
  .legal { flex-direction: column; gap: 8px; }
}
</style>
