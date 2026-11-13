# Protfix Portfolio

A single-page designer portfolio built with **Vue 3** and **Vite**, featuring scroll-triggered animations, a parallax hero, and a contact form. Responsive from mobile to desktop, with reduced-motion support.

## Features

- Hero with load-in sequence and scroll parallax
- About, Journey (timeline) and Contact sections that reveal as you scroll
- Fixed navigation with active-section highlighting
- Scroll progress bar
- Contact form with built-in validation (ready to connect to your backend)
- All content editable from one file
- Respects `prefers-reduced-motion`

## Tech Stack

| Tool | Purpose |
| --- | --- |
| Vue 3 (`<script setup>`) | UI components |
| Vite 6 | Dev server and build |
| IntersectionObserver | Scroll reveals and active nav |
| Google Fonts | Archivo (headings), Chakra Petch (body) |

No animation libraries are used.

## Getting Started

**Requirements:** Node.js 18 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:5173.

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server with hot reload |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |

## Project Structure

```
protfix/
├── index.html
├── package.json
├── vite.config.js
├── public/
│   └── images/                 hero.svg, about.svg, journey.svg (placeholders)
└── src/
    ├── main.js                 app entry, registers the v-reveal directive
    ├── App.vue                 page layout and progress bar
    ├── assets/
    │   └── styles.css          colors, global styles, reveal classes
    ├── data/
    │   └── content.js          all editable text, links and image paths
    ├── directives/
    │   └── reveal.js           v-reveal scroll animation directive
    ├── composables/
    │   └── useScroll.js        shared scroll position and progress
    └── components/
        ├── NavBar.vue
        ├── HeroSection.vue
        ├── AboutSection.vue
        ├── JourneySection.vue
        ├── ContactSection.vue
        ├── SiteFooter.vue
        └── PillButton.vue
```

## Customizing

### Content
Edit `src/data/content.js`:

| Export | Controls |
| --- | --- |
| `site` | Name, intro, badge text, phone, email, image paths |
| `nav` | Navigation links (`id` must match a section id) |
| `socials` | Social links in the hero |
| `about` | The three About blocks |
| `timeline` | Journey tiles (set `highlight: true` for the yellow tile) |
| `footerCols` | Footer link columns |
| `projectTypes`, `budgets` | Contact form dropdown options |

### Images
Replace the files in `public/images/` (any format, such as `.png`, `.jpg` or `.webp`) and update the paths in `site`. For the hero, use a portrait with a transparent background.

### Colors and fonts
Colors are CSS variables in `src/assets/styles.css`:

```css
:root {
  --wine: #5c0a14;
  --wine-2: #6b1119;
  --butter: #f0e08f;
  --butter-2: #ece096;
}
```

Fonts are loaded in `index.html` and set in `styles.css`.

## Scroll Animations

Add the `v-reveal` directive to any element:

```vue
<h2 v-reveal>Default: fade and slide up</h2>
<div v-reveal="'left'">Slide in from the left</div>
<img v-reveal="{ variant: 'scale', delay: 200 }" />
```

| Variant | Effect |
| --- | --- |
| `up` (default) | Fades in while sliding up |
| `left` / `right` | Slides in from the side |
| `scale` | Scales up from 92% |
| `clip` | Wipes in from the top (good for headings) |

`delay` is in milliseconds and is useful for staggering lists. Each element animates once, the first time it enters the viewport.

Other motion:
- **Hero parallax:** `HeroSection.vue` reads `scrollY` from `useScroll()` and offsets the image and text at different speeds.
- **Progress bar:** `App.vue` scales a bar using `progress` from `useScroll()`.
- **Active nav link:** `NavBar.vue` observes each section and underlines the one in view.

## Connecting the Contact Form

The form currently logs its data to the console. In `src/components/ContactSection.vue`, replace the body of `submit()`:

```js
async function submit() {
  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form),
  })
  sent.value = res.ok
}
```

Alternatively, point it at a form service such as Formspree or Web3Forms.

## Deployment

Run `npm run build` and upload the `dist/` folder to any static host:

- **Netlify / Vercel:** connect the repo, build command `npm run build`, output directory `dist`
- **GitHub Pages:** set `base: '/your-repo-name/'` in `vite.config.js`, then publish `dist/`
- **Any server:** serve `dist/` as static files

## Accessibility

- Visible keyboard focus on all interactive elements
- Semantic landmarks (`header`, `nav`, `main`, `footer`)
- Decorative elements hidden from screen readers
- Animations disabled when the user prefers reduced motion

## License

Add your license here (for example MIT).
