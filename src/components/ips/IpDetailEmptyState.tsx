export function IpDetailEmptyState({ message }: Readonly<{ message: string }>) {
  return (
    <div className="border-border bg-secondary/40 text-muted-foreground rounded-lg border border-dashed py-8 text-center text-sm">
      {message}
    </div>
  )
}
