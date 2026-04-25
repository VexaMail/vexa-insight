export function getStepBadgeClasses(status: string): string {
  if (status === 'done') return 'bg-success/10 text-success'
  if (status === 'active') return 'bg-info/10 text-info'
  if (status === 'error') return 'bg-danger/10 text-danger'
  return 'bg-surface-1 text-muted-foreground'
}
