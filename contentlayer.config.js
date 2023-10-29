import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import remarkMath from 'remark-math'
import GithubSlugger from 'github-slugger'
import rehypeHighlight from 'rehype-highlight'
import { defineDocumentType, makeSource} from 'contentlayer/source-files'

export const Doc = defineDocumentType(() => ({
  name: 'Doc',
  filePathPattern: 'docs/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    section: { type: 'string', required: true },
  },
  computedFields: {
    headings: {
      type: 'json',
      resolve: async (doc) => {
        const headingsRegex = /\n(?<flag>#{1,6})\s+(?<content>.+)/g
        const slugger = new GithubSlugger
        const headings = Array.from(doc.body.raw.matchAll(headingsRegex)).map(
          ({ groups }) => {
            const flag = groups?.flag
            const content = groups?.content

            return {
              level: flag.length == 1 ? 'one'
                : flag?.length == 2 ? 'two'
                : 'three',
              text: content,
              slug: content ? slugger.slug(content) : undefined,
            }
          }
        )

        return headings
      }
    },
    slug: { type: 'string', resolve: (doc) => doc._raw.sourceFileName.replace('.mdx', '') },
    url: { type: 'string', resolve: (doc) => `/docs/${doc.slug}`}
  }
}))

export const Navigation = defineDocumentType(() => ({
  name: 'Navigation',
  contentType: 'data',
  filePathPattern: 'navigation.json',
  fields: {
    links: { type: 'json', required: true },
  },
  isSingleton: true
}))

export const Post = defineDocumentType(() => ({
  name: 'Post',
  contentType: 'mdx',
  filePathPattern: 'posts/**/*.mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    summary: { type: 'mdx', required: true },
    version: { type: 'string', required: false },
  },
  computedFields: {
    headings: {
      type: 'json',
      resolve: async (post) => {
        const headingsRegex = /\n(?<flag>#{1,6})\s+(?<content>.+)/g
        const slugger = new GithubSlugger
        const headings = Array.from(post.body.raw.matchAll(headingsRegex)).map(
          ({ groups }) => {
            const flag = groups?.flag
            const content = groups?.content

            return {
              level: flag.length == 1 ? 'one'
                : flag?.length == 2 ? 'two'
                : 'three',
              text: content,
              slug: content ? slugger.slug(content) : undefined,
            }
          }
        )

        return headings
      }
    },
    url: { type: 'string', resolve: (post) => `/blog/${post._raw.flattenedPath.split('/')[1]}` },
    slug: { type: 'string', resolve: (post) => post._raw.flattenedPath.split('/')[1] },
  }
}))

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Doc, Navigation, Post],
  mdx: {
    remarkPlugins: [remarkGfm, remarkMath],
    rehypePlugins: [rehypeHighlight, rehypeSlug],
  }
})