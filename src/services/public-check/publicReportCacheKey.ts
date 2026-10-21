export function publicReportCacheKey(
  domain: string,
  selector?: string,
): string {
  return selector ? `${domain}:${selector}` : domain
}
