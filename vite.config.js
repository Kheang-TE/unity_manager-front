import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { BootstrapVueNextResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [BootstrapVueNextResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: '0.0.0.0', // Ajouter cette ligne pour écouter sur toutes les interfaces
    port: 5173, // Assurez-vous que le port est correct
    proxy: {
      '/api': {
        target: 'http://backend:4000', // Remplacez par l'URL du backend
        changeOrigin: true,
      },

      '/socket.io': {
        target: 'http://backend:4000', // Remplacez par l'URL du backend
        ws: true, // Activer le proxy WebSocket
        changeOrigin: true,
      },
    },
  },
});
