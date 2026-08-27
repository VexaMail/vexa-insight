export type UseImapAccountsSectionReturn = {
  readonly expandedIndices: ReadonlySet<number>
  readonly handleAdd: () => void
  readonly toggleExpand: (index: number) => void
}
