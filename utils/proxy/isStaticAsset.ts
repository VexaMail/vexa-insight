import { STATIC_ASSET_PATTERN } from './staticAssetPattern'
import { WEB_MANIFEST_PATTERN } from './webManifestPattern'

export function isStaticAsset(pathname: string): boolean {
  return (
    STATIC_ASSET_PATTERN.test(pathname) || WEB_MANIFEST_PATTERN.test(pathname)
  )
}
