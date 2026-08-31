import Link from 'next/link'
import { Title } from '@/components/ui/title'
import { Heading } from '@/components/ui/heading'
import { Subtitle } from '@/components/ui/subtitle'
import { CommandBlock } from '@/components/command-block'
import { ReleaseDownloads } from '@/components/release-downloads'
import { fetchLatestRelease, releasesUrl } from '@/lib/releases'
import { ArrowRightIcon, TerminalIcon } from 'lucide-react'

export const metadata = {
  title: 'Download Ghost',
  description: 'Install Ghost and Lumen with Homebrew on macOS, or download a build for Linux and Windows.',
}

// The release lists come from GitHub, so the page reads whatever the latest
// release happens to be rather than a version written down here. An hour is
// short enough that a release shows up the same morning it is cut, and long
// enough to stay well inside GitHub's anonymous rate limit.
export const revalidate = 3600

const PROJECTS = [
  {
    repository: 'ghost',
    name: 'Ghost',
    description: 'The language itself: the interpreter, the REPL, and the standard library.',
    cask: 'ghost',
    docs: '/docs',
    notes: {
      macos: 'Downloaded by hand rather than through Homebrew, the archive is quarantined by macOS and the first run is refused. Clear it with xattr -dr com.apple.quarantine ghost, or install the cask above, which does it for you.',
    },
  },
  {
    repository: 'lumen',
    name: 'Lumen',
    description: 'The 2D game engine for Ghost. Ghost is built into it, so a game needs nothing else.',
    cask: 'lumen',
    docs: '/docs/lumen',
    notes: {
      macos: 'SDL2 travels inside the archive, so there is nothing else to install. Downloaded by hand rather than through Homebrew it is quarantined by macOS; clear it with xattr -dr com.apple.quarantine on the unpacked folder.',
      linux: 'SDL2 is linked dynamically on Linux and comes from your distribution: install libsdl2-2.0-0, libsdl2-image-2.0-0, libsdl2-ttf-2.0-0, and libsdl2-mixer-2.0-0, or the equivalent for your package manager.',
      windows: 'The SDL2 DLLs are in the archive beside lumen.exe. Keep them together.',
    },
  },
]

function Section({ title, children }) {
  return (
    <section className="py-8">
      <h2 className="mb-6 text-2xl font-bold tracking-tight">{title}</h2>
      {children}
    </section>
  )
}

function ReleaseSection({ project, release }) {
  return (
    <div>
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="text-lg font-semibold">
          {project.name}

          {release?.tag && (
            <span className="ml-2 font-mono text-sm font-normal text-muted-foreground">
              {release.tag}
            </span>
          )}
        </h3>

        <Link
          href={releasesUrl(project.repository)}
          className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
        >
          All releases
        </Link>
      </div>

      <p className="mb-4 text-sm text-foreground/80">{project.description}</p>

      {release && release.platforms.length > 0 ? (
        <ReleaseDownloads
          platforms={release.platforms}
          checksums={release.checksums}
          extras={release.extras}
          notes={project.notes}
        />
      ) : (
        <p className="rounded-lg border px-4 py-3 text-sm text-muted-foreground">
          The build list could not be loaded just now.{' '}
          <Link
            href={releasesUrl(project.repository)}
            className="underline underline-offset-4 hover:text-foreground"
          >
            Download {project.name} from GitHub
          </Link>{' '}
          instead.
        </p>
      )}
    </div>
  )
}

export default async function Download() {
  const releases = await Promise.all(
    PROJECTS.map(project => fetchLatestRelease(project.repository))
  )

  return (
    <>
      <Heading>
        <Title>Download</Title>

        <Subtitle>
          Ghost and Lumen, for macOS, Linux, and Windows.
        </Subtitle>
      </Heading>

      <Section title="On a Mac">
        <p className="mb-6 max-w-[750px] text-foreground/80">
          Both projects live in the same Homebrew tap, so tapping it once covers
          Ghost, Lumen, and anything else the project ships later.
        </p>

        <CommandBlock className="mb-8 max-w-[750px]" commands={['brew tap ghost-language/tap']} />

        <div className="grid gap-6 lg:grid-cols-2">
          {PROJECTS.map((project, idx) => (
            <div key={project.repository} className="min-w-0 rounded-lg border p-6">
              <div className="mb-1 flex items-center gap-2">
                <TerminalIcon className="h-4 w-4 text-foreground/40" />
                <h3 className="font-semibold">{project.name}</h3>
              </div>

              <p className="mb-4 text-sm text-foreground/80">{project.description}</p>

              <CommandBlock commands={[`brew install --cask ghost-language/tap/${project.cask}`]} />

              <p className="mt-4 text-sm text-muted-foreground">
                Upgrade later with{' '}
                <code className="font-mono text-foreground/80">brew upgrade --cask {project.cask}</code>.{' '}
                <Link href={project.docs} className="underline underline-offset-4 hover:text-foreground">
                  Read the docs
                </Link>
                .
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 max-w-[750px] space-y-4 text-sm text-foreground/80">
          <p>
            Homebrew asks you to trust a tap outside its own before it will load
            anything from it. Trusting this one covers every cask in it, now and
            later:
          </p>

          <CommandBlock commands={['brew trust --tap ghost-language/tap']} />

          <p>
            Both are casks rather than formulae, because both ship pre-built
            binaries rather than building from source — which is what Homebrew
            asks a cask to be used for. Casks are macOS-only; on Linux and
            Windows, take the archives below.
          </p>

          <p className="rounded-lg border-l-2 border-foreground/20 pl-4 text-muted-foreground">
            <strong className="font-semibold text-foreground">
              The old <code className="font-mono">ghost-language/ghost</code> tap has moved.
            </strong>{' '}
            It is frozen at <code className="font-mono">1.0.0-beta.3</code> and
            will not be updated again. Run{' '}
            <code className="font-mono">brew untap ghost-language/ghost</code>,
            then tap <code className="font-mono">ghost-language/tap</code> as
            above.
          </p>
        </div>
      </Section>

      <Section title="Every platform">
        <p className="mb-8 max-w-[750px] text-foreground/80">
          Every build attached to the latest release, straight from GitHub. Your
          platform is picked for you where the browser will say what it is.
        </p>

        <div className="space-y-12">
          {PROJECTS.map((project, idx) => (
            <ReleaseSection
              key={project.repository}
              project={project}
              release={releases[idx]}
            />
          ))}
        </div>
      </Section>

      <Section title="Other ways in">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="min-w-0 rounded-lg border p-6">
            <h3 className="mb-2 font-semibold">Go install</h3>

            <p className="mb-4 text-sm text-foreground/80">
              Ghost is a Go program, and builds with nothing but a Go toolchain.
            </p>

            <CommandBlock commands={['go install ghostlang.org/x/ghost']} />
          </div>

          <div className="min-w-0 rounded-lg border p-6">
            <h3 className="mb-2 font-semibold">From source</h3>

            <p className="mb-4 text-sm text-foreground/80">
              Ghost builds with <code className="font-mono">make</code>. Lumen
              links SDL2 through cgo, so it needs the SDL development libraries
              first — see{' '}
              <Link href="/docs/lumen" className="underline underline-offset-4 hover:text-foreground">
                Lumen&rsquo;s getting started guide
              </Link>
              .
            </p>

            <CommandBlock
              commands={[
                'git clone https://github.com/ghost-language/ghost',
                'cd ghost',
                'make',
              ]}
            />
          </div>
        </div>

        <p className="mt-8">
          <Link
            href="/docs"
            className="inline-flex items-center gap-2 text-sm font-medium underline underline-offset-4"
          >
            Once it is installed, start here
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </p>
      </Section>
    </>
  )
}
