import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    // host:true exposes the dev server on your local network so you can open it
    // on your phone. Note: getUserMedia needs a secure context — localhost counts
    // as secure, but a bare LAN IP (192.168.x.x) does NOT. To test on your phone,
    // either deploy, or tunnel with something like `npx localtunnel --port 5173`.
    host: true,
    port: 5173
  },
  build: {
    outDir: 'dist',
    target: 'es2020'
  }
});
