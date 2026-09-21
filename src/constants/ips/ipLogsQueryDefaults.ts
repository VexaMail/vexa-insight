import type { IpLogsQuery } from '@/types/ips'

export const ipLogsQueryDefaults: IpLogsQuery = {
  search: '',
  disposition: '',
  spfResult: '',
  dkimResult: '',
  sort: 'newest',
}
