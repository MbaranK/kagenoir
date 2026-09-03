'use server'

import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/session'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

async function requireAuth() {
  const ok = await getSession()
  if (!ok) throw new Error('Yetkisiz erişim')
}

export async function ilanEkle(prevState: string | null, formData: FormData) {
  await requireAuth()

  const baslik = (formData.get('baslik') as string)?.trim()
  const aciklama = (formData.get('aciklama') as string)?.trim()
  const fiyat = parseFloat(formData.get('fiyat') as string)
  const kategori = (formData.get('kategori') as string)?.trim()
  const konum = (formData.get('konum') as string)?.trim() || null
  const olculer = (formData.get('olculer') as string)?.trim() || null
  const malzeme = (formData.get('malzeme') as string)?.trim() || null
  const resimlerRaw = formData.get('resimler') as string

  if (!baslik || !aciklama || isNaN(fiyat) || !kategori) {
    return 'Lütfen tüm zorunlu alanları doldurun.'
  }

  const resimler = resimlerRaw ? JSON.parse(resimlerRaw) : []

  await prisma.ilan.create({
    data: { baslik, aciklama, fiyat, kategori, konum, olculer, malzeme, resimler: JSON.stringify(resimler) },
  })

  revalidatePath('/')
  redirect('/admin')
}

export async function ilanGuncelle(id: string, prevState: string | null, formData: FormData) {
  await requireAuth()

  const baslik = (formData.get('baslik') as string)?.trim()
  const aciklama = (formData.get('aciklama') as string)?.trim()
  const fiyat = parseFloat(formData.get('fiyat') as string)
  const kategori = (formData.get('kategori') as string)?.trim()
  const konum = (formData.get('konum') as string)?.trim() || null
  const olculer = (formData.get('olculer') as string)?.trim() || null
  const malzeme = (formData.get('malzeme') as string)?.trim() || null
  const resimlerRaw = formData.get('resimler') as string
  const aktif = formData.get('aktif') === 'true'

  if (!baslik || !aciklama || isNaN(fiyat) || !kategori) {
    return 'Lütfen tüm zorunlu alanları doldurun.'
  }

  const resimler = resimlerRaw ? JSON.parse(resimlerRaw) : []

  await prisma.ilan.update({
    where: { id },
    data: { baslik, aciklama, fiyat, kategori, konum, olculer, malzeme, aktif, resimler: JSON.stringify(resimler) },
  })

  revalidatePath('/')
  revalidatePath(`/ilan/${id}`)
  redirect('/admin')
}

export async function ilanSil(id: string) {
  await requireAuth()
  await prisma.ilan.deleteMany({ where: { id } })
  revalidatePath('/')
  revalidatePath('/shop')
  revalidatePath('/admin')
  revalidatePath(`/ilan/${id}`)
  redirect('/admin')
}

export async function ilanDurumDegistir(id: string, aktif: boolean) {
  await requireAuth()
  await prisma.ilan.update({ where: { id }, data: { aktif } })
  revalidatePath('/')
  revalidatePath(`/ilan/${id}`)
}
