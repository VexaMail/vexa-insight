export type SndsActionsProps = {
  readonly connected: boolean
  readonly isBusy: boolean
  readonly onConnect: () => void
  readonly onSync: () => void
  readonly onDisconnect: () => void
}
