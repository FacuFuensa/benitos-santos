# Benito Santos — Diseño del Sitio Web

**Fecha:** 2026-05-22  
**Estado:** Aprobado  
**Stack:** Next.js 14 App Router (Static Export), Tailwind CSS, Framer Motion  

---

## 1. Contexto

Sitio web para **Benito Santos**, café de especialidad en San Miguel de Tucumán, Argentina. Reemplaza su Linktree actual. 6 sucursales + La Tienda de Benito. Tráfico mayoritariamente desde Instagram en mobile.

**Idioma:** Español (todo el contenido)  
**Deploy:** Vercel (Static Export — CDN global, sin cold starts)

---

## 2. Arquitectura

### Modo de build
Next.js 14 con `output: 'export'` en `next.config.ts`. Genera HTML/CSS/JS estático. Sin Server Components dinámicos ni rutas de API. Actualizaciones de contenido = editar archivo TypeScript + push a GitHub.

### Estructura de archivos

```
benito-santos/
├── src/
│   ├── app/
│   │   ├── layout.tsx           # fonts, metadata global, WhatsApp flotante
│   │   ├── page.tsx             # Home
│   │   ├── carta/page.tsx       # Menú digital
│   │   ├── cowork/page.tsx      # Espacios cowork
│   │   └── ubicaciones/page.tsx # Sucursales
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── home/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── AboutSnippet.tsx
│   │   │   ├── FeaturedCards.tsx
│   │   │   ├── MenuDelDiaBanner.tsx
│   │   │   └── InstagramGrid.tsx
│   │   ├── carta/
│   │   │   ├── MenuTabs.tsx
│   │   │   ├── MenuSection.tsx
│   │   │   └── MenuItemCard.tsx
│   │   ├── cowork/
│   │   │   └── CoworkCard.tsx
│   │   ├── ubicaciones/
│   │   │   ├── LocationCard.tsx
│   │   │   └── MapEmbed.tsx
│   │   └── ui/
│   │       ├── WhatsAppButton.tsx
│   │       ├── Badge.tsx
│   │       └── Logo.tsx
│   ├── data/
│   │   ├── menu.ts              # Todos los ítems del menú (tipos TypeScript)
│   │   ├── menuDelDia.ts        # Menú del día — editable por no-técnicos
│   │   └── contact.ts           # Sucursales, maps, WhatsApp, redes
│   └── lib/
│       └── utils.ts             # formatPrice(), cn()
├── public/
│   └── images/                  # Placeholders Unsplash
└── tailwind.config.ts           # Colores y fuentes custom
```

---

## 3. Modelos de datos

### `menu.ts`

```ts
type Badge = 'sin-tacc' | 'vegano' | 'keto' | 'sin-azucar'

interface MenuItem {
  name: string
  description?: string
  price: number           // pesos sin formato (ej: 15000)
  badges?: Badge[]
  note?: string           // ej: "+$2.000 con palta"
}

interface MenuCategory {
  id: string              // slug para anchor (ej: 'desayunos')
  title: string
  subtitle?: string       // ej: "Todos incluyen café, té, jugo o limonada"
  includesNote?: string   // banner especial para El Lunch
  items: MenuItem[]
}

export const menuCategories: MenuCategory[] = [ /* ... */ ]
```

**Categorías:** Desayunos y Meriendas · El Brunch · Cafetería · Café Frío · Pastelería · Panadería · El Lunch · Nuestros Sandwiches · Té, Jugos y Otras Bebidas · Sin Gluten

### `menuDelDia.ts`

```ts
// ============================================
// MENÚ DEL DÍA — Disponible de 12:00 a 16:00hs
// Para actualizar: cambiá los valores abajo y
// hacé clic en "Commit changes" en GitHub
// ============================================
export const menuDelDia = {
  vigencia: 'Semana del 19 al 25 de mayo',  // ← CAMBIAR ESTO
  items: [
    { name: 'Tarta de Jamón y Queso', price: 15000 },
    { name: 'Tarta de Verduras', price: 15000 },
    { name: 'Ensalada Verde Toscana', price: 17000 },
    { name: 'Salteado de Lomo y Vegetales', price: 17000 },
    { name: 'Milanesa Tana', price: 17000 },
  ]
}
```

### `contact.ts`

Contiene las 6 sucursales + La Tienda de Benito, cada una con:
- `name`, `address`, `hours` (objeto con `weekdays` y `weekends`)
- `mapIframe` (URL de embed)
- `mapLink` (place_id URL para "Cómo llegar")
- `whatsapp` (número)
- `badges` (ej: `['pet-friendly']` para Praderas)
- `isStore?: boolean` (para La Tienda)

Redes sociales y WhatsApp defaults también en este archivo.

### `lib/utils.ts`

```ts
// formatPrice(15000) → "$15.000"
export function formatPrice(n: number): string {
  return '$' + n.toLocaleString('es-AR')
}
```

---

## 4. Páginas

### Home (`/`)

1. **HeroSection** — imagen Unsplash full-width (café vertido), overlay `#3B2F2F` 50%, texto "Auténtico Café de Especialidad" Playfair Display 900, CTA "Ver nuestra carta" → `/carta`
2. **AboutSnippet** — párrafo corto centrado, fondo `#E8DFD0`
3. **FeaturedCards** — 3 cards: Nuestra Carta / Nuestras Sucursales / Reservá el Cowork. Hover: `scale(1.02)` Framer Motion
4. **MenuDelDiaBanner** — fondo `#E8A948`, ítems de `menuDelDia.ts`, nota "12 a 16hs — Incluye bebida y café"
5. **Pet Friendly callout** — badge pata + texto
6. **InstagramGrid** — 6 imágenes Unsplash en grid 3×2, link a @benitosantoscafe

### Carta (`/carta`)

- **MenuTabs** sticky: horizontal scroll en mobile, Intersection Observer para auto-highlight del tab activo
- Smooth scroll al hacer clic en tab (offset para compensar altura del navbar + tabs)
- **MenuSection** por categoría: título (Nunito 800), subtítulo/nota, lista de MenuItemCards
- **MenuItemCard**: nombre (Montserrat 600 uppercase), descripción (Inter 400), precio formateado, badges inline
- Banner ámbar en "El Lunch" con nota "Incluye bebida y café"

### Cowork (`/cowork`)

- Dos **CoworkCard**: Yerba Buena (Güemes 151) y Praderas (Bascary, Complejo Docks)
- Foto placeholder Unsplash (coworking café), descripción, botón "Reservá tu lugar"
- WhatsApp links pre-llenados:
  - YB: `wa.me/5493816281499?text=Hola!%20Quiero%20reservar%20el%20cowork%20en%20Yerba%20Buena`
  - Praderas: `wa.me/5493816281509?text=Hola!%20Quiero%20reservar%20el%20cowork%20en%20Praderas`

### Ubicaciones (`/ubicaciones`)

- **LocationCard** por sucursal: nombre, dirección, horarios, `<iframe>` Google Maps, botones "Cómo llegar" y "Escribinos"
- Badge "Pet Friendly" (pata) en Praderas
- **La Tienda de Benito** — sección visualmente diferenciada (borde o fondo distinto), con link a @benitolatienda
- Todos los iframes y place_id links ya disponibles en `contact.ts`

---

## 5. Layout global

### Navbar
- Logo centrado (placeholder texto "BENITO SANTOS" en Playfair Display hasta recibir archivo SVG)
- Links: Carta · Sucursales · Cowork
- Mobile: hamburger menu con slide-down animado (Framer Motion)
- Fondo: `#E8DFD0` con leve sombra al hacer scroll (`backdrop-blur` opcional)

### Footer
- Horarios generales: Lun-Vie 7:30–21:30 / Sáb, Dom y Feriados 8:30–21:30
- Íconos sociales: Instagram (@benitosantoscafe, @benitolatienda), WhatsApp, Linktree
- Texto: "Benito Santos — Café de Origen"
- Fondo: `#3B2F2F` (dark charcoal), texto `#F5F0E8`

### WhatsAppButton (flotante)
- Bottom-right, `z-50`, siempre visible
- Color `#A3A87C` (olive green)
- Link: `wa.me/5493816281499?text=Hola!%20😊`
- Ícono WhatsApp SVG, animación pulse sutil

---

## 6. Diseño visual

### Paleta

| Token | Hex | Uso |
|-------|-----|-----|
| Primary | `#A3A87C` | Botones, navbar activo, WhatsApp button |
| Background | `#E8DFD0` | Fondo base de todas las páginas |
| Accent | `#E8A948` | Menú del día banner, badges, hover states |
| Text Dark | `#3B2F2F` | Headings y body sobre fondos claros |
| Text Light | `#F5F0E8` | Texto sobre fondos oscuros |
| Soft Highlight | `#D5CBBD` | Patrón de círculos decorativos |

### Tipografía

| Rol | Fuente | Peso | Observación |
|-----|--------|------|-------------|
| Hero / H1 | Playfair Display | 900 | 64px mobile / 96px desktop |
| Section titles | Playfair Display | 700 | 36–48px |
| Category names | Nunito | 800 | 24px |
| Item names | Montserrat | 600 | uppercase, letter-spacing 0.15em |
| Body | Inter | 400/500 | 16px |
| Precios | Montserrat | 700 | color `#3B2F2F` |

### Patrón de fondo
Círculos grandes semi-transparentes en `#D5CBBD` al 20% de opacidad, implementados con CSS `radial-gradient` como `background-image` repetido. Sin assets adicionales.

### Animaciones (Framer Motion)
- `fadeInUp` en cards y secciones al entrar en viewport (`threshold: 0.1`)
- Transición entre páginas: fade 0.3s
- Tab activo en carta: underline con `layoutId`
- Hover en FeaturedCards: `scale: 1.02`
- Hamburger menu: slide-down con `AnimatePresence`

---

## 7. UX y accesibilidad

- Mobile-first — navbar colapsa en `<768px`, tabs con scroll horizontal sin scrollbar visible
- Smooth scroll con offset (navbar height + tabs height)
- `lang="es"` en `<html>`
- `alt` en todas las imágenes
- Botones con `aria-label` descriptivos
- Colores con contraste WCAG AA mínimo

---

## 8. SEO y metadata

- `metadata` de Next.js en cada página (title + description en español)
- Título base: "Benito Santos — Café de Especialidad en Tucumán"
- `og:title`, `og:description` por página
- `og:image` placeholder (reemplazar con foto real antes de deploy final)
- Favicon: placeholder, reemplazar con logo real

---

## 9. Pendientes del cliente (no bloquean el build)

1. Archivos de logo SVG/PNG (Benito Santos + La Tienda)
2. Fotos profesionales (interior, comida, cowork)
3. URL exacta de Facebook
4. Horarios completos de Praderas (actualmente solo viernes)
5. Horarios de Barrio Sur — confirmar apertura 7:00 en semana
6. Frecuencia de rotación del Menú del Día
7. Detalles del cowork (precio, capacidad, amenities)
8. Info de delivery (PedidosYa, Rappi, etc.)
9. Productos de La Tienda (café en grano, merch, etc.)
10. Aclaración sobre pan sin TACC (¿disponible para todos los ítems?)
