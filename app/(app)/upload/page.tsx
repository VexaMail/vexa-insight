import type { Metadata } from 'next'

import { PageContainer, PageHeader } from '@/components/shell'
import { UploadForm } from '@/components/upload'

export const metadata: Metadata = {
  title: 'Upload',
  description: 'Upload DMARC Reports',
}

export const dynamic = 'force-dynamic'

export default function UploadPage() {
  return (
    <PageContainer className="space-y-6">
      <PageHeader
        eyebrow="Operate"
        title="Upload"
        description="Add a report by hand: one a receiver sent somewhere other than the polled mailboxes, or an old one to backfill."
      />
      <UploadForm />
    </PageContainer>
  )
}
