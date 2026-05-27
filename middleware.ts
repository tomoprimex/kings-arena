import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Get the session token from cookies
  const token = req.cookies.get('sb-access-token')?.value || req.cookies.get('sb-auth-token')?.value

  // Public routes that don't require authentication
  const publicRoutes = [
    '/',
    '/games',
    '/tournaments',
    '/auth/login',
    '/auth/signup',
    '/auth/forgot-password',
    '/players',
    '/leaderboard',
    '/news',
    '/contact',
    '/champions',
    '/continental',
    '/dls',
    '/friendly',
    '/intercontinental',
    '/national',
    '/store',
    '/login',
    '/signup'
  ]

  // Protected routes that require authentication
  const protectedRoutes = [
    '/profile',
    '/dashboard',
    '/matchmaking'
  ]

  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))

  // If trying to access protected route without session, redirect to login
  if (isProtectedRoute && !token) {
    const redirectUrl = new URL('/auth/login', req.url)
    redirectUrl.searchParams.set('redirectTo', pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // If trying to access auth routes while logged in, redirect to dashboard
  if ((pathname.startsWith('/auth/login') || pathname.startsWith('/auth/signup') || pathname === '/login' || pathname === '/signup') && token) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
