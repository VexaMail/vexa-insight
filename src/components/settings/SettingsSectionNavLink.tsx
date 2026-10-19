import { cn } from '@/lib/utils'
import type { SettingsSectionNavLinkProps } from './SettingsSectionNavLinkProps'

/** One entry of the desktop section index, with its icon. */
export function SettingsSectionNavLink({
  link,
  active,
}: Readonly<SettingsSectionNavLinkProps>) {
  const Icon = link.icon
  return (
    <a
      href={`#${link.id}`}
      aria-current={active ? 'location' : undefined}
      className={cn(
        'focus-visible:ring-ring flex h-9 items-center gap-2.5 rounded-md border-l-2 px-3 text-sm transition-colors duration-150 focus-visible:ring-2 focus-visible:outline-none',
        active
          ? 'border-primary bg-accent text-foreground font-medium'
          : 'text-muted-foreground hover:bg-accent/60 hover:text-foreground border-transparent',
      )}
    >
      <Icon
        aria-hidden
        className={cn('h-4 w-4 shrink-0', active ? 'text-primary' : '')}
      />
      {link.label}
    </a>
  )
}
