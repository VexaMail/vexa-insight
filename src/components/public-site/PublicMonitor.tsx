import { ArrowUpRight } from 'lucide-react'

export function PublicMonitor() {
  return (
    <section
      id="monitor"
      aria-labelledby="monitor-heading"
      className="mx-auto max-w-6xl px-5 pb-16 sm:px-8 sm:pb-24"
    >
      <div className="bg-card grid gap-8 rounded-2xl border p-7 sm:p-10 md:grid-cols-[1.4fr_1fr] md:items-center">
        <div>
          <p className="text-primary mb-3 text-sm font-medium">
            Vexa Insight · Open source
          </p>
          <h2
            id="monitor-heading"
            className="text-3xl font-semibold tracking-tight"
          >
            A snapshot today.
            <br />
            Visibility every day.
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg text-sm leading-relaxed">
            Run Vexa Insight on your own infrastructure. Collect DMARC reports
            from your mailbox, investigate sending sources and track
            authentication across your domains.
          </p>
        </div>
        <div className="space-y-4">
          <a
            href="https://github.com/VexaMail/vexa-insight#readme"
            className="bg-primary text-primary-foreground flex items-center justify-center gap-2 rounded-md px-6 py-3 text-sm font-semibold"
          >
            Get Vexa Insight{' '}
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </a>
          <p className="text-muted-foreground text-center text-xs leading-relaxed">
            Free, self-hosted software. Your reports stay on your
            infrastructure. Setup instructions on GitHub.
          </p>
        </div>
      </div>
    </section>
  )
}
