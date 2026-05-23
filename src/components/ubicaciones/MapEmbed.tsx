interface MapEmbedProps {
  src: string
  title: string
}

export default function MapEmbed({ src, title }: MapEmbedProps) {
  return (
    <div className="relative w-full h-48 rounded-sm overflow-hidden border border-soft-highlight">
      <iframe
        src={src}
        title={`Mapa ${title}`}
        className="absolute inset-0 w-full h-full"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  )
}
