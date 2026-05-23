'use client'

import { motion, useInView } from 'framer-motion'
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
