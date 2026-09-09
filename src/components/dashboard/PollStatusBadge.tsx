import { CheckCircle } from 'lucide-react'
import type { PollStatusBadgeProps } from './PollStatusBadgeProps'

export function PollStatusBadge({ isRunning }: Readonly<PollStatusBadgeProps>) {
  return (
    <div
      className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
        isRunning ? 'bg-info/10 text-info' : 'bg-success/10 text-success'
      }`}
    >
      <CheckCircle className="h-3 w-3" />
      {isRunning ? 'Running' : 'Idle'}
    </div>
  )
}
