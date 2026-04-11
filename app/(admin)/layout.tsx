import Link from 'next/link'
import { auth, signOut } from '@/auth'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  return (
    <div>
      <div className="flex items-center justify-between pb-5 mb-8 border-b border-neutral-200">
        <Link
          href="/"
          className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
        >
          ← Back to site
        </Link>
        {session && (
          <form
            action={async () => {
              'use server'
              await signOut({ redirectTo: '/' })
            }}
          >
            <button
              type="submit"
              className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
            >
              Log out
            </button>
          </form>
        )}
      </div>
      {children}
    </div>
  )
}
