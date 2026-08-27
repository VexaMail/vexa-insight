'use client'

export default function AiEmptyState() {
  return (
    <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800/50">
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        The AI could not produce insights for this report because the source
        data is insufficient. This can happen if the report XML is incomplete or
        contains no authentication records.
      </p>
    </div>
  )
}
