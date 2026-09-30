import { createApp } from './app.js';
import { initCursor } from './effects/cursor.js';
import { initFlowmap } from './effects/flowmap.js';

const rootElement = document.getElementById('app');

if (!rootElement) {
  throw new Error('Root element #app not found in the document.');
}

const router = createApp(rootElement, {
  header: document.getElementById('site-header'),
  footer: document.getElementById('site-footer'),
});

router.start();

// Camadas puramente visuais (WebGL e cursor): ligadas só no navegador
// real, fora do app — cada uma desliga sozinha se não tiver suporte.
initFlowmap();
initCursor();
