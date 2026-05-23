import type { Metadata } from 'next'
import { menuCategories } from '@/data/menu'
import MenuSection from '@/components/carta/MenuSection'
import MenuTabs from '@/components/carta/MenuTabs'

export const metadata: Metadata = {
  title: 'Carta',
  description:
    'Nuestra carta completa: desayunos, brunch, cafetería, pastelería, sandwiches, jugos y más. Benito Santos Café de Especialidad.',
}

export default function CartaPage() {
  return (
    <>
      <div className="py-12 px-4 text-center border-b border-soft-highlight">
        <p className="font-montserrat text-[10px] font-semibold tracking-[0.35em] uppercase text-primary mb-3">
          Auténtico Café de Especialidad
        </p>
        <h1 className="font-playfair font-black text-4xl md:text-5xl text-text-dark">
          Nuestra Carta
        </h1>
        <p className="font-inter text-sm text-text-dark/50 mt-3">
          Precios en pesos argentinos · Sujetos a cambio sin previo aviso
        </p>
      </div>

      <MenuTabs />

      <div className="max-w-3xl mx-auto px-4 pb-20">
        {menuCategories.map((category) => (
          <MenuSection key={category.id} category={category} />
        ))}

        <p className="font-inter text-xs text-text-dark/40 text-center mt-4 italic">
          Consultar por café filtrado · Podemos adaptar la leche a tu preferencia
        </p>
      </div>
    </>
  )
}
