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
        if (!chance(0.08)) {
          continue;
        }

        const sat = ~~randFloat(150, 180);
        const vsat = 30;

        out.push({
          x: emitterX,
          y: emitterY,
          vx: randSym(1.5),
          vy: randSym(1.5),
          ax: 0,
          ay: 0,

          radius: 10,
          vRadius: fromMean(0.25, 0.25),

          r: 200,
          g: 180,
          b: 100,
          a: ~~randFloat(200, 220),

          vr: 20,
          vg: 10,
          vb: 5,
          va: -randFloat(7, 10),
        });
      }

      return out;
    },
  };
}
