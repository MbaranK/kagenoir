import { NextResponse } from 'next/server'

export async function GET() {
  const url = process.env.DATABASE_URL
  return NextResponse.json({
    DATABASE_URL_set: !!url,
    DATABASE_URL_length: url?.length ?? 0,
    DATABASE_URL_prefix: url ? url.substring(0, 30) + '...' : null,
    NODE_ENV: process.env.NODE_ENV,
    VERCEL_ENV: process.env.VERCEL_ENV,
  })
}
