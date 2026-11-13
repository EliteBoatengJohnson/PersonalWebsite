<script setup>
import { computed, onMounted, ref } from 'vue'
import { site, socials } from '../data/content'
import { useScroll } from '../composables/useScroll'

const { scrollY } = useScroll()
const loaded = ref(false)
onMounted(() => requestAnimationFrame(() => (loaded.value = true)))

const style = computed(() => ({ '--sy': Math.min(scrollY.value, 900) }))
</script>

<template>
  <section id="hero" class="hero" :class="{ loaded }" :style="style">
    <ul class="socials">
      <li v-for="s in socials" :key="s.label"><a :href="s.href">{{ s.label }}</a></li>
    </ul>

    <div class="img-wrap">
      <img class="hero-img" :src="site.heroImage" :alt="`${site.firstName} ${site.lastName}`" />
    </div>

    <div class="badge" aria-hidden="true">
      <svg viewBox="0 0 120 120">
        <defs><path id="circ" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" /></defs>
        <text><textPath href="#circ">{{ site.badgeText }}</textPath></text>
      </svg>
      <span>✕</span>
    </div>

    <div class="hero-copy">
      <p class="intro">{{ site.intro }}</p>
      <h1>
        <span class="line"><span class="inner"><span class="copy">©</span>{{ site.firstName }}</span></span>
        <span class="line"><span class="inner l2">{{ site.lastName }}</span></span>
      </h1>
    </div>
  </section>
</template>

<style scoped>
.hero { position: relative; min-height: 100vh; min-height: 100svh; overflow: hidden; background: var(--wine); }

.socials {
  position: absolute; left: 36px; top: 38%; z-index: 3;
  list-style: none; margin: 0; padding: 0; display: grid; gap: 24px; font-weight: 600;
}
.socials li { opacity: 0; transform: translateX(-24px); transition: opacity 0.9s var(--ease), transform 0.9s var(--ease); }
.loaded .socials li { opacity: 1; transform: none; }
.loaded .socials li:nth-child(2) { transition-delay: 0.1s; }
.loaded .socials li:nth-child(3) { transition-delay: 0.2s; }
.loaded .socials li:nth-child(4) { transition-delay: 0.3s; }

/* ---- Circular photo ---- */
.img-wrap {
  position: absolute; left: 14%; bottom: 12%; z-index: 1;
  width: clamp(240px, 28vw, 420px);
  height: clamp(240px, 28vw, 420px);   /* same value as width = perfect circle */
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid var(--butter);
  transform: translate3d(0, calc(var(--sy) * 0.14px), 0);
}
.img-wrap .hero-img {
  position: absolute; inset: 0;
  width: 100%; height: 100%; max-width: none;
  object-fit: cover; object-position: center 20%;
  opacity: 0; transform: scale(1.15);
  transition: opacity 1.2s var(--ease), transform 1.4s var(--ease);
}
.loaded .img-wrap .hero-img { opacity: 1; transform: none; }

.badge {
  position: absolute; left: 34px; bottom: 40px; width: 120px; height: 120px; z-index: 3;
  display: grid; place-items: center; opacity: 0; transition: opacity 1s var(--ease) 0.8s;
}
.loaded .badge { opacity: 1; }
.badge svg { position: absolute; inset: 0; width: 100%; height: 100%; animation: spin 18s linear infinite; }
.badge text { font-size: 10px; fill: var(--butter); letter-spacing: 1px; }
.badge span { font-size: 28px; }
@keyframes spin { to { transform: rotate(360deg); } }

.hero-copy {
  position: absolute; right: 36px; bottom: 36px; z-index: 2; max-width: 600px; text-align: right;
  transform: translate3d(0, calc(var(--sy) * -0.08px), 0);
}
.intro {
  font-size: 20px; line-height: 1.4; margin: 0 0 28px;
  opacity: 0; transform: translateY(24px); transition: opacity 1s var(--ease) 0.5s, transform 1s var(--ease) 0.5s;
}
.loaded .intro { opacity: 1; transform: none; }

h1 { font-size: clamp(72px, 11vw, 160px); font-weight: 800; letter-spacing: -0.02em; line-height: 0.88; }
.line { display: block; overflow: hidden; padding-bottom: 0.04em; }
.inner { display: block; transform: translateY(105%); transition: transform 1.1s var(--ease) 0.3s; }
.inner.l2 { transition-delay: 0.45s; }
.loaded .inner { transform: none; }
.copy {
  font-size: 0.5em; border: 5px solid var(--butter); border-radius: 50%;
  width: 1.05em; height: 1.05em; display: inline-grid; place-items: center;
  vertical-align: top; margin-right: 12px;
}

@media (max-width: 900px) {
  .socials { display: none; }
  .img-wrap {
    left: 50%; top: 110px; bottom: auto;
    width: min(70vw, 300px); height: min(70vw, 300px);
    transform: translate3d(-50%, calc(var(--sy) * 0.14px), 0);
  }
  .hero-copy { left: 20px; right: 20px; bottom: 24px; }
  .intro { font-size: 16px; }
}
</style>