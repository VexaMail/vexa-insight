import type { NavigatorArrowsProps } from '@/types/ui'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Button } from './button'

export function NavigatorArrows({
  hasPrev,
  hasNext,
  onPrev,
  onNext,
}: Readonly<NavigatorArrowsProps>) {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={onPrev}
        disabled={!hasPrev}
        className="h-8 gap-1"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Prev
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={onNext}
        disabled={!hasNext}
        className="h-8 gap-1"
      >
        Next <ArrowRight className="h-3.5 w-3.5" />
      </Button>
    </div>
  )
}
