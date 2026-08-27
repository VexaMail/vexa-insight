import type { InstallAction } from '@/types/install'

export type Props = {
  interval: number
  daysBack: number
  dispatch: React.Dispatch<InstallAction>
}
