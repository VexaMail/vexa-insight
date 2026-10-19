import { AuthScreen } from '@/components/login'
import { Button } from '@/components/ui'
import { ArrowLeft, Search } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <AuthScreen
      eyebrow="404 · Not found"
      title="Page not found"
      description="Nothing lives at this address. It may have moved, or the domain, report or IP in the link is not in this instance."
    >
      <div className="flex flex-col gap-2 sm:flex-row">
        <Button asChild className="h-10 flex-1">
          <Link href="/dashboard">
            <ArrowLeft />
            Back to overview
          </Link>
        </Button>
        <Button asChild variant="outline" className="h-10 flex-1">
          <Link href="/domains">
            <Search />
            Browse domains
          </Link>
        </Button>
      </div>
    </AuthScreen>
  )
}
