<script setup>
import { reactive, ref } from 'vue'
import { site, projectTypes, budgets } from '../data/content'
import PillButton from './PillButton.vue'

const form = reactive({ name: '', email: '', project: projectTypes[0], budget: budgets[2], details: '' })
const sent = ref(false)

function submit() {
  // TODO: replace with your API call, e.g.
  // await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
  console.log('Contact form:', { ...form })
  sent.value = true
}
</script>

<template>
  <section id="contact" class="contact">
    <div class="copy">
      <h2 v-reveal="'clip'">Let's create<br />something</h2>
      <p v-reveal="{ delay: 150 }">Have a project in mind, a creative idea to explore, or simply want to start a conversation? I'd love to hear what you're working on, whether you're building a new brand.</p>
      <div v-reveal="{ variant: 'left', delay: 300 }" class="card">
        <span class="dot" aria-hidden="true"></span>
        <div>
          <a :href="`tel:${site.phone.replace(/\s/g, '')}`">{{ site.phone }}</a><br />
          <a :href="`mailto:${site.email}`">{{ site.email }}</a>
        </div>
      </div>
    </div>

    <form v-reveal="'right'" class="form" @submit.prevent="submit">
      <label>Full name *
        <input v-model="form.name" required placeholder="Wyatt D. Wells" autocomplete="name" />
      </label>
      <label>Email address *
        <input v-model="form.email" type="email" required placeholder="you@email.com" autocomplete="email" />
      </label>
      <label>Project type *
        <select v-model="form.project"><option v-for="p in projectTypes" :key="p">{{ p }}</option></select>
      </label>
      <label>Budget range *
        <select v-model="form.budget"><option v-for="b in budgets" :key="b">{{ b }}</option></select>
      </label>
      <label class="full">Project details *
        <textarea v-model="form.details" required rows="6" placeholder="Tell me about your project"></textarea>
      </label>
      <div class="full actions">
        <PillButton label="Send message" type="submit" />
        <span v-if="sent" class="ok" role="status">Message sent. I'll reply soon.</span>
      </div>
    </form>
  </section>
</template>

<style scoped>
.contact { padding: 90px 36px; display: grid; grid-template-columns: 1fr 1.6fr; gap: 60px; overflow: hidden; }
h2 { font-size: clamp(40px, 5vw, 64px); font-weight: 800; margin-bottom: 16px; }
.copy p { font-size: 12px; line-height: 1.7; max-width: 44ch; opacity: 0.9; }
.card { margin-top: 90px; display: inline-flex; gap: 12px; align-items: center; background: var(--wine-2); padding: 8px 20px 8px 8px; border-radius: 999px; font-size: 11px; font-weight: 600; }
.dot { width: 34px; height: 34px; border-radius: 50%; background: var(--butter); }
.form { background: var(--wine-2); padding: 24px; display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
label { display: grid; gap: 8px; font-size: 11px; font-weight: 600; }
.full { grid-column: 1 / -1; }
input, select, textarea {
  background: rgba(0, 0, 0, 0.12); border: 1px solid rgba(240, 224, 143, 0.25); color: var(--butter);
  font: inherit; font-size: 12px; padding: 12px; text-transform: uppercase; border-radius: 4px;
  transition: border-color 0.3s, background 0.3s;
}
input:focus, select:focus, textarea:focus { border-color: var(--butter); background: rgba(0, 0, 0, 0.22); outline: none; }
select option { color: #222; }
::placeholder { color: rgba(240, 224, 143, 0.5); }
.actions { display: flex; align-items: center; gap: 16px; }
.ok { font-size: 12px; }

@media (max-width: 900px) {
  .contact { grid-template-columns: 1fr; padding: 70px 20px; gap: 36px; }
  .card { margin-top: 30px; }
  .form { grid-template-columns: 1fr; }
}
</style>
