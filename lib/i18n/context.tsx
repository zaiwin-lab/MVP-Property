'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { translations, type Locale } from './translations'

interface LangContextType {
  locale: Locale
  setLocale: (l: Locale) => void
  t: (typeof translations)['en']
}

const LangContext = createContext<LangContextType>({
  locale: 'en',
  setLocale: () => {},
  t: translations['en'],
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en')

  useEffect(() => {
    const saved = localStorage.getItem('kb-locale') as Locale | null
    if (saved && saved in translations) setLocaleState(saved)
  }, [])

  const setLocale = (l: Locale) => {
    setLocaleState(l)
    localStorage.setItem('kb-locale', l)
  }

  return (
    <LangContext.Provider value={{ locale, setLocale, t: translations[locale] as (typeof translations)['en'] }}>
      {children}
    </LangContext.Provider>
  )
}

export function useT() {
  return useContext(LangContext)
}
