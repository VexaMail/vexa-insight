export function publicScoreColor(value: number | null): string {
  if (value === null) return 'text-muted-foreground'
  if (value >= 80) return 'text-success'
  if (value >= 50) return 'text-warning'
  return 'text-danger'
}
