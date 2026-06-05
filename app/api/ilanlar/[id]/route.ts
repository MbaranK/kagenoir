import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/session'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const ok = await getSession()
  if (!ok) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })

  const { id } = await params
  const ilan = await prisma.ilan.findUnique({ where: { id } })
  if (!ilan) return NextResponse.json({ error: 'Bulunamadı' }, { status: 404 })

  return NextResponse.json(ilan)
}
