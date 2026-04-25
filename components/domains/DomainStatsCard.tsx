import type { DomainStatsCardProps } from '@/types/domains'

export default function DomainStatsCard({
  totalMessages,
  passedCount,
  failedCount,
  passRatePercent,
}: Readonly<DomainStatsCardProps>) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-800">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">Total emails</p>
        <p className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          {totalMessages.toLocaleString()}
        </p>
      </div>
      <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-800">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">Passed</p>
        <p className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          {passedCount.toLocaleString()}
        </p>
      </div>
      <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-800">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">Failed</p>
        <p className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          {failedCount.toLocaleString()}
        </p>
      </div>
      <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-800">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Compliance rate
        </p>
        <p className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          {passRatePercent.toFixed(1)}%
        </p>
      </div>
    </div>
  )
}
