import { IconTile, Panel } from '@/components/ui'
import type { SettingsSectionProps } from '@/types/settings'

/**
 * One anchored settings section: a Panel led by a tinted icon square, a title
 * the index can link to and a single help line.
 */
export function SettingsSection({
  anchorId,
  headingId,
  icon,
  iconTone = 'info',
  title,
  description,
  actions,
  children,
}: Readonly<SettingsSectionProps>) {
  return (
    <div id={anchorId} className="scroll-mt-20 lg:scroll-mt-6">
      <Panel
        icon={
          <IconTile size="sm" tone={iconTone} className="-mt-0.5">
            {icon}
          </IconTile>
        }
        title={<span id={headingId}>{title}</span>}
        description={description}
        actions={actions}
      >
        {children}
      </Panel>
    </div>
  )
}
