import type { SndsConnectionStatusProps } from './SndsConnectionStatusProps'

/** Connected state and the outcome of the last sync. */
export function SndsConnectionStatus({
  connection,
}: SndsConnectionStatusProps) {
  if (!connection?.connected) {
    return <p className="text-muted-foreground text-sm">Not connected.</p>
  }
  return (
    <dl className="text-muted-foreground grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
      <dt>Connected</dt>
      <dd>
        {connection.connectedAt
          ? new Date(connection.connectedAt).toLocaleString()
          : 'yes'}
      </dd>
      <dt>Last sync</dt>
      <dd>
        {connection.lastSyncAt
          ? new Date(connection.lastSyncAt).toLocaleString()
          : 'never'}
        {connection.lastSyncStatus ? ` (${connection.lastSyncStatus})` : ''}
      </dd>
      {connection.lastSyncError ? (
        <>
          <dt>Last error</dt>
          <dd className="text-destructive">{connection.lastSyncError}</dd>
        </>
      ) : null}
    </dl>
  )
}
