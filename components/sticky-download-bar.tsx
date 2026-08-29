import { Download, TrendingUp } from 'lucide-react'

export function StickyDownloadBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/90 backdrop-blur-xl md:hidden">
      <div className="flex items-center justify-between gap-3 px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-lg shadow-primary/30">
            <TrendingUp className="h-5 w-5" aria-hidden="true" />
          </span>
          <div className="min-w-0 leading-tight">
            <p className="truncate text-sm font-semibold text-foreground">
              MYT Trading App
            </p>
            <p className="truncate text-[11px] text-muted-foreground">
              v2.4 • Safe &amp; Verified APK
            </p>
          </div>
        </div>

        <a
          href="https://www.mediafire.com/file/xz412xcsbc6ugff/MYT🇮🇳.apk/file"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-transform duration-200 active:scale-95"
        >
          <Download className="h-4 w-4" aria-hidden="true" />
          Download
        </a>
      </div>
    </div>
  )
}
