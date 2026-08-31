'use client'

import * as React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { DownloadIcon, FileArchiveIcon } from 'lucide-react'

// Enough to tell the three desktop platforms apart, and no more. Order
// matters: "Macintosh" is checked before Windows because `win` appears inside
// `darwin`, and Linux last because Android reports itself as Linux too.
function detectPlatform() {
  if (typeof navigator === 'undefined') {
    return null
  }

  const agent = [
    navigator.userAgentData?.platform,
    navigator.platform,
    navigator.userAgent,
  ].filter(Boolean).join(' ').toLowerCase()

  if (/mac|iphone|ipad|ipod/.test(agent)) return 'macos'
  if (/windows|win32|win64|wow64/.test(agent)) return 'windows'
  if (/linux|android|cros|x11/.test(agent)) return 'linux'

  return null
}

function AssetLinks({ assets }) {
  return assets.map((asset, idx) => (
    <React.Fragment key={asset.name}>
      {idx > 0 && ', '}
      <Link href={asset.url} className="font-mono underline underline-offset-4 hover:text-foreground">
        {asset.name}
      </Link>
    </React.Fragment>
  ))
}

export function ReleaseDownloads({ platforms, checksums = [], extras = [], notes = {} }) {
  const [selected, setSelected] = React.useState(platforms[0]?.id ?? null)
  const [detected, setDetected] = React.useState(null)

  // Detection runs after hydration rather than during render, so the markup
  // the server produced and the markup the first client render produces are
  // the same. The visitor's own platform is selected a moment later.
  React.useEffect(() => {
    const platform = detectPlatform()

    setDetected(platform)

    if (platform && platforms.some(candidate => candidate.id === platform)) {
      setSelected(platform)
    }
  }, [platforms])

  if (platforms.length === 0) {
    return null
  }

  const active = platforms.find(platform => platform.id === selected) ?? platforms[0]

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Platform">
        {platforms.map(platform => (
          <button
            key={platform.id}
            type="button"
            role="tab"
            aria-selected={platform.id === active.id}
            onClick={() => setSelected(platform.id)}
            className={cn(
              'inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm font-medium transition-colors',
              platform.id === active.id
                ? 'border-foreground bg-foreground text-background'
                : 'border-border text-foreground/70 hover:bg-accent hover:text-foreground'
            )}
          >
            {platform.name}

            {platform.id === detected && (
              <span
                className={cn(
                  'rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide',
                  platform.id === active.id ? 'bg-background/20' : 'bg-muted text-muted-foreground'
                )}
              >
                Yours
              </span>
            )}
          </button>
        ))}
      </div>

      <ul className="mt-4 divide-y rounded-lg border">
        {active.downloads.map(download => (
          <li key={download.name}>
            <Link
              href={download.url}
              className="flex items-center gap-4 px-4 py-3 transition-colors hover:bg-accent"
            >
              <FileArchiveIcon className="h-5 w-5 shrink-0 text-foreground/40" />

              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium">
                  {active.name}
                  {download.architectureName ? ` · ${download.architectureName}` : ''}
                </div>

                <div className="truncate font-mono text-xs text-muted-foreground">
                  {download.name}
                </div>
              </div>

              <div className="hidden shrink-0 text-xs text-muted-foreground sm:block">
                {[download.format, download.size].filter(Boolean).join(' · ')}
              </div>

              <DownloadIcon className="h-4 w-4 shrink-0 text-foreground/40" />
            </Link>
          </li>
        ))}
      </ul>

      {notes[active.id] && (
        <p className="mt-3 text-sm text-muted-foreground">{notes[active.id]}</p>
      )}

      {checksums.length > 0 && (
        <p className="mt-3 text-sm text-muted-foreground">
          Verify a download against{' '}
          <AssetLinks assets={checksums} />.
        </p>
      )}

      {extras.length > 0 && (
        <p className="mt-3 text-sm text-muted-foreground">
          Also in this release: <AssetLinks assets={extras} />.
        </p>
      )}
    </div>
  )
}
