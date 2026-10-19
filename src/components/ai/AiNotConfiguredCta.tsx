'use client'

export default function AiNotConfiguredCta() {
  return (
    <div className="border-border bg-muted/30 rounded-lg border border-dashed p-6">
      <div className="flex items-start gap-3">
        <span className="text-2xl" aria-hidden="true">
          ✨
        </span>
        <div>
          <h3 className="text-foreground text-base font-semibold">
            AI Insights
          </h3>
          <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
            Get AI-powered explanations of this DMARC report to understand
            authentication results, alignment issues, and recommended actions.
          </p>
          <p className="text-muted-foreground mt-2 text-sm">
            To enable AI insights, configure an AI provider in Settings.
          </p>
          <a
            href="/settings"
            className="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:outline-ring mt-3 inline-flex items-center gap-1 rounded-md px-4 py-2 text-sm font-medium shadow-sm transition focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            Configure AI in Settings →
          </a>
        </div>
      </div>
    </div>
  )
}
