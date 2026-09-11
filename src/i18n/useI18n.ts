import { createContext, useContext } from 'react'
import type { Language, MessageKey } from './messages'

export interface I18nValue {
  lang: Language
  setLang: (lang: Language) => void
  t: (key: MessageKey, params?: Record<string, string | number>) => string
}

export const I18nContext = createContext<I18nValue | null>(null)

export function useI18n(): I18nValue {
  const context = useContext(I18nContext)
  if (!context) throw new Error('useI18n must be used within I18nProvider')
  return context
}
