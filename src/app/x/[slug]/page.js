import { notFound } from 'next/navigation'

const repositories = {
  ghost: 'https://github.com/ghost-language/ghost'
}

// export async function generateMetadata({ params: { slug } }) {
//   return {
//     'go-import': `ghostlang.org/x/${slug} git ${repositories[slug]}`
//   }
// }

export default function Page({ params: { slug }}) {
  if (! repositories[slug]) {
    notFound()
  }

  return (
    <>
      <meta name="go-import" content={`ghostlang.org/x/${slug} git ${repositories[slug]}`} />

      <div className="flex flex-col justify-center items-center h-32">
        <div class="font-mono">go get <span class="text-indigo-400 font-bold">ghostlang.org/x/{slug}</span></div>
        <div class="font-mono">{repositories[slug]}</div>
      </div>
    </>
  )
}
