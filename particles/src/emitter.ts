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
      if (!chance(0.4)) {
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
          vRadius: fromMean(0.5, 0.5),

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
  };
}
