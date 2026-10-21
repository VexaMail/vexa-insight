import { getPublicDmarcTags } from './getPublicDmarcTags'

export function getPublicDmarcPsdFlag(record: string): string | undefined {
  return getPublicDmarcTags(record).get('psd')?.toLowerCase()
}
