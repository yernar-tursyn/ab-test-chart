import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // base: '/ab-test-chart/', // Раскомментируйте для деплоя на GitHub Pages
});

