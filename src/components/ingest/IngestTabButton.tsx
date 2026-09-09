'use client'

import type { IngestTabButtonProps } from './IngestTabButtonProps'

export function IngestTabButton({
  active,
  onClick,
  children,
}: Readonly<IngestTabButtonProps>) {
  return (
    <button
      className={`font-display border-b-2 px-4 py-2 text-sm font-semibold transition-colors ${
        active
          ? 'border-primary text-foreground'
          : 'text-muted-foreground hover:border-border hover:text-foreground border-transparent'
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
