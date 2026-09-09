import type { SettingsSectionHeaderProps } from './SettingsSectionHeaderProps'

/** Icon badge, heading and one-line description that open a settings card. */
export function SettingsSectionHeader({
  headingId,
  icon,
  iconClassName,
  title,
  description,
}: SettingsSectionHeaderProps) {
  return (
    <div className="mb-4 flex items-center gap-2">
      <div className={iconClassName}>{icon}</div>
      <div>
        <h2
          id={headingId}
          className="font-display text-foreground text-sm font-semibold"
        >
          {title}
        </h2>
        <p className="text-muted-foreground text-xs">{description}</p>
      </div>
    </div>
  )
}
