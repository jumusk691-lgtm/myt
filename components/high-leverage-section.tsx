import Image from 'next/image'
import { Rocket, LineChart, Flame } from 'lucide-react'

const cards = [
  {
    icon: LineChart,
    market: 'NSE/BSE Options & Futures',
    leverage: 'MAX',
    note: 'Amplify your equity derivatives positions',
  },
  {
    icon: Flame,
    market: 'MCX Commodities (Gold, Crude Oil)',
    leverage: 'MAX',
    note: 'Maximum firepower on commodity trades',
  },
]

export function HighLeverageSection() {
  return (
    <section
      className="px-4 py-16 sm:px-6 sm:py-24"
      aria-label="High leverage trading"
    >
      <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-2 md:gap-14">
        {/* Leverage calculator mockup */}
        <div className="relative">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 rounded-3xl bg-primary/15 blur-3xl"
          />
          <div className="mx-auto max-w-xs overflow-hidden rounded-2xl border border-border bg-card">
            <Image
              src="/leverage-calculator.png"
              alt="Leverage calculator screen showing a 1,000 rupee deposit turning into 5,00,000 rupee trading exposure at 500x leverage"
              width={720}
              height={900}
              className="h-auto w-full"
            />
          </div>
        </div>

        {/* Copy + cards */}
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs font-medium uppercase tracking-wide text-brand-glow">
            <Rocket className="h-3.5 w-3.5" aria-hidden="true" />
            High Leverage
          </span>
          <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Unmatched Leverage — Up to --x
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Trade bigger with less capital. Turn a small deposit into serious
            market exposure across equities and commodities.
          </p>

          <div className="mt-6 grid gap-4">
            {cards.map((card) => {
              const Icon = card.icon
              return (
                <div
                  key={card.market}
                  className="flex items-center gap-4 rounded-xl border border-border bg-card p-4"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-brand-glow">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-foreground">
                      {card.market}
                    </p>
                    <p className="text-xs text-muted-foreground">{card.note}</p>
                  </div>
                  <span className="shrink-0 rounded-lg bg-primary px-3 py-1.5 text-sm font-bold text-primary-foreground">
                    {card.leverage}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
