'use client'

import { createContext, useContext, useSyncExternalStore } from 'react'

export type Language = 'en' | 'tr'

type LanguageContextValue = {
  language: Language
  setLanguage: (language: Language) => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

function getLanguage(): Language {
  const storedLanguage = window.localStorage.getItem('kagenoir-language')
  return storedLanguage === 'tr' ? 'tr' : 'en'
}

function getServerLanguage(): Language {
  return 'en'
}

function subscribeToLanguage(callback: () => void) {
  const handleStorage = (event: StorageEvent) => {
    if (event.key === 'kagenoir-language') callback()
  }
  window.addEventListener('storage', handleStorage)
  return () => window.removeEventListener('storage', handleStorage)
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const language = useSyncExternalStore(subscribeToLanguage, getLanguage, getServerLanguage)

  const setLanguage = (nextLanguage: Language) => {
    window.localStorage.setItem('kagenoir-language', nextLanguage)
    window.dispatchEvent(new StorageEvent('storage', { key: 'kagenoir-language' }))
  }

  return <LanguageContext.Provider value={{ language, setLanguage }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used inside LanguageProvider')
  return context
}
