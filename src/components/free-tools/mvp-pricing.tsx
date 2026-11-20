import { cn } from "cn"

import { inset } from "@/lib/frame"
import { extendedMvp, mvp } from "@/lib/services"

/*
 * "MVP pricing in the UK", under the MVP Cost Calculator: how suppliers charge
 * and what each kind costs, so the page answers pricing searches as well as
 * running the estimate. The ranges match the app cost post.
 */

const models = [
  {
    name: "Fixed price",
    text: `One price for a written scope, agreed before work starts. You know the bill up front and the supplier carries the risk of overrunning, so the scope has to be precise and changes are priced as they come up. Our packages work this way: the ${mvp.name} is ${mvp.price} for ${mvp.developmentWeeks} week of development and the ${extendedMvp.name} is ${extendedMvp.price} for ${extendedMvp.developmentWeeks} weeks, plus VAT.`,
  },
  {
    name: "Day rate",
    text: "You pay for the days worked, typically £300 to £700 a day for a UK freelancer and more for an agency team. It suits a scope that is still moving, but the total is an estimate and any overrun is yours to pay.",
  },
  {
    name: "Equity or revenue share",
    text: "The developer takes shares or a cut of revenue in place of some or all of the fee. It saves cash now and usually costs far more later, and it hands part of the company to someone who may not be around for the next version. Treat it as fundraising, not a discount.",
  },
]

const routes = [
  ["Freelancer", "£5,000 to £25,000", "Day rate, sometimes fixed per milestone"],
  ["Small studio", "£10,000 to £40,000", "Fixed price for an agreed scope"],
  ["Agency", "£40,000 and up", "A paid discovery phase, then day rates or a price per phase"],
  ["Build it yourself", "A few hundred pounds plus your time", "A monthly no-code or AI builder plan"],
]

export function MvpPricing() {
  return (
    <section aria-labelledby="mvp-pricing-heading" className={cn("flex flex-col gap-8 pt-6", inset)}>
      <div className="flex max-w-3xl flex-col gap-4">
        <h2 id="mvp-pricing-heading" className="text-2xl tracking-tight">
          MVP pricing in the UK
        </h2>
        <p className="text-pretty text-muted-foreground">
          An MVP with one core journey, sign-in and payments typically costs £5,000 to £25,000 from a UK
          freelancer, £10,000 to £40,000 from a small studio and £40,000 or more from an agency. The price
          is development time, so what you launch with moves it more than who builds it.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-xl tracking-tight">What an MVP costs, by who builds it</h3>
        <div className="overflow-x-auto border border-border bg-card">
          <table className="w-full min-w-[560px] border-collapse text-left text-sm">
            <caption className="sr-only">Typical UK MVP cost and how each kind of supplier charges</caption>
            <thead>
              <tr className="border-b border-border font-mono text-xs tracking-widest text-muted-foreground uppercase">
                <th scope="col" className="px-4 py-4 font-normal">
                  Who builds it
                </th>
                <th scope="col" className="px-4 py-4 font-normal">
                  Typical MVP cost
                </th>
                <th scope="col" className="px-4 py-4 font-normal">
                  How it&rsquo;s usually priced
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {routes.map(([route, cost, pricing]) => (
                <tr key={route}>
                  <th scope="row" className="px-4 py-4 align-top font-medium">
                    {route}
                  </th>
                  <td className="px-4 py-4 align-top">{cost}</td>
                  <td className="px-4 py-4 align-top text-pretty text-muted-foreground">{pricing}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-xl tracking-tight">How MVP pricing works</h3>
        <dl className="grid gap-x-10 gap-y-6 md:grid-cols-3">
          {models.map((model) => (
            <div key={model.name} className="flex flex-col gap-1">
              <dt className="font-medium">{model.name}</dt>
              <dd className="text-pretty text-muted-foreground">{model.text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
