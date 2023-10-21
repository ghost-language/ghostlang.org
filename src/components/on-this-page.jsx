import Link from 'next/link'
import { ScrollArea } from '@/components/ui/scroll-area'

export function OnThisPage({ headings }) {
  return (
    <>
      { headings.length > 0 && (
        <div className="hidden text-sm xl:block">
          <div className="sticky top-[6rem] -mt-10 pt-6">
            <ScrollArea className="relative overflow-hidden pb-10">
              <div className="sticky top-16 -mt-10 h-[calc(100vh-3.5rem)] py-12">
                <div>
                  <p className="font-medium mb-3">On This Page</p>

                  <ul className="m-0 list-none space-y-2">
                    {headings.map((heading => {
                      return (
                        <li key={`#${heading.slug}`}>
                          <Link
                            className="inline-block no-underline transition-colors hover:text-foreground text-muted-foreground data-[level=three]:pl-4"
                            data-level={heading.level}
                            href={`#${heading.slug}`}
                          >
                            {heading.text}
                          </Link>
                        </li>
                      )
                    }))}
                  </ul>
                </div>
              </div>
            </ScrollArea>
          </div>
        </div>
      )}
    </>
  )
}