import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: { '@': path.resolve(__dirname, './src') }
    },
    server: {
      proxy: {
        '/api/anthropic': {
          target: 'https://api.anthropic.com',
          changeOrigin: true,
          rewrite: (p) => p.replace(/^\/api\/anthropic/, ''),
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              proxyReq.setHeader('x-api-key', env.VITE_ANTHROPIC_API_KEY || '')
              proxyReq.setHeader('anthropic-version', '2023-06-01')
            })
          }
        },
        '/api/spotify/token': {
          target: 'https://accounts.spotify.com',
          changeOrigin: true,
          rewrite: () => '/api/token',
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              const credentials = Buffer.from(
                `${env.VITE_SPOTIFY_CLIENT_ID || ''}:${env.VITE_SPOTIFY_CLIENT_SECRET || ''}`
              ).toString('base64')
              proxyReq.setHeader('Authorization', `Basic ${credentials}`)
            })
          }
        },
        '/api/spotify': {
          target: 'https://api.spotify.com/v1',
          changeOrigin: true,
          rewrite: (p) => p.replace(/^\/api\/spotify/, '')
        }
      }
    }
  }
})
