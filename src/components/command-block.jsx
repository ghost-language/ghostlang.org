'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { CheckIcon, CopyIcon } from 'lucide-react'

export function CommandBlock({ commands, className }) {
  const [copied, setCopied] = React.useState(false)

  React.useEffect(() => {
    if (!copied) {
      return
    }

    const timeout = setTimeout(() => setCopied(false), 2000)

    return () => clearTimeout(timeout)
  }, [copied])

  async function copy() {
    try {
      await navigator.clipboard.writeText(commands.join('\n'))
      setCopied(true)
    } catch (error) {
      // Clipboard access is refused outside a secure context, and on a browser
      // that asks for permission first. The commands are on screen either way.
    }
  }

  return (
    <div className={cn('group relative rounded-md bg-foreground text-background/90 font-mono text-sm', className)}>
      <pre className="overflow-x-auto p-4 pr-12">
        <code>
          {commands.map((command, idx) => (
            <span key={idx} className="block whitespace-pre">
              <span className="select-none text-background/40">$ </span>
              {command}
            </span>
          ))}
        </code>
      </pre>

      <button
        type="button"
        onClick={copy}
        aria-label={copied ? 'Copied' : 'Copy to clipboard'}
        className="absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-md bg-foreground text-background/60 transition-colors hover:bg-background/10 hover:text-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-background/40"
      >
        {copied ? <CheckIcon className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
      </button>
    </div>
  )
}
