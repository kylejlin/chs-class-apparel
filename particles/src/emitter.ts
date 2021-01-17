import { Particle } from "./particles";
import { chance, fromMean, randFloat, randSym } from "./rand";

export interface EmitterSpec {
  type: 0;
  x: number;
  y: number;
}

export interface Emitter {
  emit(): Particle[];
}

export function fromSpec(spec: EmitterSpec): Emitter {
  switch (spec.type) {
    case 0:
      return getType0Emitter(spec.x, spec.y);
  }
}
export function getType0Emitter(ex: number, ey: number): Emitter {
  const emitterX = ex;
  const emitterY = ey;
  return {
    emit(): Particle[] {
      const out: Particle[] = [];

      let i = 10;
      while (--i) {
        if (!chance(0.11 * 5)) {
          continue;
        }

        const vx = randSym(1.9);
        const vy = randSym(1.9);

        const a = -randFloat(0, 0.05);
        const b = -randFloat(0, 0.05);
        const c = 0.2;
        const d = 0.8;

        out.push({
          x: emitterX,
          y: emitterY,
          vx,
          vy,
          ax: a * vx,
          ay: b * vy,

          radius: 10 * d,
          vRadius: -fromMean(0.25, 0.25) * d,

          r: 270,
          g: 220,
          b: 120,
          a: ~~randFloat(180, 200) * 0.6,

          vr: 20 * c,
          vg: -5 * c,
          vb: -5 * c,
          va: -randFloat(7, 10),
        });
      }

      return out;
    },
  };
}
