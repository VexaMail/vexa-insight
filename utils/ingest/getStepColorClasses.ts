export function getStepColorClasses(status: string): string {
  if (status === 'done') return 'border-success/20 bg-success/5'
  if (status === 'active')
    return 'border-info/30 bg-info/5 shadow-[0_0_12px_-3px_hsl(var(--info)/0.3)]'
  if (status === 'error') return 'border-danger/20 bg-danger/5'
  return 'border-border/50 bg-surface-1'
}
