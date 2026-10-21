import { Activity, ScanSearch, ShieldCheck } from 'lucide-react'

export function PublicHowItWorks() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-heading"
      className="mx-auto max-w-6xl border-t px-5 py-16 sm:px-8 sm:py-24"
    >
      <p className="text-primary text-sm font-medium">
        From a record to the real picture
      </p>
      <h2
        id="how-heading"
        className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl"
      >
        Good DNS is the beginning.
        <br />
        Knowing your senders comes next.
      </h2>
      <div className="mt-10 grid gap-8 md:grid-cols-3">
        <article>
          <ScanSearch aria-hidden="true" className="text-primary mb-4 size-6" />
          <h3 className="font-semibold">Check the configuration</h3>
          <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
            See the public records for your domain and understand the next
            steps, without changing a thing.
          </p>
        </article>
        <article>
          <Activity aria-hidden="true" className="text-primary mb-4 size-6" />
          <h3 className="font-semibold">See who actually sends</h3>
          <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
            Connect aggregate DMARC reports in Vexa Insight to see sending
            sources and authentication results.
          </p>
        </article>
        <article>
          <ShieldCheck
            aria-hidden="true"
            className="text-primary mb-4 size-6"
          />
          <h3 className="font-semibold">Move toward enforcement</h3>
          <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
            Investigate failures and confirm legitimate services before
            tightening your DMARC policy.
          </p>
        </article>
      </div>
    </section>
  )
}
