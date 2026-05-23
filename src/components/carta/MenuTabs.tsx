'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { menuCategories } from '@/data/menu'

const NAVBAR_H = 64
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
