import { Emitter, Particle } from "./particles";
import { chance, randFloat, randSym } from "./rand";

export function getTypeAEmitter(ex: number, ey: number): Emitter {
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
  };
}
