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

      <div className="p-6">
        <p className="font-inter text-base text-text-dark/70 leading-relaxed mb-5">
          {description}
        </p>

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
