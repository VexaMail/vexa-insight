export function getStatusClassName(status: string) {
  if (status === 'pending') return 'bg-muted'
  if (status === 'active') return 'bg-info animate-pulse'
  if (status === 'done') return 'bg-success'
  return 'bg-danger'
}
