'use client'

import { notFound } from 'next/navigation'
import { components } from '@/components/mdx'
import { allDocs } from 'contentlayer/generated'
import { OnThisPage } from '@/components/on-this-page'
import { useMDXComponent } from 'next-contentlayer/hooks'

export default function DocIndex() {
  const page = allDocs.find(document => document.slug === 'index')

  if (!page) {
    notFound()
  }

  const MDXContent = useMDXComponent(page.body.code)

  return (
    <>
      <div className="mx-auto w-full min-w-0">
          <div className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground font-medium">
            {page.section}
          </div>

          <div className="space-y-2">
            <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
              {page.title}
            </h1>
          </div>

          <div className="pb-12 pt-8 prose max-w-none">
            <MDXContent components={components} />
          </div>
        </div>

        <OnThisPage headings={page.headings} />
    </>
  )
}