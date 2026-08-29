import { Download, Zap, Rocket, ShieldCheck, Star } from 'lucide-react'
import { AppMockup } from '@/components/app-mockup'

export function HeroSection() {
  return (
    <section
      id="download"
      className="relative overflow-hidden px-4 pb-16 pt-14 sm:px-6 sm:pb-24 sm:pt-20"
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]"
      />

      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        {/* Info badges */}
        <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/60 px-3.5 py-3.5 text-sm font-large text-secondary-foreground">
            <Zap className="h-4 w-4 text-amber-400" aria-hidden="true" />
            This Application Only for mobile Lightning Speed
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/60 px-3.5 py-1.5 text-sm font-medium text-secondary-foreground">
            <Rocket className="h-4 w-4 text-brand-glow" aria-hidden="true" />
            High Leverage
          </span>
        </div>

        <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl">
          Trade Nifty, BankNifty, and Commodities with{' '}
          <span className="text-brand-glow">Lightning Speed</span>
        </h1>

        <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
          Experience zero brokerage, fast execution, and secure trading. Trade
          on NSE/BSE with 8x leverage and MCX with 500x leverage.
        </p>

        {/* Rating + testimonial */}
        <div className="mt-6 flex flex-col items-center gap-1.5">
          <span className="flex items-center gap-0.5" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-amber-4000 text-amber-400" />
            ))}
          </span>

         <p className='text-sm text-foreground sm:text-base'>
  <span className='font-medium text-emerald-400'>
    &ldquo;OPTION Trade with 1000 Capital ;
  </span>{' '}
  <span className='text-muted-foreground'>— ANGLE ONE MYT</span>
</p>
        </div>

        <div className="mt-10 w-full sm:w-auto">
          <a
            href="https://www.mediafire.com/file/xz412xcsbc6ugff/MYT🇮🇳.apk/file"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex w-full items-center justify-center gap-3 rounded-xl bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-xl shadow-primary/40 transition-all duration-200 hover:scale-[1.02] hover:shadow-primary/60 active:scale-95 sm:w-auto sm:text-lg"
          >
            <Download
              className="h-5 w-5 transition-transform duration-200 group-hover:translate-y-0.5"
              aria-hidden="true"
            />
            Download MYT App (APK)
          </a>

          <p className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-brand-glow" aria-hidden="true" />
            Safe &amp; verified — direct APK download
          </p>
        </div>


<div className="my-6 w-full max-w-sm mx-auto px-4">
  <div className="relative aspect-[9/16] w-full overflow-hidden rounded-2xl shadow-2xl border border-gray-800 bg-black">
      <iframe 
            src="https://www.youtube.com/embed/84rUqZt2QHg?autoplay=1&mute=1&loop=1&playlist=84rUqZt2QHg" 
                  title="MYT Trading Short Video"
                        className="w-full h-full"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                    allowFullScreen
                                        />
                                          </div>
                                          </div>



        {/* App preview mockup */}
        <AppMockup />
      </div>
    </section>
  )
}
