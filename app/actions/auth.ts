'use server'

import { compare } from 'bcryptjs'
import { createSession, deleteSession } from '@/lib/session'
import { redirect } from 'next/navigation'

export async function login(prevState: string | null, formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (email !== process.env.ADMIN_EMAIL) {
    return 'E-posta veya şifre hatalı.'
  }

  const passwordHash = process.env.ADMIN_PASSWORD_HASH!
  const isValid = await compare(password, passwordHash)

  if (!isValid) {
    return 'E-posta veya şifre hatalı.'
  }

  await createSession()
  redirect('/admin')
}

export async function logout() {
  await deleteSession()
  redirect('/')
}
