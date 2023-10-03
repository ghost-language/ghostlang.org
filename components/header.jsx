import Link from 'next/link'
import { TriangleIcon } from 'lucide-react'

export function Header() {
  const navigation = [
    { name: 'Blog', href: '/blog' },
    { name: 'Documentation', href: '/docs' },
    { name: 'Download', href: '/download' },
  ]

  return (
    <header className="supports-backdrop-blue:bg-background/60 sticky top-0 z-50 w-full border-b border-gray-200/60 bg-background/95 backdrop-blur">
      <div className="h-14 flex items-center w-full container">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <TriangleIcon className="w-6 h-6" />

          <span className="font-bold inline-block uppercase text-sm tracking-wide">Ghost</span>
        </Link>
      </div>
    </header>
  )
}