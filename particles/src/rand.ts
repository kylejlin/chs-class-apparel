export function randFloat(inclMin: number, exclMax: number): number {
  const diff = exclMax - inclMin;
  return inclMin + Math.random() * diff;
}

/** Returns a random float on the interval [-abs, abs). */
export function randSym(abs: number): number {
  return randFloat(-abs, abs);
}

/** Has a `probability` chance of returning true. */
export function chance(probability: number): boolean {
  return Math.random() < probability;
}
