import { IconTile, Panel } from '@/components/ui'
import { whyDiagnosticsMatter } from '@/constants/diagnostics'
import { BookOpen } from 'lucide-react'

/** Three lines on what the checks protect; the runbook has the detail. */
export function WhyThisMatters() {
  return (
    <Panel
      icon={<BookOpen />}
      title="Why this matters"
      description="What fixing these checks protects"
    >
      <ul className="space-y-4">
        {whyDiagnosticsMatter.map((item) => (
          <li key={item.title} className="flex items-start gap-3">
            <IconTile tone={item.tone}>
              <item.icon />
            </IconTile>
            <div className="min-w-0 space-y-0.5">
              <p className="text-foreground text-sm font-medium">
                {item.title}
              </p>
              <p className="text-muted-foreground text-xs">{item.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </Panel>
  )
}
