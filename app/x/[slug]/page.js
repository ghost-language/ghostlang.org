import { notFound } from "next/navigation"

const repositories = {
  ghost: 'https://github.com/ghost-language/ghost',
  lumen: 'https://github.com/ghost-language/lumen'
}

export default function X({ params: { slug } }) {
  if (!repositories[slug]) {
    notFound()
  }

  return (
    <>
      <meta name="go-import" hid="go-import" content={`ghostlang.org/x/${slug} git ${repositories[slug]}.git`} />
    </>
  )
}