export default function MenuDelDiaBanner() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <p className="font-montserrat text-[10px] font-semibold tracking-[0.35em] uppercase text-primary mb-3">
          12:00 a 16:00hs · Todas las sucursales
        </p>
        <h2 className="font-playfair font-bold text-3xl md:text-4xl text-text-dark mb-4">
          Menú del Día
        </h2>
        <p className="font-inter text-sm text-text-dark/60 mb-8">
          Disponible de 12:00 a 16:00hs en todas las sucursales. Incluye bebida y café.
        </p>
        <a
          href="https://instagram.com/benitosantoscafe"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-sm font-montserrat text-sm font-bold tracking-[0.12em] uppercase transition-opacity hover:opacity-90"
          style={{ backgroundColor: '#E8A948', color: '#2C1A0E' }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
          </svg>
          Ver en Instagram
        </a>
      </div>
    </section>
  )
}
