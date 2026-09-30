import { ART_VARIANTS, paintArt } from '../art/placeholderArt.js';

/**
 * Efeito "flowmap" (deformação líquida seguindo o mouse), no espírito da
 * demo FlowmapDeformation do Codrops, escrito do zero em WebGL puro — sem
 * three.js/OGL, para manter o site sem dependências de runtime.
 *
 * Como funciona:
 * 1. Um "mapa de fluxo" pequeno (128×128) guarda, por pixel, a direção e
 *    a força do movimento do mouse. A cada quadro ele se dissipa um pouco
 *    e recebe um novo "carimbo" onde o mouse está (ping-pong entre duas
 *    texturas).
 * 2. O fundo e as imagens dos tiles da home são desenhados num <canvas>
 *    fixo atrás da página, lendo esse mapa para deslocar as coordenadas
 *    da textura — o que dá a sensação de arrastar a imagem como líquido.
 * 3. As posições dos tiles vêm do DOM (getBoundingClientRect) a cada
 *    quadro, então o efeito acompanha carrossel, grade, rolagem e as
 *    animações de escala sem nenhuma sincronização extra.
 *
 * Sem WebGL ou com movimento reduzido, nada muda: os tiles continuam com
 * o gradiente em CSS.
 */

const FLOW_SIZE = 128;
const MAX_DPR = 1.5;

const VERTEX_FULLSCREEN = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;

// Atualiza o mapa de fluxo. Valores com sinal ficam codificados em 0–1
// (v * 0.5 + 0.5) para caber numa textura comum de 8 bits.
const FRAGMENT_FLOW = `
precision highp float;
uniform sampler2D tMap;
uniform float uFalloff;
uniform float uAlpha;
uniform float uDissipation;
uniform float uAspect;
uniform vec2 uMouse;
uniform vec2 uVelocity;
varying vec2 vUv;
void main() {
  vec3 color = (texture2D(tMap, vUv).rgb * 2.0 - 1.0) * uDissipation;
  vec2 cursor = vUv - uMouse;
  cursor.x *= uAspect;
  vec3 stamp = vec3(uVelocity * vec2(1.0, -1.0), 1.0 - pow(1.0 - min(1.0, length(uVelocity)), 3.0));
  float falloff = smoothstep(uFalloff, 0.0, length(cursor)) * uAlpha;
  color = mix(color, stamp, vec3(falloff));
  gl_FragColor = vec4(clamp(color, -1.0, 1.0) * 0.5 + 0.5, 1.0);
}`;

// Fundo: #222 com uma trama de pontos sutil e brilhos lentos, tudo
// deformado pelo fluxo (a trama é o que torna a deformação visível).
const FRAGMENT_BACKGROUND = `
precision highp float;
uniform sampler2D tFlow;
uniform vec2 uBuffer;
uniform float uDpr;
uniform float uTime;
void main() {
  vec2 uv = gl_FragCoord.xy / uBuffer;
  vec3 flow = texture2D(tFlow, uv).rgb * 2.0 - 1.0;
  vec2 p = uv - flow.xy * 0.05;
  vec3 color = vec3(34.0 / 255.0);

  vec2 g1 = vec2(0.18 + 0.06 * sin(uTime * 0.07), 0.85 + 0.05 * cos(uTime * 0.05));
  vec2 g2 = vec2(0.88 + 0.05 * cos(uTime * 0.06), 0.15 + 0.06 * sin(uTime * 0.08));
  float aspect = uBuffer.x / uBuffer.y;
  vec2 q1 = (p - g1) * vec2(aspect, 1.0);
  vec2 q2 = (p - g2) * vec2(aspect, 1.0);
  color += vec3(0.09, 0.06, 0.16) * smoothstep(0.9, 0.0, length(q1)) * 0.16;
  color += vec3(0.05, 0.07, 0.16) * smoothstep(0.8, 0.0, length(q2)) * 0.14;

  vec2 cell = p * uBuffer / uDpr / 28.0;
  float dot = smoothstep(0.09, 0.03, length(fract(cell) - 0.5));
  color += dot * 0.045;

  color += length(flow.xy) * vec3(0.10, 0.08, 0.20) * 0.35;
  gl_FragColor = vec4(color, 1.0);
}`;

const VERTEX_TILE = `
attribute vec2 aPos;
uniform vec4 uRect;
uniform vec2 uViewport;
varying vec2 vLocal;
void main() {
  vLocal = aPos;
  vec2 px = uRect.xy + aPos * uRect.zw;
  vec2 clip = px / uViewport * 2.0 - 1.0;
  gl_Position = vec4(clip.x, -clip.y, 0.0, 1.0);
}`;

// Imagem do tile: coordenadas deslocadas pelo fluxo, leve separação RGB
// onde o fluxo é mais forte, zoom sutil no hover e cantos arredondados.
const FRAGMENT_TILE = `
precision highp float;
uniform sampler2D tImage;
uniform sampler2D tFlow;
uniform vec2 uBuffer;
uniform vec4 uRect;
uniform float uRadius;
uniform float uZoom;
varying vec2 vLocal;

float roundedBox(vec2 p, vec2 halfSize, float r) {
  vec2 q = abs(p) - halfSize + r;
  return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
}

void main() {
  vec3 flow = texture2D(tFlow, gl_FragCoord.xy / uBuffer).rgb * 2.0 - 1.0;
  vec2 uv = (vLocal - 0.5) * uZoom + 0.5;
  vec2 offset = flow.xy * vec2(1.0, -1.0) * 0.1;
  uv -= offset;
  float split = length(flow.xy) * 0.012;
  vec3 color;
  color.r = texture2D(tImage, uv - offset * 0.25 + vec2(split, 0.0)).r;
  color.g = texture2D(tImage, uv).g;
  color.b = texture2D(tImage, uv + offset * 0.25 - vec2(split, 0.0)).b;

  vec2 size = uRect.zw;
  float d = roundedBox((vLocal - 0.5) * size, size * 0.5, uRadius);
  float alpha = 1.0 - smoothstep(-0.75, 0.75, d);
  gl_FragColor = vec4(color * alpha, alpha);
}`;

function compile(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(shader) ?? 'shader error');
  }
  return shader;
}

function program(gl, vertex, fragment) {
  const prog = gl.createProgram();
  gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, vertex));
  gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, fragment));
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    throw new Error(gl.getProgramInfoLog(prog) ?? 'link error');
  }
  const uniforms = {};
  const count = gl.getProgramParameter(prog, gl.ACTIVE_UNIFORMS);
  for (let i = 0; i < count; i += 1) {
    const { name } = gl.getActiveUniform(prog, i);
    uniforms[name] = gl.getUniformLocation(prog, name);
  }
  return { prog, uniforms, aPos: gl.getAttribLocation(prog, 'aPos') };
}

function createTexture(gl, source, width, height) {
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  // CLAMP: as texturas das capas não são potência de 2 (WebGL1 exige).
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  if (source) {
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
  } else {
    const neutral = new Uint8Array(width * height * 4).fill(128);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, neutral);
  }
  return texture;
}

function createFlowTarget(gl) {
  const texture = createTexture(gl, null, FLOW_SIZE, FLOW_SIZE);
  const framebuffer = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  return { texture, framebuffer };
}

/**
 * Liga o efeito. Retorna uma função que o desliga (ou uma função vazia se
 * o navegador não suportar / o usuário preferir menos movimento).
 * @returns {() => void}
 */
export function initFlowmap() {
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
    return () => {};
  }

  const canvas = document.createElement('canvas');
  canvas.className = 'flowmap-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  const gl = canvas.getContext('webgl', { antialias: false, premultipliedAlpha: true });
  if (!gl) {
    return () => {};
  }

  let flowProgram;
  let backgroundProgram;
  let tileProgram;
  try {
    flowProgram = program(gl, VERTEX_FULLSCREEN, FRAGMENT_FLOW);
    backgroundProgram = program(gl, VERTEX_FULLSCREEN, FRAGMENT_BACKGROUND);
    tileProgram = program(gl, VERTEX_TILE, FRAGMENT_TILE);
  } catch {
    return () => {};
  }

  // Geometrias: triângulo de tela cheia e quad unitário (0–1) dos tiles.
  const fullscreen = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, fullscreen);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const quad = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, quad);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0, 0, 1, 0, 0, 1, 1, 1]), gl.STATIC_DRAW);

  // Texturas das capas, pintadas a partir dos mesmos dados do CSS.
  const artTextures = ART_VARIANTS.map((_, variant) => {
    const paint = document.createElement('canvas');
    paint.width = 1024;
    paint.height = 630;
    paintArt(paint.getContext('2d'), paint.width, paint.height, variant);
    return createTexture(gl, paint);
  });

  let flowRead = createFlowTarget(gl);
  let flowWrite = createFlowTarget(gl);

  document.body.prepend(canvas);
  document.documentElement.classList.add('has-flowmap');

  const mouse = { x: -1, y: -1, px: 0, py: 0, time: 0, moved: false };
  const velocity = { x: 0, y: 0 };
  const targetVelocity = { x: 0, y: 0 };
  const zoomByCard = new WeakMap();
  const radiusByCard = new WeakMap();
  let pointer = { x: -1, y: -1 };
  let width = 0;
  let height = 0;
  let dpr = 1;
  let frame = 0;
  const start = performance.now();

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
  }

  function onMove(event) {
    const now = performance.now();
    pointer = { x: event.clientX, y: event.clientY };
    if (!mouse.time) {
      mouse.px = event.clientX;
      mouse.py = event.clientY;
      mouse.time = now;
    }
    const delta = Math.max(14, now - mouse.time);
    targetVelocity.x = (event.clientX - mouse.px) / delta;
    targetVelocity.y = (event.clientY - mouse.py) / delta;
    mouse.px = event.clientX;
    mouse.py = event.clientY;
    mouse.time = now;
    mouse.x = event.clientX / width;
    mouse.y = 1 - event.clientY / height;
    mouse.moved = true;
  }

  function bindFullscreen(prog) {
    gl.bindBuffer(gl.ARRAY_BUFFER, fullscreen);
    gl.enableVertexAttribArray(prog.aPos);
    gl.vertexAttribPointer(prog.aPos, 2, gl.FLOAT, false, 0, 0);
  }

  function updateFlow() {
    if (!mouse.moved) {
      targetVelocity.x = 0;
      targetVelocity.y = 0;
    }
    mouse.moved = false;
    const easing = Math.hypot(targetVelocity.x, targetVelocity.y) ? 0.5 : 0.1;
    velocity.x += (targetVelocity.x - velocity.x) * easing;
    velocity.y += (targetVelocity.y - velocity.y) * easing;

    gl.bindFramebuffer(gl.FRAMEBUFFER, flowWrite.framebuffer);
    gl.viewport(0, 0, FLOW_SIZE, FLOW_SIZE);
    gl.disable(gl.BLEND);
    gl.useProgram(flowProgram.prog);
    bindFullscreen(flowProgram);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, flowRead.texture);
    const u = flowProgram.uniforms;
    gl.uniform1i(u.tMap, 0);
    gl.uniform1f(u.uFalloff, 0.22);
    gl.uniform1f(u.uAlpha, 0.9);
    gl.uniform1f(u.uDissipation, 0.955);
    gl.uniform1f(u.uAspect, width / height);
    gl.uniform2f(u.uMouse, mouse.x, mouse.y);
    gl.uniform2f(u.uVelocity, velocity.x, velocity.y);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);

    [flowRead, flowWrite] = [flowWrite, flowRead];
  }

  function drawBackground(time) {
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.useProgram(backgroundProgram.prog);
    bindFullscreen(backgroundProgram);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, flowRead.texture);
    const u = backgroundProgram.uniforms;
    gl.uniform1i(u.tFlow, 0);
    gl.uniform2f(u.uBuffer, canvas.width, canvas.height);
    gl.uniform1f(u.uDpr, dpr);
    gl.uniform1f(u.uTime, time);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  function drawTiles() {
    const cards = document.querySelectorAll('.project-card');
    if (cards.length === 0) {
      return;
    }
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.useProgram(tileProgram.prog);
    gl.bindBuffer(gl.ARRAY_BUFFER, quad);
    gl.enableVertexAttribArray(tileProgram.aPos);
    gl.vertexAttribPointer(tileProgram.aPos, 2, gl.FLOAT, false, 0, 0);
    const u = tileProgram.uniforms;
    gl.uniform2f(u.uViewport, width, height);
    gl.uniform2f(u.uBuffer, canvas.width, canvas.height);
    gl.uniform1i(u.tImage, 0);
    gl.uniform1i(u.tFlow, 1);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, flowRead.texture);

    cards.forEach((card) => {
      if (card.classList.contains('is-flying')) {
        return;
      }
      const link = card.querySelector('.project-card__link');
      const placeholder = card.querySelector('.image-placeholder');
      if (!link || !placeholder) {
        return;
      }
      const rect = link.getBoundingClientRect();
      if (rect.right < 0 || rect.left > width || rect.bottom < 0 || rect.top > height) {
        return;
      }

      // Raio visual acompanha a escala do tile (vizinhos menores).
      if (!radiusByCard.has(card)) {
        radiusByCard.set(card, parseFloat(window.getComputedStyle(link).borderTopLeftRadius) || 0);
      }
      const scale = link.offsetWidth ? rect.width / link.offsetWidth : 1;
      const radius = radiusByCard.get(card) * scale;

      const hovered =
        pointer.x >= rect.left &&
        pointer.x <= rect.right &&
        pointer.y >= rect.top &&
        pointer.y <= rect.bottom;
      const previousZoom = zoomByCard.get(card) ?? 1;
      const zoom = previousZoom + ((hovered ? 0.93 : 1) - previousZoom) * 0.08;
      zoomByCard.set(card, zoom);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, artTextures[Number(placeholder.dataset.variant) || 0]);
      gl.uniform4f(u.uRect, rect.left, rect.top, rect.width, rect.height);
      gl.uniform1f(u.uRadius, radius);
      gl.uniform1f(u.uZoom, zoom);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    });
  }

  function tick(now) {
    frame = window.requestAnimationFrame(tick);
    if (document.hidden) {
      return;
    }
    if (canvas.width !== Math.round(window.innerWidth * dpr)) {
      resize();
    }
    updateFlow();
    drawBackground((now - start) / 1000);
    drawTiles();
  }

  resize();
  window.addEventListener('resize', resize);
  window.addEventListener('pointermove', onMove, { passive: true });
  frame = window.requestAnimationFrame(tick);

  return () => {
    window.cancelAnimationFrame(frame);
    window.removeEventListener('resize', resize);
    window.removeEventListener('pointermove', onMove);
    canvas.remove();
    document.documentElement.classList.remove('has-flowmap');
  };
}
