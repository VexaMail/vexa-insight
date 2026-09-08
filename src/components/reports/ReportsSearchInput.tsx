import { Input } from '@/components/ui'
import { Search } from 'lucide-react'

/** Free-text search over report id and organization. */
export function ReportsSearchInput({
  value,
  onChange,
}: Readonly<{ value: string; onChange: (value: string) => void }>) {
  return (
    <div className="relative flex-1">
      <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
      <Input
        placeholder="Search by report ID or organization..."
        value={value}
        onChange={(e) => {
          onChange(e.target.value)
        }}
        className="bg-card border-border/50 pl-9"
      />
    </div>
  )
}
