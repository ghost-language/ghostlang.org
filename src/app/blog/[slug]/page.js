import { notFound } from 'next/navigation'
import { format, parseISO } from 'date-fns'
import { Title } from '@/components/ui/title'
import { allPosts } from 'contentlayer/generated'
import { Heading } from '@/components/ui/heading'
import { Container } from '@/components/ui/container'
import { useMDXComponent } from 'next-contentlayer/hooks'

export default function Post({ params: { slug } }) {
  const post = allPosts.find((post) => post.slug === slug)

  if (! post) {
    notFound()
  }

  const Content = useMDXComponent(post.body.code)

  return (
    <>
      <Heading className="mx-auto max-w-4xl">
        <div className="text-sm text-muted-foreground">
          {format(parseISO(post.date), 'LLLL d, yyyy')}
        </div>

        <Title>{post.title}</Title>
      </Heading>

      <Container>
        <div className="prose mx-auto max-w-4xl">
          <Content />
        </div>
      </Container>
    </>
  )
}