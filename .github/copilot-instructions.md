# Ehsan Law, PLLC - AI Coding Instructions

## Project Overview
Static website for an immigration law firm. **No build tools or frameworks** — pure HTML/CSS/JS deployed on Vercel.

## Architecture

### File Structure
```
├── index.html, about.html, attorney.html, contact.html, practice-areas.html, pricing.html
├── css/
│   ├── design-system.css  → Design tokens, reset, utilities (load FIRST)
│   ├── components.css     → Header, nav, mobile menu, language switcher
│   └── pages.css          → Page-specific layouts
├── js/main.js             → Mobile menu, FAQ accordion, counters, scroll behaviors
└── assets/                → Images (logo.png, footer-logo.png), fonts
```

## CSS Design System — ALWAYS Use Tokens

**Never use raw values.** Reference `css/design-system.css`:

```css
/* ✓ Correct */
color: var(--color-navy-800);
padding: var(--space-6);
font-size: var(--text-lg);
box-shadow: var(--shadow-gold);

/* ✗ Wrong — hardcoded values */
color: #243a6d;
padding: 1.5rem;
```

**Token reference:**
- **Colors:** `--color-navy-{500-900}`, `--color-gold-{300-500}`, `--color-teal-{400-600}`, `--color-gray-{50-900}`
- **Spacing:** `--space-{1,2,3,4,5,6,8,10,12,16,20,24,32}`
- **Typography:** `--text-{xs-5xl}` (fluid via `clamp()`), `--font-{light|normal|medium|semibold|bold|extrabold}`
- **Shadows:** `--shadow-{sm|md|lg|xl|2xl}`, `--shadow-gold` (gold glow for CTAs)
- **Radius:** `--radius-{sm|md|lg|xl|2xl|full}`
- **Z-index:** `--z-{dropdown|sticky|fixed|modal-backdrop|modal|tooltip}`

## HTML Patterns

### Page Template (all pages follow this exact structure)
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Meta, fonts, then CSS in order -->
  <link rel="stylesheet" href="css/design-system.css">
  <link rel="stylesheet" href="css/components.css">
  <link rel="stylesheet" href="css/pages.css">
</head>
<body>
  <a href="#main-content" class="skip-link">Skip to main content</a>
  <div class="top-bar">...</div>
  <header class="header" id="header">...</header>
  <main id="main-content">...</main>
  <footer class="footer">...</footer>
  <div class="mobile-sticky-cta">...</div>
  <script src="js/main.js"></script>
</body>
</html>
```

### BEM Class Naming
```html
<div class="service-card">
  <div class="service-card__icon">...</div>
  <h3 class="service-card__title">...</h3>
  <p class="service-card__description">...</p>
</div>
```

### Button Variants
```html
<a class="btn btn-primary">Primary CTA</a>
<a class="btn btn-secondary">Secondary</a>
<a class="btn btn-ghost">Ghost (on dark bg)</a>
<a class="btn btn-primary btn-lg">Large</a>
```

### Section Structure
```html
<section class="section">
  <div class="container">
    <div class="section-header text-center">
      <span class="text-label">Section Label</span>
      <h2>Section Title</h2>
    </div>
    <!-- content -->
  </div>
</section>
```

### Navigation Active State
Mark current page with `nav-link--active`:
```html
<a href="contact.html" class="nav-link nav-link--active">Contact</a>
```

## JavaScript Patterns (`js/main.js`)

- **Mobile menu:** Toggles `.is-open` on `.mobile-menu`, adds `body.menu-open`
- **FAQ accordion:** `.faq-item` toggles `.is-open` class
- **Scroll header:** Adds `.is-scrolled` to header after 100px scroll
- **Counter animation:** Elements with `data-count="50"` and optional `data-suffix="+"` animate on scroll
- **Form validation:** Adds `.is-invalid` to empty required fields

## Responsive Breakpoints
- `640px` — Small (`sm\:` utilities)
- `768px` — Medium (`md\:`)
- `1024px` — Desktop nav (hamburger → horizontal)

## Multilingual Support
- Languages: English, Farsi (فارسی), Pashto (پښتو)
- RTL: `body[dir="rtl"]` with `--font-family-farsi` (Vazirmatn font)

## Adding New Pages
1. Copy structure from `contact.html` (simplest template)
2. Update `<title>` and `<meta name="description">`
3. Set `nav-link--active` on correct nav item in both desktop and mobile menus
4. All three CSS files must load in order

## Icons
Inline SVGs with `class="icon icon-sm"`. Phone icon pattern (reused everywhere):
```html
<svg class="icon icon-sm" viewBox="0 0 24 24" fill="currentColor">
  <path d="M6.62 10.79c1.44 2.83 3.76..."/>
</svg>
```

## Hero Backgrounds
Use gradient overlay with Pexels images:
```css
background: linear-gradient(to right, rgba(26, 42, 74, 0.95) 0%, rgba(26, 42, 74, 0.4) 100%), 
            url('https://images.pexels.com/...') right center/cover no-repeat;
```

## Deployment
Vercel (`vercel.json`):
- **Clean URLs:** `/contact` → `contact.html` (no `.html` in links)
- **Caching:** Assets/CSS/JS cached 1 year with immutable headers
- **No build step** — files served directly
