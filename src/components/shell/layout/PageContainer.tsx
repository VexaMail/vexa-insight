import { cn } from '@/lib/utils'
import type { PageContainerProps } from './PageContainerProps'

export function PageContainer({
  children,
  className,
}: Readonly<PageContainerProps>) {
  return (
    <div className={cn('mx-auto w-full max-w-7xl space-y-8', className)}>
      {children}
    </div>
  )
}
