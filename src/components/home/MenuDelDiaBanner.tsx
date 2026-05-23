import { menuDelDia } from '@/data/menuDelDia'
import { formatPrice } from '@/lib/utils'
import Link from 'next/link'

export default function MenuDelDiaBanner() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
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

        <div className="bg-accent/20 border border-accent/40 rounded-sm overflow-hidden">
          <div className="bg-accent px-6 py-3 flex items-center gap-2">
            <span className="font-montserrat text-xs font-bold tracking-wider uppercase text-text-dark">
              ✓ Incluye bebida y café
            </span>
          </div>

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
