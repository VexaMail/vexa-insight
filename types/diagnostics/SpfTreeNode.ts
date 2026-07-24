export type SpfTreeNode = {
  domain: string
  record: string | null
  mechanisms: string[]
  children: SpfTreeNode[]
  lookupCount: number
  missingRecord: boolean
  cycleDetected: boolean
  exceedsLookupLimit: boolean
}
