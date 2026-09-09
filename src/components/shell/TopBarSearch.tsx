import { Input } from '@/components/ui'
import { Search } from 'lucide-react'

/** The read-only search box shown on wider screens. */
export function TopBarSearch() {
  return (
    <div className="relative hidden md:block">
      <Search className="text-muted-foreground absolute top-1/2 left-2.5 h-3.5 w-3.5 -translate-y-1/2" />
      <Input
        placeholder="Search..."
        className="bg-secondary border-border/50 focus:border-primary/50 h-8 w-52 pl-8 text-xs"
        readOnly
      />
    </div>
  )
}
