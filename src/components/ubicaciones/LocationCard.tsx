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
      <MapEmbed src={location.mapIframe} title={location.name} />

      <div className="p-5">
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

        <p className="font-inter text-sm text-text-dark/60 mb-3">
          {location.address}
        </p>

        {location.note && (
          <p className="font-inter text-xs text-primary/80 italic mb-3">
            {location.note}
          </p>
        )}

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
