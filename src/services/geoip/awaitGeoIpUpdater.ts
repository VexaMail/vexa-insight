import type { GeoIpProgressEvent } from '@/types/geoipProgress'
import type { ChildProcess } from 'node:child_process'
import { recordGeoIpUpdateOutcome } from './recordGeoIpUpdateOutcome'

/** Settles when the updater exits, after its outcome is stored. */
export async function awaitGeoIpUpdater(
  child: ChildProcess,
  settingsId: number,
  onProgress: ((event: GeoIpProgressEvent) => void) | undefined,
): Promise<void> {
  return new Promise((resolve, reject) => {
    child.on('error', (err) => {
      reject(err)
    })

    child.on('exit', (code) => {
      const finish = async () => {
        const errStr = await recordGeoIpUpdateOutcome(settingsId, code)
        if (errStr !== null) {
          reject(new Error(errStr))
          return
        }
        onProgress?.({ step: 'Database updated successfully!', progress: 100 })
        resolve()
      }
      void finish()
    })
  })
}
