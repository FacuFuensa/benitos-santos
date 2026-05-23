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
