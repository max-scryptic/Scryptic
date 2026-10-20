/** The list of what a site check looks at, under the checker on its page. */
export function WhatWeCheck({ items }: { items: { name: string; text: string }[] }) {
  return (
    <section aria-labelledby="checked-heading" className="flex flex-col gap-6 pt-6">
      <h2 id="checked-heading" className="text-2xl tracking-tight">
        What the check looks at
      </h2>
      <dl className="grid gap-x-10 gap-y-6 md:grid-cols-2">
        {items.map((item) => (
          <div key={item.name} className="flex flex-col gap-1">
            <dt className="font-medium">{item.name}</dt>
            <dd className="text-pretty text-muted-foreground">{item.text}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
