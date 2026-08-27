import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { INSTALL_CHECK } from '../../utils/proxy/installCheck'
import { isLoopbackHostname } from '../../utils/proxy/isLoopbackHostname'
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
        // Behind a TLS-terminating proxy the request carries the forwarded
        // scheme while the host stays the local listener, so this resolves to
        // `https://localhost:<port>` and the fetch speaks TLS to a plaintext
        // port (ERR_SSL_PACKET_LENGTH_TOO_LONG). The loopback is never served
        // over TLS here, so downgrade the scheme for it.
        if (
          checkUrl.protocol === 'https:' &&
          isLoopbackHostname(checkUrl.hostname)
        ) {
          checkUrl.protocol = 'http:'
        }
        const checkInstallation = async () => {
          try {
            // Deliberately sends no headers. `GET /api/install/check` reads
            // none, and forwarding the incoming ones breaks the check behind a
            // CDN: a request carrying `cf-connecting-ip` back into Cloudflare
            // is answered 403, `res.json()` throws on the HTML error body, and
            // the app redirects to /install forever even though it is
            // installed.
            const res = await fetch(checkUrl.toString(), { cache: 'no-store' })
            const json = (await res.json()) as {
              data?: { installed?: boolean }
            }
            const isInstalled = json?.data?.installed === true
            cachedInstalled = isInstalled
            return isInstalled
          } catch (error) {
            // A failing check sends every route to /install, which is
            // indistinguishable from a genuinely uninstalled app. Say why.
            console.error(
              `[install-check] ${checkUrl.toString()} failed:`,
              error,
            )
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
