import type { NextConfig } from 'next'
import { buildSecurityHeaders } from './utils/security'

const isProd = process.env.NODE_ENV === 'production'

const nextConfig: NextConfig = {
  output: 'standalone',
  poweredByHeader: false,
  serverExternalPackages: ['geoip-lite'],
  allowedDevOrigins: ['127.0.0.1', 'localhost'],
  async headers() {
    return [{ source: '/:path*', headers: buildSecurityHeaders(isProd) }]
  },
}

export default nextConfig
