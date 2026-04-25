'use client'

export default function AiNotConfiguredCta() {
  return (
    <div className="rounded-lg border border-dashed border-zinc-300 bg-linear-to-br from-zinc-50 to-zinc-100/50 p-6 dark:border-zinc-600 dark:from-zinc-800/50 dark:to-zinc-900/50">
      <div className="flex items-start gap-3">
        <span className="text-2xl" aria-hidden="true">
          ✨
        </span>
        <div>
          <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
            AI Insights
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Get AI-powered explanations of this DMARC report to understand
            authentication results, alignment issues, and recommended actions.
          </p>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            To enable AI insights, configure an AI provider in Settings.
          </p>
          <a
            href="/settings"
            className="mt-3 inline-flex items-center gap-1 rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-600 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Configure AI in Settings →
          </a>
        </div>
      </div>
    </div>
  )
}
