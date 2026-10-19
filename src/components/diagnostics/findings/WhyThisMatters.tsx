import { Panel } from '@/components/ui'
import { whyDiagnosticsMatter } from '@/constants/diagnostics'
import { Lightbulb } from 'lucide-react'

/** Three lines on what the checks protect; the runbook has the detail. */
export function WhyThisMatters() {
  return (
    <Panel icon={<Lightbulb />} title="Why this matters">
      <ul className="space-y-3">
        {whyDiagnosticsMatter.map((item) => (
          <li key={item.title} className="space-y-0.5">
            <p className="text-foreground text-sm font-medium">{item.title}</p>
            <p className="text-muted-foreground text-xs">{item.text}</p>
          </li>
        ))}
      </ul>
    </Panel>
  )
}
