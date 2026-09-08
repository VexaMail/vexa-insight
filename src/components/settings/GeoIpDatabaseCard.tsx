import { Button } from '@/components/ui'
import { Download } from 'lucide-react'
import type { GeoIpDatabaseCardProps } from './GeoIpDatabaseCardProps'
import { GeoIpDbStatus } from './GeoIpDbStatus'
import { GeoIpUpdateProgress } from './GeoIpUpdateProgress'

/** Database status, its update trigger and the running download's progress. */
export function GeoIpDatabaseCard({
  errorStatus,
  lastUpdate,
  isUpdatingDb,
  canUpdate,
  progressData,
  etaText,
  onUpdate,
}: GeoIpDatabaseCardProps) {
  return (
    <div className="border-border/50 bg-muted/20 flex flex-col gap-3 rounded-md border p-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <span className="text-sm font-medium">GeoIP Database Status</span>
          <div className="text-muted-foreground flex items-center gap-2 text-sm">
            <GeoIpDbStatus errorStatus={errorStatus} lastUpdate={lastUpdate} />
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          disabled={isUpdatingDb || !canUpdate}
          onClick={onUpdate}
        >
          <Download className="mr-2 h-4 w-4" />
          {isUpdatingDb ? 'Updating...' : 'Update Database'}
        </Button>
      </div>

      {isUpdatingDb && progressData !== null ? (
        <GeoIpUpdateProgress progress={progressData} etaText={etaText} />
      ) : null}
    </div>
  )
}
