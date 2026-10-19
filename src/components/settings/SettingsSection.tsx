import { IconTile, Panel } from '@/components/ui'
import { cn } from '@/lib/utils'
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
  wide = false,
  children,
}: Readonly<SettingsSectionProps>) {
  return (
    <div
      id={anchorId}
      className={cn(
        'scroll-mt-20 lg:scroll-mt-6 [&>*]:h-full',
        wide && '2xl:col-span-2',
      )}
    >
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
