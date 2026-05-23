import Link from 'next/link'
import { social } from '@/data/contact'

const PHOTOS = [
  { src: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=400&q=80&fit=crop', alt: 'Café latte art' },
  { src: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&h=400&q=80&fit=crop', alt: 'Avocado toast' },
  { src: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=400&q=80&fit=crop', alt: 'Interior del café' },
  { src: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&h=400&q=80&fit=crop', alt: 'Granos de café' },
  { src: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=400&q=80&fit=crop', alt: 'Croissant artesanal' },
  { src: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=400&h=400&q=80&fit=crop', alt: 'Desayuno completo' },
]

export default function InstagramGrid() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <p className="font-montserrat text-[10px] font-semibold tracking-[0.35em] uppercase text-primary mb-3">
            Seguinos
          </p>
          <h2 className="font-playfair font-bold text-3xl text-text-dark">
            {social.instagramHandle}
          </h2>
        </div>

        <div className="grid grid-cols-3 gap-1.5 md:gap-2">
          {PHOTOS.map((photo) => (
            <Link
              key={photo.src}
              href={social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-text-dark/0 group-hover:bg-text-dark/20 transition-colors duration-300" />
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href={social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-montserrat text-xs font-semibold tracking-[0.2em] uppercase border border-text-dark/30 px-8 py-3 hover:border-primary hover:text-primary transition-colors"
          >
            Ver más en Instagram
          </Link>
        </div>
      </div>
    </section>
  )
}
