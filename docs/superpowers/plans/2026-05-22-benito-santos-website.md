# Benito Santos Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a complete, mobile-first Next.js 14 static website for Benito Santos specialty coffee shop in Tucumán, Argentina — covering a Home, digital Menu, Coworking, and Locations page.

**Architecture:** Next.js 14 App Router with `output: 'export'` (fully static, zero cold starts on Vercel CDN). All content lives in TypeScript data files under `src/data/`. UI is split into small, focused client/server components. No backend, no API routes needed.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, Framer Motion, Google Fonts (Playfair Display · Nunito · Montserrat · Inter), Vitest for utility tests.

---

## File Map

| File | Responsibility |
|------|---------------|
| `next.config.ts` | Static export, unoptimized images |
| `tailwind.config.ts` | Brand colors, font variables |
| `src/app/globals.css` | Base styles, coffee-ring bg pattern, scrollbar-hide |
| `src/app/layout.tsx` | Root HTML, fonts, Navbar, Footer, WhatsAppButton |
| `src/app/page.tsx` | Home page composition |
| `src/app/carta/page.tsx` | Menu page composition |
| `src/app/cowork/page.tsx` | Cowork page composition |
| `src/app/ubicaciones/page.tsx` | Locations page composition |
| `src/data/menu.ts` | All menu categories + items with TypeScript types |
| `src/data/menuDelDia.ts` | Editable daily menu (non-technical-friendly) |
| `src/data/contact.ts` | Locations, Google Maps URLs, WhatsApp, social links |
| `src/lib/utils.ts` | `formatPrice()`, `cn()` |
| `src/lib/utils.test.ts` | Vitest tests for `formatPrice()` |
| `src/components/layout/Navbar.tsx` | Sticky nav, hamburger mobile menu |
| `src/components/layout/Footer.tsx` | Hours, social links, copyright |
| `src/components/ui/WhatsAppButton.tsx` | Floating bottom-right WhatsApp CTA |
| `src/components/ui/Badge.tsx` | Sin TACC / Vegano / Keto / Sin Azúcar chips |
| `src/components/ui/Logo.tsx` | Text placeholder logo |
| `src/components/home/HeroSection.tsx` | Full-viewport hero with CTA |
| `src/components/home/AboutSnippet.tsx` | Short about paragraph |
| `src/components/home/FeaturedCards.tsx` | 3 nav cards (Carta / Sucursales / Cowork) |
| `src/components/home/MenuDelDiaBanner.tsx` | Amber banner with daily lunch items |
| `src/components/home/InstagramGrid.tsx` | 6-image Unsplash placeholder grid |
| `src/components/carta/MenuItemCard.tsx` | Single menu item (name, desc, price, badges) |
| `src/components/carta/MenuSection.tsx` | Category section with header + item list |
| `src/components/carta/MenuTabs.tsx` | Sticky tabs + Intersection Observer (client) |
| `src/components/cowork/CoworkCard.tsx` | Cowork space card with WhatsApp CTA |
| `src/components/ubicaciones/MapEmbed.tsx` | Google Maps iframe wrapper |
| `src/components/ubicaciones/LocationCard.tsx` | Location card with hours, map, buttons |

---

## Task 1: Project scaffold and configuration

**Files:**
- Create: `next.config.ts`
- Modify: `tailwind.config.ts`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Scaffold Next.js project**

Run in `C:\Benitos santos`:
```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --no-turbopack --yes
```
Expected: project files created (package.json, src/, public/, etc.)

- [ ] **Step 2: Install dependencies**
```bash
npm install framer-motion clsx tailwind-merge
npm install -D vitest
```

- [ ] **Step 3: Replace `next.config.ts`**
```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
}

export default nextConfig
```

- [ ] **Step 4: Replace `tailwind.config.ts`**
```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: '#A3A87C',
        background: '#E8DFD0',
        accent: '#E8A948',
        'text-dark': '#3B2F2F',
        'text-light': '#F5F0E8',
        'soft-highlight': '#D5CBBD',
      },
      fontFamily: {
        playfair: ['var(--font-playfair)', 'serif'],
        nunito: ['var(--font-nunito)', 'sans-serif'],
        montserrat: ['var(--font-montserrat)', 'sans-serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 5: Replace `src/app/globals.css`**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: #E8DFD0;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--background);
  color: #3B2F2F;
}

/* Coffee ring background pattern */
.coffee-rings-bg {
  background-image:
    radial-gradient(circle, transparent 55px, rgba(213, 203, 189, 0.35) 55px, rgba(213, 203, 189, 0.35) 60px, transparent 60px),
    radial-gradient(circle, transparent 90px, rgba(213, 203, 189, 0.2) 90px, rgba(213, 203, 189, 0.2) 96px, transparent 96px),
    radial-gradient(circle, transparent 40px, rgba(213, 203, 189, 0.25) 40px, rgba(213, 203, 189, 0.25) 44px, transparent 44px);
  background-size: 280px 280px, 440px 440px, 320px 320px;
  background-position: 0 0, 140px 80px, 60px 200px;
}

/* Hide scrollbar while keeping scroll functionality */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
```

- [ ] **Step 6: Delete default boilerplate**

Delete `src/app/page.tsx` content (will be replaced in Task 6).
Delete `public/next.svg`, `public/vercel.svg`.

- [ ] **Step 7: Add Vitest config**

Create `vitest.config.ts`:
```ts
import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  test: {
    environment: 'node',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

Add to `package.json` scripts:
```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 8: Commit**
```bash
git add -A
git commit -m "chore: scaffold Next.js 14 static export project with brand config"
```

---

## Task 2: Utility functions and tests

**Files:**
- Create: `src/lib/utils.ts`
- Create: `src/lib/utils.test.ts`

- [ ] **Step 1: Write the failing test first**

Create `src/lib/utils.test.ts`:
```ts
import { describe, it, expect } from 'vitest'
import { formatPrice } from './utils'

describe('formatPrice', () => {
  it('formats thousands with dots (Argentine convention)', () => {
    expect(formatPrice(15000)).toBe('$15.000')
  })

  it('formats numbers under 1000 without separator', () => {
    expect(formatPrice(999)).toBe('$999')
  })

  it('formats 1600 correctly', () => {
    expect(formatPrice(1600)).toBe('$1.600')
  })

  it('formats large numbers', () => {
    expect(formatPrice(17000)).toBe('$17.000')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**
```bash
npm test
```
Expected: FAIL — "Cannot find module './utils'"

- [ ] **Step 3: Implement `src/lib/utils.ts`**
```ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

// formatPrice(15000) → "$15.000"
export function formatPrice(amount: number): string {
  return '$' + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}
```

- [ ] **Step 4: Run tests and verify they pass**
```bash
npm test
```
Expected: 4 tests PASS

- [ ] **Step 5: Commit**
```bash
git add src/lib/utils.ts src/lib/utils.test.ts vitest.config.ts
git commit -m "feat: add formatPrice utility with tests"
```

---

## Task 3: Data files

**Files:**
- Create: `src/data/menu.ts`
- Create: `src/data/menuDelDia.ts`
- Create: `src/data/contact.ts`

- [ ] **Step 1: Create `src/data/menu.ts`**
```ts
export type Badge = 'sin-tacc' | 'vegano' | 'keto' | 'sin-azucar'

export interface MenuItem {
  name: string
  description?: string
  price: number
  badges?: Badge[]
  note?: string
}

export interface MenuCategory {
  id: string
  title: string
  subtitle?: string
  includesNote?: string
  items: MenuItem[]
}

export const menuCategories: MenuCategory[] = [
  {
    id: 'desayunos',
    title: 'Desayunos y Meriendas',
    subtitle: 'Todos incluyen café, té, jugo de naranja o limonada',
    items: [
      {
        name: 'Desayuno Merienda Light',
        description: 'Tostadas en pan de masa madre (o sin gluten) con queso y mermelada o manteca y dulce de leche.',
        price: 10000,
      },
      {
        name: 'Tostado Clásico',
        description: 'Con jamón cocido y queso en pan de molde.',
        price: 14500,
      },
      {
        name: 'Pancakes de Avena',
        description: 'Con fruta de estación, pasta de maní, granola y miel.',
        price: 13500,
      },
      {
        name: 'Huevos Revueltos',
        description: 'Con pan de masa madre.',
        price: 13000,
        note: 'Podés agregar palta, hongos salteados o panceta crocante. +$2.000',
      },
      {
        name: 'Tostada Francesa',
        description: 'Con frosting de queso crema, fruta de estación, miel y coulis de frutos rojos.',
        price: 14500,
      },
      {
        name: 'Yogurt Griego',
        description: 'Con granola artesanal, miel y frutas de estación.',
        price: 14500,
      },
      {
        name: 'Avocado Toast',
        description: 'Con palta rústica y en gajitos, huevo poché y mix de semillas.',
        price: 15000,
      },
    ],
  },
  {
    id: 'brunch',
    title: 'El Brunch',
    subtitle: 'No incluye infusión',
    items: [
      {
        name: 'Bowl Keto',
        description: 'Cazuela de huevos revueltos, cherrys asados, panceta crocante, palta y queso ahumado. Sale con tostada de masa madre o keto. La estrella de la casa.',
        price: 15000,
        badges: ['keto'],
      },
      {
        name: 'Omelette de Hongos y Espinaca',
        description: 'Omelette de huevos relleno con espinacas salteadas, hongos y queso ahumado.',
        price: 12000,
      },
      {
        name: 'Montaditos Keto',
        description: 'Dos tostadas en pan keto con hummus de remolacha, palta, mix de semillas y huevo poché.',
        price: 11000,
        badges: ['keto'],
      },
      {
        name: 'Tostón de Salmón Ahumado',
        description: 'Con requesón y alcaparras.',
        price: 15500,
      },
      {
        name: 'Bowl de Frutas',
        description: 'Frutas de estación en gajos.',
        price: 12000,
      },
    ],
  },
  {
    id: 'cafeteria',
    title: 'Cafetería',
    items: [
      { name: 'Espresso', price: 4000 },
      { name: 'Americano', price: 4400 },
      { name: 'Café Hindú', description: 'Cúrcuma y otras especias.', price: 4800 },
      { name: 'Cortado Suave', price: 4000 },
      { name: 'Cortado Cargado', price: 4300 },
      { name: 'Macchiatto Doble', price: 4100 },
      { name: 'Latte Macchiatto', price: 4000 },
      { name: 'Cappuccino', price: 4400 },
      { name: 'Flat White', price: 4600 },
      { name: 'Latte', price: 4800 },
      { name: 'Latte con Doble Shot de Café', price: 5000 },
      { name: 'Mocca', price: 5000 },
      { name: 'Nutelatte', price: 5700 },
      { name: 'Golden Milk', price: 5700 },
    ],
  },
  {
    id: 'cafe-frio',
    title: 'Café Frío',
    items: [
      { name: 'Iced Americano', price: 4600 },
      { name: 'Iced Flat', price: 4800 },
      { name: 'Iced Latte', price: 4900 },
      { name: 'Iced Mocca', price: 5200 },
      { name: 'Frappé', price: 5700 },
      { name: 'Affogatto', price: 5900 },
      { name: 'Cold Brew', price: 5200 },
    ],
  },
  {
    id: 'pasteleria',
    title: 'Pastelería',
    items: [
      { name: 'Budín Limón y Amapolas', price: 4200 },
      { name: 'Budín Zanahoria con Glaseado de Queso Crema', price: 4200 },
      {
        name: 'Budín Vegano de Chocolate Amargo',
        price: 4600,
        badges: ['vegano'],
      },
      {
        name: 'Budín Vegano de Naranja y Frambuesa',
        description: 'Sin TACC y sin azúcar.',
        price: 4600,
        badges: ['vegano', 'sin-tacc', 'sin-azucar'],
      },
      { name: 'Budín del Día', price: 4400 },
      { name: 'Alfajor de Nuez y Dulce de Leche', price: 4400 },
      { name: 'Alfajor Brownie', price: 4600 },
      { name: 'Alfajor Coco y Dulce de Leche', price: 4400 },
      {
        name: 'Pepas',
        description: 'Vegana de chocolate y pasta de maní, o limón y choco blanco, o frutos rojos.',
        price: 1600,
        badges: ['vegano'],
      },
      { name: 'Cookies Americanas', price: 4600 },
      { name: 'Biscottis de Almendras y Castañas de Cajú', price: 2400 },
      {
        name: 'Brownie Keto',
        description: 'Choco 70% cacao.',
        price: 4600,
        badges: ['keto'],
      },
      {
        name: 'Torta Benito',
        description: 'Finas capas de nuez intercaladas con dulce de leche y nueces.',
        price: 5500,
      },
    ],
  },
  {
    id: 'panaderia',
    title: 'Panadería',
    items: [
      { name: 'Medialuna Dulce', price: 2500 },
      { name: 'Medialuna Salada', price: 2500 },
      { name: 'Croissant', price: 4400 },
      { name: 'Croissant Jamón y Queso', price: 9200 },
      { name: 'Croissant con Nutella y Banana', price: 9200 },
      {
        name: 'Croissant de Verano',
        description: 'Con frosting de queso crema, fruta de estación y crocante de nueces caramelizadas.',
        price: 9200,
      },
    ],
  },
  {
    id: 'lunch',
    title: 'El Lunch',
    subtitle: 'Disponibles de 12:00 a 16:00hs',
    includesNote: 'Incluye bebida y café',
    items: [
      {
        name: 'Tarta de Jamón y Queso',
        description: 'Con ensaladita verde y tomates cherrys.',
        price: 15000,
      },
      {
        name: 'Tarta de Verduras',
        description: 'Con ensaladita verde y tomates cherrys.',
        price: 15000,
      },
      {
        name: 'Ensalada Verde Toscana',
        description: 'Brócolis, panceta crocante, escamas de sardo, nueces pecan, láminas de zanahoria y huevo poché.',
        price: 17000,
      },
      {
        name: 'Salteado de Lomo y Vegetales',
        description: 'Acompañado de tortillas de maíz morado.',
        price: 17000,
      },
      {
        name: 'Milanesa Tana',
        description: 'Milanesa de pollo con salsa de tomate y queso, acompañada de ensalada coleslaw y gajos de papas.',
        price: 17000,
      },
    ],
  },
  {
    id: 'sandwiches',
    title: 'Nuestros Sandwiches',
    subtitle: 'No incluyen infusión',
    items: [
      {
        name: 'Chipá',
        description: 'Con jamón y queso, o tomate, queso y albahaca.',
        price: 11000,
      },
      {
        name: 'Tostado de Ternera',
        description: 'Con lechuga, queso y tomate.',
        price: 13500,
      },
      {
        name: 'Croque Benito',
        description: 'Con jamón, huevo, salsa bechamel y queso sardo gratinado.',
        price: 13000,
      },
      {
        name: 'Baguette Veggie',
        description: 'Con requesón, espinaca salteada, zucchinis y cherrys asados.',
        price: 12000,
      },
      {
        name: 'Baguette César',
        description: 'Hojas verdes, pollo y sardo rallado.',
        price: 13500,
      },
      {
        name: 'Croiss Roll Ahumado',
        description: 'Con lomito ahumado, requesón, queso sardo, tomate y rúcula.',
        price: 14500,
      },
    ],
  },
  {
    id: 'bebidas',
    title: 'Té, Jugos y Otras Bebidas',
    items: [
      { name: 'Té en Hebras', description: 'Negro, rojo o verde.', price: 4600 },
      { name: 'Té Frío', price: 4600 },
      { name: 'Shaked Tea', price: 4800 },
      { name: 'Chai Latte', price: 4800 },
      {
        name: 'Ginger Latte',
        description: 'Leche texturizada, almíbar de jengibre y canela.',
        price: 4800,
      },
      { name: 'Exprimido de Naranja', price: 4800 },
      { name: 'Limonada de Menta y Jengibre', price: 4800 },
      { name: 'Limonada con Espirulina', price: 5200 },
      {
        name: 'Jugo Natural Rojo',
        description: 'Antioxidante y energético: remolacha, manzana roja, frutos rojos, naranja y miel.',
        price: 5800,
      },
      {
        name: 'Jugo Natural Dorado',
        description: 'Vit. C + Refuerzo inmunológico: zanahoria, mango, naranja, jengibre y miel.',
        price: 5800,
      },
      {
        name: 'Jugo Natural Verde',
        description: 'Detox refrescante: espinaca, manzana verde, lima, menta, limón y miel.',
        price: 5800,
      },
      { name: 'Licuado de Banana con Leche y Miel', price: 5500 },
      { name: 'Chocolatada', price: 4600 },
    ],
  },
  {
    id: 'sin-gluten',
    title: 'Sin Gluten',
    items: [
      { name: 'Alfajor de Maicena', price: 4200, badges: ['sin-tacc'] },
      { name: 'Alfajor de Almendra y Dulce de Leche', price: 4600, badges: ['sin-tacc'] },
      { name: 'Galleta Pepito', price: 3800, badges: ['sin-tacc'] },
      { name: 'Galleta Pasta de Maní y Choco', price: 3800, badges: ['sin-tacc'] },
    ],
  },
]
```

- [ ] **Step 2: Create `src/data/menuDelDia.ts`**
```ts
// ============================================
// MENÚ DEL DÍA — Disponible de 12:00 a 16:00hs
// Para actualizar: cambiá los valores abajo y
// hacé clic en "Commit changes" en GitHub.
// No cambies nada fuera de este bloque.
// ============================================

export interface MenuDelDiaItem {
  name: string
  price: number
}

export interface MenuDelDia {
  vigencia: string  // ← CAMBIAR: período que cubre este menú
  items: MenuDelDiaItem[]
}

export const menuDelDia: MenuDelDia = {
  vigencia: 'Semana del 19 al 25 de mayo',  // ← CAMBIAR ESTO

  // ↓ CAMBIAR los platos y precios según corresponda
  items: [
    { name: 'Tarta de Jamón y Queso', price: 15000 },
    { name: 'Tarta de Verduras', price: 15000 },
    { name: 'Ensalada Verde Toscana', price: 17000 },
    { name: 'Salteado de Lomo y Vegetales', price: 17000 },
    { name: 'Milanesa Tana', price: 17000 },
  ],
  // ↑ FIN DEL BLOQUE A EDITAR
}
```

- [ ] **Step 3: Create `src/data/contact.ts`**
```ts
export type LocationBadge = 'pet-friendly'

export interface Location {
  id: string
  name: string
  address: string
  hours: {
    weekdays: string
    weekends: string
    extra?: string
  }
  mapIframe: string
  mapLink: string
  whatsapp: string
  whatsappMessage: string
  badges?: LocationBadge[]
  isStore?: boolean
  instagram?: string
  note?: string
}

export const locations: Location[] = [
  {
    id: 'barrio-norte',
    name: 'Sucursal Barrio Norte',
    address: 'Santa Fé 298, San Miguel de Tucumán',
    hours: {
      weekdays: 'Lun–Vie 7:30–21:30',
      weekends: 'Sáb, Dom y Feriados 8:30–21:30',
    },
    mapIframe: 'https://maps.google.com/maps?q=-26.8207931,-65.19888929999999&z=17&output=embed',
    mapLink: 'https://www.google.com/maps/place/?q=place_id:ChIJ4-NDWnxdIpQRRRDIHQHhJIQ',
    whatsapp: '5493816281499',
    whatsappMessage: 'Hola! 😊',
  },
  {
    id: 'barrio-sur',
    name: 'Sucursal Barrio Sur',
    address: 'Pje. 2 de Abril 398, San Miguel de Tucumán',
    hours: {
      weekdays: 'Lun–Vie 7:00–21:30',
      weekends: 'Sáb, Dom y Feriados 8:30–21:30',
    },
    mapIframe: 'https://maps.google.com/maps?q=-26.8364531,-65.2050872&z=17&output=embed',
    mapLink: 'https://www.google.com/maps/place/?q=place_id:ChIJsSe6HwBdIpQR20aPBpD3ZrY',
    whatsapp: '5493816281499',
    whatsappMessage: 'Hola! 😊',
  },
  {
    id: 'microcentro',
    name: 'Sucursal Microcentro',
    address: 'Virgen de la Merced 120, San Miguel de Tucumán',
    hours: {
      weekdays: 'Lun–Vie 7:30–21:30',
      weekends: 'Sáb, Dom y Feriados 8:30–21:30',
    },
    mapIframe: 'https://maps.google.com/maps?q=-26.8297094,-65.2013881&z=17&output=embed',
    mapLink: 'https://www.google.com/maps/place/?q=place_id:ChIJBfFcaT1dIpQRWVd4xAXKPfU',
    whatsapp: '5493816281499',
    whatsappMessage: 'Hola! 😊',
  },
  {
    id: 'praderas',
    name: 'Sucursal Praderas',
    address: 'Calle Bascary, Complejo Docks, Yerba Buena',
    hours: {
      weekdays: 'Viernes 7:30–21:30',
      weekends: 'Horario completo pendiente de confirmar',
    },
    mapIframe: 'https://maps.google.com/maps?q=-26.798724300000003,-65.2846234&z=17&output=embed',
    mapLink: 'https://www.google.com/maps/place/?q=place_id:ChIJURvKTABdIpQRSprQrLGZNpw',
    whatsapp: '5493816281509',
    whatsappMessage: 'Hola! 😊',
    badges: ['pet-friendly'],
    note: 'Pet Café — ¡Las mascotas son bienvenidas!',
  },
  {
    id: 'yerba-buena',
    name: 'Sucursal Yerba Buena',
    address: 'Güemes 151, Yerba Buena, Tucumán',
    hours: {
      weekdays: 'Lun–Vie 7:30–21:30',
      weekends: 'Sáb, Dom y Feriados 8:30–21:30',
    },
    mapIframe: 'https://maps.google.com/maps?q=-26.815399,-65.2908552&z=17&output=embed',
    mapLink: 'https://www.google.com/maps/place/?q=place_id:ChIJEYzem0FDIpQRKBm922nMQBo',
    whatsapp: '5493816281499',
    whatsappMessage: 'Hola! 😊',
  },
  {
    id: 'portal-shopping',
    name: 'Sucursal Portal Shopping',
    address: 'Av. Fermín Cariola 42, San Miguel de Tucumán',
    hours: {
      weekdays: 'Lun–Vie 7:30–21:30',
      weekends: 'Sáb, Dom y Feriados 8:30–21:30',
    },
    mapIframe: 'https://maps.google.com/maps?q=-26.8222629,-65.26704090000001&z=17&output=embed',
    mapLink: 'https://www.google.com/maps/place/?q=place_id:ChIJfy8bLQBdIpQRVY89w48EveM',
    whatsapp: '5493816281499',
    whatsappMessage: 'Hola! 😊',
  },
  {
    id: 'la-tienda',
    name: 'La Tienda de Benito',
    address: 'Santa Fe 440, San Miguel de Tucumán',
    hours: {
      weekdays: 'Todos los días 8:00–21:00',
      weekends: 'Todos los días 8:00–21:00',
    },
    mapIframe: 'https://maps.google.com/maps?q=-26.8204072,-65.2012402&z=17&output=embed',
    mapLink: 'https://www.google.com/maps/place/?q=place_id:ChIJ-0YIKQBdIpQRiLxmCl0YgJA',
    whatsapp: '5493816281499',
    whatsappMessage: 'Hola! 😊',
    isStore: true,
    instagram: 'https://instagram.com/benitolatienda',
    note: 'Tienda especializada en café de origen, productos artesanales y accesorios.',
  },
]

export const social = {
  instagram: 'https://instagram.com/benitosantoscafe',
  instagramHandle: '@benitosantoscafe',
  instagramTienda: 'https://instagram.com/benitolatienda',
  instagramTiendaHandle: '@benitolatienda',
  whatsappDefault: '5493816281499',
  whatsappDefaultLink: 'https://wa.me/5493816281499?text=Hola!%20%F0%9F%98%8A',
  linktree: 'https://linktr.ee/benitosantoscafe',
}

export const globalHours = {
  weekdays: 'Lun–Vie 7:30–21:30',
  weekends: 'Sáb, Dom y Feriados 8:30–21:30',
}
```

- [ ] **Step 4: Commit**
```bash
git add src/data/
git commit -m "feat: add complete menu, daily menu, and contact data files"
```

---

## Task 4: UI primitive components

**Files:**
- Create: `src/components/ui/Badge.tsx`
- Create: `src/components/ui/Logo.tsx`

- [ ] **Step 1: Create `src/components/ui/Badge.tsx`**
```tsx
import { cn } from '@/lib/utils'
import type { Badge as BadgeType } from '@/data/menu'

const BADGE_CONFIG: Record<BadgeType, { label: string; className: string }> = {
  'sin-tacc': {
    label: 'Sin TACC',
    className: 'bg-amber-100 text-amber-800 border-amber-200',
  },
  vegano: {
    label: '🌿 Vegano',
    className: 'bg-green-100 text-green-800 border-green-200',
  },
  keto: {
    label: 'Keto',
    className: 'bg-blue-100 text-blue-800 border-blue-200',
  },
  'sin-azucar': {
    label: 'Sin Azúcar',
    className: 'bg-purple-100 text-purple-800 border-purple-200',
  },
}

interface BadgeProps {
  type: BadgeType
  className?: string
}

export default function Badge({ type, className }: BadgeProps) {
  const config = BADGE_CONFIG[type]
  return (
    <span
      className={cn(
        'inline-block text-[10px] font-montserrat font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full border',
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  )
}
```

- [ ] **Step 2: Create `src/components/ui/Logo.tsx`**
```tsx
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
  variant?: 'dark' | 'light'
}

export default function Logo({ className, variant = 'dark' }: LogoProps) {
  return (
    <Link href="/" className={cn('flex flex-col items-center leading-none', className)}>
      <span
        className={cn(
          'font-playfair font-black text-xl tracking-[0.2em] uppercase',
          variant === 'dark' ? 'text-text-dark' : 'text-text-light'
        )}
      >
        Benito Santos
      </span>
      <span
        className={cn(
          'font-montserrat font-medium text-[9px] tracking-[0.35em] uppercase mt-0.5',
          variant === 'dark' ? 'text-text-dark/60' : 'text-text-light/70'
        )}
      >
        Café de Origen
      </span>
    </Link>
  )
}
```

- [ ] **Step 3: Commit**
```bash
git add src/components/ui/
git commit -m "feat: add Badge and Logo UI primitives"
```

---

## Task 5: Global layout — Navbar, Footer, WhatsAppButton, layout.tsx

**Files:**
- Create: `src/components/layout/Navbar.tsx`
- Create: `src/components/layout/Footer.tsx`
- Create: `src/components/ui/WhatsAppButton.tsx`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Create `src/components/layout/Navbar.tsx`**
```tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Logo from '@/components/ui/Logo'

const links = [
  { href: '/carta', label: 'Carta' },
  { href: '/ubicaciones', label: 'Sucursales' },
  { href: '/cowork', label: 'Cowork' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-soft-highlight">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Logo />

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`font-montserrat text-xs font-semibold tracking-[0.2em] uppercase transition-colors ${
                pathname === href
                  ? 'text-primary border-b-2 border-primary pb-0.5'
                  : 'text-text-dark hover:text-primary'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden p-2 -mr-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          <span
            className={`block w-6 h-0.5 bg-text-dark transition-transform duration-200 ${
              isOpen ? 'rotate-45 translate-y-1' : ''
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-text-dark mt-1.5 transition-opacity duration-200 ${
              isOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-text-dark mt-1.5 transition-transform duration-200 ${
              isOpen ? '-rotate-45 -translate-y-3' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden md:hidden bg-background border-t border-soft-highlight"
          >
            <div className="px-6 py-5 flex flex-col gap-5">
              {links.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className={`font-montserrat text-sm font-semibold tracking-[0.2em] uppercase ${
                    pathname === href ? 'text-primary' : 'text-text-dark'
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
```

- [ ] **Step 2: Create `src/components/layout/Footer.tsx`**
```tsx
import Link from 'next/link'
import { social, globalHours } from '@/data/contact'
import Logo from '@/components/ui/Logo'

export default function Footer() {
  return (
    <footer className="bg-text-dark text-text-light py-12 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand */}
        <div className="flex flex-col items-start gap-3">
          <Logo variant="light" />
          <p className="font-inter text-sm text-text-light/60 mt-2">
            Auténtico Café de Especialidad<br />San Miguel de Tucumán, Argentina
          </p>
        </div>

        {/* Hours */}
        <div>
          <h3 className="font-montserrat text-xs font-semibold tracking-[0.2em] uppercase text-text-light/50 mb-4">
            Horarios
          </h3>
          <p className="font-inter text-sm text-text-light/80">{globalHours.weekdays}</p>
          <p className="font-inter text-sm text-text-light/80">{globalHours.weekends}</p>
          <p className="font-inter text-xs text-text-light/50 mt-2">
            Horarios pueden variar por sucursal
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="font-montserrat text-xs font-semibold tracking-[0.2em] uppercase text-text-light/50 mb-4">
            Seguinos
          </h3>
          <div className="flex flex-col gap-2">
            <Link
              href={social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="font-inter text-sm text-text-light/80 hover:text-accent transition-colors"
            >
              Instagram {social.instagramHandle}
            </Link>
            <Link
              href={social.instagramTienda}
              target="_blank"
              rel="noopener noreferrer"
              className="font-inter text-sm text-text-light/80 hover:text-accent transition-colors"
            >
              Instagram {social.instagramTiendaHandle}
            </Link>
            <Link
              href={social.whatsappDefaultLink}
              target="_blank"
              rel="noopener noreferrer"
              className="font-inter text-sm text-text-light/80 hover:text-accent transition-colors"
            >
              WhatsApp +54 9 3816 28-1499
            </Link>
            <Link
              href={social.linktree}
              target="_blank"
              rel="noopener noreferrer"
              className="font-inter text-sm text-text-light/80 hover:text-accent transition-colors"
            >
              Linktree
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-text-light/10 text-center">
        <p className="font-inter text-xs text-text-light/40">
          © {new Date().getFullYear()} Benito Santos — Café de Origen
        </p>
      </div>
    </footer>
  )
}
```

- [ ] **Step 3: Create `src/components/ui/WhatsAppButton.tsx`**
```tsx
import Link from 'next/link'
import { social } from '@/data/contact'

export default function WhatsAppButton() {
  return (
    <Link
      href={social.whatsappDefaultLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactanos por WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-primary shadow-lg hover:bg-primary/90 transition-colors"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="white"
        className="w-7 h-7"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.558 4.114 1.532 5.836L.057 23.857a.5.5 0 0 0 .607.606l6.087-1.461A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.893 0-3.668-.522-5.186-1.43l-.372-.22-3.862.927.956-3.773-.242-.386A9.959 9.959 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
      </svg>
    </Link>
  )
}
```

- [ ] **Step 4: Replace `src/app/layout.tsx`**
```tsx
import type { Metadata } from 'next'
import {
  Playfair_Display,
  Nunito,
  Montserrat,
  Inter,
} from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/ui/WhatsAppButton'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-playfair',
  display: 'swap',
})

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '700', '800'],
  variable: '--font-nunito',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Benito Santos — Café de Especialidad en Tucumán',
    template: '%s | Benito Santos',
  },
  description:
    'Auténtico Café de Especialidad en San Miguel de Tucumán. 6 sucursales, coworking, y La Tienda de Benito.',
  openGraph: {
    siteName: 'Benito Santos',
    locale: 'es_AR',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="es"
      className={`${playfair.variable} ${nunito.variable} ${montserrat.variable} ${inter.variable}`}
    >
      <body className="bg-background text-text-dark coffee-rings-bg min-h-screen">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  )
}
```

- [ ] **Step 5: Verify dev server starts**
```bash
npm run dev
```
Expected: server starts on http://localhost:3000, page shows navbar and footer.

- [ ] **Step 6: Commit**
```bash
git add src/app/layout.tsx src/components/layout/ src/components/ui/WhatsAppButton.tsx
git commit -m "feat: add global layout with Navbar, Footer, and WhatsApp button"
```

---

## Task 6: Home page

**Files:**
- Create: `src/components/home/HeroSection.tsx`
- Create: `src/components/home/AboutSnippet.tsx`
- Create: `src/components/home/FeaturedCards.tsx`
- Create: `src/components/home/MenuDelDiaBanner.tsx`
- Create: `src/components/home/InstagramGrid.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create `src/components/home/HeroSection.tsx`**
```tsx
'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function HeroSection() {
  return (
    <section className="relative h-[88vh] min-h-[520px] overflow-hidden">
      {/* Background image */}
      <img
        src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1600&q=80&auto=format&fit=crop"
        alt="Café de especialidad siendo servido"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-text-dark/55" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-montserrat text-text-light/70 text-[11px] tracking-[0.4em] uppercase mb-4"
        >
          San Miguel de Tucumán · Argentina
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="font-playfair font-black text-text-light text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.1] mb-8 max-w-4xl"
        >
          Auténtico Café<br />de Especialidad
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link
            href="/carta"
            className="inline-block bg-primary text-text-light font-montserrat font-semibold text-xs tracking-[0.25em] uppercase px-8 py-4 hover:bg-primary/90 transition-colors"
          >
            Ver nuestra carta
          </Link>
          <Link
            href="/ubicaciones"
            className="inline-block border border-text-light/50 text-text-light font-montserrat font-semibold text-xs tracking-[0.25em] uppercase px-8 py-4 hover:bg-text-light/10 transition-colors"
          >
            Nuestras sucursales
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Create `src/components/home/AboutSnippet.tsx`**
```tsx
'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export default function AboutSnippet() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="max-w-2xl mx-auto text-center"
      >
        <p className="font-montserrat text-[10px] font-semibold tracking-[0.35em] uppercase text-primary mb-5">
          Nuestra historia
        </p>
        <h2 className="font-playfair font-bold text-3xl md:text-4xl text-text-dark mb-6 leading-snug">
          Café de origen, hecho con pasión
        </h2>
        <p className="font-inter text-base text-text-dark/70 leading-relaxed">
          Somos Benito Santos, un café de especialidad de origen tucumano. Desde nuestras 6 sucursales, compartimos la pasión por el buen café, la gastronomía artesanal y los momentos que importan.
        </p>
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 3: Create `src/components/home/FeaturedCards.tsx`**
```tsx
'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const cards = [
  {
    href: '/carta',
    title: 'Nuestra Carta',
    description: 'Desayunos, brunch, cafetería, pastelería y mucho más.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15m-6.75-2.25h.008v.008h-.008v-.008Z" />
      </svg>
    ),
  },
  {
    href: '/ubicaciones',
    title: 'Nuestras Sucursales',
    description: '6 locales en San Miguel de Tucumán y Yerba Buena.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
      </svg>
    ),
  },
  {
    href: '/cowork',
    title: 'Reservá el Cowork',
    description: 'Espacios de trabajo en Yerba Buena y Praderas.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0H3" />
      </svg>
    ),
  },
]

export default function FeaturedCards() {
  return (
    <section className="py-16 px-4 bg-soft-highlight/30">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, i) => (
          <motion.div
            key={card.href}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <Link
              href={card.href}
              className="flex flex-col items-center text-center p-8 bg-background rounded-sm border border-soft-highlight hover:border-primary hover:shadow-md transition-all group"
            >
              <span className="text-primary mb-4 group-hover:scale-110 transition-transform">
                {card.icon}
              </span>
              <h3 className="font-nunito font-extrabold text-lg text-text-dark mb-2">
                {card.title}
              </h3>
              <p className="font-inter text-sm text-text-dark/60">
                {card.description}
              </p>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Create `src/components/home/MenuDelDiaBanner.tsx`**
```tsx
import { menuDelDia } from '@/data/menuDelDia'
import { formatPrice } from '@/lib/utils'
import Link from 'next/link'

export default function MenuDelDiaBanner() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="font-montserrat text-[10px] font-semibold tracking-[0.35em] uppercase text-primary mb-3">
            Disponible de 12:00 a 16:00hs
          </p>
          <h2 className="font-playfair font-bold text-3xl md:text-4xl text-text-dark">
            Menú del Día
          </h2>
          {menuDelDia.vigencia && (
            <p className="font-inter text-sm text-text-dark/50 mt-2">{menuDelDia.vigencia}</p>
          )}
        </div>

        {/* Banner */}
        <div className="bg-accent/20 border border-accent/40 rounded-sm overflow-hidden">
          {/* Includes badge */}
          <div className="bg-accent px-6 py-3 flex items-center gap-2">
            <span className="font-montserrat text-xs font-bold tracking-wider uppercase text-text-dark">
              ✓ Incluye bebida y café
            </span>
          </div>

          {/* Items */}
          <div className="divide-y divide-accent/20">
            {menuDelDia.items.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between px-6 py-4"
              >
                <span className="font-nunito font-bold text-text-dark">
                  {item.name}
                </span>
                <span className="font-montserrat font-bold text-text-dark/70 text-sm ml-4 flex-shrink-0">
                  {formatPrice(item.price)}
                </span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="px-6 py-4 bg-accent/10 text-center">
            <Link
              href="/carta#lunch"
              className="font-montserrat text-xs font-semibold tracking-[0.2em] uppercase text-text-dark hover:text-primary transition-colors"
            >
              Ver carta completa →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 5: Create `src/components/home/InstagramGrid.tsx`**
```tsx
import Link from 'next/link'
import { social } from '@/data/contact'

const PHOTOS = [
  { src: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=400&q=80&fit=crop', alt: 'Café latte art' },
  { src: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&h=400&q=80&fit=crop', alt: 'Avocado toast' },
  { src: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=400&q=80&fit=crop', alt: 'Interior del café' },
  { src: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&h=400&q=80&fit=crop', alt: 'Granos de café' },
  { src: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=400&q=80&fit=crop', alt: 'Croissant artesanal' },
  { src: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=400&h=400&q=80&fit=crop', alt: 'Desayuno completo' },
]

export default function InstagramGrid() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <p className="font-montserrat text-[10px] font-semibold tracking-[0.35em] uppercase text-primary mb-3">
            Seguinos
          </p>
          <h2 className="font-playfair font-bold text-3xl text-text-dark">
            {social.instagramHandle}
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 gap-1.5 md:gap-2">
          {PHOTOS.map((photo) => (
            <Link
              key={photo.src}
              href={social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-text-dark/0 group-hover:bg-text-dark/20 transition-colors duration-300" />
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href={social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-montserrat text-xs font-semibold tracking-[0.2em] uppercase border border-text-dark/30 px-8 py-3 hover:border-primary hover:text-primary transition-colors"
          >
            Ver más en Instagram
          </Link>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 6: Replace `src/app/page.tsx`**
```tsx
import type { Metadata } from 'next'
import HeroSection from '@/components/home/HeroSection'
import AboutSnippet from '@/components/home/AboutSnippet'
import FeaturedCards from '@/components/home/FeaturedCards'
import MenuDelDiaBanner from '@/components/home/MenuDelDiaBanner'
import InstagramGrid from '@/components/home/InstagramGrid'

export const metadata: Metadata = {
  title: 'Benito Santos — Café de Especialidad en Tucumán',
  description:
    'Auténtico Café de Especialidad en San Miguel de Tucumán. Desayunos, brunch, cafetería artesanal. 6 sucursales.',
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSnippet />
      <FeaturedCards />
      <MenuDelDiaBanner />
      {/* Pet Friendly callout */}
      <section className="py-10 px-4 bg-primary/10">
        <div className="max-w-xl mx-auto text-center">
          <p className="text-3xl mb-2">🐾</p>
          <h3 className="font-nunito font-extrabold text-xl text-text-dark">
            Pet Friendly
          </h3>
          <p className="font-inter text-sm text-text-dark/70 mt-1">
            En nuestra sucursal Praderas (Complejo Docks, Yerba Buena) las mascotas son bienvenidas.
          </p>
        </div>
      </section>
      <InstagramGrid />
    </>
  )
}
```

- [ ] **Step 7: Check dev server — visit http://localhost:3000**

Expected: full home page with hero, about, cards, menu del día banner, pet friendly callout, Instagram grid, navbar, footer, and floating WhatsApp button.

- [ ] **Step 8: Commit**
```bash
git add src/app/page.tsx src/components/home/
git commit -m "feat: build home page with hero, features, menu del día, and Instagram grid"
```

---

## Task 7: Carta (menu) page

**Files:**
- Create: `src/components/carta/MenuItemCard.tsx`
- Create: `src/components/carta/MenuSection.tsx`
- Create: `src/components/carta/MenuTabs.tsx`
- Create: `src/app/carta/page.tsx`

- [ ] **Step 1: Create `src/components/carta/MenuItemCard.tsx`**
```tsx
import { formatPrice } from '@/lib/utils'
import Badge from '@/components/ui/Badge'
import type { MenuItem } from '@/data/menu'

interface MenuItemCardProps {
  item: MenuItem
}

export default function MenuItemCard({ item }: MenuItemCardProps) {
  return (
    <div className="flex items-start justify-between gap-4 py-4 border-b border-soft-highlight/60 last:border-b-0">
      <div className="flex-1 min-w-0">
        {/* Name + badges row */}
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <h4 className="font-montserrat font-semibold text-sm tracking-[0.12em] uppercase text-text-dark">
            {item.name}
          </h4>
          {item.badges?.map((badge) => (
            <Badge key={badge} type={badge} />
          ))}
        </div>

        {/* Description */}
        {item.description && (
          <p className="font-inter text-sm text-text-dark/60 leading-snug">
            {item.description}
          </p>
        )}

        {/* Note (e.g. add-ons) */}
        {item.note && (
          <p className="font-inter text-xs text-primary/80 italic mt-1">
            {item.note}
          </p>
        )}
      </div>

      {/* Price */}
      <span className="font-montserrat font-bold text-sm text-text-dark flex-shrink-0">
        {formatPrice(item.price)}
      </span>
    </div>
  )
}
```

- [ ] **Step 2: Create `src/components/carta/MenuSection.tsx`**
```tsx
import MenuItemCard from './MenuItemCard'
import type { MenuCategory } from '@/data/menu'

interface MenuSectionProps {
  category: MenuCategory
}

export default function MenuSection({ category }: MenuSectionProps) {
  return (
    <section id={category.id} className="scroll-mt-32 py-10">
      {/* Category header */}
      <div className="mb-6">
        <h2 className="font-nunito font-extrabold text-2xl md:text-3xl text-text-dark">
          {category.title}
        </h2>

        {/* Subtitle (e.g. "No incluye infusión") */}
        {category.subtitle && (
          <p className="font-inter text-sm text-text-dark/60 mt-1 italic">
            {category.subtitle}
          </p>
        )}

        {/* Includes note — amber badge for El Lunch */}
        {category.includesNote && (
          <div className="inline-flex items-center gap-1.5 mt-2 bg-accent px-3 py-1 rounded-full">
            <span className="text-xs">✓</span>
            <span className="font-montserrat font-bold text-xs tracking-wider text-text-dark uppercase">
              {category.includesNote}
            </span>
          </div>
        )}
      </div>

      {/* Items */}
      <div className="bg-background/60 rounded-sm border border-soft-highlight/40 px-4 md:px-6">
        {category.items.map((item) => (
          <MenuItemCard key={item.name} item={item} />
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Create `src/components/carta/MenuTabs.tsx`**
```tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { menuCategories } from '@/data/menu'

// Must match actual navbar height (py-3 + logo height ≈ 64px)
const NAVBAR_H = 64
// Tabs bar height ≈ 48px
const TABS_H = 48
const SCROLL_OFFSET = NAVBAR_H + TABS_H + 16

export default function MenuTabs() {
  const [activeId, setActiveId] = useState(menuCategories[0].id)

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    menuCategories.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id)
        },
        {
          rootMargin: `-${SCROLL_OFFSET}px 0px -55% 0px`,
          threshold: 0,
        }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET
    window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <div className="sticky top-16 z-30 bg-background/95 backdrop-blur-sm border-b border-soft-highlight shadow-sm">
      <div
        className="flex overflow-x-auto scrollbar-hide max-w-6xl mx-auto px-2"
        style={{ scrollbarWidth: 'none' }}
      >
        {menuCategories.map(({ id, title }) => (
          <button
            key={id}
            onClick={() => scrollToSection(id)}
            className={`relative flex-shrink-0 px-4 py-3 font-montserrat text-[11px] font-semibold tracking-[0.15em] uppercase whitespace-nowrap transition-colors ${
              activeId === id
                ? 'text-primary'
                : 'text-text-dark/50 hover:text-text-dark'
            }`}
          >
            {title}
            {activeId === id && (
              <motion.div
                layoutId="tab-underline"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Create `src/app/carta/page.tsx`**
```tsx
import type { Metadata } from 'next'
import { menuCategories } from '@/data/menu'
import MenuSection from '@/components/carta/MenuSection'
import MenuTabs from '@/components/carta/MenuTabs'

export const metadata: Metadata = {
  title: 'Carta',
  description:
    'Nuestra carta completa: desayunos, brunch, cafetería, pastelería, sandwiches, jugos y más. Benito Santos Café de Especialidad.',
}

export default function CartaPage() {
  return (
    <>
      {/* Page hero */}
      <div className="py-12 px-4 text-center border-b border-soft-highlight">
        <p className="font-montserrat text-[10px] font-semibold tracking-[0.35em] uppercase text-primary mb-3">
          Auténtico Café de Especialidad
        </p>
        <h1 className="font-playfair font-black text-4xl md:text-5xl text-text-dark">
          Nuestra Carta
        </h1>
        <p className="font-inter text-sm text-text-dark/50 mt-3">
          Precios en pesos argentinos · Sujetos a cambio sin previo aviso
        </p>
      </div>

      {/* Sticky tabs */}
      <MenuTabs />

      {/* Sections */}
      <div className="max-w-3xl mx-auto px-4 pb-20">
        {menuCategories.map((category) => (
          <MenuSection key={category.id} category={category} />
        ))}

        {/* Cafetería note */}
        <p className="font-inter text-xs text-text-dark/40 text-center mt-4 italic">
          Consultar por café filtrado · Podemos adaptar la leche a tu preferencia
        </p>
      </div>
    </>
  )
}
```

- [ ] **Step 5: Visit http://localhost:3000/carta**

Expected: sticky tabs bar below navbar, all 10 menu categories visible, active tab highlights as you scroll, price format "$X.XXX", badges on applicable items.

- [ ] **Step 6: Commit**
```bash
git add src/app/carta/ src/components/carta/
git commit -m "feat: build interactive digital menu with sticky tabs and Intersection Observer"
```

---

## Task 8: Cowork page

**Files:**
- Create: `src/components/cowork/CoworkCard.tsx`
- Create: `src/app/cowork/page.tsx`

- [ ] **Step 1: Create `src/components/cowork/CoworkCard.tsx`**
```tsx
'use client'

import { motion } from 'framer-motion'

interface CoworkCardProps {
  name: string
  address: string
  description: string
  image: string
  whatsappLink: string
  amenities: string[]
  index: number
}

export default function CoworkCard({
  name,
  address,
  description,
  image,
  whatsappLink,
  amenities,
  index,
}: CoworkCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="bg-background border border-soft-highlight rounded-sm overflow-hidden"
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={image}
          alt={`Espacio cowork ${name}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-text-dark/40 to-transparent" />
        <div className="absolute bottom-4 left-6">
          <h2 className="font-playfair font-bold text-2xl text-text-light">
            {name}
          </h2>
          <p className="font-inter text-sm text-text-light/80">{address}</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="font-inter text-base text-text-dark/70 leading-relaxed mb-5">
          {description}
        </p>

        {/* Amenities */}
        <ul className="flex flex-wrap gap-2 mb-6">
          {amenities.map((a) => (
            <li
              key={a}
              className="font-montserrat text-[10px] font-semibold tracking-wider uppercase bg-primary/10 text-primary px-3 py-1 rounded-full"
            >
              {a}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block w-full text-center bg-primary text-text-light font-montserrat font-semibold text-xs tracking-[0.2em] uppercase px-6 py-4 hover:bg-primary/90 transition-colors"
        >
          Reservá tu lugar
        </a>
      </div>
    </motion.div>
  )
}
```

- [ ] **Step 2: Create `src/app/cowork/page.tsx`**
```tsx
import type { Metadata } from 'next'
import CoworkCard from '@/components/cowork/CoworkCard'

export const metadata: Metadata = {
  title: 'Cowork',
  description:
    'Espacios de coworking en Benito Santos Yerba Buena y Praderas. Trabajá con café de especialidad.',
}

const spaces = [
  {
    name: 'Benito YB',
    address: 'Güemes 151, Yerba Buena',
    description:
      'Un espacio cálido y tranquilo para trabajar o estudiar rodeado del mejor café. La sucursal de Yerba Buena ofrece una atmósfera perfecta para concentrarte, con buena conectividad y servicio de cafetería de especialidad.',
    image:
      'https://images.unsplash.com/photo-1600508774634-4e11d34730e2?w=800&h=500&q=80&fit=crop',
    whatsappLink:
      'https://wa.me/5493816281499?text=Hola!%20Quiero%20reservar%20el%20cowork%20en%20Yerba%20Buena',
    amenities: ['WiFi', 'Enchufes', 'Café incluido', 'Ambiente tranquilo'],
  },
  {
    name: 'Benito Praderas',
    address: 'Calle Bascary, Complejo Docks, Yerba Buena',
    description:
      'El espacio cowork del Complejo Docks combina un entorno moderno con la propuesta gastronómica de Benito Santos. Ideal para reuniones y trabajo creativo. También es pet friendly — podés venir con tu mascota.',
    image:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=500&q=80&fit=crop',
    whatsappLink:
      'https://wa.me/5493816281509?text=Hola!%20Quiero%20reservar%20el%20cowork%20en%20Praderas',
    amenities: ['WiFi', 'Enchufes', 'Café incluido', 'Pet Friendly 🐾', 'Complejo Docks'],
  },
]

export default function CoworkPage() {
  return (
    <>
      {/* Header */}
      <div className="py-12 px-4 text-center border-b border-soft-highlight">
        <p className="font-montserrat text-[10px] font-semibold tracking-[0.35em] uppercase text-primary mb-3">
          Trabajá con buen café
        </p>
        <h1 className="font-playfair font-black text-4xl md:text-5xl text-text-dark">
          Espacios Cowork
        </h1>
        <p className="font-inter text-sm text-text-dark/50 mt-3 max-w-md mx-auto">
          Reservá tu lugar por WhatsApp y disfrutá de un espacio tranquilo con café de especialidad.
        </p>
      </div>

      {/* Cards */}
      <div className="max-w-4xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        {spaces.map((space, i) => (
          <CoworkCard key={space.name} {...space} index={i} />
        ))}
      </div>
    </>
  )
}
```

- [ ] **Step 3: Visit http://localhost:3000/cowork**

Expected: two cowork cards with images, amenities, and WhatsApp "Reservá tu lugar" buttons linking to correct pre-filled messages.

- [ ] **Step 4: Commit**
```bash
git add src/app/cowork/ src/components/cowork/
git commit -m "feat: build cowork page with WhatsApp reservation CTAs"
```

---

## Task 9: Ubicaciones page

**Files:**
- Create: `src/components/ubicaciones/MapEmbed.tsx`
- Create: `src/components/ubicaciones/LocationCard.tsx`
- Create: `src/app/ubicaciones/page.tsx`

- [ ] **Step 1: Create `src/components/ubicaciones/MapEmbed.tsx`**
```tsx
interface MapEmbedProps {
  src: string
  title: string
}

export default function MapEmbed({ src, title }: MapEmbedProps) {
  return (
    <div className="relative w-full h-48 rounded-sm overflow-hidden border border-soft-highlight">
      <iframe
        src={src}
        title={`Mapa ${title}`}
        className="absolute inset-0 w-full h-full"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  )
}
```

- [ ] **Step 2: Create `src/components/ubicaciones/LocationCard.tsx`**
```tsx
'use client'

import { motion } from 'framer-motion'
import MapEmbed from './MapEmbed'
import type { Location } from '@/data/contact'

interface LocationCardProps {
  location: Location
  index: number
}

export default function LocationCard({ location, index }: LocationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.55, delay: index * 0.07 }}
      className="bg-background border border-soft-highlight rounded-sm overflow-hidden"
    >
      {/* Map */}
      <MapEmbed src={location.mapIframe} title={location.name} />

      {/* Content */}
      <div className="p-5">
        {/* Name + badges */}
        <div className="flex items-start justify-between gap-2 mb-1">
          <h2 className="font-nunito font-extrabold text-lg text-text-dark leading-snug">
            {location.name}
          </h2>
          <div className="flex gap-1 flex-shrink-0">
            {location.badges?.includes('pet-friendly') && (
              <span
                title="Pet Friendly"
                className="text-xl"
                aria-label="Pet Friendly"
              >
                🐾
              </span>
            )}
          </div>
        </div>

        {/* Address */}
        <p className="font-inter text-sm text-text-dark/60 mb-3">
          {location.address}
        </p>

        {/* Note */}
        {location.note && (
          <p className="font-inter text-xs text-primary/80 italic mb-3">
            {location.note}
          </p>
        )}

        {/* Hours */}
        <div className="bg-soft-highlight/30 rounded-sm px-3 py-2 mb-4">
          <p className="font-montserrat text-[10px] font-semibold tracking-[0.2em] uppercase text-text-dark/50 mb-1">
            Horarios
          </p>
          <p className="font-inter text-sm text-text-dark/80">{location.hours.weekdays}</p>
          <p className="font-inter text-sm text-text-dark/80">{location.hours.weekends}</p>
          {location.hours.extra && (
            <p className="font-inter text-xs text-text-dark/50 mt-1 italic">
              {location.hours.extra}
            </p>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          <a
            href={location.mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center font-montserrat text-[11px] font-semibold tracking-wider uppercase border border-text-dark/30 px-3 py-2.5 hover:border-primary hover:text-primary transition-colors"
          >
            Cómo llegar
          </a>
          <a
            href={`https://wa.me/${location.whatsapp}?text=${encodeURIComponent(location.whatsappMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center font-montserrat text-[11px] font-semibold tracking-wider uppercase bg-primary text-text-light px-3 py-2.5 hover:bg-primary/90 transition-colors"
          >
            Escribinos
          </a>
        </div>

        {/* Instagram link (for La Tienda) */}
        {location.instagram && (
          <a
            href={location.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center font-inter text-sm text-primary hover:underline mt-3"
          >
            Seguinos en Instagram →
          </a>
        )}
      </div>
    </motion.div>
  )
}
```

- [ ] **Step 3: Create `src/app/ubicaciones/page.tsx`**
```tsx
import type { Metadata } from 'next'
import { locations } from '@/data/contact'
import LocationCard from '@/components/ubicaciones/LocationCard'

export const metadata: Metadata = {
  title: 'Sucursales',
  description:
    '6 sucursales de Benito Santos en San Miguel de Tucumán y Yerba Buena. Horarios y cómo llegar.',
}

const sucursales = locations.filter((l) => !l.isStore)
const tienda = locations.find((l) => l.isStore)

export default function UbicacionesPage() {
  return (
    <>
      {/* Header */}
      <div className="py-12 px-4 text-center border-b border-soft-highlight">
        <p className="font-montserrat text-[10px] font-semibold tracking-[0.35em] uppercase text-primary mb-3">
          Tucumán · Argentina
        </p>
        <h1 className="font-playfair font-black text-4xl md:text-5xl text-text-dark">
          Nuestras Sucursales
        </h1>
        <p className="font-inter text-sm text-text-dark/50 mt-3">
          6 locales en San Miguel de Tucumán y Yerba Buena
        </p>
      </div>

      {/* Location grid */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sucursales.map((loc, i) => (
            <LocationCard key={loc.id} location={loc} index={i} />
          ))}
        </div>

        {/* La Tienda de Benito — separated section */}
        {tienda && (
          <div className="mt-16">
            <div className="flex items-center gap-4 mb-8">
              <div className="flex-1 h-px bg-soft-highlight" />
              <p className="font-montserrat text-[10px] font-semibold tracking-[0.3em] uppercase text-text-dark/40 whitespace-nowrap">
                También encontranos en
              </p>
              <div className="flex-1 h-px bg-soft-highlight" />
            </div>
            <div className="max-w-sm mx-auto">
              <LocationCard location={tienda} index={0} />
            </div>
          </div>
        )}
      </div>
    </>
  )
}
```

- [ ] **Step 4: Visit http://localhost:3000/ubicaciones**

Expected: 6 location cards in responsive grid, each with Google Maps iframe, hours, "Cómo llegar" and "Escribinos" buttons. La Tienda de Benito appears as a separate section below. Praderas has 🐾 badge.

- [ ] **Step 5: Commit**
```bash
git add src/app/ubicaciones/ src/components/ubicaciones/
git commit -m "feat: build locations page with Google Maps embeds and WhatsApp CTAs"
```

---

## Task 10: Final build and polish

- [ ] **Step 1: Run production build**
```bash
npm run build
```
Expected: BUILD successful, output in `out/` directory. If errors appear, fix them before continuing. Common fixes:
- `Image` component with external src → use `<img>` tag or ensure `images: { unoptimized: true }` in next.config.ts
- `usePathname` errors → ensure Navbar has `'use client'` directive
- Static export errors with server-only APIs → remove `generateStaticParams` if not needed

- [ ] **Step 2: Run tests**
```bash
npm test
```
Expected: 4 PASS (formatPrice tests)

- [ ] **Step 3: Verify all 4 routes in built output**
```bash
ls out/
```
Expected: `index.html`, `carta/`, `cowork/`, `ubicaciones/` directories.

- [ ] **Step 4: Check mobile responsiveness**

Open browser DevTools → mobile view (390px width). Check:
- Navbar collapses to hamburger ✓
- Menu tabs scroll horizontally ✓
- Location cards stack in single column ✓
- WhatsApp button visible and not overlapping content ✓
- Hero text readable on small screens ✓

- [ ] **Step 5: Final commit**
```bash
git add -A
git commit -m "chore: verify production build and all pages render correctly"
```

---

## Self-Review Checklist

**Spec coverage:**
- ✅ Home: Hero, About, FeaturedCards, MenuDelDia, PetFriendly, InstagramGrid
- ✅ Carta: All 10 categories, sticky tabs, Intersection Observer, badges, price formatting
- ✅ Cowork: Two cards (YB + Praderas), WhatsApp CTA with pre-filled messages
- ✅ Ubicaciones: All 6 sucursales + La Tienda, Google Maps iframes (all 7 real URLs), hours, buttons
- ✅ Navbar: sticky, hamburger mobile, active state
- ✅ Footer: hours, social links, WhatsApp, Linktree
- ✅ WhatsApp floating button: bottom-right, olive green
- ✅ Brand colors: all tokens defined in tailwind.config.ts
- ✅ Typography: Playfair Display / Nunito / Montserrat / Inter via Google Fonts
- ✅ Coffee rings background: CSS radial-gradient pattern in globals.css
- ✅ formatPrice: "$15.000" format with Vitest tests
- ✅ menuDelDia.ts: editable with clear comments for non-technical users
- ✅ contact.ts: all 7 locations with real Google Maps iframe + link URLs
- ✅ Static export: `output: 'export'` in next.config.ts
- ✅ Mobile-first: responsive grid and navbar throughout

**Type consistency:** All types defined in Task 3 (`MenuCategory`, `MenuItem`, `Badge`, `Location`) are referenced consistently across components.
