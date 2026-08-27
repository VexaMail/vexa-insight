import { cn } from '@/lib/utils'
import type { BadgeProps } from './BadgeProps'
import { badgeVariants } from './badgeVariants'

function Badge({ className, variant, ...props }: Readonly<BadgeProps>) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge }
