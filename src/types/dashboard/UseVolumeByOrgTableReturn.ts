import type { VolumeByOrg } from '@/types/reports'

export type UseVolumeByOrgTableReturn = {
  readonly maxCount: number
  readonly rows: VolumeByOrg[]
  readonly isLoading: boolean
}
