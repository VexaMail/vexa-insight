import { SETTINGS_SECTION_LINKS } from '@/constants/settings'
import { cn } from '@/lib/utils'
import type { SettingsSectionIndexProps } from '@/types/settings'

/** Sticky section index beside the settings form, from `lg` up. */
export function SettingsSectionNav({
  activeId,
}: Readonly<SettingsSectionIndexProps>) {
  return (
    <nav
      aria-label="Settings sections"
      className="sticky top-0 hidden self-start lg:block"
    >
      <p className="text-muted-foreground mb-2 px-3 font-mono text-[11px] tracking-[0.16em] uppercase">
        Sections
      </p>
      <ul className="space-y-0.5">
        {SETTINGS_SECTION_LINKS.map((link) => (
          <li key={link.id}>
            <a
              href={`#${link.id}`}
              aria-current={link.id === activeId ? 'location' : undefined}
              className={cn(
                'focus-visible:ring-ring flex h-9 items-center rounded-md border-l-2 px-3 text-sm transition-colors duration-150 focus-visible:ring-2 focus-visible:outline-none',
                link.id === activeId
                  ? 'border-primary bg-accent text-foreground font-medium'
                  : 'text-muted-foreground hover:bg-accent/60 hover:text-foreground border-transparent',
              )}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
