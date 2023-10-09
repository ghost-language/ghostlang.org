import Image from 'next/image'
import { notFound } from 'next/navigation'
import { allDocs } from 'contentlayer/generated'
import { OnThisPage } from '@/components/on-this-page'
import { useMDXComponent } from 'next-contentlayer/hooks'

export default function DocPage({ params: { slug } }) {
  const page = allDocs.find(document => document.slug === slug)

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
            <MDXContent components={{
              Image: ({ ...props }) => (
                <Image {...props} className="p-0 m-0" />
              )
            }}/>
          </div>
        </div>

        <div className="hidden text-sm xl:block">
          <div className="sticky top-16 -mt-10 pt-4">
            <div className="relative overflow-hidden pb-10">
              <div className="sticky top-16 -mt-10 h-[calc(100vh-3.5rem)] py-12">
                <OnThisPage headings={page.headings} />
              </div>
            </div>
          </div>
        </div>
    </>
  )
}