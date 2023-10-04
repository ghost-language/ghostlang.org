'use client'

import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useMDXComponent } from 'next-contentlayer/hooks'
import { allDocs, navigation } from 'contentlayer/generated'

export default function DocIndex() {
  const index = allDocs.find(document => document.slug === 'index')

  if (!index) {
    notFound()
  }

  const MDXContent = useMDXComponent(index.body.code)

  return (
    <div className="flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
      <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
        <ScrollArea className="relative overflow-hidden h-full py-6 pl-8 pr-6 lg:py-8">
          {Object.keys(navigation.links).map((section, idx) => (
            <div key={idx} className="pb-4">
              <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
                {section}
              </h4>

              <div className="grid grid-flow-row auto-rows-max text-sm">
                {Object.keys(navigation.links[section]).map((name, idx) => {
                  const slug = navigation.links[section][name]

                  return <Link key={idx} href={`${slug}`} className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline text-muted-foreground">{name}</Link>
                })}
              </div>
            </div>
          ))}
        </ScrollArea>
      </aside>

      <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
        <div className="mx-auto w-full min-w-0">
          <div className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground font-medium">
            Getting Started
          </div>

          <div className="space-y-2">
            <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
              {index.title}
            </h1>
          </div>

          <div className="pb-12 pt-8 prose max-w-none">
            <MDXContent />
          </div>
        </div>

        <div className="hidden text-sm xl:block">
          <div className="sticky top-16 -mt-10 pt-4">
            <div className="relative overflow-hidden pb-10">
              <div className="sticky top-16 -mt-10 h-[calc(100vh-3.5rem)] py-12">
                <div className="space-y-2">
                  <p className="font-medium">On This Page</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}