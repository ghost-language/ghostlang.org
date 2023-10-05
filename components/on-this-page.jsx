import Link from 'next/link'

export function OnThisPage({ headings }) {
  return (
    <div className="space-y-2">
      <p className="font-medium">On This Page</p>

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
  )
}