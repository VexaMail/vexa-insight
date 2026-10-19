export type CopyButtonProps = {
  /** The exact text put on the clipboard. */
  readonly value: string
  /** What is being copied, for the accessible name, e.g. "IP address". */
  readonly label: string
  readonly className?: string
}
