// Renders the brand kit PNGs (logo exports, favicons, app icons, social
// images) from the SVGs that make_svgs.py writes. See brand/README.md.
// Usage: node render.cjs <svg dir> <output dir> <dir with the font .ttf files>
// Needs Playwright (with a Chromium) on NODE_PATH or in PW.
const { chromium } = require(process.env.PW || "playwright")
const fs = require("fs"), path = require("path")
const [SVG, OUT, FONTS] = process.argv.slice(2)
const C = { obsidian: "#14131B", night: "#0E0D14", mist: "#EEF1F5", lapis: "#2B3FD6", white: "#FFFFFF", glint: "#F2A93B", slate: "#A3A8B8" }
const MARK = ["M1.5 11A8.5 8.5 0 0 1 18.5 11Z", "M5.5 13A8.5 8.5 0 0 0 22.5 13Z"]
const mark = (fill, size) => `<svg viewBox="1.5 2.5 21 19" style="width:${size};display:block" fill="${fill}">${MARK.map(d => `<path d="${d}"/>`).join("")}</svg>`
const wm = JSON.parse(fs.readFileSync(path.join(SVG, "_wordmark.json")))
const lockup = (fill, h) => fs.readFileSync(path.join(SVG, `scryptic-lockup-horizontal-${fill}.svg`), "utf8").replace(/width="\d+" height="\d+"/, `style="height:${h};width:auto;display:block"`)
const font = f => `url(data:font/ttf;base64,${fs.readFileSync(path.join(FONTS, f)).toString("base64")})`
const fontCss = `@font-face{font-family:Syne;font-weight:800;src:${font("Syne-ExtraBold.ttf")}}
@font-face{font-family:Hanken;font-weight:400;src:${font("HankenGrotesk-Regular.ttf")}}
@font-face{font-family:Plex;font-weight:400;src:${font("IBMPlexMono-Regular.ttf")}}
*{box-sizing:border-box}body{margin:0}`
const square = (n, bg, fill, pct) => `<div style="width:${n}px;height:${n}px;display:grid;place-items:center;background:${bg}">${mark(fill, Math.round(n * pct) + "px")}</div>`

const jobs = []
const add = (file, w, h, html, transparent = false) => jobs.push({ file, w, h, html, transparent })

// Logo PNGs (transparent) from each SVG.
for (const f of fs.readdirSync(SVG).filter(f => f.startsWith("scryptic-"))) {
  const svg = fs.readFileSync(path.join(SVG, f), "utf8")
  const [, vw, vh] = svg.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/).map(Number)
  const widths = f.includes("mark") ? [512, 2048] : [1200, 3000]
  for (const w of widths) {
    const h = Math.round(w * vh / vw)
    add(`logo/png/${f.replace(".svg", "")}-${w}w.png`, w, h, svg.replace(/width="\d+" height="\d+"/, 'style="width:100vw;height:100vh;display:block"'), true)
  }
}
// Favicons and app icons.
for (const s of [256]) add(`favicon/favicon-${s}.png`, s, s, square(s, "transparent", C.obsidian, 0.92), true)
// No background, like the favicon. Only the maskable icon keeps a filled
// square, because Android crops it to a shape and needs it full bleed.
add("favicon/apple-touch-icon.png", 180, 180, square(180, "transparent", C.obsidian, 0.92), true)
add("favicon/icon-192.png", 192, 192, square(192, "transparent", C.obsidian, 0.92), true)
add("favicon/icon-512.png", 512, 512, square(512, "transparent", C.obsidian, 0.92), true)
add("favicon/icon-maskable-512.png", 512, 512, square(512, C.night, C.mist, 0.48))
// Social avatars: circle-safe, mark at half the width.
add("social/avatar-night-800.png", 800, 800, square(800, C.night, C.mist, 0.52))
add("social/avatar-lapis-800.png", 800, 800, square(800, C.lapis, C.white, 0.52))
add("social/avatar-mist-800.png", 800, 800, square(800, C.mist, C.obsidian, 0.52))
// Banners.
const banner = (w, h, opts) => `<div style="width:${w}px;height:${h}px;background:${C.night};color:${C.mist};position:relative;overflow:hidden;padding:${opts.pad}px;display:flex;flex-direction:column;justify-content:${opts.justify}">
  <div style="position:absolute;right:${opts.markRight}px;top:50%;transform:translateY(-50%);opacity:.06">${mark(C.mist, opts.bigMark + "px")}</div>
  <div style="position:relative;display:flex;flex-direction:column;align-items:flex-start;gap:${opts.gap}px">${opts.body}</div></div>`
add("social/og-image-1200x630.png", 1200, 630, banner(1200, 630, { pad: 80, justify: "space-between", markRight: -120, bigMark: 620, gap: 28,
  body: `${lockup("mist", "64px")}<div style="height:120px"></div><div style="font:800 76px/0.98 Syne;letter-spacing:-0.035em;max-width:900px">From idea to <span style="color:#7D8BFF">launched app</span>.</div><div style="font:400 24px Plex;color:${C.slate};letter-spacing:.08em;text-transform:uppercase">Development as a service</div>` }))
add("social/linkedin-banner-1584x396.png", 1584, 396, banner(1584, 396, { pad: 0, justify: "center", markRight: -100, bigMark: 320, gap: 18,
  body: `<div style="padding-left:520px;display:flex;flex-direction:column;gap:18px"><div style="font:800 40px/1 Syne;letter-spacing:-0.035em">From idea to <span style="color:#7D8BFF">launched app</span>.</div><div style="font:400 20px Plex;color:${C.slate};letter-spacing:.08em;text-transform:uppercase">Development as a service</div></div>` }))
add("social/x-header-1500x500.png", 1500, 500, banner(1500, 500, { pad: 0, justify: "center", markRight: -20, bigMark: 360, gap: 18,
  body: `<div style="padding-left:96px;display:flex;flex-direction:column;gap:20px"><div style="font:800 50px/1 Syne;letter-spacing:-0.035em">From idea to <span style="color:#7D8BFF">launched app</span>.</div><div style="font:400 20px Plex;color:${C.slate};letter-spacing:.08em;text-transform:uppercase">Development as a service</div></div>` }))

;(async () => {
  const b = await chromium.launch()
  for (const j of jobs) {
    const p = await b.newPage({ viewport: { width: j.w, height: j.h } })
    await p.setContent(`<style>${fontCss}</style>${j.html}`, { waitUntil: "load" })
    await p.evaluate(() => document.fonts.ready)
    const file = path.join(OUT, j.file); fs.mkdirSync(path.dirname(file), { recursive: true })
    await p.screenshot({ path: file, omitBackground: j.transparent })
    await p.close()
  }
  await b.close(); console.log("rendered", jobs.length)
})()
