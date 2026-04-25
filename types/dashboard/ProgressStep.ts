/**
 * Single step within a progress item (e.g. connect, fetch, process).
 */
export type ProgressStep = {
  key: string
  label: string
  status: 'pending' | 'active' | 'done' | 'error'
}
