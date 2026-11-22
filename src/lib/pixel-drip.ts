import { seeded } from "@/lib/voxel"

/*
 * The pixel drips that hang off the bottom edge of a Lapis band, and the
 * piles that build up on top of one (components/pixel-drip.tsx), on the same
 * 4px grid as the carousel's dissolve. One tile of each pattern is drawn here
 * as a mask, from a fixed seed so server and client agree, and repeats
 * across the page.
 *
 * Every shape runs back behind its band by HIDDEN px, so the layer can slide
 * further out (the hero's drips do as the page scrolls) and still be joined
 * to the band. Lengths below are what shows past the band's edge at rest.
 */

export const CELL = 4
/** How far each shape runs back behind the band, and the most the hero's drips slide out. */
export const HIDDEN = 32

export type Drip = {
  /** Left edge of the drip's body, in px from the tile's left. */
  x: number
  /** Body width, in px. */
  width: number
  /** Visible length past the band's edge, in px. */
  length: number
}

export type EdgePattern = {
  /** Width of one repeat, in px. */
  tile: number
  /** The layer's full height, the hidden part included. */
  height: number
  /** The tile, as a CSS mask-image. */
  mask: string
  /** The drips that hang off the edge, for pixels to fall from. Empty for piles. */
  drips: Drip[]
  /** The longest shape's visible length, in px: how far the layer runs out when it plays in. */
  longest: number
}

function svgMask(tile: number, height: number, path: string) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${tile}' height='${height}'><path d='${path}'/></svg>`
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`
}

/** Drips hanging down off an edge, drawn from the top of the tile. */
function dripPattern({
  seed,
  tile,
  height,
  loose,
  gap,
  rows,
}: {
  seed: number
  tile: number
  height: number
  /** Share of cells along the edge with a loose pixel hanging on it. */
  loose: number
  /** The space between drips, in px: the least, and how much more at random. */
  gap: [number, number]
  /** The most cells a drip runs past its first two. */
  rows: number
}): EdgePattern {
  const random = seeded(seed)
  const drips: Drip[] = []
  let path = ""
  const rect = (x: number, y: number, w: number, h: number) => {
    path += `M${x} ${y}h${w}v${h}h${-w}z`
  }

  // Loose pixels hanging on the edge between drips, like the dither past the
  // carousel's guides: a scattered first row, and now and then a second cell under it.
  for (let x = 0; x < tile; x += CELL) {
    if (random() < loose) rect(x, 0, CELL, HIDDEN + CELL * (random() < 0.25 ? 2 : 1))
  }

  // The drips themselves, mostly short with the odd long one.
  let x = Math.round((8 + random() * 40) / CELL) * CELL
  while (x < tile - 4 * CELL) {
    const cells = random() < 0.3 ? 1 : 2
    const length = (2 + Math.floor(random() * random() * rows)) * CELL
    const width = cells * CELL
    // A shoulder a cell wider either side where the drip leaves the edge, then the drip.
    rect(x - CELL, 0, width + 2 * CELL, HIDDEN + CELL)
    rect(x, 0, width, HIDDEN + length)
    drips.push({ x, width, length })
    x += Math.round((gap[0] + random() * gap[1]) / CELL) * CELL
  }

  const longest = Math.max(...drips.map((drip) => drip.length))
  return { tile, height, mask: svgMask(tile, height, path), drips, longest }
}

/**
 * Stepped piles sitting on top of an edge, where drips from above have
 * landed and built up, drawn from the bottom of the tile.
 */
function pilePattern({ seed, tile, height }: { seed: number; tile: number; height: number }): EdgePattern {
  const random = seeded(seed)
  const base = height - HIDDEN
  let path = ""
  let longest = CELL
  // `row` 0 is the first row of cells above the edge; each runs on down behind the band.
  const cells = (x: number, row: number, count: number) => {
    path += `M${x} ${base - (row + 1) * CELL}h${count * CELL}v${HIDDEN + (row + 1) * CELL}h${-count * CELL}z`
    longest = Math.max(longest, (row + 1) * CELL)
  }

  // A few single pixels landed along the edge.
  for (let x = 0; x < tile; x += CELL) {
    if (random() < 0.04) cells(x, 0, 1)
  }

  // The piles: a wide first row, each row above it a cell or two narrower each side.
  let x = Math.round((40 + random() * 120) / CELL) * CELL
  while (x < tile - 12 * CELL) {
    let left = x
    let width = 7 + Math.floor(random() * 7)
    const rows = 2 + Math.floor(random() * random() * 3)
    for (let row = 0; row < rows && width > 0; row++) {
      cells(left, row, width)
      const inLeft = random() < 0.7 ? 1 : 2
      const inRight = random() < 0.7 ? 1 : 2
      left += inLeft * CELL
      width -= inLeft + inRight
    }
    // Now and then a stray pixel landed just off the pile.
    if (random() < 0.5) cells(x - 2 * CELL, 0, 1)
    x += Math.round((180 + random() * 260) / CELL) * CELL
  }

  return { tile, height, mask: svgMask(tile, height, path), drips: [], longest }
}

/** The hero band's drips: dense, with long ones that stretch further as the page scrolls. */
export const heroDrips = dripPattern({ seed: 29, tile: 960, height: 96, loose: 0.28, gap: [32, 72], rows: 9 })

/** A few short drips off the bottom of a mid-page band, like the Stack section. */
export const bandDrips = dripPattern({ seed: 7, tile: 1200, height: 80, loose: 0.05, gap: [120, 220], rows: 7 })

/** The odd pile of landed drips on top of a mid-page band. */
export const bandPiles = pilePattern({ seed: 11, tile: 1200, height: 64 })

/** Every pattern by name, so a server component can pick one without sending its mask over. */
export const edgePatterns = { heroDrips, bandDrips, bandPiles }
export type EdgePatternName = keyof typeof edgePatterns

/**
 * Where the page's guide lines fall in a box `width` px wide (the .ruled
 * --rail-x in globals.css): 1rem or 1.5rem in from the edges, or the edges of
 * the max-w-6xl column once it fits.
 */
export function railX(width: number, viewport: number) {
  return Math.max(viewport >= 640 ? 24 : 16, width / 2 - 576)
}
