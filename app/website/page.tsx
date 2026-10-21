import {
  PublicDomainChecker,
  PublicFooter,
  PublicHeader,
  PublicHowItWorks,
  PublicMonitor,
} from '@/components/public-site'
import type { PublicDomainPageProps } from '@/types/public-check'
import './publicSite.css'

export default async function PublicWebsitePage({
  params,
}: PublicDomainPageProps) {
  const { domain } = await params
  return (
    <div
      data-public-site
      className="bg-background min-h-dvh overflow-x-clip scroll-smooth motion-reduce:scroll-auto"
    >
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
          className="mx-auto max-w-6xl px-5 pt-6 pb-16 sm:px-8 sm:pt-6 sm:pb-24"
        >
          <PublicDomainChecker initialDomain={domain ?? ''} />
        </section>
        <PublicHowItWorks />
        <PublicMonitor />
      </main>
      <PublicFooter />
    </div>
  )
}
