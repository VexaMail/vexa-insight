import { SETTINGS_SECTION_LINKS } from '@/constants/settings'
import { cn } from '@/lib/utils'
import type { SettingsSectionIndexProps } from '@/types/settings'

/** Section index as a sticky, scrollable row of chips below `lg`. */
export function SettingsSectionChips({
  activeId,
}: Readonly<SettingsSectionIndexProps>) {
  return (
    <nav
      aria-label="Settings sections"
      className="bg-background/90 border-border sticky -top-5 z-10 -mx-4 border-b px-4 py-2 backdrop-blur sm:-top-6 sm:-mx-6 sm:px-6 lg:hidden"
    >
      <ul className="vexa-scrollbar flex gap-2 overflow-x-auto pb-1">
        {SETTINGS_SECTION_LINKS.map((link) => (
          <li key={link.id} className="shrink-0">
            <a
              href={`#${link.id}`}
              aria-current={link.id === activeId ? 'location' : undefined}
              className={cn(
                'focus-visible:ring-ring inline-flex h-9 items-center rounded-full border px-3 text-sm whitespace-nowrap transition-colors duration-150 focus-visible:ring-2 focus-visible:outline-none',
                link.id === activeId
                  ? 'border-primary/40 bg-primary/10 text-primary font-medium'
                  : 'border-border bg-card text-muted-foreground hover:text-foreground',
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
