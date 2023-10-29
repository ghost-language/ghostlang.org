import { compareDesc } from 'date-fns'
import { Title } from '@/components/ui/title'
import { allPosts } from 'contentlayer/generated'
import { PostCard } from '@/components/post-card'
import { Heading } from '@/components/ui/heading'
import { Subtitle } from '@/components/ui/subtitle'
import { Container } from '@/components/ui/container'

export default function Blog() {
  const posts = allPosts
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))

  return (
    <>
      <Heading>
        <Title>Blog</Title>

        <Subtitle>
          All the latest development news, straight from the team.
        </Subtitle>
      </Heading>

      <Container>
        <div className="grid grid-cols-1 gap-y-6 gap-x-12 lg:grid-cols-3">
          {posts.map((post, idx) => (
            <PostCard key={idx} post={post} />
          ))}
        </div>
      </Container>
    </>
  )
}