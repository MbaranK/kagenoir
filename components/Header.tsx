import Link from 'next/link'
import { getSession } from '@/lib/session'
import { logout } from '@/app/actions/auth'
import { LogIn, LogOut, PlusCircle, LayoutDashboard } from 'lucide-react'

export default async function Header() {
  const isAdmin = await getSession()

  return (
    <header className="bg-white border-b border-stone-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex flex-col leading-none hover:opacity-75 transition-opacity min-w-0">
          <span className="font-[var(--font-playfair)] text-lg font-bold text-stone-800 tracking-wide truncate">
            Cansın Antik
          </span>
          <span className="text-[9px] tracking-widest text-amber-600 uppercase font-medium">
            Antika & Koleksiyon
          </span>
        </Link>

        <nav className="flex items-center gap-2 flex-shrink-0 ml-3">
          {isAdmin ? (
            <>
              <Link
                href="/admin"
                className="flex items-center gap-1.5 text-sm text-stone-500 hover:text-stone-800 transition-colors p-2"
              >
                <LayoutDashboard className="w-5 h-5" />
              </Link>
              <Link
                href="/admin/yeni"
                className="flex items-center gap-1.5 bg-amber-600 hover:bg-amber-700 text-white text-sm px-3 py-2 rounded-lg transition-colors"
              >
                <PlusCircle className="w-4 h-4" />
                <span className="hidden sm:inline">İlan Ekle</span>
              </Link>
              <form action={logout}>
                <button
                  type="submit"
                  className="flex items-center p-2 text-stone-400 hover:text-red-500 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </form>
            </>
          ) : (
            <Link
              href="/giris"
              className="flex items-center gap-1.5 text-sm text-stone-400 hover:text-stone-700 transition-colors p-2"
            >
              <LogIn className="w-5 h-5" />
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}
