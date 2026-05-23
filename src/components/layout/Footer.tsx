import Link from 'next/link'
import { social, globalHours } from '@/data/contact'
import Logo from '@/components/ui/Logo'

export default function Footer() {
  return (
    <footer className="bg-text-dark text-text-light py-12 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand */}
        <div className="flex flex-col items-start gap-3">
          <Logo variant="light" />
          <p className="font-inter text-sm text-text-light/60 mt-2">
            Auténtico Café de Especialidad<br />San Miguel de Tucumán, Argentina
          </p>
        </div>

        {/* Hours */}
        <div>
          <h3 className="font-montserrat text-xs font-semibold tracking-[0.2em] uppercase text-text-light/50 mb-4">
            Horarios
          </h3>
          <p className="font-inter text-sm text-text-light/80">{globalHours.weekdays}</p>
          <p className="font-inter text-sm text-text-light/80">{globalHours.weekends}</p>
          <p className="font-inter text-xs text-text-light/50 mt-2">
            Horarios pueden variar por sucursal
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="font-montserrat text-xs font-semibold tracking-[0.2em] uppercase text-text-light/50 mb-4">
            Seguinos
          </h3>
          <div className="flex flex-col gap-2">
            <Link
              href={social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="font-inter text-sm text-text-light/80 hover:text-accent transition-colors"
            >
              Instagram {social.instagramHandle}
            </Link>
            <Link
              href={social.instagramTienda}
              target="_blank"
              rel="noopener noreferrer"
              className="font-inter text-sm text-text-light/80 hover:text-accent transition-colors"
            >
              Instagram {social.instagramTiendaHandle}
            </Link>
            <Link
              href={social.whatsappDefaultLink}
              target="_blank"
              rel="noopener noreferrer"
              className="font-inter text-sm text-text-light/80 hover:text-accent transition-colors"
            >
              WhatsApp +54 9 3816 28-1499
            </Link>
            <Link
              href={social.linktree}
              target="_blank"
              rel="noopener noreferrer"
              className="font-inter text-sm text-text-light/80 hover:text-accent transition-colors"
            >
              Linktree
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-text-light/10 text-center">
        <p className="font-inter text-xs text-text-light/40">
          © {new Date().getFullYear()} Benito Santos — Café de Origen
        </p>
      </div>
    </footer>
  )
}
