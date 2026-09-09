import { fork } from 'node:child_process'
import { awaitGeoIpUpdater } from './awaitGeoIpUpdater'
import { createProgressChunkHandler } from './createProgressChunkHandler'
import { ensureGeoipDataDir } from './ensureGeoipDataDir'
import { geoipUpdaterPath } from './geoipUpdaterPath'
import { loadGeoIpUpdateTarget } from './loadGeoIpUpdateTarget'
import type { UpdateGeoIpDbOptions } from './UpdateGeoIpDbOptions'

export async function updateGeoIpDb(
  options: UpdateGeoIpDbOptions = {},
): Promise<void> {
  const { onProgress } = options
  const target = await loadGeoIpUpdateTarget(options.licenseKey)
  const dataDir = ensureGeoipDataDir()

  const child = fork(
    geoipUpdaterPath(),
    [`license_key=${target.licenseKey}`, `geodatadir=${dataDir}`],
    {
      // Use silent so we can capture stdout ourselves
      silent: true,
    },
  )

  onProgress?.({ step: 'Starting download...', progress: 1 })

  const handleChunk = createProgressChunkHandler(onProgress)
  child.stdout?.on('data', handleChunk)
  child.stderr?.on('data', handleChunk)

  return awaitGeoIpUpdater(child, target.settingsId, onProgress)
}
