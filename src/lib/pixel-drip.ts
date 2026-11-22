import { seeded } from "@/lib/voxel"

/*
 * The pixel drips that hang off the bottom edge of a landing hero band
 * (components/pixel-drip.tsx), on the same 4px grid as the carousel's
 * dissolve. One tile of drips is drawn here as a mask, from a fixed seed so
 * server and client agree, and repeats across the page.
 *
 * Every drip runs up behind the band by HIDDEN px, so the layer can slide
 * down as the page scrolls and the drips come out longer, still joined to
 * the band. Lengths below are what shows under the band's edge at rest.
 */

export const CELL = 4
/** Width of one repeat of the drips, in px. */
export const TILE = 960
/** How far each drip runs up behind the band, and the most the layer slides down. */
export const HIDDEN = 32
/** The layer's full height: the hidden part, the longest drip and room for the slide. */
export const HEIGHT = 96

export type Drip = {
  /** Left edge of the drip's body, in px from the tile's left. */
  x: number
  /** Body width, in px. */
  width: number
  /** Visible length below the band's edge, in px. */
  length: number
}

function build() {
  const random = seeded(29)
  const drips: Drip[] = []
  let rects = ""
  const rect = (x: number, y: number, w: number, h: number) => {
    rects += `M${x} ${y}h${w}v${h}h${-w}z`
  }

  // Loose pixels hanging on the edge between drips, like the dither past the
  // carousel's guides: a scattered first row, and now and then a second cell under it.
  for (let x = 0; x < TILE; x += CELL) {
    if (random() < 0.28) rect(x, 0, CELL, HIDDEN + CELL * (random() < 0.25 ? 2 : 1))
  }

  // The drips themselves, mostly short with the odd long one.
  let x = Math.round((8 + random() * 40) / CELL) * CELL
  while (x < TILE - 4 * CELL) {
    const cells = random() < 0.3 ? 1 : 2
    const rows = 2 + Math.floor(random() * random() * 9)
    const width = cells * CELL
    // A shoulder a cell wider either side where the drip leaves the edge, then the drip.
    rect(x - CELL, 0, width + 2 * CELL, HIDDEN + CELL)
    rect(x, 0, width, HIDDEN + rows * CELL)
    drips.push({ x, width, length: rows * CELL })
    x += Math.round((32 + random() * 72) / CELL) * CELL
  }

  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${TILE}' height='${HEIGHT}'><path d='${rects}'/></svg>`
  return { drips, mask: `url("data:image/svg+xml,${encodeURIComponent(svg)}")` }
}

export const { drips, mask } = build()

/**
 * Where the page's guide lines fall in a box `width` px wide (the .ruled
 * --rail-x in globals.css): 1rem or 1.5rem in from the edges, or the edges of
 * the max-w-6xl column once it fits.
 */
export function railX(width: number, viewport: number) {
  return Math.max(viewport >= 640 ? 24 : 16, width / 2 - 576)
}
