'use client'

import * as React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowRightIcon } from 'lucide-react'

export function CodePreview({ projects }) {
  const [projectId, setProjectId] = React.useState(projects[0]?.id)
  // Each project remembers which of its files was last open, so switching to
  // Lumen and back does not throw away where you were in Ghost.
  const [openFiles, setOpenFiles] = React.useState({})

  const project = projects.find(candidate => candidate.id === projectId) ?? projects[0]
  const fileName = openFiles[project.id] ?? project.files[0]?.name
  const file = project.files.find(candidate => candidate.name === fileName) ?? project.files[0]

  return (
    <div className="flex min-w-0 flex-col">
      <div className="mb-3 flex items-center justify-between gap-4">
        <div className="inline-flex rounded-md bg-muted p-1" role="tablist" aria-label="Project">
          {projects.map(candidate => (
            <button
              key={candidate.id}
              type="button"
              role="tab"
              aria-selected={candidate.id === project.id}
              onClick={() => setProjectId(candidate.id)}
              className={cn(
                'rounded px-3 py-1 text-sm font-medium transition-colors',
                candidate.id === project.id
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {candidate.name}
            </button>
          ))}
        </div>

        <Link
          href={project.href}
          className="hidden items-center gap-1 text-sm text-muted-foreground hover:text-foreground sm:inline-flex"
        >
          Docs
          <ArrowRightIcon className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* The window is sized by the column beside it, never by the file that
          happens to be open: the panel below is taken out of flow so a long
          file scrolls instead of growing the page and shifting every tab. */}
      <div className="relative min-h-[420px] flex-1 overflow-hidden rounded-lg border bg-[#1a1b26]">
        <div className="absolute inset-0 flex flex-col">
        <div className="flex shrink-0 items-center gap-1 overflow-x-auto border-b border-white/10 px-2 py-1.5">
          {project.files.map(candidate => (
            <button
              key={candidate.name}
              type="button"
              role="tab"
              aria-selected={candidate.name === file.name}
              onClick={() => setOpenFiles(open => ({ ...open, [project.id]: candidate.name }))}
              className={cn(
                'whitespace-nowrap rounded px-2.5 py-1 font-mono text-xs transition-colors',
                candidate.name === file.name
                  ? 'bg-white/10 text-white'
                  : 'text-white/50 hover:bg-white/5 hover:text-white/80'
              )}
            >
              {candidate.name}
            </button>
          ))}
        </div>

        <div className="min-h-0 flex-1 overflow-auto">
          <pre className="p-4 text-[13px] leading-relaxed">
            {/* The HTML is highlight.js output built at build time from the
                literals in `code-examples.js`, never from anything a visitor
                or a request can reach. */}
            <code
              className="hljs bg-transparent"
              dangerouslySetInnerHTML={{ __html: file.html }}
            />
          </pre>
        </div>

        <p className="shrink-0 border-t border-white/10 px-4 py-2 font-mono text-xs text-white/40">
          {project.tagline}
        </p>
        </div>
      </div>
    </div>
  )
}
