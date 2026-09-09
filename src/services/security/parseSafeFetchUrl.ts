import { safeFetchErrorResult } from './safeFetchErrorResult'
import type { SafeFetchUrlCheck } from './SafeFetchUrlCheck'

/** Parses the URL and allows only http: and https: with a hostname. */
export function parseSafeFetchUrl(rawUrl: string): SafeFetchUrlCheck {
  let url: URL
  try {
    url = new URL(rawUrl)
  } catch {
    return {
      ok: false,
      failure: safeFetchErrorResult('URL_INVALID', `Invalid URL: ${rawUrl}`),
    }
  }
  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    return {
      ok: false,
      failure: safeFetchErrorResult(
        'SCHEME_NOT_ALLOWED',
        `Scheme ${url.protocol} not allowed`,
      ),
    }
  }
  if (!url.hostname) {
    return {
      ok: false,
      failure: safeFetchErrorResult('HOSTNAME_INVALID', 'Empty hostname'),
    }
  }
  return { ok: true, url }
}
