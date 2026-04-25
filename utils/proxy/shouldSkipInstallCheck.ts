import { INSTALL_API } from './installApi'
import { INSTALL_PATH } from './installPath'

export function shouldSkipInstallCheck(pathname: string): boolean {
  if (pathname === INSTALL_PATH) return true
  if (pathname.startsWith(INSTALL_API)) return true
  if (pathname.startsWith('/_next')) return true
  if (pathname.includes('.')) return true
  return false
}
