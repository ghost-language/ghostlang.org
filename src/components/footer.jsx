import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-foreground text-background/80 text-sm bg-origin-border">
      <h2 className="sr-only">Footer</h2>

      <div className="container pt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
          <div className="md:col-span-2">
            <h3 className="font-bold text-base mb-2 text-background/90">GHOST</h3>
            <p className="text-sm">A small, class-based programming language. It's embeddable, light-weight, and a joy to use.</p>
          </div>

          <div className="hidden lg:block"></div>

          <div>
            <h3 className="text-sm font-semibold text-background/90 tracking-wider uppercase">
              Highlights
            </h3>

            <ul className="mt-4 space-y-4">
              <li><Link href="/docs" className="text-background/80 hover:text-background">Getting Started</Link></li>
              <li><Link href="/docs/syntax" className="text-background/80 hover:text-background">Syntax</Link></li>
              <li><Link href="/docs/values" className="text-background/80 hover:text-background">Values</Link></li>
              <li><Link href="/docs/variables" className="text-background/80 hover:text-background">Variables</Link></li>
              <li><Link href="/docs/operators" className="text-background/80 hover:text-background">Operators</Link></li>
              <li><Link href="/docs/control-flow" className="text-background/80 hover:text-background">Control Flow</Link></li>
              <li><Link href="/docs/functions" className="text-background/80 hover:text-background">Functions</Link></li>
              <li><Link href="/docs/classes" className="text-background/80 hover:text-background">Classes</Link></li>
              <li><Link href="/docs/modules" className="text-background/80 hover:text-background">Modules</Link></li>
              <li><Link href="/docs/embedding" className="text-background/80 hover:text-background">Embedding</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-background/90 tracking-wider uppercase">
              Resources
            </h3>

            <ul className="mt-4 space-y-4">
              <li><Link href="/blog" className="text-background/80 hover:text-background">Blog</Link></li>
              <li><Link href="/docs" className="text-background/80 hover:text-background">Documentation</Link></li>
              {/* <li><Link href="#" className="text-background/80 hover:text-background">Style Guide</Link></li>
              <li><Link href="#" className="text-background/80 hover:text-background">Design Kit</Link></li>
              <li><Link href="#" className="text-background/80 hover:text-background">Ghost By Example</Link></li> */}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-background/90 tracking-wider uppercase">
              Ecosystem
            </h3>

            <ul className="mt-4 space-y-4">
              <li><Link href="/docs/lumen" className="text-background/80 hover:text-background">Lumen</Link></li>
              <li><Link href="https://github.com/ghost-language/vscode" className="text-background/80 hover:text-background">VS Code Extension</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-background/10 mt-12">
        <div className="container py-12">
          <p className="text-background/60">
            “[...] I am not an AI. My code name is Project 2501. I am a living, thinking entity that was created in the sea of information.”
          </p>
        </div>
      </div>
    </footer>
  )
}