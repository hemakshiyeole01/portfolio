# Hemakshi Yeole — Personal Portfolio

A handcrafted personal portfolio website built with pure HTML, CSS, and vanilla JavaScript. No frameworks, no build tools, no dependencies — just files you can open in a browser and deploy anywhere in seconds.

---

## The story behind this

This portfolio didn't come from a template generator or a drag-and-drop builder. It was **vibecoded** — a back-and-forth creative process between me and an AI where I knew exactly what I wanted and gave precise, opinionated instructions to build it.

I came in with a clear brief:

- A purple pastel palette I'd already chosen (`#82659D`, `#E5D9F2`, `#B99CC8`, `#DEC0F1`, `#AA9CED`, `#EBD8D0`)
- A storytelling flow — not a checklist of sections but a narrative arc: *Hello → The person behind the code → Things I'm good at → Things I've built → How I got here → Moments that mattered → Let's build something*
- A specific aesthetic reference: Apple, Linear, Vercel — minimal but rich, not a basic student template
- A split architecture with separate pages and a shared CSS/JS system
- Dark mode with a sun/moon toggle that persists across pages
- A design that felt **human**, not AI-generated

The instructions I gave weren't vague ("make it look good"). They were specific: *use DM Serif Display for editorial headings, morph the avatar blob, make the toggle button spin on hover, use the purple palette as a system not a theme dump, write the About page like a person not a resume.*

That's the difference between vibecoding and just prompting. You bring the taste. The AI brings the execution speed. The result is something that actually reflects you.

---

## Project structure

```
portfolio/
├── index.html                  ← Home page (entry point)
├── css/
│   └── style.css               ← All design tokens, components, dark/light mode
├── js/
│   └── main.js                 ← All interactivity (shared across every page)
└── pages/
    ├── about.html              ← Full story, values, FAQ, CTA strip
    ├── projects.html           ← All 7 projects, filter bar, detail modals
    ├── skills.html             ← 4-tab layout: overview, proficiency, tools, concepts
    └── certifications.html     ← Certs, achievements timeline, hackathons, leadership
```

---

## Features

- **Light / dark mode toggle** — sun and moon icons, preference saved to `localStorage`, persists across all pages
- **Storytelling flow** — each section reads like a chapter, not a resume field
- **Scroll reveal animations** — elements fade up as you scroll, staggered per group
- **Typewriter effect** — hero role cycles through 5 self-descriptions
- **Project filter bar** — filter by AI/NLP, Data Engineering, Full-Stack with smooth re-animation
- **Project detail modals** — click any project for a full breakdown, keyboard-accessible (Escape to close)
- **Animated skill progress bars** — trigger on scroll, per-category grouping
- **4-tab skills page** — overview cards / proficiency bars / tools grid / CS concepts cloud
- **Achievements timeline** — staggered reveal with coloured dots per entry
- **Floating cursor glow** — subtle radial gradient that follows your mouse (desktop only)
- **Scroll progress bar** — 3px gradient bar at the very top
- **Organic avatar blob** — continuously morphs its border-radius
- **Dark mode bg blobs** — three animated blur orbs visible only in dark mode
- **Fully responsive** — mobile, tablet, desktop all tested
- **Zero dependencies** — no npm, no build step, no framework

---

## Design system

### Colour palette

| Token | Light mode | Dark mode |
|---|---|---|
| `--plum` | `#82659D` | `#9b87c4` |
| `--lavender` | `#E5D9F2` | `rgba(170,156,237,.15)` |
| `--periwinkle` | `#AA9CED` | `#a78bfa` |
| `--lilac` | `#DEC0F1` | `#c4aee8` |
| `--deep` | `#4A3560` | `#c4b5f4` |
| `--ink` | `#2D1F42` | `#f0f2ff` |
| `--surface-base` | `#faf7fd` | `#060810` |
| `--surface-white` | `#ffffff` | `#0c0f1a` |
| `--accent` (dark only) | — | `#6c63ff` |
| `--accent2` (dark only) | — | `#a78bfa` |
| `--accent3` (dark only) | — | `#38bdf8` |

All tokens live in `css/style.css` under `:root` (light) and `[data-theme="dark"]`. Change a value once, it updates everywhere.

### Typography

- **Display / headings** — `DM Serif Display` (italic for accent words)
- **Body / UI** — `DM Sans` (weights 300–600)

### Motion

- `--ease-out: cubic-bezier(0.22, 1, 0.36, 1)` — smooth deceleration
- `--ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1)` — slight overshoot on hover

---


## How to update content without depending on anyone

Everything is plain HTML. You don't need an AI, a framework, or a CMS to update this. Here's the map:

### Add a new project

Open `pages/projects.html`. Copy any `<article class="project-card ...">` block and change:
- `data-cat` — one of `ai`, `data`, `fullstack`
- The gradient in `style="background:..."` on the thumb
- The emoji in `.project-thumb-icon`
- `.project-cat`, `.project-title`, `.project-desc`, `.project-stack` spans
- Add an entry to the `PROJECTS` object at the bottom of the page's `<script>` tag

### Update skills

Open `pages/skills.html`. Each skill card is a `.skill-card` div. Each progress bar is a `.skill-row` with a `data-pct="75"` attribute — just change the number.

### Update certifications or achievements

Open `pages/certifications.html`. Achievements are `.ach-item` divs inside `.ach-timeline`. Cert cards are `.cert-card` divs. Copy, paste, edit text.

### Change a colour

Open `css/style.css`. Find the token in `:root` (light mode) or `[data-theme="dark"]` (dark mode) and change the hex value. Every component that uses that token updates automatically.

### Add a new section to a page

Each section follows the same scaffold:
```html
<div class="your-section-class section reveal">
  <div class="inline-label">Label text</div>
  <h2 class="prose-heading">Your heading <em>here</em></h2>
  <p>Your content</p>
</div>
```
The `.reveal` class makes it animate in on scroll automatically — no JS changes needed.

### Add a new page

1. Copy any existing page from `pages/`
2. Change the `<title>`, breadcrumb, and content
3. Update the `nav-links` to add your new page (in all HTML files)
4. The page inherits all styles and JS from `css/style.css` and `js/main.js` automatically

### Add your real photo

Find `.avatar-inner` in `index.html`. Replace the `::after` pseudo-element with a real `<img>`:

```html
<div class="avatar-inner">
  <img src="your-photo.jpg" alt="Hemakshi Yeole"
       style="width:100%;height:100%;object-fit:cover;border-radius:inherit"/>
</div>
```

Remove the `.avatar-inner::after` rule from any page-specific `<style>` block.

### Update contact details

Search for `hemakshiyeole1@gmail.com` and `+91 96990 19204` across all HTML files and replace with updated details. They appear in `index.html` and `pages/about.html` most prominently.

---

## Keeping it fresh without AI

You genuinely don't need AI to maintain this. The patterns are consistent and intentional:

- **Every card** follows the same HTML structure — copy one, change the text
- **Every token** is named what it does — `--plum`, `--surface-white`, `--shadow-md`
- **Every animation** is CSS-only — change a `transition-delay` or `opacity` value
- **`initAll()`** in `main.js` wires everything — if you add a new page, call it the same way

The only time you'd benefit from AI again is if you want to add a genuinely new feature — a contact form with a backend, a blog section, a CMS integration, or a completely new page type. For everything else: the code is readable, the structure is logical, and the comments explain what each section does.

---

## Tech stack

| What | How |
|---|---|
| Markup | HTML5, semantic elements |
| Styling | Vanilla CSS, CSS custom properties, no preprocessor |
| Scripting | Vanilla JavaScript ES6+, no frameworks |
| Fonts | Google Fonts — DM Serif Display + DM Sans |
| Icons | Inline SVG (no icon library dependency) |
| Animations | CSS keyframes + Intersection Observer API |
| Theme persistence | `localStorage` |
| Deployment | Any static host (GitHub Pages, Netlify, Vercel) |

---

## Personal details to keep updated

| What | Where |
|---|---|
| Name, role, bio | `index.html` hero section |
| Email, phone, LinkedIn | `index.html` contact section + `pages/about.html` |
| GitHub URL | All `href="https://github.com/hemakshiyeole01"` instances |
| CGPA stat | `index.html` hero stats + `pages/certifications.html` |
| Projects | `pages/projects.html` grid + PROJECTS data object |
| Certifications | `pages/certifications.html` cert cards |
| Journey / timeline | `pages/about.html` (if added) + `index.html` experience section |

---

*Built with taste, precision, and very good instructions.*
