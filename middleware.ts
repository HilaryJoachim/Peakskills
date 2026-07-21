import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Secure Student Portal
  if (path.startsWith('/portal')) {
    const token = request.cookies.get('peakskills_student_session')?.value
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback_secret_for_local_dev')
      await jwtVerify(token, secret)
      // Token is valid, proceed
      return NextResponse.next()
    } catch (error) {
      // Invalid or expired token
      const response = NextResponse.redirect(new URL('/login', request.url))
      // Optionally clear the invalid cookie
      response.cookies.delete('peakskills_student_session')
      return response
    }
  }

  // Secure Admin Portal
  if (path.startsWith('/admin') && path !== '/admin-login') {
    const token = request.cookies.get('peakskills_admin_session')?.value
    if (!token) {
      return NextResponse.redirect(new URL('/admin-login', request.url))
    }

    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback_secret_for_local_dev')
      await jwtVerify(token, secret)
      return NextResponse.next()
    } catch (error) {
      const response = NextResponse.redirect(new URL('/admin-login', request.url))
      response.cookies.delete('peakskills_admin_session')
      return response
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
