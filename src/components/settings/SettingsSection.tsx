import { Panel } from '@/components/ui'
import type { SettingsSectionProps } from '@/types/settings'

/**
 * One anchored settings section: a Panel with an icon, a title the index can
 * link to and a single help line.
 */
export function SettingsSection({
  anchorId,
  headingId,
  icon,
  title,
  description,
  actions,
  children,
}: Readonly<SettingsSectionProps>) {
  return (
    <div id={anchorId} className="scroll-mt-20 lg:scroll-mt-6">
      <Panel
        icon={icon}
        title={<span id={headingId}>{title}</span>}
        description={description}
        actions={actions}
      >
        {children}
      </Panel>
    </div>
  )
}
