import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)
import { redirects } from './redirects'

const NEXT_PUBLIC_SERVER_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.__NEXT_PRIVATE_ORIGIN || 'http://localhost:3000'

const nextConfig: NextConfig = {
  compress: false,
  output: 'standalone',
  transpilePackages: ['@swc/helpers'],
  serverExternalPackages: [
    'pino',
    'pino-std-serializers',
    'pino-pretty',
    'thread-stream',
    'sonic-boom',
  ],
  outputFileTracingIncludes: {
    '/**': [
      './node_modules/@swc/helpers/**',
      './node_modules/pino/**',
      './node_modules/pino-std-serializers/**',
      './node_modules/pino-pretty/**',
      './node_modules/@pinojs/redact/**',
      './node_modules/thread-stream/**',
      './node_modules/sonic-boom/**',
      './node_modules/process-warning/**',
      './node_modules/quick-format-unescaped/**',
      './node_modules/real-require/**',
      './node_modules/safe-stable-stringify/**',
      './node_modules/on-exit-leak-free/**',
      './node_modules/pino-abstract-transport/**',
      './node_modules/atomic-sleep/**',
      './node_modules/split2/**',
      './node_modules/colorette/**',
      './node_modules/dateformat/**',
      './node_modules/fast-copy/**',
      './node_modules/fast-safe-stringify/**',
      './node_modules/help-me/**',
      './node_modules/joycon/**',
      './node_modules/minimist/**',
      './node_modules/pump/**',
      './node_modules/once/**',
      './node_modules/wrappy/**',
      './node_modules/end-of-stream/**',
      './node_modules/secure-json-parse/**',
      './node_modules/strip-json-comments/**',
    ],
  },
  // Temporarily required on Windows until Next.js fixes Turbopack Sass resolution.
  // See: https://github.com/vercel/next.js/issues/86431
  sassOptions: {
    loadPaths: ['./node_modules/@payloadcms/ui/dist/scss/'],
  },
  images: {
    localPatterns: [
      {
        pathname: '/api/media/file/**',
      },
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  reactStrictMode: true,
  redirects,
  turbopack: {
    root: path.resolve(dirname),
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
