import Image from 'next/image'
import { Download, Smartphone, TrendingUp } from 'lucide-react'

const steps = [
  {
    icon: Download,
    title: 'Download APK',
    text: 'Click download and install the MYT app.',
    href: 'https://www.mediafire.com/file/xz412xcsbc6ugff/MYT🇮🇳.apk/file', 
  },
  {
    icon: Smartphone,
    title: 'Quick Registration',
    text: 'Enter your mobile number and register in 30 seconds.',
  },
  {
    icon: TrendingUp,
    title: 'Start Trading',
    text: 'Add funds and trade NSE, BSE & MCX instantly.',
  },
]

export function RegistrationSection() {
  return (
    <section
      className="px-4 py-16 sm:px-6 sm:py-24"
      aria-label="Register and start trading in 3 easy steps"
    >
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs font-medium uppercase tracking-wide text-brand-glow">
            <Smartphone className="h-3.5 w-3.5" aria-hidden="true" />
            Register App
          </span>
          <h2 className="mx-auto mt-4 max-w-2xl text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Register &amp; Start Trading in 3 Easy Steps
          </h2>
        </div>

        <div className="mt-10 grid items-center gap-10 md:grid-cols-2 md:gap-14">
          {/* Steps */}
          <ol className="grid gap-4">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isDownload = Boolean(step.href)
              const Element = isDownload ? 'a' : 'li'
              const extraProps = isDownload
                ? {
                    href: step.href,
                    target: '_blank',
                    rel: 'noopener noreferrer',
                    className:
                      'flex items-start gap-4 rounded-xl border border-border bg-card p-5 transition-all duration-200 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10',
                  }
                : {
                    className:
                      'flex items-start gap-4 rounded-xl border border-border bg-card p-5',
                  }

              return (
                <Element key={step.title} {...extraProps}>
                  <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-brand-glow">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                    <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">
                      {index + 1}
                    </span>
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-base font-semibold text-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {step.text}
                    </p>
                  </div>
                </Element>
              )
            })}
          </ol>

          {/* Registration mockup */}
          <div className="relative order-first md:order-last">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10 rounded-3xl bg-primary/15 blur-3xl"
            />
            <div className="mx-auto max-w-xs overflow-hidden rounded-2xl border border-border bg-card">
              <Image
                src="/registration-otp.png"
                alt="Phone screen showing the MYT app fast mobile registration and OTP login screen"
                width={720}
                height={900}
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
