import { IconTile } from '@/components/ui'
import type { AuthScreenHeaderProps } from './AuthScreenHeaderProps'

/** Eyebrow, title and help line of an auth card, led by an icon square. */
export function AuthScreenHeader({
  eyebrow,
  title,
  description,
  icon,
}: Readonly<AuthScreenHeaderProps>) {
  return (
    <header className="border-border flex items-start gap-3.5 border-b px-6 py-5">
      {icon ? <IconTile>{icon}</IconTile> : null}
      <div className="min-w-0">
        <p className="text-primary font-mono text-[11px] tracking-[0.16em] uppercase">
          {eyebrow}
        </p>
        <h1 className="text-foreground mt-1 text-xl font-semibold">{title}</h1>
        <p className="text-muted-foreground mt-1 text-sm">{description}</p>
      </div>
    </header>
  )
}
