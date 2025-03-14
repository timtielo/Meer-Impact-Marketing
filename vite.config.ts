import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';
import fs from 'fs';
import path from 'path';

// Custom plugin to copy sitemap files
const copySitemaps = () => {
  return {
    name: 'copy-sitemaps',
    closeBundle: () => {
      const sitemapFiles = [
        'sitemap-index.xml',
        'blog-sitemap.xml',
        'diensten-sitemap.xml',
        'pages-sitemap.xml',
        'blog-slugs.json'
      ];

      sitemapFiles.forEach(file => {
        const sourcePath = path.resolve(__dirname, 'public', file);
        const destPath = path.resolve(__dirname, 'dist', file);
        
        if (fs.existsSync(sourcePath)) {
          fs.copyFileSync(sourcePath, destPath);
          console.log(`Copied ${file} to dist directory`);
        } else {
          console.warn(`Warning: ${file} not found in public directory`);
        }
      });
    }
  };
};

export default defineConfig({
  plugins: [
    react(),
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
    }),
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
    }),
    copySitemaps()
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'contentful': ['@contentful/rich-text-react-renderer', '@contentful/rich-text-types', 'contentful'],
        },
      },
    },
    reportCompressedSize: true,
    chunkSizeWarningLimit: 1000,
  },
});