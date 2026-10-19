import type { ReactNode } from 'react'

export type EngineHeaderProps = {
  readonly initialApiKey: string
  readonly isRunning: boolean
  readonly runRequested: boolean
  readonly abortStatus: string
  readonly onAbort: () => void
  /** Replaces run now and rescan while idle, e.g. when no mailbox exists. */
  readonly idleAction?: ReactNode
}
