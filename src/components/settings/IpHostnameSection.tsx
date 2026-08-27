'use client'

import { Input } from '@/components/ui'
import { m as motion } from 'framer-motion'
import { Globe } from 'lucide-react'
import type { IpHostnameSectionProps } from './IpHostnameSectionProps'

export default function IpHostnameSection({
  enabled,
  refreshIntervalHours,
  timeoutMs,
  maxRetries,
  retryBackoffMinutes,
  batchSize,
  manualRefreshEnabled,
  allowPrivateIps,
  negativeCacheHours,
  onChange,
}: Readonly<IpHostnameSectionProps>) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.35 }}
      className="glass-card p-6"
      aria-labelledby="settings-ip-hostname-heading"
    >
      <div className="mb-4 flex items-center gap-2">
        <div className="bg-muted text-muted-foreground flex h-8 w-8 items-center justify-center rounded-lg">
          <Globe className="h-4 w-4" />
        </div>
        <div>
          <h2
            id="settings-ip-hostname-heading"
            className="font-display text-foreground text-sm font-semibold"
          >
            IP to Hostname Lookup
          </h2>
          <p className="text-muted-foreground text-xs">
            Automatically resolve and cache hostnames for incoming IP addresses
          </p>
        </div>
      </div>

      <div className="mb-6 flex items-center gap-2">
        <input
          type="checkbox"
          id="ip-lookup-enabled"
          checked={enabled}
          onChange={(e) => {
            onChange('ipHostnameLookupEnabled', e.target.checked)
          }}
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <label
          htmlFor="ip-lookup-enabled"
          className="text-foreground text-sm font-medium"
        >
          Enable Background IP to Hostname Lookups
        </label>
      </div>

      {enabled && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Refresh Intervals */}
          <div>
            <label
              htmlFor="ip-refresh-hours"
              className="text-foreground mb-1.5 block text-xs font-medium"
            >
              Refresh Interval (Hours)
            </label>
            <Input
              id="ip-refresh-hours"
              type="number"
              min={1}
              max={8760}
              value={refreshIntervalHours}
              onChange={(e) => {
                onChange(
                  'ipHostnameRefreshIntervalHours',
                  parseInt(e.target.value) || 48,
                )
              }}
              className="bg-secondary border-border/50 text-xs"
            />
          </div>

          <div>
            <label
              htmlFor="ip-negative-cache"
              className="text-foreground mb-1.5 block text-xs font-medium"
            >
              Negative Cache (Hours)
            </label>
            <Input
              id="ip-negative-cache"
              type="number"
              min={1}
              max={8760}
              value={negativeCacheHours}
              onChange={(e) => {
                onChange(
                  'ipHostnameNegativeCacheHours',
                  parseInt(e.target.value) || 24,
                )
              }}
              className="bg-secondary border-border/50 text-xs"
            />
          </div>

          {/* Timeouts and Retries */}
          <div>
            <label
              htmlFor="ip-timeout"
              className="text-foreground mb-1.5 block text-xs font-medium"
            >
              Lookup Timeout (ms)
            </label>
            <Input
              id="ip-timeout"
              type="number"
              min={100}
              max={60000}
              step={100}
              value={timeoutMs}
              onChange={(e) => {
                onChange(
                  'ipHostnameTimeoutMs',
                  parseInt(e.target.value) || 2000,
                )
              }}
              className="bg-secondary border-border/50 text-xs"
            />
          </div>

          <div>
            <label
              htmlFor="ip-max-retries"
              className="text-foreground mb-1.5 block text-xs font-medium"
            >
              Max Retries
            </label>
            <Input
              id="ip-max-retries"
              type="number"
              min={0}
              max={10}
              value={maxRetries}
              onChange={(e) => {
                onChange('ipHostnameMaxRetries', parseInt(e.target.value) || 3)
              }}
              className="bg-secondary border-border/50 text-xs"
            />
          </div>

          <div>
            <label
              htmlFor="ip-retry-backoff"
              className="text-foreground mb-1.5 block text-xs font-medium"
            >
              Retry Backoff (Minutes)
            </label>
            <Input
              id="ip-retry-backoff"
              type="number"
              min={1}
              max={1440}
              value={retryBackoffMinutes}
              onChange={(e) => {
                onChange(
                  'ipHostnameRetryBackoffMinutes',
                  parseInt(e.target.value) || 60,
                )
              }}
              className="bg-secondary border-border/50 text-xs"
            />
          </div>

          {/* Job Processing */}
          <div>
            <label
              htmlFor="ip-batch-size"
              className="text-foreground mb-1.5 block text-xs font-medium"
            >
              Processing Batch Size
            </label>
            <Input
              id="ip-batch-size"
              type="number"
              min={1}
              max={1000}
              value={batchSize}
              onChange={(e) => {
                onChange('ipHostnameBatchSize', parseInt(e.target.value) || 100)
              }}
              className="bg-secondary border-border/50 text-xs"
            />
          </div>

          {/* Toggles */}
          <div className="col-span-1 flex flex-col gap-3 pt-2 sm:col-span-2 sm:flex-row sm:gap-6">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="ip-manual-refresh"
                checked={manualRefreshEnabled}
                onChange={(e) => {
                  onChange('ipHostnameManualRefreshEnabled', e.target.checked)
                }}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label
                htmlFor="ip-manual-refresh"
                className="text-foreground text-sm"
              >
                Allow Manual Refresh
              </label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="ip-allow-private"
                checked={allowPrivateIps}
                onChange={(e) => {
                  onChange('ipHostnameAllowPrivateIps', e.target.checked)
                }}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label
                htmlFor="ip-allow-private"
                className="text-foreground text-sm"
              >
                Allow Private IPs
              </label>
            </div>
          </div>
        </div>
      )}
    </motion.section>
  )
}
