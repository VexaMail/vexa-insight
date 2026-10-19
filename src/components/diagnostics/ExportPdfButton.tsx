'use client'

import { Button } from '@/components/ui'
import { Printer } from 'lucide-react'

/** Prints every tab of the report; secondary to investigating on screen. */
export function ExportPdfButton() {
  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className="text-muted-foreground h-9 gap-2 print:hidden"
      onClick={() => {
        window.print()
      }}
    >
      <Printer aria-hidden className="h-4 w-4" />
      Download PDF
    </Button>
  )
}
