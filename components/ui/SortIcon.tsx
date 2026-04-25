'use client'

import { ArrowDown, ArrowUp } from 'lucide-react'
import type { SortIconProps } from './SortIconProps'

export default function SortIcon({ active, dir }: SortIconProps) {
  if (!active)
    return <ArrowDown className="text-muted-foreground/30 ml-1 h-3 w-3" />
  if (dir === 'asc') return <ArrowUp className="text-primary ml-1 h-3 w-3" />
  return <ArrowDown className="text-primary ml-1 h-3 w-3" />
}
