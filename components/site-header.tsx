import { Download, TrendingUp } from 'lucide-react'
import { DownloadButton } from '@/components/DownloadButton'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#" className="flex items-center gap-2" aria-label="MYT Trading home">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-lg shadow-primary/30">
            <TrendingUp className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="text-lg font-semibold tracking-tight text-foreground">
            MYT <span className="text-brand-glow">Trading</span>
          </span>
        </a>

        <DownloadButton className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-transform duration-200 hover:scale-[1.03] active:scale-95">
          <Download className="h-4 w-4" aria-hidden="true" />
          Download App
        </DownloadButton>
      </div>
    </header>
  )
}
