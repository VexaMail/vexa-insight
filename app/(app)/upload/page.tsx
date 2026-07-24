import type { Metadata } from 'next'

import { PageContainer, PageHeader } from '@/components/shell'
import { UploadForm } from '@/components/upload'

export const metadata: Metadata = {
  title: 'Upload | Vexa Insight',
  description: 'Upload DMARC Reports',
}

export const dynamic = 'force-dynamic'

export default function UploadPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Upload"
        description="Upload DMARC aggregate reports for analysis."
      />
      <UploadForm />
    </PageContainer>
  )
}
