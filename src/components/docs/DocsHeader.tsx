import { AuthWordmark } from '@/components/login'
import { ThemeToggle } from '@/components/shell'
import { ArrowLeft, FileJson } from 'lucide-react'
import Link from 'next/link'

/** Console bar above the API reference: logo, spec link, way back. */
export function DocsHeader() {
  return (
    <header className="border-border bg-card/90 sticky top-0 z-20 border-b backdrop-blur">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-3 px-4 sm:px-6">
        <Link href="/" className="shrink-0" aria-label="Vexa Insight console">
          <AuthWordmark />
        </Link>
        <span className="border-border text-muted-foreground hidden border-l pl-3 font-mono text-[11px] tracking-[0.16em] uppercase sm:inline">
          API reference
        </span>
        <div className="ml-auto flex items-center gap-1">
          <a
            href="/api/v1/openapi.json"
            className="text-muted-foreground hover:text-foreground hover:bg-accent inline-flex h-9 items-center gap-1.5 rounded-md px-2.5 text-sm transition-colors"
          >
            <FileJson className="h-4 w-4" aria-hidden />
            <span className="hidden sm:inline">OpenAPI JSON</span>
            <span className="sr-only sm:hidden">OpenAPI JSON</span>
          </a>
          <Link
            href="/"
            className="text-muted-foreground hover:text-foreground hover:bg-accent inline-flex h-9 items-center gap-1.5 rounded-md px-2.5 text-sm transition-colors"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Console
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
