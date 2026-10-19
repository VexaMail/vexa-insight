import { cn } from '@/lib/utils'
import type { PageContainerProps } from './PageContainerProps'

export function PageContainer({
  children,
  className,
}: Readonly<PageContainerProps>) {
  return (
    <div className={cn('max-w-console mx-auto w-full space-y-8', className)}>
      {children}
    </div>
  )
}
