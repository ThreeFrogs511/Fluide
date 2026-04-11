import { auth } from '@/auth'
import { NextResponse } from 'next/server'

export default auth((req) => {
  const isAuthenticated = !!req.auth
  const isLoginPage = req.nextUrl.pathname === '/admin/login'

  if (!isAuthenticated && !isLoginPage) {
    return NextResponse.redirect(new URL('/admin/login', req.url))
  }

  if (isAuthenticated && isLoginPage) {
    return NextResponse.redirect(new URL('/admin', req.url))
  }
})

export const config = {
  matcher: ['/admin/:path*'],
}
