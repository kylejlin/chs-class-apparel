import { chance, randFloat, randSym } from "./rand";

export function startAnimationLoop(canvas: HTMLCanvasElement): void {
  const TAU = 2 * Math.PI;

  const WIDTH = canvas.width;
  const HEIGHT = canvas.height;
  const config = getConfig();

  const ctx = canvas.getContext("2d")!;
  const emitters: Emitter[] = getEmitters();
  const particles: Particle[] = [];

  function main(): void {
    tick();
  }

  function tick(): void {
    emitParticles();
    moveParticles();
    draw();
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
    ctx.fillStyle = config.BACKGROUND;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

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
}

function getConfig() {
  return { BACKGROUND: "black" } as const;
}

export interface Emitter {
  emit(): Particle[];
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

function getEmitters(): Emitter[] {
  return [
    {
      emit(): Particle[] {
        const emitterX = 200;
        const emitterY = 200;
        if (!chance(0.8)) {
          return [];
        }

        return [
          {
            x: emitterX,
            y: emitterY,
            vx: randSym(3),
            vy: randSym(3),
            ax: 0,
            ay: 0,

            radius: 10,
            vRadius: randFloat(0.1, 1),

            r: 255,
            g: 255,
            b: 255,
            a: 255,

            vr: 0,
            vg: 0,
            vb: 0,
            va: -randFloat(15, 20),
          },
        ];
      },
    },
  ];
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
