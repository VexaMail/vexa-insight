export function getMobileStepColorClasses(status: string): string {
  if (status === 'done') return 'bg-success/10 ring-success/25'
  if (status === 'active') return 'bg-info/10 ring-info/25'
  if (status === 'error') return 'bg-danger/10 ring-danger/25'
  return 'bg-surface-1 ring-border'
}
