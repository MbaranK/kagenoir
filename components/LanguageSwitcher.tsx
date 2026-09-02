'use client'

import { useLanguage } from '@/components/LanguageProvider'

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="language-switcher" aria-label="Language selector">
      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={language === 'en' ? 'language-option language-option-active' : 'language-option'}
        aria-pressed={language === 'en'}
      >
        EN
      </button>
      <span className="language-divider">/</span>
      <button
        type="button"
        onClick={() => setLanguage('tr')}
        className={language === 'tr' ? 'language-option language-option-active' : 'language-option'}
        aria-pressed={language === 'tr'}
      >
        TR
      </button>
    </div>
  )
}
