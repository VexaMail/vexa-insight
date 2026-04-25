import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { INSTALL_CHECK } from '../../utils/proxy/installCheck'
import { shouldSkipInstallCheck } from '../../utils/proxy/shouldSkipInstallCheck'
import { UNINSTALLED_CACHE_TTL } from '../../utils/proxy/uninstalledCacheTtl'
import { INSTALL_PATH } from './installPath'

export const checkInstall = (() => {
  let installCheckPromise: Promise<boolean> | null = null
  let cachedInstalled: boolean | null = null
  let lastCheckTime = 0

  return async function checkInstall(
    request: NextRequest,
  ): Promise<NextResponse | undefined> {
    const pathname = request.nextUrl.pathname

    if (shouldSkipInstallCheck(pathname)) {
      return undefined
    }

    if (cachedInstalled !== true) {
      const now = Date.now()

      if (!installCheckPromise || now - lastCheckTime > UNINSTALLED_CACHE_TTL) {
        lastCheckTime = now
        const checkUrl = new URL(INSTALL_CHECK, request.url)
        const checkInstallation = async () => {
          try {
            const res = await fetch(checkUrl.toString(), {
              cache: 'no-store',
              headers: request.headers,
            })
            const json = (await res.json()) as {
              data?: { installed?: boolean }
            }
            const isInstalled = json?.data?.installed === true
            cachedInstalled = isInstalled
            return isInstalled
          } catch {
            installCheckPromise = null // reset on failure
            return false
          }
        }
        installCheckPromise = checkInstallation()
      }

      const installed = await installCheckPromise
      if (!installed) {
        return NextResponse.redirect(new URL(INSTALL_PATH, request.url))
      }
    }

    return undefined
  }
})()
