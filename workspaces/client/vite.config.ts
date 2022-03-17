import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react';
import * as path from 'path';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  build: {
    outDir: path.join(__dirname, '..', '..', 'dist'),
  },
});
