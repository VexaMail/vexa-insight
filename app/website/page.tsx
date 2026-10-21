import {
  PublicDomainChecker,
  PublicFooter,
  PublicHeader,
  PublicMonitor,
} from '@/components/public-site'
import { publicCheckerStructuredData } from '@/constants/public-site'
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
      <main id="main-content" className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <script type="application/ld+json">
          {JSON.stringify(publicCheckerStructuredData)}
        </script>
        <section aria-label="Free domain check" className="pt-6 pb-12 sm:pb-16">
          <PublicDomainChecker initialDomain={domain ?? ''} />
        </section>
        <PublicMonitor />
      </main>
      <PublicFooter />
    </div>
  )
}
