"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "cn"

import { IconStrokes, type IconName } from "@/components/landing/icons"

export type AppLayer = {
  icon: IconName
  /** What it is called in the builder, e.g. "Data tables". */
  from: string
  /** What it becomes, e.g. "A Postgres database". */
  to: string
  /** The check that proves it arrived, a few words. */
  check: string
  /** Drawn as an outline: the layer everyone sees, rebuilt rather than moved. */
  ghost?: boolean
}

/*
 * An app pulled apart into its layers, like an exploded diagram, each labelled
 * with where it goes. When the drawing scrolls into view the layers start
 * pressed together and spread apart; then each layer in turn slides out
 * towards its label, which lights up with its check. It runs on a timer only:
 * hovering changes nothing. With reduced motion it is drawn spread out with
 * every label lit.
 *
 * The slabs are one SVG per breakpoint (phones get more room between layers
 * so two lines of label fit beside each); the labels are HTML placed at the
 * same heights, as percentages of the drawing.
 */

const W = 390 // drawing width, with room for the active layer to slide right
const CX = 200
const HALF_W = 165
const HALF_H = 60
const THICK = 10
const TOP = 78
const PRESSED_GAP = 16
const SPREAD = 1000
const STEP = 2400

// Solid layers, deepest at the top and brightest at the foundation.
const shades = ["#2b3070", "#000", "#343a8a", "#3c43a3", "#454dbb", "#4f57d2", "#5a62e6"]

const geometry = (count: number, gap: number) => {
  const height = TOP + (count - 1) * gap + HALF_H + THICK + 24
  const centres = Array.from({ length: count }, (_, i) => TOP + i * gap)
  const pressedStart = (centres[0] + centres[count - 1]) / 2 - ((count - 1) * PRESSED_GAP) / 2
  const pressed = centres.map((cy, i) => pressedStart + i * PRESSED_GAP - cy)
  return { height, centres, pressed }
}

const desktop = (count: number) => geometry(count, 78)
const mobile = (count: number) => geometry(count, 180)

function useLayerCycle(count: number) {
  const ref = useRef<HTMLDivElement>(null)
  const [motion, setMotion] = useState(false)
  const [inView, setInView] = useState(false)
  const [spread, setSpread] = useState(true)
  const [active, setActive] = useState<number | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    setMotion(true)
    setSpread(false)
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.3 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Spread the layers the first time the drawing is seen.
  useEffect(() => {
    if (!motion || !inView || spread) return
    const timer = window.setTimeout(() => setSpread(true), 250)
    return () => window.clearTimeout(timer)
  }, [motion, inView, spread])

  // Then step through them, top to bottom, while on screen.
  useEffect(() => {
    if (!motion || !inView || !spread) return
    const advance = () => setActive((a) => (a === null ? 0 : (a + 1) % count))
    const first = window.setTimeout(advance, active === null ? SPREAD + 300 : 0)
    const timer = window.setInterval(advance, STEP)
    return () => {
      window.clearTimeout(first)
      window.clearInterval(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- restart only when visibility changes
  }, [motion, inView, spread, count])

  return { ref, motion, spread, active }
}

function Slabs({
  layers,
  geo,
  spread,
  active,
  className,
}: {
  layers: AppLayer[]
  geo: ReturnType<typeof geometry>
  spread: boolean
  active: number | null
  className?: string
}) {
  // Bottom layer first, so each layer is drawn over the one beneath it.
  const order = layers.map((_, i) => i).reverse()
  return (
    <svg viewBox={`0 0 ${W} ${geo.height}`} className={cn("w-full overflow-visible", className)}>
      {order.map((i) => {
        const layer = layers[i]
        const cy = geo.centres[i]
        const on = active === i
        const fill = layer.ghost ? undefined : shades[i]
        return (
          <g
            key={layer.from}
            style={{
              transform: `translate(${on ? 14 : 0}px, ${spread ? (on ? -6 : 0) : geo.pressed[i]}px)`,
              transition: `transform ${spread && active !== null ? 600 : SPREAD}ms cubic-bezier(0.22, 1, 0.36, 1) ${spread && active === null ? (layers.length - 1 - i) * 70 : 0}ms`,
            }}
          >
            <path
              d={`M${CX - HALF_W} ${cy} L${CX} ${cy + HALF_H} L${CX} ${cy + HALF_H + THICK} L${CX - HALF_W} ${cy + THICK}Z`}
              fill={fill ?? "none"}
              style={{ filter: "brightness(0.7)" }}
            />
            <path
              d={`M${CX} ${cy + HALF_H} L${CX + HALF_W} ${cy} L${CX + HALF_W} ${cy + THICK} L${CX} ${cy + HALF_H + THICK}Z`}
              fill={fill ?? "none"}
              style={{ filter: "brightness(0.5)" }}
            />
            <path
              d={`M${CX} ${cy - HALF_H} L${CX + HALF_W} ${cy} L${CX} ${cy + HALF_H} L${CX - HALF_W} ${cy}Z`}
              fill={fill}
              strokeWidth={on ? 1.5 : 1}
              className={cn(
                "transition-[stroke,stroke-width,filter] duration-500",
                layer.ghost
                  ? cn("fill-background [stroke-dasharray:5_5]", on ? "stroke-[#c3caff]" : "stroke-foreground/35")
                  : on
                    ? "stroke-[#c3caff] [filter:brightness(1.3)]"
                    : "stroke-[#c3caff]/35",
              )}
            />
            {/* The layer's icon, lying flat on its top face. */}
            <g transform={`translate(${CX} ${cy}) matrix(0.9 0.33 -0.9 0.33 0 0) scale(1.4) translate(-12 -12)`}>
              <IconStrokes
                name={layer.icon}
                className={cn(
                  "transition-colors duration-500",
                  layer.ghost ? "text-muted-foreground/60" : on ? "text-white" : "text-[#c3caff]/45",
                )}
              />
            </g>
          </g>
        )
      })}
    </svg>
  )
}

export function AppLayers({ layers }: { layers: AppLayer[] }) {
  const { ref, motion, spread, active } = useLayerCycle(layers.length)
  const d = desktop(layers.length)
  const m = mobile(layers.length)
  // Without motion every label is lit; with it, only the active one.
  const lit = (i: number) => !motion || active === i

  return (
    <div ref={ref} className="grid grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      <div aria-hidden="true">
        <Slabs layers={layers} geo={m} spread={spread} active={active} className="md:hidden" />
        <Slabs layers={layers} geo={d} spread={spread} active={active} className="hidden md:block" />
      </div>
      <ol className="relative">
        {layers.map((layer, i) => (
          <li
            key={layer.from}
            style={
              {
                "--tm": `${(m.centres[i] / m.height) * 100}%`,
                "--td": `${(d.centres[i] / d.height) * 100}%`,
              } as React.CSSProperties
            }
            className={cn(
              "absolute top-(--tm) left-0 flex -translate-y-1/2 flex-col pl-3 transition-[opacity,translate] duration-500 sm:pl-5 md:top-(--td) md:grid md:w-full md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-baseline md:gap-x-6",
              spread ? "opacity-100" : "translate-x-2 opacity-0",
            )}
          >
            <span
              className={cn(
                "text-sm transition-colors duration-500 sm:text-lg",
                lit(i) ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {layer.from}
            </span>
            <span className="flex flex-col">
              <span
                className={cn(
                  "text-sm transition-colors duration-500 sm:text-lg",
                  lit(i) ? "text-primary dark:text-[#c3caff]" : "text-muted-foreground/70",
                )}
              >
                <span aria-hidden="true">→ </span>
                <span className="sr-only">becomes </span>
                {layer.to}
              </span>
              <span
                className={cn(
                  "hidden font-mono text-xs text-primary transition-opacity duration-500 sm:block dark:text-[#c3caff]",
                  lit(i) ? "opacity-100" : "opacity-0",
                )}
              >
                <span aria-hidden="true">✓ </span>
                {layer.check}
              </span>
            </span>
          </li>
        ))}
      </ol>
    </div>
  )
}
