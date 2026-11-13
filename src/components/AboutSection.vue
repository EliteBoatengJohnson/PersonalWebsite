<script setup>
import { about, site } from '../data/content'
import PillButton from './PillButton.vue'
</script>

<template>
  <section id="about" class="about">
    <h2 v-reveal="'clip'" class="big">About me</h2>

    <div class="grid">
      <article v-for="(a, i) in about" :key="a.title" class="item" :class="`i${i}`">
        <img v-if="i === 2" v-reveal="'scale'" class="photo" :src="site.aboutImage" alt="" />
        <div v-reveal="{ variant: i % 2 ? 'left' : 'right', delay: 100 }" class="text">
          <span class="idx">0{{ i + 1 }}</span>
          <h3>{{ a.title }}</h3>
          <p>{{ a.text }}</p>
          <PillButton v-if="i === 2" dark label="Get to know me" href="#contact" />
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.about { background: var(--butter-2); color: var(--wine); padding: 110px 36px 90px; overflow: hidden; }
.about :focus-visible { outline-color: var(--wine); }
.big { font-size: clamp(64px, 9vw, 124px); font-weight: 800; }
.grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px 80px; margin-top: -40px; }
.item h3 { font-size: 30px; font-weight: 700; margin: 10px 0 16px; }
.item p { max-width: 36ch; line-height: 1.7; font-size: 14px; margin: 0 0 28px; }
.idx { font-size: 12px; font-weight: 600; }
.i0 { grid-column: 2; }
.i1 { grid-column: 1; padding-left: 38%; }
.i2 { grid-column: 1 / -1; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: end; }
.photo { width: 70%; aspect-ratio: 1; object-fit: cover; background: var(--wine); margin-left: 38%; }

@media (max-width: 900px) {
  .about { padding: 80px 20px 60px; }
  .grid, .i2 { grid-template-columns: 1fr; gap: 24px; }
  .grid { margin-top: 20px; }
  .i0, .i1, .i2 { grid-column: 1; padding-left: 0; }
  .photo { width: 100%; margin-left: 0; }
}
</style>
