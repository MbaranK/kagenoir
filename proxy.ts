import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const SECRET = new TextEncoder().encode(process.env.AUTH_SECRET!)

export async function proxy(request: NextRequest) {
  const token = request.cookies.get('mezat_session')?.value

  if (!token) {
    return NextResponse.redirect(new URL('/giris', request.url))
  }

  try {
    await jwtVerify(token, SECRET)
    return NextResponse.next()
  } catch {
    return NextResponse.redirect(new URL('/giris', request.url))
  }
}

export const config = {
  matcher: ['/admin/:path*'],
}
