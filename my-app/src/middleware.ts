import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const token = request.cookies.get('token')?.value || ''

  const publicpathname = pathname === '/Login' || pathname === '/Signup' 

  if(publicpathname && token) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }
  if(!publicpathname && !token) {
    return NextResponse.redirect(new URL('/Login', request.url))
  }
  
 


}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/Profile/:path*',
    '/Login',
    '/Signup',
    '/resetpassword'
  ]
}