import { SETTINGS_SECTION_LINKS } from '@/constants/settings'
import type { SettingsSectionIndexProps } from '@/types/settings'
import { SettingsSectionNavLink } from './SettingsSectionNavLink'

/** Sticky section index beside the settings form, from `lg` up, by group. */
export function SettingsSectionNav({
  activeId,
}: Readonly<SettingsSectionIndexProps>) {
  const groups = [...new Set(SETTINGS_SECTION_LINKS.map((link) => link.group))]
  return (
    <nav
      aria-label="Settings sections"
      className="sticky top-0 hidden space-y-4 self-start lg:block"
    >
      {groups.map((group) => (
        <div key={group}>
          <p className="text-muted-foreground mb-1.5 px-3 font-mono text-[11px] tracking-[0.16em] uppercase">
            {group}
          </p>
          <ul className="space-y-0.5">
            {SETTINGS_SECTION_LINKS.filter((link) => link.group === group).map(
              (link) => (
                <li key={link.id}>
                  <SettingsSectionNavLink
                    link={link}
                    active={link.id === activeId}
                  />
                </li>
              ),
            )}
          </ul>
        </div>
      ))}
    </nav>
  )
}
