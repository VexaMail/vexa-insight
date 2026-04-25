export type OverallResult = {
  total: number
  doneCount: number
  percent: number
  overall: 'pending' | 'active' | 'done' | 'error'
}
