import Image from 'next/image'
import { Download, MessageCircle } from 'lucide-react'

const avatars = [
  '/avatars/trader-1.png',
  '/avatars/trader-2.png',
  '/avatars/trader-3.png',
  '/avatars/trader-4.png',
  '/avatars/trader-5.png',
]

export function CommunityCtaSection() {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-24" aria-label="Start trading now">
      <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-border bg-card px-6 py-14 text-center sm:px-12">
        {/* glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/25 blur-[110px]"
        />

        {/* avatar grid */}
        <div className="mb-6 flex items-center justify-center -space-x-3">
          {avatars.map((src, i) => (
            <span
              key={src}
              className="inline-block rounded-full ring-2 ring-card"
              style={{ zIndex: avatars.length - i }}
            >
              <Image
                src={src || '/placeholder.svg'}
                alt=""
                width={44}
                height={44}
                className="h-11 w-11 rounded-full object-cover"
              />
            </span>
          ))}
          <span className="ml-4 flex h-11 items-center rounded-full bg-secondary px-3 text-xs font-semibold text-secondary-foreground">
            10,000+ traders
          </span>
        </div>

        <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Start Trading Now with MYT Trading
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-pretty leading-relaxed text-muted-foreground">
          Download the APK and begin your trading journey. Join our official
          community for instant 24/7 support and market updates.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="https://www.mediafire.com/file/xz412xcsbc6ugff/MYT🇮🇳.apk/file"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground shadow-xl shadow-primary/40 transition-all duration-200 hover:scale-[1.02] active:scale-95 sm:w-auto"
          >
            <Download className="h-5 w-5" aria-hidden="true" />
            Download APK
          </a>
          <a
            href="https://chat.whatsapp.com/CrWJtNMYSTDKmCyz2y5clc"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-secondary/60 px-7 py-3.5 text-base font-semibold text-secondary-foreground transition-colors duration-200 hover:bg-secondary sm:w-auto"
          >
            <MessageCircle className="h-5 w-5 text-emerald-400" aria-hidden="true" />
            Join Community
          </a>
        </div>
      </div>
    </section>
  )
}
