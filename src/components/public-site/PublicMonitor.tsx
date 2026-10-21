import Image from 'next/image'

export function PublicMonitor() {
  return (
    <section
      id="monitor"
      aria-labelledby="monitor-heading"
      className="border-t py-12 sm:py-16"
    >
      <div className="grid gap-8 md:grid-cols-[1fr_1.4fr] md:items-center">
        <div>
          <h2
            id="monitor-heading"
            className="text-2xl font-semibold tracking-tight sm:text-3xl"
          >
            See who actually sends your email
          </h2>
          <p className="text-muted-foreground mt-4 max-w-prose leading-relaxed">
            Vexa Insight is a self-hosted email observability app. Connect DMARC
            reports to see sending sources, investigate authentication failures
            and track changes across your domains.
          </p>
          <p className="text-muted-foreground mt-3 max-w-prose text-sm leading-relaxed">
            Free, open source and on your infrastructure. The app includes
            report analysis, source review, DNS diagnostics and alert rules.
          </p>
          <a
            href="https://github.com/VexaMail/vexa-insight#quick-start"
            className="bg-primary text-primary-foreground focus-visible:ring-ring mt-6 inline-flex min-h-11 items-center justify-center rounded-md px-5 py-3 font-semibold focus-visible:ring-2"
          >
            Install Vexa Insight
          </a>
        </div>
        <figure>
          <Image
            src="/vexa-insight-dashboard.png"
            alt="Vexa Insight dashboard showing authentication trends and sending sources with synthetic demonstration data"
            width={1920}
            height={1080}
            className="h-auto w-full rounded-lg border"
          />
          <figcaption className="text-muted-foreground mt-3 text-xs">
            Dashboard preview · synthetic demonstration data
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
