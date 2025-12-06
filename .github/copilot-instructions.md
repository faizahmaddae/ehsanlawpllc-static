# Ehsan Law, PLLC - AI Coding Instructions

## Project Overview
Static website for an immigration law firm. Deployed on Vercel at `ehsanlawpllc-static.vercel.app`. Pure HTML/CSS/JS — no build tools or frameworks.

## Architecture

### File Structure
- **HTML Pages**: `index.html`, `about.html`, `attorney.html`, `contact.html`, `practice-areas.html`, `pricing.html`
- **CSS** (load order matters):
  1. `css/design-system.css` — Design tokens, base reset, utility classes, button/card components
  2. `css/components.css` — Header, navigation, mobile menu, language switcher
  3. `css/pages.css` — Page-specific layouts
- **JavaScript**: `js/main.js` (mobile menu, FAQ accordion, scroll behaviors)
- **Assets**: `assets/` — Images, SVG logos, fonts

### CSS Design System Conventions
Use CSS custom properties from `design-system.css`. **Never use raw values.**

```css
/* ✓ Correct */
color: var(--color-navy-800);
padding: var(--space-6);
font-size: var(--text-lg);

/* ✗ Wrong */
color: #0f2744;
padding: 1.5rem;
font-size: 1.25rem;
```

**Core tokens:**
- Colors: `--color-navy-{500-900}`, `--color-gold-{300-500}`, `--color-teal-{400-600}`, `--color-gray-{50-900}`
- Spacing: `--space-{1-32}` (0.25rem increments)
- Typography: `--text-{xs-5xl}` (fluid with `clamp()`), `--font-{light-extrabold}`
- Shadows: `--shadow-{sm-2xl}`, `--shadow-gold`
- Radius: `--radius-{sm-full}`

### HTML Patterns

**BEM-style class naming:**
```html
<div class="service-card">
  <div class="service-card__icon">...</div>
  <h3 class="service-card__title">...</h3>
  <p class="service-card__description">...</p>
</div>
```

**Button variants:**
```html
<a href="#" class="btn btn-primary">Primary CTA</a>
<a href="#" class="btn btn-secondary">Secondary</a>
<a href="#" class="btn btn-ghost">Ghost (on dark bg)</a>
<a href="#" class="btn btn-primary btn-lg">Large Primary</a>
```

**Section structure:**
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

### Mobile-First Responsive Breakpoints
- `640px` — Small devices (`sm\:` prefix in utilities)
- `768px` — Medium devices (`md\:`)
- `1024px` — Desktop navigation switches from hamburger to horizontal

### Multilingual Support
The site supports English, Farsi, and Pashto. RTL is handled via `body[dir="rtl"]` with `--font-family-farsi` (Vazirmatn).

## Key Patterns

### Adding New Pages
1. Copy existing page structure (header, top-bar, main, footer)
2. Update `nav-link--active` class in navigation
3. Set appropriate meta description and title
4. Link all three CSS files in correct order

### Icons
Inline SVGs with `class="icon icon-sm"`. Phone icon is commonly reused.

### Images
Use Pexels URLs for hero backgrounds with gradient overlays:
```css
background: linear-gradient(to right, rgba(26, 42, 74, 0.95) 0%, rgba(26, 42, 74, 0.4) 100%), 
            url('...') right center/cover no-repeat;
```

## Deployment
Vercel with `vercel.json` config:
- Clean URLs enabled (`.html` extension auto-added)
- Static assets cached with 1-year immutable headers
- No server-side processing needed
