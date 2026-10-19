import { Button } from '@/components/ui'
import { ArrowRight } from 'lucide-react'
import type { ArrowLinkButtonProps } from './ArrowLinkButtonProps'

/** Outlined secondary action with a trailing arrow, for a jump elsewhere. */
export function ArrowLinkButton({
  href,
  label,
}: Readonly<ArrowLinkButtonProps>) {
  return (
    <Button
      asChild
      variant="outline"
      size="sm"
      className="border-info/40 text-info hover:bg-info/10 hover:text-info h-9 cursor-pointer bg-transparent"
    >
      <a href={href}>
        {label}
        <ArrowRight />
      </a>
    </Button>
  )
}
