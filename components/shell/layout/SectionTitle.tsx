import { cn } from '@/lib/utils'
import type { SectionTitleProps } from './SectionTitleProps'

export function SectionTitle({
  as: Comp = 'h2',
  children,
  className,
}: Readonly<SectionTitleProps>) {
  return (
    <Comp className={cn('text-foreground text-lg font-semibold', className)}>
      {children}
    </Comp>
  )
}
