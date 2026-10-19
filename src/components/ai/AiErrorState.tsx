'use client'

import { Button } from '@/components/ui'
import { TriangleAlert } from 'lucide-react'
import type { AiErrorStateProps } from './AiErrorStateProps'

export default function AiErrorState({
  message,
  onRetry,
}: Readonly<AiErrorStateProps>) {
  return (
    <div className="border-danger/30 bg-danger/10 rounded-lg border p-4">
      <div className="flex items-start gap-3">
        <TriangleAlert
          className="text-danger mt-0.5 h-4 w-4 shrink-0"
          aria-hidden="true"
        />
        <div>
          <p className="text-danger text-sm font-medium">{message}</p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onRetry}
            className="border-danger/35 text-danger hover:bg-danger/10 hover:text-danger mt-2 bg-transparent print:hidden"
          >
            Try again
          </Button>
        </div>
      </div>
    </div>
  )
}
