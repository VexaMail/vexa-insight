import {
  PublicDomainChecker,
  PublicFooter,
  PublicHeader,
  PublicHero,
  PublicHowItWorks,
  PublicMonitor,
  PublicProtocolStrip,
} from '@/components/public-site'

export default function PublicWebsitePage() {
  return (
    <div className="bg-background h-dvh overflow-x-hidden overflow-y-auto scroll-smooth motion-reduce:scroll-auto">
      <a
        href="#main-content"
        className="bg-card sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:p-3"
      >
        Skip to content
      </a>
      <PublicHeader />
      <main id="main-content">
        <section
          aria-label="Free domain check"
          className="mx-auto max-w-6xl px-5 pt-12 pb-16 sm:px-8 sm:pt-20 sm:pb-24"
        >
          <PublicHero />
          <PublicDomainChecker />
          <PublicProtocolStrip />
        </section>
        <PublicHowItWorks />
        <PublicMonitor />
      </main>
      <PublicFooter />
    </div>
  )
}
