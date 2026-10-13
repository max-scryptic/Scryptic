// Shared by the voxel drawings (components/voxel-hills.tsx and voxel-field.tsx).

// mulberry32: a tiny seeded PRNG, so server and client draw the same picture.
export function seeded(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
