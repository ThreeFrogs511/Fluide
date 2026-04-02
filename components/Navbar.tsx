'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/', label: 'Home' },
  { href: '/exercises', label: 'Exercises' },
  { href: '/about', label: 'About' },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="w-full py-6 px-6 md:px-8">
      <div className="max-w-3xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Fluide
        </Link>
        <ul className="flex items-center gap-8">
          {links.map(({ href, label }) => {
            const isActive = pathname === href
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={
                    isActive
                      ? 'text-sm font-medium underline underline-offset-4'
                      : 'text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors'
                  }
                >
                  {label}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
