import type { Metadata } from 'next'
import HeroSection from '@/components/home/HeroSection'
import AboutSnippet from '@/components/home/AboutSnippet'
import FeaturedCards from '@/components/home/FeaturedCards'
import MenuDelDiaBanner from '@/components/home/MenuDelDiaBanner'
import InstagramGrid from '@/components/home/InstagramGrid'

export const metadata: Metadata = {
  title: 'Benito Santos — Café de Especialidad en Tucumán',
  description:
    'Auténtico Café de Especialidad en San Miguel de Tucumán. Desayunos, brunch, cafetería artesanal. 6 sucursales.',
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSnippet />
      <FeaturedCards />
      <MenuDelDiaBanner />
      <section className="py-10 px-4 bg-primary/10">
        <div className="max-w-xl mx-auto text-center">
          <p className="text-3xl mb-2">🐾</p>
          <h3 className="font-nunito font-extrabold text-xl text-text-dark">
            Pet Friendly
          </h3>
          <p className="font-inter text-sm text-text-dark/70 mt-1">
            En nuestra sucursal Praderas (Complejo Docks, Yerba Buena) las mascotas son bienvenidas.
          </p>
        </div>
      </section>
      <InstagramGrid />
    </>
  )
}
