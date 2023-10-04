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
    slug: { type: 'string', resolve: (log) => log._raw.sourceFileName.replace('.mdx', '') },
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

export default makeSource({ contentDirPath: 'content', documentTypes: [Doc, Navigation] })