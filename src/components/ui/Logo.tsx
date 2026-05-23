import Link from 'next/link'
import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
  variant?: 'dark' | 'light'
}

export default function Logo({ className, variant = 'dark' }: LogoProps) {
  return (
    <Link href="/" className={cn('flex flex-col items-center leading-none', className)}>
      <span
        className={cn(
          'font-playfair font-black text-xl tracking-[0.2em] uppercase',
          variant === 'dark' ? 'text-text-dark' : 'text-text-light'
        )}
      >
        Benito Santos
      </span>
      <span
        className={cn(
          'font-montserrat font-medium text-[9px] tracking-[0.35em] uppercase mt-0.5',
          variant === 'dark' ? 'text-text-dark/60' : 'text-text-light/70'
        )}
      >
        Café de Origen
      </span>
    </Link>
  )
}
