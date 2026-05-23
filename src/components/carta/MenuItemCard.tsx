import { formatPrice } from '@/lib/utils'
import Badge from '@/components/ui/Badge'
import type { MenuItem } from '@/data/menu'

interface MenuItemCardProps {
  item: MenuItem
}

export default function MenuItemCard({ item }: MenuItemCardProps) {
  return (
    <div className="flex items-start justify-between gap-4 py-4 border-b border-soft-highlight/60 last:border-b-0">
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <h4 className="font-montserrat font-semibold text-sm tracking-[0.12em] uppercase text-text-dark">
            {item.name}
          </h4>
          {item.badges?.map((badge) => (
            <Badge key={badge} type={badge} />
          ))}
        </div>

        {item.description && (
          <p className="font-inter text-sm text-text-dark/60 leading-snug">
            {item.description}
          </p>
        )}

        {item.note && (
          <p className="font-inter text-xs text-primary/80 italic mt-1">
            {item.note}
          </p>
        )}
      </div>

      <span className="font-montserrat font-bold text-sm text-text-dark flex-shrink-0">
        {formatPrice(item.price)}
      </span>
    </div>
  )
}
