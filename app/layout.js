import { Header } from '@/components/header'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Ghost',
  description: 'A small, class-based programming language',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased bg-white ${inter.className}`}>
        <div className="flex flex-col min-h-screen">
          <Header />

          <main className="flex flex-col flex-1 w-full transition-all duration-300 ease-in-out">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
