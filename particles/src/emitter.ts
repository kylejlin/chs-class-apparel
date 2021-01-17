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
        if (!chance(0.11 * 2)) {
          continue;
        }

        const vx = randSym(1.7);
        const vy = randSym(1.7);

        const a = -randFloat(0, 0.05);
        const b = -randFloat(0, 0.05);
        const c = 0.2;

        out.push({
          x: emitterX,
          y: emitterY,
          vx,
          vy,
          ax: a * vx,
          ay: b * vy,

          radius: 10,
          vRadius: fromMean(0.25, 0.25),

          r: 200,
          g: 180,
          b: 100,
          a: ~~randFloat(180, 200),

          vr: 20 * c,
          vg: 10 * c,
          vb: 5 * c,
          va: -randFloat(7, 10),
        });
      }

      return out;
    },
  };
}
