import { Rocket } from 'lucide-react'
import type { SelfUpdateIntroProps } from './SelfUpdateIntroProps'

/** Icon and explanation of what "Apply update now" does on this install. */
export function SelfUpdateIntro({ supervisor }: SelfUpdateIntroProps) {
  return (
    <>
      <div className="bg-primary/10 text-primary flex h-8 w-8 shrink-0 items-center justify-center rounded-lg">
        <Rocket className="h-4 w-4" />
      </div>
      <div className="flex-1">
        <p className="text-foreground text-xs font-semibold">
          Apply update from the dashboard
        </p>
        <p className="text-muted-foreground text-xs">
          Backs up your SQLite database, pulls the latest tag, runs
          <code className="mx-1">pnpm install &amp; build</code>, then restarts
          via your supervisor ({supervisor === 'pm2' ? 'PM2' : 'systemd'}). The
          dashboard is unreachable for ~30 seconds during the swap.
        </p>
      </div>
    </>
  )
}
