import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { allPosts } from 'contentlayer/generated'
import { PostCard } from '@/components/post-card'
import { compareDesc, format, parseISO } from 'date-fns'
import { useMDXComponent } from 'next-contentlayer/hooks'

export function MostRecentPosts() {
  // Get the 6 most recent posts, group and sort by date and then sort by title
  const posts = allPosts
    .sort((a, b) => compareDesc(parseISO(a.date), parseISO(b.date)))
    .slice(0, 6)

  return (
    <div className="mx-auto grid grid-cols-1 gap-12 lg:mx-0 lg:max-w-none lg:grid-cols-3">
      {posts.map((post, idx) => (
        <PostCard key={idx} post={post} />
      ))}
    </div>
  )
}

function PostArticle(post) {
  const SummaryContent = useMDXComponent(post.summary.code)
  
  return (
    <article className="flex flex-col items-start justify-between py-6">
      <div className="inline-flex flex-col items-start gap-y-2 text-xs">
        <span className="font-bold tracking-wide text-rose-400">
          {post.category}
        </span>

        <time dateTime={post.date} className="text-foreground/60">
          {format(parseISO(post.date), 'LLLL d, yyyy')}
        </time>
      </div>

      <div className="group relative">
        <h3 className="mt-2 text-lg font-semibold leading-6 text-gray-900">
          {post.title}
        </h3>

        <div className="mt-2 prose max-w-none">
          <SummaryContent />
        </div>

        <div className="mt-5">
          <Button asChild>
            <Link href={post.url}>Read more</Link>
          </Button>
        </div>
      </div>
    </article>
  )
}