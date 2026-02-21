import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt' 
 
// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {

    const token=await getToken({req:request})
    const url=request.nextUrl
    if(token && (
       url.pathname.startsWith("login")||
        url.pathname.startsWith("sign-up")
    ))

  return NextResponse.redirect(new URL('/', request.url))
}
 
// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }
 
export const config = {
  matcher: ['/about/:path*']


}