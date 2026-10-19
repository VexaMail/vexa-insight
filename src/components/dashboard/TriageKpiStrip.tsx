import { cn } from '@/lib/utils'
import { kpiTileModels } from '@/utils/dashboard'
import { FileText, Globe, Mail, ShieldCheck } from 'lucide-react'
import type { TriageKpiStripProps } from './TriageKpiStripProps'
import { TriageKpiTile } from './TriageKpiTile'

/** Four headline figures, each with what it is out of and its change. */
export function TriageKpiStrip({
  kpis,
  window,
  className,
}: Readonly<TriageKpiStripProps>) {
  const [messages, domains, passRate, reports] = kpiTileModels(kpis, window)
  const previous = window.previous
    ? `previous ${String(window.lengthDays)} days`
    : null
  const icons = [
    <Mail key="m" />,
    <Globe key="g" />,
    <ShieldCheck key="s" />,
    <FileText key="f" />,
  ]
  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4',
        className,
      )}
    >
      {[messages, domains, passRate, reports].map((model, i) =>
        model ? (
          <TriageKpiTile
            key={model.label}
            model={model}
            icon={icons[i]}
            previousLabel={previous}
          />
        ) : null,
      )}
    </div>
  )
}
