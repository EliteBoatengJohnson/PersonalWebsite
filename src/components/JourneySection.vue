<script setup>
import { timeline, site } from '../data/content'
</script>

<template>
  <section id="work" class="journey">
    <div v-reveal class="head">
      <h2>Built through<br />experience</h2>
      <p>My journey into design began with a simple curiosity about how visual ideas can shape the way people experience the digital world. What started as an interest in layouts, colors, and typography gradually grew.</p>
    </div>

    <div class="timeline">
      <article
        v-for="(t, i) in timeline"
        :key="t.year"
        v-reveal="{ variant: i % 2 ? 'right' : 'left', delay: i * 120 }"
        class="tile"
        :class="[{ hl: t.highlight }, `t${i}`]"
      >
        <span class="year">{{ t.year }}</span>
        <h3>{{ t.title }}</h3>
        <p>{{ t.text }}</p>
      </article>
      <img v-reveal="{ variant: 'scale', delay: 480 }" class="tile photo" :src="site.journeyImage" alt="" />
    </div>
  </section>
</template>

<style scoped>
.journey { padding: 110px 36px; display: grid; gap: 28px; overflow: hidden; }
.head { max-width: 560px; margin-left: auto; }
.head h2 { font-size: clamp(40px, 5vw, 64px); font-weight: 800; margin-bottom: 14px; }
.head p { font-size: 11px; line-height: 1.7; opacity: 0.85; }

.timeline { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
.tile {
  background: var(--wine-2); padding: 24px; min-height: 170px;
  display: flex; flex-direction: column; justify-content: flex-end; position: relative;
}
.tile h3 { font-size: 16px; font-weight: 600; margin-bottom: 8px; }
.tile p { margin: 0; font-size: 11px; line-height: 1.6; opacity: 0.85; }
.year {
  position: absolute; top: 14px; right: 18px;
  font: 800 clamp(48px, 6vw, 84px)/1 'Archivo', sans-serif;
  color: transparent; -webkit-text-stroke: 1.5px rgba(240, 224, 143, 0.35);
  transition: -webkit-text-stroke-color 0.6s;
}
.tile:hover .year { -webkit-text-stroke-color: var(--butter); }
.tile.hl { background: var(--butter); color: var(--wine); }
.tile.hl .year { -webkit-text-stroke-color: rgba(92, 10, 20, 0.35); }
.tile.hl:hover .year { -webkit-text-stroke-color: var(--wine); }

.t0 { grid-column: 1 / 2; }
.t1 { grid-column: 2 / 3; }
.t2 { grid-column: 3 / 5; }
.t3 { grid-column: 2 / 4; }
.photo { grid-column: 4 / 5; padding: 0; width: 100%; height: 100%; object-fit: cover; background: var(--butter); }

@media (max-width: 900px) {
  .journey { padding: 80px 20px; }
  .timeline { grid-template-columns: 1fr; }
  .tile { grid-column: 1 !important; }
  .photo { height: 280px; }
}
</style>
