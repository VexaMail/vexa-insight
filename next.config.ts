import type { NextConfig } from 'next'
import {
  buildSecurityHeaders,
  getAllowedOriginsFromEnv,
} from './src/utils/security'

const isProd = process.env.NODE_ENV === 'production'

const nextConfig: NextConfig = {
  output: 'standalone',
  poweredByHeader: false,
  serverExternalPackages: ['geoip-lite'],
  // File tracing follows the DirAssetReference that services/geoip/updateDb.ts
  // creates on the data directory and would copy the whole of data/ — live
  // database included — into .next/standalone. The runtime reads data/ from
  // the working directory (or GEODATADIR), never from the build output.
  outputFileTracingExcludes: {
    '*': ['data/**'],
  },
  allowedDevOrigins: ['127.0.0.1', 'localhost'],
  experimental: {
    serverActions: {
      allowedOrigins: getAllowedOriginsFromEnv(),
    },
  },
  async headers() {
    return [{ source: '/:path*', headers: buildSecurityHeaders(isProd) }]
  },
}

export default nextConfig
