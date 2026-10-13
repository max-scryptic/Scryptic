# Scryptic brand kit

Everything needed to put the Scryptic brand on a site, a deck, a profile or a
print job. The full guidelines (name, mark, colour, type, voice, examples) are
in the brand book: https://claude.ai/artifact/G1UhUvXw5Zr4pDU54Li9G2

## What's in here

| Folder | Contents |
| --- | --- |
| `logo/svg` | Mark, wordmark, horizontal lockup and stacked lockup, each in Obsidian, Mist and white. Vector, with the wordmark outlined, so no font is needed. Use these wherever SVG is accepted. |
| `logo/png` | The same files as transparent PNGs. Marks at 512px and 2048px wide, wordmarks and lockups at 1200px and 3000px wide. |
| `favicon` | `favicon.svg` (switches between Obsidian and Mist with the browser theme), `favicon.ico` (16, 32, 48), PNG favicons, `apple-touch-icon.png` (180), `icon-192.png`, `icon-512.png` and `icon-maskable-512.png` for web app manifests. |
| `social` | Profile avatars (800px, on Night, Lapis or Mist), the link preview card (1200x630), a LinkedIn banner (1584x396) and an X header (1500x500). |
| `colour` | The palette as `palette.css` and `palette.json`, with hex, RGB and Pantone values. |
| `source` | The scripts that generate every file above. |

The website already uses these: `public/favicon.ico`, `src/app/icon.svg`, the
`public/icon-*.png` app icons and the link preview card all come from this kit.

## Logo rules

- **Pick the colour for the background.** Obsidian on light backgrounds, Mist
  or white on dark ones. The mark is always one colour, never Glint and never
  two colours.
- **No container.** The mark sits straight on the surface, favicons and app
  icons included. The only exceptions are the maskable app icon and avatars,
  where the platform needs a filled square.
- **Clear space:** half the mark's height on every side.
- **Minimum size:** 16px on screen, 6mm in print.
- **Never** rotate, mirror, recolour the halves separately or line the halves
  up. The offset is what makes the S.
- The name is **Scryptic** in sentences. The lowercase **scryptic** is only
  ever the wordmark.

## Colour

| Name | Hex | Use |
| --- | --- | --- |
| Obsidian | `#14131B` | Text, the mark, dark surfaces |
| Mist | `#EEF1F5` | Light background, the mark on dark |
| Lapis | `#2B3FD6` (`#7D8BFF` on dark) | Links, buttons, focus |
| Slate | `#5B6072` (`#A3A8B8` on dark) | Secondary text |
| Glint | `#F2A93B` | One highlight per layout |
| Night | `#0E0D14` | Dark background |

## Type

All three are free from Google Fonts under the SIL Open Font License.

| Role | Typeface | Weights |
| --- | --- | --- |
| Headlines and the wordmark | [Syne](https://fonts.google.com/specimen/Syne) | ExtraBold (800) |
| Body text | [Hanken Grotesk](https://fonts.google.com/specimen/Hanken+Grotesk) | Regular, Medium, SemiBold |
| Labels, numbers, code | [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono) | Regular, Medium |

## Regenerating the files

The social images carry the site's current headline ("From idea to launched
app.") and line ("Development as a service"). To change them or any colour,
edit `source/render.cjs`, then:

```bash
pip install fonttools
# Download Syne-ExtraBold.ttf, HankenGrotesk-Regular.ttf and IBMPlexMono-Regular.ttf into fonts/
python source/make_svgs.py fonts/Syne-ExtraBold.ttf build/svg
node source/render.cjs build/svg build fonts   # needs Playwright
```

Then copy the outputs into place, and build `favicon.ico` from a 256px render
of the mark (16, 32 and 48px sizes).
