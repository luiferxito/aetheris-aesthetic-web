# AGENTS.md — Aetheris (estética & grooming clínico)

Static multi-page frontend site. There is **no build step, no package manager, no tests, no CI**. Files are plain HTML/CSS/JS opened directly or served statically.

## Files (create all, linked between each other)

- `index.html` — landing page
- `servicios.html` — treatment catalog with category/price filters (COP)
- `reservas.html` — appointment booking form (specialist, service, date/time, confirmation modal/card)
- `style.css` — custom styles, CSS variables, smooth scroll, glassmorphism, transitions
- `script.js` — mobile hamburger menu, service filter, booking validation/confirmation, index quick-diagnosis email capture

## Tech stack (CDN only — no install)

- Tailwind CSS via CDN
- Google Fonts: `Space Grotesk` (600, 700 for titles), `Plus Jakarta Sans` (400, 500 for body)
- Lucide Icons via CDN (`sparkles`, `shield-check`, `cpu` used on index)

## Design tokens (strict WCAG AA)

- Background: `#0F172A`
- Surface/cards: `#1F2937`, borders `#1E3A8A`, `rounded-xl`
- Primary/CTA: `#3B82F6` (hover `#2563EB`), text `#F8FAFC`
- Soft accent: `#E0F2FE` (`bg-[#E0F2FE]/10 text-[#E0F2FE]` for badges/icons)
- Text: primary `#F8FAFC`, secondary `#94A3B8`
- Sections: `py-16 px-6`, transitions `transition-all duration-200`

## Images — use exactly these Unsplash URLs, `object-cover`, do not invent others

- Hero (index): `https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80`
- Facial/Dermatology (servicios): `https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80`
- Grooming/Barbería (servicios): `https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80`
- Tech/Wellness Spa (index & reservas): `https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=800&q=80`

## Navbar (common to all 3 pages)

Sticky top, `backdrop-blur`, typographic "AETHERIS" logo with blue accent, links: Inicio (`index.html`), Tratamientos (`servicios.html`), Reservas (`reservas.html`), CTA "Agendar Cita".

## Copy & constraints

- Zero Lorem Ipsum. Professional Spanish copy focused on luxury, clinical safety, precision.
- No horizontal overflow on 375px mobile screens.
- Services prices in COP (e.g. `$180.000 COP`), durations (e.g. `45 min`).

## Specialists (reservas.html select)

Dra. Valentina Ríos, Dr. Mateo Vargas, Andrés Salazar.

## Source of truth

`PROMPTS.md` is the project spec. If anything here conflicts with it, trust `PROMPTS.md`.

## CSS: Hover transitions on cards

- `.service-card` and `.feature-card` have `transition: all 0.2s ease` on the base rule.
- Hover state: `transform: translateY(-4px)`, `border-color: var(--primary)` (i.e. `#3B82F6`).
- Other card types do not get these hover transitions.