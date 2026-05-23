'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function HeroSection() {
  return (
    <section className="relative h-[88vh] min-h-[520px] overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1600&q=80&auto=format&fit=crop"
        alt="Café de especialidad siendo servido"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-text-dark/55" />

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
