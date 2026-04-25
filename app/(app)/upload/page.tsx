import type { Metadata } from 'next'

import { UploadForm } from '@/components/upload'

export const metadata: Metadata = {
  title: 'Upload | Vexa Insight',
  description: 'Upload DMARC Reports',
}

export default function UploadPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <UploadForm />
    </div>
  )
}
