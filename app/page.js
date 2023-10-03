import { Title } from '@/components/ui/title'
import { BoxIcon, FilterIcon, SquareDashedBottomCode } from 'lucide-react'

export default function Home() {
  return (
    <>
      <section className="py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-3xl font-extrabold tracking-tight sm:text-4xl">A small, class-based programming language that's a joy to use.</h3>

            <ul className="mt-10 list-none space-y-8">
              <li>
                <div className="flex space-x-4">
                  <div className="flex-shrink-0 h-12 w-12 bg-foreground text-background rounded-lg flex items-center justify-center">
                    <SquareDashedBottomCode />
                  </div>

                  <div>
                    <h4 className="mb-2 text-lg font-bold leading-none">Embeddable</h4>
                    <p className="leading-6 p-0 text-foreground/80">
                      Extend and build applications in <span>Go</span> utilizing <span>Ghost</span> as your scripting language.
                    </p>
                  </div>
                </div>
              </li>

              <li>
                <div className="flex space-x-4">
                  <div className="flex-shrink-0 h-12 w-12 bg-foreground text-background rounded-lg flex items-center justify-center">
                    <FilterIcon />
                  </div>

                  <div>
                    <h4 className="mb-2 text-lg font-bold leading-none">Small</h4>
                    <p className="leading-6 p-0 text-foreground/80">
                      Ghost maintains a small footprint (less than 10 MB), making it portable and great for single-board computers.
                    </p>
                  </div>
                </div>
              </li>

              <li>
                <div className="flex space-x-4">
                  <div className="flex-shrink-0 h-12 w-12 bg-foreground text-background rounded-lg flex items-center justify-center">
                    <BoxIcon />
                  </div>

                  <div>
                    <h4 className="mb-2 text-lg font-bold leading-none">Class-based</h4>
                    <p className="leading-6 p-0 text-foreground/80">
                      Ghost places classes front and center, fully embracing object-oriented programming.
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
    </>
  )
}
