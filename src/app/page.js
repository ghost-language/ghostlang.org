import { Label } from '@/components/ui/label'
import { Title } from '@/components/ui/title'
import { MostRecentPosts } from '@/components/most-recent-posts'
import { BoxIcon, FilterIcon, SquareDashedBottomCode } from 'lucide-react'

export default function Home() {
  return (
    <>
      <section className="py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <Label className="mb-3">
              <span>🌸</span>
              <span>Currently in Development</span>
            </Label>
            
            <h3 className="text-3xl font-extrabold tracking-tight sm:text-4xl">A small, object-oriented programming language that's a joy to use.</h3>

            <ul className="mt-10 list-none space-y-8">
            <li>
                <div className="flex space-x-4">
                  <div className="flex-shrink-0 h-12 w-12 bg-foreground text-background rounded-md rounded-es-2xl rounded-se-2xl flex items-center justify-center">
                    <FilterIcon />
                  </div>

                  <div>
                    <h4 className="mb-2 text-lg font-bold leading-none">Small</h4>
                    <p className="leading-6 p-0 text-foreground/80">
                      Ghost maintains a small footprint, making it portable and great for single-board computers.
                    </p>
                  </div>
                </div>
              </li>

              <li>
                <div className="flex space-x-4">
                  <div className="flex-shrink-0 h-12 w-12 bg-foreground text-background rounded-md rounded-es-2xl rounded-se-2xl flex items-center justify-center">
                    <SquareDashedBottomCode />
                  </div>

                  <div>
                    <h4 className="mb-2 text-lg font-bold leading-none">Embeddable</h4>
                    <p className="leading-6 p-0 text-foreground/80">
                      Extend and build applications in <span className="font-bold border-b-2 border-sky-400">Go</span> utilizing <span className="font-bold border-b-2 border-foreground">Ghost</span> as your scripting language.
                    </p>
                  </div>
                </div>
              </li>

              <li>
                <div className="flex space-x-4">
                  <div className="flex-shrink-0 h-12 w-12 bg-foreground text-background rounded-md rounded-es-2xl rounded-se-2xl flex items-center justify-center">
                    <BoxIcon />
                  </div>

                  <div>
                    <h4 className="mb-2 text-lg font-bold leading-none">Object-oriented</h4>
                    <p className="leading-6 p-0 text-foreground/80">
                      In Ghost's little universe, the atoms that make up all matter are objects, fully equipped with their own methods and properties.
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div className="border p-6 rounded-lg flex items-center justify-center bg-foreground text-background font-mono text-sm">
            example code <span className="ml-2 cursor-default animate-pulse">▍</span>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mb-6">
          <Title>From the blog</Title>
        </div>

        <MostRecentPosts />
      </section>
    </>
  )
}
