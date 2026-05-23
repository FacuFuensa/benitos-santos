'use client'

import { useEffect, useRef, useState } from 'react'
import { menuCategories } from '@/data/menu'

const SHORT_LABELS: Record<string, string> = {
  desayunos: 'Desayunos',
  brunch: 'Brunch',
  cafeteria: 'Cafetería',
  'cafe-frio': 'Café Frío',
  pasteleria: 'Pastelería',
  panaderia: 'Panadería',
  lunch: 'Lunch',
  sandwiches: 'Sandwiches',
  bebidas: 'Bebidas',
  'sin-gluten': 'Sin Gluten',
}

export default function MenuTabs() {
  const tabsRef = useRef<HTMLDivElement>(null)
  const [activeSection, setActiveSection] = useState(menuCategories[0].id)

  useEffect(() => {
    const handleScroll = () => {
      const offset = 120
      let current = menuCategories[0].id

      for (const category of menuCategories) {
        const el = document.getElementById(category.id)
        if (el && el.getBoundingClientRect().top <= offset) {
          current = category.id
        }
      }

      setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const activeTab = document.getElementById(`tab-${activeSection}`)
    activeTab?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }, [activeSection])

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - 120
    window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <div
      className="sticky top-16 z-50"
      style={{ backgroundColor: '#F5F0E8', boxShadow: '0 1px 4px 0 rgba(59,47,47,0.08)' }}
    >
      <div
        ref={tabsRef}
        className="flex overflow-x-auto max-w-6xl mx-auto px-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' } as React.CSSProperties}
      >
        {menuCategories.map(({ id }) => (
          <button
            key={id}
            id={`tab-${id}`}
            onClick={() => scrollToSection(id)}
            className="flex-shrink-0 px-4 py-2 my-2 mx-0.5 font-montserrat text-[11px] font-semibold tracking-[0.15em] uppercase whitespace-nowrap rounded-full transition-colors"
            style={
              activeSection === id
                ? { backgroundColor: '#A3A87C', color: '#F5F0E8' }
                : { color: '#3B2F2F' }
            }
            onMouseEnter={(e) => {
              if (activeSection !== id)
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#D5CBBD'
            }}
            onMouseLeave={(e) => {
              if (activeSection !== id)
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = ''
            }}
          >
            {SHORT_LABELS[id] ?? id}
          </button>
        ))}
      </div>
    </div>
  )
}
