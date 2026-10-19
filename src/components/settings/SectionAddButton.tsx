import { Button } from '@/components/ui'
import { Plus } from 'lucide-react'
import type { SectionAddButtonProps } from './SectionAddButtonProps'

/** The primary "add" action in a list section's header. */
export function SectionAddButton({
  label,
  onClick,
}: Readonly<SectionAddButtonProps>) {
  return (
    <Button type="button" size="sm" className="h-9" onClick={onClick}>
      <Plus />
      {label}
    </Button>
  )
}
