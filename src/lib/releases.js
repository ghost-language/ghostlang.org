const OWNER = 'ghost-language'

// macOS first, because it is the platform Homebrew covers and the one the
// download page leads with. `order` is the order the builds are listed in,
// which is not the same on every platform: every Mac sold for years now is
// Apple Silicon, while a Linux or Windows desktop is still overwhelmingly
// x86-64.
const PLATFORMS = [
  { id: 'macos', name: 'macOS', tokens: ['darwin', 'macos', 'osx'], order: ['arm64', 'amd64'] },
  { id: 'linux', name: 'Linux', tokens: ['linux'] },
  { id: 'windows', name: 'Windows', tokens: ['windows', 'win32', 'win64'] },
]

// Ordered widest-to-narrowest so the first token that matches wins. `arm` has
// to come after `arm64` for the same reason `x86` has to come after `x86_64`.
// This doubles as the default listing order.
const ARCHITECTURES = [
  { id: 'amd64', tokens: ['amd64', 'x64'], name: '64-bit (x86)', names: { macos: 'Intel' } },
  { id: 'arm64', tokens: ['arm64', 'aarch64'], name: 'ARM64', names: { macos: 'Apple Silicon' } },
  { id: '386', tokens: ['386', 'i386', 'x86'], name: '32-bit (x86)' },
  { id: 'arm', tokens: ['arm', 'armv6', 'armv6l', 'armv7', 'armhf'], name: 'ARM (32-bit)' },
]

// Everything a release carries that is not a build for a platform. Checksums
// get a line of their own on the page; anything else is just listed.
const CHECKSUM_PATTERN = /checksum|sha256|sha512|\.sig$|\.asc$|\.pem$/i

// Longest first: `.tar.gz` has to be recognised before `.gz` would be.
const EXTENSIONS = ['.tar.gz', '.tar.xz', '.tgz', '.zip', '.dmg', '.pkg', '.msi', '.exe', '.deb', '.rpm', '.gz']

const FORMATS = {
  '.tar.gz': 'tar.gz',
  '.tar.xz': 'tar.xz',
  '.tgz': 'tar.gz',
  '.zip': 'zip',
  '.dmg': 'dmg',
  '.pkg': 'pkg',
  '.msi': 'msi',
  '.exe': 'exe',
  '.deb': 'deb',
  '.rpm': 'rpm',
  '.gz': 'gz',
}

// Splits an asset filename into the pieces a platform and an architecture can
// be read out of. Both projects name their archives the same way even though
// only one of them uses GoReleaser: `<project>_<version>_<os>_<arch><ext>`,
// with `-` instead of `_` between os and arch in Lumen's case. Tokenising on
// every separator covers both without either being special-cased.
function tokenize(filename) {
  const lowered = filename.toLowerCase()
  const extension = EXTENSIONS.find(candidate => lowered.endsWith(candidate)) ?? ''
  const stem = extension ? lowered.slice(0, -extension.length) : lowered

  return {
    extension,
    // `x86_64` would otherwise tokenise into `x86` and `64`, and be read as a
    // 32-bit build.
    tokens: stem.replace(/x86[_-]64/g, 'amd64').split(/[._\-+]/).filter(Boolean),
  }
}

function findByToken(candidates, tokens) {
  for (const candidate of candidates) {
    if (candidate.tokens.some(token => tokens.includes(token))) {
      return candidate
    }
  }

  return null
}

function formatSize(bytes) {
  if (!bytes) {
    return null
  }

  const megabytes = bytes / 1024 / 1024

  return megabytes < 1
    ? `${Math.round(bytes / 1024)} KB`
    : `${megabytes.toFixed(1)} MB`
}

function describeAsset(asset) {
  const { extension, tokens } = tokenize(asset.name)
  const platform = findByToken(PLATFORMS, tokens)
  const architecture = findByToken(ARCHITECTURES, tokens)

  return {
    name: asset.name,
    url: asset.browser_download_url,
    size: formatSize(asset.size),
    format: FORMATS[extension] ?? null,
    platform: platform?.id ?? null,
    architecture: architecture?.id ?? null,
    // "Apple Silicon" and "Intel" are what a Mac user recognises; everywhere
    // else the architecture is named the way the platform names it.
    architectureName: architecture
      ? architecture.names?.[platform?.id] ?? architecture.name
      : null,
    checksum: CHECKSUM_PATTERN.test(asset.name),
  }
}

// Turns a release's flat list of assets into the platform sections the
// download page renders. Anything that names no platform (checksums, a
// signature, an installer nobody thought to put an OS in the name of) is kept
// aside rather than dropped, so a new kind of asset shows up on the page the
// release after it is added rather than needing this file changed.
function groupAssets(assets) {
  const described = assets.map(describeAsset)
  const fallbackOrder = ARCHITECTURES.map(architecture => architecture.id)

  const platforms = PLATFORMS.map(platform => {
    const order = platform.order ?? fallbackOrder

    return {
      id: platform.id,
      name: platform.name,
      downloads: described
        .filter(asset => asset.platform === platform.id)
        .sort((a, b) => {
          // An architecture the order says nothing about sorts last rather
          // than first, which is where -1 would otherwise put it.
          const rank = id => (order.indexOf(id) === -1 ? order.length : order.indexOf(id))

          return rank(a.architecture) - rank(b.architecture)
        }),
    }
  }).filter(platform => platform.downloads.length > 0)

  const unplaced = described.filter(asset => asset.platform === null)

  return {
    platforms,
    checksums: unplaced.filter(asset => asset.checksum),
    extras: unplaced.filter(asset => !asset.checksum),
  }
}

/**
 * The newest published release of a repository, with its assets sorted into
 * platforms.
 *
 * `/releases/latest` is deliberately not used: it skips pre-releases, and both
 * Ghost and Lumen are still cutting those. The list endpoint returns newest
 * first and keeps them, so the first non-draft entry is the one to show.
 *
 * Returns `null` rather than throwing if GitHub cannot be reached or answers
 * with an error, so the page can fall back to linking at the releases page
 * instead of failing to render.
 */
export async function fetchLatestRelease(repository) {
  const headers = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  }

  // Unauthenticated requests are rate limited per IP. A token is not required,
  // since the page revalidates hourly and stays well inside the anonymous
  // budget, but it is used when one is configured.
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  }

  let response

  try {
    response = await fetch(
      `https://api.github.com/repos/${OWNER}/${repository}/releases?per_page=10`,
      { headers, next: { revalidate: 3600 } }
    )
  } catch (error) {
    return null
  }

  if (!response.ok) {
    return null
  }

  const releases = await response.json()

  if (!Array.isArray(releases)) {
    return null
  }

  const release = releases.find(candidate => !candidate.draft)

  if (!release) {
    return null
  }

  return {
    tag: release.tag_name,
    version: release.tag_name?.replace(/^v/, '') ?? null,
    url: release.html_url,
    publishedAt: release.published_at,
    prerelease: Boolean(release.prerelease),
    ...groupAssets(release.assets ?? []),
  }
}

export function releasesUrl(repository) {
  return `https://github.com/${OWNER}/${repository}/releases`
}
