'use client'

import { useActionState } from 'react'
import { login } from '@/app/actions/auth'
import { ShoppingBag, Loader2 } from 'lucide-react'

export default function GirisPage() {
  const [error, action, pending] = useActionState(login, null)

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-amber-100 rounded-2xl mb-4">
            <ShoppingBag className="w-7 h-7 text-amber-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Yönetici Girişi</h1>
          <p className="text-sm text-gray-500 mt-1">İlan eklemek için giriş yapın</p>
        </div>

        <form action={action} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
              E-posta
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
              placeholder="ornek@email.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
              Şifre
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={pending}
            className="w-full bg-amber-600 hover:bg-amber-700 disabled:opacity-60 text-white font-medium py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            {pending && <Loader2 className="w-4 h-4 animate-spin" />}
            {pending ? 'Giriş yapılıyor...' : 'Giriş Yap'}
          </button>
        </form>
      </div>
    </div>
  )
}
