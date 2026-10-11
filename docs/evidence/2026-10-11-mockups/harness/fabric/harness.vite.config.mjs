// Put in apps/desktop of a `git archive` copy of passioncode-ai/fabric (never a working checkout), with
// harness.html and harness/{mock,transcripts}.js in src/renderer/, and node_modules linked from an
// installed checkout. Run: node node_modules/vite/bin/vite.js --config harness.vite.config.mjs
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'
export default {
  root: resolve(import.meta.dirname, 'src/renderer'),
  cacheDir: process.env.VITE_CACHE_DIR || resolve(import.meta.dirname, '.vite-harness'),
  plugins: [react()],
  server: { port: 5199, strictPort: true, host: '127.0.0.1', fs: { strict: false } }
}
