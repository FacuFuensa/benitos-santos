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
