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
        if (!chance(0.1)) {
          continue;
        }

        const sat = ~~randFloat(150, 180);
        const vsat = 30;

        out.push({
          x: emitterX,
          y: emitterY,
          vx: randSym(3),
          vy: randSym(3),
          ax: 0,
          ay: 0,

          radius: 10,
          vRadius: fromMean(0.5, 0.5),

          r: sat,
          g: sat,
          b: sat,
          a: ~~randFloat(200, 220),

          vr: vsat,
          vg: vsat,
          vb: vsat,
          va: -randFloat(15, 20),
        });
      }

      return out;
    },
  };
}
