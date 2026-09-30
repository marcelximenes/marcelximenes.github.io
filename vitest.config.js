import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: false,
    setupFiles: ['./tests/setup.js'],
    include: ['tests/**/*.test.js'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      reportsDirectory: 'coverage',
      include: ['src/js/**/*.js'],
      // main.js é só bootstrap; effects/ são camadas visuais de navegador
      // (WebGL e cursor) que o jsdom não consegue executar — verificadas
      // num Chromium real, não em teste unitário.
      exclude: ['src/js/main.js', 'src/js/effects/**'],
    },
  },
});
