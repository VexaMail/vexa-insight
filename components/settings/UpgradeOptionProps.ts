export type UpgradeOptionProps = {
  readonly title: string
  readonly description: string
  readonly command: string
  readonly badge?: string
  readonly onCopy: (text: string) => void
}
