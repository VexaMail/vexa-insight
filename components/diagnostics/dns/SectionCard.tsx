import type { SectionCardProps } from './SectionCardProps'

export function SectionCard({
  id,
  title,
  badge,
  children,
}: Readonly<SectionCardProps>) {
  const headingId = `${id}-heading`

  return (
    <section
      aria-labelledby={headingId}
      className="bg-card flex flex-col gap-3 rounded-lg border p-4 shadow-sm"
    >
      <div className="flex items-center justify-between gap-2">
        <h3 id={headingId} className="text-sm font-semibold">
          {title}
        </h3>
        {badge}
      </div>
      {children}
    </section>
  )
}
