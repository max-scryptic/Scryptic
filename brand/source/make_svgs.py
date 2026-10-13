"""Build the Scryptic logo SVGs (mark, wordmark, lockups) with the wordmark
outlined from Syne ExtraBold, plus the theme-aware favicon.svg.

Usage: python make_svgs.py path/to/Syne-ExtraBold.ttf <output dir>
Needs fonttools. Font: https://fonts.google.com/specimen/Syne
"""
import json, sys, pathlib
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.boundsPen import BoundsPen

font_path, out = sys.argv[1], pathlib.Path(sys.argv[2])
out.mkdir(parents=True, exist_ok=True)
f = TTFont(font_path); gs = f.getGlyphSet(); cmap = f.getBestCmap()
TRACK = -30  # -0.03em at 1000 upm
XH = f["OS/2"].sxHeight

def wordmark(text="scryptic"):
    pen = SVGPathPen(gs); bp = BoundsPen(gs); x = 0
    for ch in text:
        g = cmap[ord(ch)]
        gs[g].draw(TransformPen(pen, (1, 0, 0, -1, x, 0)))
        gs[g].draw(TransformPen(bp, (1, 0, 0, -1, x, 0)))
        x += gs[g].width + TRACK
    return pen.getCommands(), bp.bounds  # bounds in y-down coords

WD, (wx0, wy0, wx1, wy1) = wordmark()
# Mark: shapes span x 1.5..22.5, y 2.5..21.5 in a 24 box.
MARK = ["M1.5 11A8.5 8.5 0 0 1 18.5 11Z", "M5.5 13A8.5 8.5 0 0 0 22.5 13Z"]
MX0, MY0, MW, MH = 1.5, 2.5, 21.0, 19.0

COLOURS = {"obsidian": "#14131B", "mist": "#EEF1F5", "white": "#FFFFFF"}

def svg(w, h, body, title):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w:.2f} {h:.2f}" width="{w:.0f}" height="{h:.0f}" role="img" aria-label="{title}">'
            f'<title>{title}</title>{body}</svg>\n')

def mark_group(x, y, h, fill):
    s = h / MH
    return (f'<g fill="{fill}" transform="translate({x - MX0*s:.3f} {y - MY0*s:.3f}) scale({s:.5f})">'
            + "".join(f'<path d="{d}"/>' for d in MARK) + "</g>")

def word_group(x, y, fill):  # (x, y) = top-left of the word's ink box
    return f'<g fill="{fill}" transform="translate({x - wx0:.2f} {y - wy0:.2f})"><path d="{WD}"/></g>'

# Artboards are tight to the ink; clear space is a usage rule (see README).
ww, wh = wx1 - wx0, wy1 - wy0
specs = {}
for name, fill in COLOURS.items():
    # Mark alone.
    specs[f"scryptic-mark-{name}"] = svg(MW*40, MH*40, mark_group(0, 0, MH*40, fill), "Scryptic")
    # Wordmark alone.
    specs[f"scryptic-wordmark-{name}"] = svg(ww, wh, word_group(0, 0, fill), "Scryptic")
    # Horizontal lockup: the mark runs from the x-height line to the descender
    # line, a quarter of its height from the word.
    top_x = -XH - wy0  # x-height line, measured from the top of the ink box
    mh = wh - top_x            # x-height line down to descender bottom
    mw = mh * MW / MH
    gap = mh * 0.25
    W = mw + gap + ww
    body = mark_group(0, top_x, mh, fill) + word_group(mw + gap, 0, fill)
    specs[f"scryptic-lockup-horizontal-{name}"] = svg(W, wh, body, "Scryptic")
    # Stacked lockup: mark centred above the word, as tall as the word's ink box.
    smh = wh * 1.1; smw = smh * MW / MH; sgap = smh * 0.35
    W2 = max(ww, smw); H2 = smh + sgap + wh
    body2 = mark_group((W2 - smw) / 2, 0, smh, fill) + word_group((W2 - ww) / 2, smh + sgap, fill)
    specs[f"scryptic-lockup-stacked-{name}"] = svg(W2, H2, body2, "Scryptic")

for k, v in specs.items():
    (out / f"{k}.svg").write_text(v)

# Favicon in Lapis, the primary colour, switching to its lighter dark-theme
# shade when the browser is dark, as the site's primary token does.
fav = ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="1 1 22 22">'
       '<style>path{fill:#2B3FD6}@media (prefers-color-scheme:dark){path{fill:#7D8BFF}}</style>'
       + "".join(f'<path d="{d}"/>' for d in MARK) + "</svg>\n")
(out / "favicon.svg").write_text(fav)
json.dump({"wordmark_path": WD, "word_box": [wx0, wy0, wx1, wy1], "x_height": XH}, open(out / "_wordmark.json", "w"))  # read by render.cjs
print("wrote", len(specs) + 1, "svgs; word box", [round(v) for v in (wx0, wy0, wx1, wy1)])
