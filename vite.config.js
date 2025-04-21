import { defineConfig } from 'vite';

export default defineConfig({
  // Base public path when served in production
  base: '/',
  
  // Where to look for static assets
  publicDir: 'public',
  
  // Build configuration
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Generate source maps for debugging
    sourcemap: true,
  },
  
  // Server options
  server: {
    port: 3000,
    open: true, // Auto-open browser
  }
});