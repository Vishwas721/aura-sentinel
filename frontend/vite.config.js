// File: frontend/vite.config.js

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Add this section to fix the resolution error
  optimizeDeps: {
    exclude: ['react-simple-maps'],
  },
});