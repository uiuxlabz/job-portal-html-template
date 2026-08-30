# JOBENTRY — Job Portal & Recruitment

**Connect. Apply. Succeed.**

A premium, framework-free HTML template for job portals and recruitment platforms. Built with semantic HTML5, modern CSS custom properties, and vanilla JavaScript — zero dependencies.

---

## Live Preview

Open `index.html` in any browser to preview the template.

---

## Pages

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Hero with job search form, featured jobs, stats, testimonials, CTA |
| Find Jobs | `jobs.html` | Filterable job listings grid with category tabs |
| About | `about.html` | Company story, mission & vision, team, values, culture gallery |
| Contact | `contact.html` | Contact form with validation, info cards, map placeholder |

---

## Features

- **Responsive** — Fluid layout with breakpoints at 980px and 720px
- **Mobile Navigation** — Slide-out menu with burger toggle and overlay
- **Scroll Animations** — IntersectionObserver-powered reveal effects (respects `prefers-reduced-motion`)
- **Job Search** — Hero search form with keyword, location, and category fields
- **Category Filters** — Interactive filter tabs on the jobs listing page
- **Form Validation** — Client-side validation with success/error feedback (`data-form`)
- **Counter Animation** — Animated stat counters with easing
- **Back to Top** — Scroll-aware floating button
- **Active Navigation** — Current page highlighted in nav

---

## Design System

### Colors
| Token | Hex | Usage |
|-------|-----|-------|
| Blue | `#2563EB` | Primary brand, CTAs, links |
| Green | `#16A34A` | Success, secondary actions, salary |
| Dark | `#111827` | Headings, footer, dark sections |
| White | `#FFFFFF` | Backgrounds, cards |

### Typography
- **Headings:** Plus Jakarta Sans (Google Fonts)
- **Body:** Inter (Google Fonts)

### CSS Custom Properties
All colors, spacing, shadows, radii, and transitions are defined as CSS variables on `:root` for easy theming.

---

## File Structure

```
job-portal-html-template/
  index.html
  jobs.html
  about.html
  contact.html
  README.md
  assets/
    css/
      style.css          (700+ lines — full design system)
    js/
      main.js            (vanilla JS — all interactivity)
    img/
      about-1.jpg        (15 images total)
      about-2.jpg
      about-3.jpg
      about-4.jpg
      carousel-1.jpg
      carousel-2.jpg
      com-logo-1.jpg
      com-logo-2.jpg
      com-logo-3.jpg
      com-logo-4.jpg
      com-logo-5.jpg
      testimonial-1.jpg
      testimonial-2.jpg
      testimonial-3.jpg
      testimonial-4.jpg
```

---

## Customization

1. **Colors:** Edit the `--brand-*` variables in `assets/css/style.css` under `:root`
2. **Fonts:** Change the `@import` URL and `--font-heading` / `--font-body` variables
3. **Content:** Edit HTML files directly — all text is inline, no data fetching
4. **Images:** Replace files in `assets/img/` (keep same filenames or update `src` attributes)

---

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## License

Free for personal and commercial use.
