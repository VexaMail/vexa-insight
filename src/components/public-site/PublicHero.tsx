import { ShieldCheck } from 'lucide-react'

export function PublicHero() {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-primary mb-6 inline-flex items-center gap-2 text-sm font-medium">
        <ShieldCheck aria-hidden="true" className="size-4" /> Free email
        security check
      </p>
      <h1 className="text-4xl leading-[1.08] font-semibold tracking-tight text-balance sm:text-6xl">
        Your domain sends email.
        <br />
        <span className="text-primary">Does it send trust?</span>
      </h1>
      <p className="text-muted-foreground mx-auto mt-6 max-w-xl text-lg leading-relaxed text-pretty">
        Check your domain’s SPF, DKIM, DMARC and mail routing. Understand what
        is published, what needs attention and what DNS alone cannot tell you.
      </p>
    </div>
  )
}
