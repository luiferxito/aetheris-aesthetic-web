# PROMPTS_EVIDENCIA.md — Aetheris (estética & grooming clínico)

Documentación de evidencia de los prompts y decisiones de diseño ejecutadas en OpenCode durante la creación/actualización de este repositorio.

## 1. Sistema de Diseño (verificado a partir de `PROMPTS.md` y `style.css`)

### Paleta de colores HEX

| Nombre | HEX | Uso en el proyecto |
|--------|-----|-------------------|
| Background Base | `#0F172A` | Fondo general (`--bg-base`) |
| Surface / Cartas | `#1F2937` | Superficie de componentes (`--surface`) |
| Borde Acento | `#1E3A8A` | Bordes denavbar y cards (`--border-accent`) |
| Primary / CTA | `#3B82F6` | Botones primarios, hover `#2563EB` (`--primary`) |
| Acento Suave | `#E0F2FE` | Efectos overlay, badges (`--accent-soft`) |

### Fuentes

| Familia | Pesos | Uso |
|---------|-------|-----|
| **Space Grotesk** | 600, 700 | Títulos y encabezados (`--font-heading`) |
| **Plus Jakarta Sans** | 400, 500 | Cuerpo de texto (`--font-body`) |

Todas las fuentes se cargan vía Google Fonts CDN en el `<head>` de cada HTML.

---

## 2. Prompt Maestro Zero-Shot usado en Antigravity

```markdown
# Rol: Actúa como un Diseñador UI/UX Senior y Desarrollador Frontend experto en arquitectura web modular, Tailwind CSS (vía CDN), Google Fonts y Lucide Icons (vía CDN).

# Objetivo: Construir una aplicación web multipágina funcional y responsive (Mobile-First) para "AETHERIS — Estética Avanzada & Grooming Clínico", un centro de estética dermatológica, cuidado facial tecnológico y grooming masculino/unisex de lujo.

Arquitectura de Archivos (Crear todos los archivos separados y enlazados entre sí):

1. index.html (Landing Page principal)
2. servicios.html (Catálogo completo de tratamientos con filtros interactivos por categoría y precios en COP)
3. reservas.html (Formulario interactivo de agendamiento de citas con selección de especialista, servicio, fecha/hora y modal/tarjeta de confirmación dinámica)
4. style.css (Estilos personalizados, variables CSS, scroll suave, glassmorphism sutil y animaciones de transición)
5. script.js (Menú hamburguesa móvil, filtro de servicios en servicios.html, validación y confirmación del formulario de citas en reservas.html, y captura de diagnóstico rápido en index.html)

Sistema de Diseño y Tokens (Cumplimiento estricto WCAG AA):

- Fondo Base (Background): #0F172A (Azul medianoche profundo)
- Superficie / Tarjetas (Surface): #1F2937 con bordes sutiles #1E3A8A y radio rounded-xl
- Color Primario / Botones CTA: #3B82F6 (hover: #2563EB) con texto #F8FAFC
- Acento Suave / Badges e Iconos: #E0F2FE (usar bg-[#E0F2FE]/10 text-[#E0F2FE] para etiquetas e iconos)
- Texto Principal: #F8FAFC | Texto Secundario: #94A3B8
- Tipografías Google Fonts: Títulos en 'Space Grotesk' (pesos 600, 700) y Cuerpo en 'Plus Jakarta Sans' (pesos 400, 500).
- Espaciado: Secciones con py-16 px-6, transiciones suaves (transition-all duration-200).

URLs de Imágenes Unsplash (Usar exactamente estas, con object-cover y sin inventar otras):

- Hero Principal (index.html): https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80
- Tratamiento Facial / Dermatología (servicios.html): https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80
- Grooming & Barbería Clínica (servicios.html): https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80
- Tecnología & Bienestar Spa (index.html / reservas.html): https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=800&q=80

Estructura Detallada por Página:

- Navbar (Común en las 3 páginas): Sticky top con backdrop-blur, logo tipográfico "AETHERIS" con acento azul, enlaces a Inicio (index.html), Tratamientos (servicios.html), Reservas (reservas.html) y botón CTA "Agendar Cita".
- index.html:
  1. Hero Section: Diseño asimétrico de 2 columnas en escritorio (1 en móvil). Título de alto impacto, subtítulo de 2 líneas sobre estética clínica de precisión, formulario rápido de captura de email para "Diagnóstico Facial Gratuito" con feedback visual, e imagen Hero con aspect-video y borde #1E3A8A.
  2. Features Grid: 3 tarjetas sobre #1F2937 con iconos de Lucide (sparkles, shield-check, cpu), título h3 y descripción realista de tecnología estética.
  3. Vista previa de 3 tratamientos estrella con botón hacia servicios.html.
- servicios.html:
  1. Encabezado y barra de botones de filtro funcional con JS (Todos, Facial Clínico, Grooming VIP, Capilar).
  2. Grid de 6 tarjetas de servicios realistas con imagen, duración (ej. 45 min), precio en COP (ej. $180.000 COP) y botón directo que redirige a reservas.html.
- reservas.html:
  1. Formulario limpio sobre tarjeta #1F2937 con campos: Nombre completo, WhatsApp, Tratamiento (select), Especialista (Dra. Valentina Ríos, Dr. Mateo Vargas, Andrés Salazar), Fecha y Hora.
  2. Al enviar, mostrar un resumen visual de reserva confirmada en pantalla sin recargar la página.
- Footer (Común en las 3 páginas): 3 columnas con descripción de marca, navegación rápida, horarios en Barranquilla/Colombia, redes sociales y derechos de autor.

Restricciones Técnicas:

- Cero texto Lorem Ipsum; usa copywriting profesional en español enfocado en lujo, seguridad clínica y precisión.
- Asegura que no haya desbordamientos horizontales en pantallas móviles de 375px.

---

## 3. Micro-prompts quirúrgicos ejecutados en OpenCode

Lista numerada de las iteraciones de edición realizadas (total: **5 iteraciones**, hasta 5):

1. **Mover script de Lucide CDN** — En los 3 archivos HTML (`index.html`, `servicios.html`, `reservas.html`): el script `https://unpkg.com/lucide@latest` fue reubicado desde el `<head>` hasta justo antes de `</body>`, para garantizar que `lucide.createIcons()` se ejecute después de que el DOM está listo.

2. **Eliminar llamada inline a `lucide.createIcons()`** — Se removieron los bloques `<script>lucide.createIcons();</script>` de los 3 archivos HTML, centralizando la inicialización en `script.js`.

3. **Agregar `lucide.createIcons()` en `script.js`** — Se añadió la llamada `lucide.createIcons()` dentro del callback `DOMContentLoaded` de `script.js` (línea 158), asegurando que los íconos se rendericen después de que el DOM esté completamente parseado.

4. **Agregar transiciones de hover en CSS** — En `style.css`:
   - `.service-card` y `.feature-card` recibieron `transition: all 0.2s ease` en su regla base.
   - El estado `:hover` ahora aplica `transform: translateY(-4px)` y `border-color: var(--primary)` (i.e. `#3B82F6`), proporcionando un efecto de elevación suave en hover.

5. **Crear/actualizar AGENTS.md y PROMPTS_EVIDENCIA.md** — Se documentaron las instrucciones para futuras sesiones OpenCode (`AGENTS.md`) y el historial de prompts ejecutados (`PROMPTS_EVIDENCIA.md`), incluyendo el diseño del sistema, decisiones de CSS y estructura de páginas.

---

## Fuentes de verdad

- `PROMPTS.md` — Especificación completa del proyecto (arquitectura, diseño, copywriting, URLs de imágenes).
- `style.css` — Definición de tokens CSS (`--bg-base`, `--surface`, `--primary`, etc.) y reglas de componente.
- `AGENTS.md` — Instrucciones para futuras sesiones OpenCode.