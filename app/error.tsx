'use client'

import Image from 'next/image'

export default function ErrorPage({
  error,
  reset,
}: Readonly<{
  error: Error & { digest?: string }
  reset: () => void
}>) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4 dark:bg-gray-950">
      <div className="w-full max-w-sm rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="mb-4 flex justify-center">
          <Image
            src="/vexa-insight-icon.svg"
            alt="Vexa Insight"
            width={48}
            height={48}
            className="h-12 w-12"
          />
        </div>
        <p className="font-display text-destructive text-sm font-semibold tracking-widest uppercase">
          Error
        </p>
        <h1 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
          Something went wrong
        </h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          The page could not be rendered. The details are in the server log
          {error.digest ? ` under digest ${error.digest}` : ''}.
        </p>
        <button
          type="button"
          onClick={reset}
          className="bg-primary text-primary-foreground hover:bg-primary/90 mt-6 inline-flex h-9 items-center justify-center rounded-md px-4 text-sm font-medium transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  )
}
