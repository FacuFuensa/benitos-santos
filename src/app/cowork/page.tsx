import type { Metadata } from 'next'
import CoworkCard from '@/components/cowork/CoworkCard'

export const metadata: Metadata = {
  title: 'Cowork',
  description:
    'Espacios de coworking en Benito Santos Yerba Buena y Praderas. Trabajá con café de especialidad.',
}

const spaces = [
  {
    name: 'Benito YB',
    address: 'Güemes 151, Yerba Buena',
    description:
      'Un espacio cálido y tranquilo para trabajar o estudiar rodeado del mejor café. La sucursal de Yerba Buena ofrece una atmósfera perfecta para concentrarte, con buena conectividad y servicio de cafetería de especialidad.',
    image:
      'https://images.unsplash.com/photo-1600508774634-4e11d34730e2?w=800&h=500&q=80&fit=crop',
    whatsappLink:
      'https://wa.me/5493816281499?text=Hola!%20Quiero%20reservar%20el%20cowork%20en%20Yerba%20Buena',
    amenities: ['WiFi', 'Enchufes', 'Café incluido', 'Ambiente tranquilo'],
  },
  {
    name: 'Benito Praderas',
    address: 'Calle Bascary, Complejo Docks, Yerba Buena',
    description:
      'El espacio cowork del Complejo Docks combina un entorno moderno con la propuesta gastronómica de Benito Santos. Ideal para reuniones y trabajo creativo. También es pet friendly — podés venir con tu mascota.',
    image:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=500&q=80&fit=crop',
    whatsappLink:
      'https://wa.me/5493816281509?text=Hola!%20Quiero%20reservar%20el%20cowork%20en%20Praderas',
    amenities: ['WiFi', 'Enchufes', 'Café incluido', 'Pet Friendly 🐾', 'Complejo Docks'],
  },
]

export default function CoworkPage() {
  return (
    <>
      <div className="py-12 px-4 text-center border-b border-soft-highlight">
        <p className="font-montserrat text-[10px] font-semibold tracking-[0.35em] uppercase text-primary mb-3">
          Trabajá con buen café
        </p>
        <h1 className="font-playfair font-black text-4xl md:text-5xl text-text-dark">
          Espacios Cowork
        </h1>
        <p className="font-inter text-sm text-text-dark/50 mt-3 max-w-md mx-auto">
          Reservá tu lugar por WhatsApp y disfrutá de un espacio tranquilo con café de especialidad.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        {spaces.map((space, i) => (
          <CoworkCard key={space.name} {...space} index={i} />
        ))}
      </div>
    </>
  )
}
