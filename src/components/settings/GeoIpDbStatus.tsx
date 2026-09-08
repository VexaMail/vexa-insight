import { AlertCircle, CheckCircle } from 'lucide-react'
import type { GeoIpDbStatusProps } from './GeoIpDbStatusProps'

/** One-line freshness status of the local MaxMind database. */
export function GeoIpDbStatus({ errorStatus, lastUpdate }: GeoIpDbStatusProps) {
  if (errorStatus !== null && errorStatus !== '') {
    return (
      <>
        <AlertCircle className="text-danger h-4 w-4" />
        <span>Failed: {errorStatus}</span>
      </>
    )
  }
  if (lastUpdate !== null && lastUpdate !== '') {
    return (
      <>
        <CheckCircle className="text-success h-4 w-4" />
        <span>Last updated: {new Date(lastUpdate).toLocaleString()}</span>
      </>
    )
  }
  return (
    <>
      <AlertCircle className="text-warning h-4 w-4" />
      <span>No database present / Not updated</span>
    </>
  )
}
