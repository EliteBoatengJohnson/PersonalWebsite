<script setup>
defineProps({
  label: String,
  href: String,
  dark: Boolean,
  type: { type: String, default: 'button' },
})
</script>

<template>
  <div class="cta" :class="{ dark }">
    <span class="circle" aria-hidden="true">→</span>
    <component :is="href ? 'a' : 'button'" class="pill" :href="href" :type="href ? undefined : type">
      {{ label }}
    </component>
  </div>
</template>

<style scoped>
.cta { display: inline-flex; align-items: center; }
.circle {
  width: 46px; height: 46px; margin-right: -8px;
  border: 1.5px solid currentColor; border-radius: 50%;
  display: grid; place-items: center;
  transition: transform 0.4s var(--ease);
}
.pill {
  background: var(--butter); color: var(--wine);
  font: 600 15px 'Chakra Petch', sans-serif; text-transform: uppercase;
  padding: 14px 24px; border: 0; border-radius: 999px; cursor: pointer;
  transition: filter 0.2s;
}
.cta:hover .circle { transform: translateX(6px); }
.cta:hover .pill { filter: brightness(1.08); }
.cta.dark { color: var(--wine); }
.cta.dark .pill { background: var(--wine); color: var(--butter); }
</style>
