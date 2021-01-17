import { getType0Emitter, Emitter, EmitterSpec, fromSpec } from "./emitter";

export function startAnimationLoop(
  canvas: HTMLCanvasElement,
  addedEmitters: EmitterSpec[]
): SceneModifier {
  const TAU = 2 * Math.PI;

  const WIDTH = canvas.width;
  const HEIGHT = canvas.height;

  const ctx = canvas.getContext("2d")!;
  const emitters: Emitter[] = addedEmitters.map(fromSpec);
  const particles: Particle[] = [];
  let paused = false;
  let shouldEmit = true;

  function main(): void {
    addEventListeners();
    tick();
  }

  function addEventListeners(): void {
    window.addEventListener("keydown", function (event: KeyboardEvent): void {
      if (event.key === " ") {
        paused = false;
      }
    });
    window.addEventListener("keyup", function (event: KeyboardEvent): void {
      if (event.key === " ") {
        paused = true;
      }
    });
    window.addEventListener("keypress", function (event: KeyboardEvent): void {
      if (event.key === "p") {
        shouldEmit = !shouldEmit;
      }
    });
  }

  function tick(): void {
    if (!paused) {
      if (shouldEmit) {
        emitParticles();
      }
      moveParticles();
      draw();
    }

    requestAnimationFrame(tick);
  }

  function emitParticles(): void {
    const len = emitters.length;
    for (let i = 0; i < len; ++i) {
      const emitter = emitters[i];
      const newParticles = emitter.emit();
      particles.push(...newParticles);
    }
  }

  function moveParticles(): void {
    let len = particles.length;
    for (let i = 0; i < len; ++i) {
      const p = particles[i];

      p.a += p.va;

      if (p.a <= 0) {
        particles.splice(i, 1);
        --i;
        --len;
        continue;
      }

      p.x += p.vx;
      p.y += p.vy;
      p.vx += p.ax;
      p.vy += p.ay;

      p.radius += p.vRadius;

      p.r += p.vr;
      p.g += p.vg;
      p.b += p.vb;
    }
  }

  function draw(): void {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    drawParticles();
  }

  function drawParticles(): void {
    const len = particles.length;
    for (let i = 0; i < len; ++i) {
      const p = particles[i];
      ctx.fillStyle = getStyle(p);
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, TAU);
      ctx.closePath();
      ctx.fill();
    }
  }

  main();

  return getSceneModifier();

  function getSceneModifier(): SceneModifier {
    return { pushEmitter, popEmitter };

    function pushEmitter(type: 0, x: number, y: number): void {
      emitters.push(getType0Emitter(x, y));
    }

    function popEmitter(): void {
      emitters.pop();
    }
  }
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  ax: number;
  ay: number;

  radius: number;
  vRadius: number;

  r: number;
  g: number;
  b: number;
  a: number;
  vr: number;
  vg: number;
  vb: number;
  va: number;
}

interface Rgba {
  r: number;
  g: number;
  b: number;
  a: number;
}

function getStyle(color: Rgba): string {
  return (
    "rgba(" +
    color.r +
    "," +
    color.g +
    "," +
    color.b +
    "," +
    color.a / 255 +
    ")"
  );
}

export interface SceneModifier {
  pushEmitter(type: 0, localX: number, localy: number): void;
  popEmitter(): void;
}
