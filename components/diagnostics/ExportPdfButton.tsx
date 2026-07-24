'use client'

import { Button } from '@/components/ui'
import { Printer } from 'lucide-react'

export function ExportPdfButton() {
  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className="h-9 gap-2 print:hidden"
      onClick={() => {
        window.print()
      }}
    >
      <Printer className="h-4 w-4" />
      Download PDF
    </Button>
  )
}
