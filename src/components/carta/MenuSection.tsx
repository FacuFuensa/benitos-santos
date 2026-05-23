import MenuItemCard from './MenuItemCard'
import type { MenuCategory } from '@/data/menu'

interface MenuSectionProps {
  category: MenuCategory
}

export default function MenuSection({ category }: MenuSectionProps) {
  return (
    <section id={category.id} className="py-10" style={{ scrollMarginTop: '80px' }}>
      <div className="mb-6">
        <h2 className="font-nunito font-extrabold text-2xl md:text-3xl text-text-dark">
          {category.title}
        </h2>

        {category.subtitle && (
          <p className="font-inter text-sm text-text-dark/60 mt-1 italic">
            {category.subtitle}
          </p>
        )}

        {category.includesNote && (
          <div className="inline-flex items-center gap-1.5 mt-2 bg-accent px-3 py-1 rounded-full">
            <span className="text-xs">✓</span>
            <span className="font-montserrat font-bold text-xs tracking-wider text-text-dark uppercase">
              {category.includesNote}
            </span>
          </div>
        )}
      </div>

      <div className="bg-background/60 rounded-sm border border-soft-highlight/40 px-4 md:px-6">
        {category.items.map((item) => (
          <MenuItemCard key={item.name} item={item} />
        ))}
      </div>
    </section>
  )
}
