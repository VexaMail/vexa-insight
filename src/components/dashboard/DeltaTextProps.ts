import type { ChangeDirection } from '@/types/dashboard'

export type DeltaTextProps = {
  readonly value: string
  readonly direction: ChangeDirection
  readonly className?: string
}
