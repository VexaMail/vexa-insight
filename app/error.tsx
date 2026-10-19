'use client'

import { AuthScreen } from '@/components/login'
import { Button, CopyIconButton } from '@/components/ui'
import { RotateCcw } from 'lucide-react'

export default function ErrorPage({
  error,
  reset,
}: Readonly<{
  error: Error & { digest?: string }
  reset: () => void
}>) {
  return (
    <AuthScreen
      eyebrow="Error"
      title="Something went wrong"
      description="The page could not be rendered. The details are in the server log."
    >
      <div className="space-y-4">
        {error.digest ? (
          <div className="border-border bg-secondary flex items-center justify-between gap-2 rounded-md border py-1 pr-1 pl-3">
            <div className="min-w-0">
              <p className="text-muted-foreground font-mono text-[11px] tracking-[0.16em] uppercase">
                Log digest
              </p>
              <p className="text-foreground truncate font-mono text-sm">
                {error.digest}
              </p>
            </div>
            <CopyIconButton value={error.digest} label="error digest" />
          </div>
        ) : null}
        <Button type="button" onClick={reset} className="h-10 w-full">
          <RotateCcw />
          Try again
        </Button>
      </div>
    </AuthScreen>
  )
}
