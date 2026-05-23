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

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sucursales.map((loc, i) => (
            <LocationCard key={loc.id} location={loc} index={i} />
          ))}
        </div>

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
