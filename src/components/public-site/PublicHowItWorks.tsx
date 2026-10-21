import { PublicProtocolGuide } from './PublicProtocolGuide'
import { PublicQuestions } from './PublicQuestions'

export function PublicHowItWorks() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="guide-heading"
      className="border-t py-12 sm:py-16"
    >
      <h2
        id="guide-heading"
        className="text-2xl font-semibold tracking-tight sm:text-3xl"
      >
        How to check DMARC and email authentication
      </h2>
      <p className="text-muted-foreground mt-4 max-w-prose leading-relaxed">
        Enter a domain, such as example.com, to look up its public email DNS
        records. Read the published policy and evidence, then use real message
        or aggregate report data to confirm authentication.
      </p>
      <PublicProtocolGuide />
      <PublicQuestions />
    </section>
  )
}
