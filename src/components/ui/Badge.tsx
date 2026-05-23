import { cn } from '@/lib/utils'
import type { Badge as BadgeType } from '@/data/menu'

const BADGE_CONFIG: Record<BadgeType, { label: string; className: string }> = {
  'sin-tacc': {
    label: 'Sin TACC',
    className: 'bg-amber-100 text-amber-800 border-amber-200',
  },
  vegano: {
    label: '🌿 Vegano',
    className: 'bg-green-100 text-green-800 border-green-200',
  },
  keto: {
    label: 'Keto',
    className: 'bg-blue-100 text-blue-800 border-blue-200',
  },
  'sin-azucar': {
    label: 'Sin Azúcar',
    className: 'bg-purple-100 text-purple-800 border-purple-200',
  },
}

interface BadgeProps {
  type: BadgeType
  className?: string
}

export default function Badge({ type, className }: BadgeProps) {
  const config = BADGE_CONFIG[type]
  return (
    <span
      className={cn(
        'inline-block text-[10px] font-montserrat font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full border',
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  )
}
