import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const protectedPaths = ['/home', '/menu', '/cart', '/orders', '/profile', '/scan', '/about']
  const authPaths = ['/auth/login', '/auth/signup', '/auth/verify', '/auth/forgot']

  const sessionCookie = request.cookies.get('yemo_session')
  const isAuthenticated = Boolean(sessionCookie?.value)

  if (!isAuthenticated && protectedPaths.some((p) => pathname.startsWith(p))) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }
  if (isAuthenticated && authPaths.some((p) => pathname.startsWith(p))) {
    return NextResponse.redirect(new URL('/home', request.url))
  }
  if (pathname === '/') {
    return NextResponse.redirect(new URL(isAuthenticated ? '/home' : '/onboarding', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
