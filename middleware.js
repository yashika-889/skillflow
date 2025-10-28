import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function middleware(request) {
  const token = request.cookies.get('auth-token');
  const { pathname } = request.nextUrl;

  // If trying to access protected routes without token
  if (!token && pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If has token, verify it
  if (token) {
    try {
      const decoded = jwt.verify(token.value, JWT_SECRET);
      
      // If onboarding not complete, redirect to onboarding
      if (!decoded.onboardingComplete && 
          pathname !== '/onboarding' &&
          pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/onboarding', request.url));
      }

      // If logged in and trying to access auth pages
      if (pathname === '/login' || pathname === '/signup') {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }

      return NextResponse.next();
    } catch (error) {
      // If token is invalid, clear it and redirect to login
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('auth-token');
      return response;
    }
  }

  // 3. DEFAULT: Allow all other requests (like static assets, or root page)
  return NextResponse.next();
}

// ----------------------------------------------------
// CONFIG: Defines which paths the middleware should run on
// ----------------------------------------------------
export const config = {
  // FIX: Using (?:...) non-capturing groups instead of capturing groups (...)
  matcher: [
    '/((?:platform)|(?:marketing))/:path*',
  ]
};