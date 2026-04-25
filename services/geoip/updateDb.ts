import { appSettings, getDb } from '@/lib/db'
import { parseProgressLine } from '@/utils/geoip'
import { eq } from 'drizzle-orm'
import { fork } from 'node:child_process'
import { mkdirSync } from 'node:fs'
import path from 'node:path'
import type { UpdateGeoIpDbOptions } from './UpdateGeoIpDbOptions'

export async function updateGeoIpDb(
  options: UpdateGeoIpDbOptions = {},
): Promise<void> {
  const { licenseKey, onProgress } = options
  const db = getDb()
  const settingsResult = await db.select().from(appSettings).limit(1)
  const settings = settingsResult[0]
  if (!settings) throw new Error('Settings not found')

  const keyToUse = licenseKey ?? settings.geoipMaxmindLicenseKey
  if (!keyToUse) throw new Error('MaxMind License Key is missing')

  return new Promise((resolve, reject) => {
    // Determine where we store the data. We fallback to project_root/data/geoip
    const dataDir =
      process.env.GEODATADIR ?? path.join(process.cwd(), 'data', 'geoip')

    // Ensure the directory exists (first-run or fresh deploy)
    mkdirSync(dataDir, { recursive: true })

    // Evade Next.js static analysis so it doesn't try to bundle updatedb.js
    // We avoid path.join entirely here because Turbopack pattern matches it
    const cwd = process.cwd()
    const pathParts = [
      cwd,
      'node_modules',
      'geoip-lite',
      'scripts',
      'updatedb.js',
    ]
    const updaterPath = pathParts.join('/')

    const child = fork(
      updaterPath,
      [`license_key=${keyToUse}`, `geodatadir=${dataDir}`],
      {
        // Use silent so we can capture stdout ourselves
        silent: true,
      },
    )

    onProgress?.({ step: 'Starting download...', progress: 1 })

    let lastProgress = 1

    // Buffer partial lines across chunks
    let lineBuffer = ''

    const handleChunk = (chunk: Buffer | string) => {
      lineBuffer += chunk.toString()
      const lines = lineBuffer.split('\n')
      // The last element may be an incomplete line – keep it in buffer
      lineBuffer = lines.pop() ?? ''
      for (const line of lines) {
        const trimmed = line.trim()
        if (!trimmed) continue
        const parsed = parseProgressLine(trimmed, lastProgress)
        if (parsed && onProgress && parsed.progress >= lastProgress) {
          lastProgress = parsed.progress
          onProgress(parsed)
        }
      }
    }

    child.stdout?.on('data', handleChunk)
    child.stderr?.on('data', handleChunk)

    child.on('error', (err) => {
      reject(err)
    })

    child.on('exit', (code) => {
      const finish = async () => {
        if (code === 0) {
          await db
            .update(appSettings)
            .set({
              geoipLastDbUpdateAt: new Date(),
              geoipLastDbUpdateError: null,
            })
            .where(eq(appSettings.id, settings.id))
          onProgress?.({
            step: 'Database updated successfully!',
            progress: 100,
          })
          resolve()
        } else {
          const errStr = `Updater exited with code ${code}`
          await db
            .update(appSettings)
            .set({ geoipLastDbUpdateError: errStr })
            .where(eq(appSettings.id, settings.id))
          reject(new Error(errStr))
        }
      }
      void finish()
    })
  })
}
