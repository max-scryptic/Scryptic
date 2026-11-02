import Image from "next/image"
import { cn } from "cn"

import { inset } from "@/lib/frame"
import { stack } from "@/lib/stack"

/**
 * A full-width band of the same Lapis as the hero, in both themes, with each
 * logo on a white tile. Like the hero, its background covers the page's guide
 * lines, with a square on each where they stop and start again.
 */
export function StackSection({
  title = "A stack built for a fast, scalable launch",
  lead = "Every app we ship runs on a modern, production-grade stack.",
  text = "These are the tools today's leading web products are built on, so your app is fast for users from day one and scales as you grow without a rebuild. Every account sits in your name, so any developer can pick the app up later.",
}: {
  title?: string
  lead?: string
  text?: string
}) {
  return (
    <>
      <div aria-hidden="true" className="rail-joint" />
      <section
        aria-labelledby="stack-heading"
        id="stack"
        className="scroll-mt-4 bg-[#2b3fd6] px-4 py-20 text-white sm:px-6 sm:py-24"
      >
        <div className={cn("mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16", inset)}>
          <div data-reveal="children" className="flex flex-col gap-5">
            <p className="font-mono text-xs tracking-widest text-[#c3caff] uppercase">Our stack</p>
            <h2 id="stack-heading" className="text-3xl tracking-tight text-balance sm:text-4xl">
              {title}
            </h2>
            <p className="text-lg text-pretty text-white/80">{lead}</p>
            <p className="text-pretty text-white/80">{text}</p>
          </div>
          <ul data-reveal="children" className="grid grid-cols-2 gap-3 sm:gap-4">
            {stack.map((tool) => (
              <li
                key={tool.name}
                className="flex flex-col items-center justify-center gap-4 bg-white px-4 py-6 text-[#14131b] sm:py-8"
              >
                {/* Wordmarks get the same area rather than the same height, so a long
                    one does not shrink to a sliver and a tall one does not dwarf the rest. */}
                <span className="flex h-14 items-center gap-3">
                  <Image
                    src={tool.logo}
                    alt={tool.wordmark ? tool.name : ""}
                    className="w-auto max-w-full object-contain"
                    style={{
                      height: tool.wordmark
                        ? `${Math.sqrt(20 / (tool.logo.width / tool.logo.height))}rem`
                        : "2.5rem",
                    }}
                  />
                  {!tool.wordmark && (
                    <span className="text-2xl font-semibold tracking-tight">{tool.name}</span>
                  )}
                </span>
                <span className="font-mono text-xs tracking-widest text-[#14131b]/60 uppercase">
                  {tool.role}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <div aria-hidden="true" className="rail-joint" />
    </>
  )
}
