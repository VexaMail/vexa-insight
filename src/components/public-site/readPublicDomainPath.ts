export function readPublicDomainPath(): string {
  const path = window.location.pathname.slice(1)
  if (!path || path === 'website' || path.includes('/')) return ''
  try {
    return decodeURIComponent(path)
  } catch {
    return ''
  }
}
