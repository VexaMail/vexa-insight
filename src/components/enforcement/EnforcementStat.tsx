import type { EnforcementStatProps } from './EnforcementStatProps'

/** One labelled figure of the readiness card. */
export function EnforcementStat({ label, value }: EnforcementStatProps) {
  return (
    <div>
      <p className="text-sm text-zinc-500 dark:text-zinc-400">{label}</p>
      <p className="text-xl font-semibold text-zinc-900 tabular-nums dark:text-zinc-50">
        {value.toLocaleString()}
      </p>
    </div>
  )
}
