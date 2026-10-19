import { kpiTileModels } from '@/utils/dashboard'
import { FileText, Globe, Mail, ShieldCheck } from 'lucide-react'
import type { TriageKpiStripProps } from './TriageKpiStripProps'
import { TriageKpiTile } from './TriageKpiTile'

/**
 * Four headline figures, each with what it is out of and its change. A phone
 * gets the same figures as compact tiles two to a row, so the strip still
 * opens the page without pushing the queue several screens down.
 */
export function TriageKpiStrip({
  kpis,
  window,
  className,
}: Readonly<TriageKpiStripProps>) {
  const models = kpiTileModels(kpis, window)
  const previous = window.previous
    ? `the previous ${String(window.lengthDays)} days`
    : null
  const icons = [
    <Mail key="m" />,
    <Globe key="g" />,
    <ShieldCheck key="s" />,
    <FileText key="f" />,
  ]
  return (
    <div className={className}>
      <div className="grid grid-cols-2 gap-2 sm:hidden">
        {models.map((model, i) => (
          <TriageKpiTile
            key={model.label}
            model={model}
            icon={icons[i]}
            previousLabel={previous}
            variant="compact"
          />
        ))}
      </div>
      <div className="hidden gap-4 sm:grid sm:grid-cols-2 xl:grid-cols-4">
        {models.map((model, i) => (
          <TriageKpiTile
            key={model.label}
            model={model}
            icon={icons[i]}
            previousLabel={previous}
          />
        ))}
      </div>
    </div>
  )
}
