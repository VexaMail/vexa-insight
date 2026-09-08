export type EngineHeaderProps = {
  readonly initialApiKey: string
  readonly isRunning: boolean
  readonly runRequested: boolean
  readonly abortStatus: string
  readonly onAbort: () => void
}
