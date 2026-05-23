import type { Metadata } from 'next'
import {
  Playfair_Display,
  Nunito,
  Montserrat,
  Inter,
} from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/ui/WhatsAppButton'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-playfair',
  display: 'swap',
})

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '700', '800'],
  variable: '--font-nunito',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Benito Santos — Café de Especialidad en Tucumán',
    template: '%s | Benito Santos',
  },
  description:
    'Auténtico Café de Especialidad en San Miguel de Tucumán. 6 sucursales, coworking, y La Tienda de Benito.',
  openGraph: {
    siteName: 'Benito Santos',
    locale: 'es_AR',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="es"
      className={`${playfair.variable} ${nunito.variable} ${montserrat.variable} ${inter.variable}`}
    >
      <body className="bg-background text-text-dark coffee-rings-bg min-h-screen">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  )
}
