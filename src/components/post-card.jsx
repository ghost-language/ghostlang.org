import Link from 'next/link'
import { format, parseISO } from 'date-fns'
import { useMDXComponent } from 'next-contentlayer/hooks'

export function PostCard({ post }) {
  const SummaryContent = useMDXComponent(post.summary.code)

  return (
    <div className="flex flex-col items-start py-4">
      <div className="flex items-center gap-x-4 text-xs">
        <time dateTime={post.date} className="text-foreground/60">
          {format(parseISO(post.date), 'LLLL d, yyyy')}
        </time>
      </div>

      <div className="group relative">
        <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 hover:text-gray-600">
          <Link href={post.url}>
            {post.title}
          </Link>
        </h3>

        <div className="mt-5 line-clamp-3 prose max-w-none">
          <SummaryContent />
        </div>
      </div>
    </div>
  )
}