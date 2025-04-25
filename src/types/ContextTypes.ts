import { ReactNode } from 'react';

export type CurrencyCode = 'USD' | 'BRL' | 'EUR' | 'GBP';
export type LanguageCode = 'en' | 'pt-BR' | 'pt-PT' | 'es' | 'fr' | 'de' | 'it' | 'ja' | 'zh-CN' | 'ru';

export interface UserPreferences {
  currency: CurrencyCode;
  language: LanguageCode;
}

export interface PreferencesContextProps {
  preferences: UserPreferences;
  setCurrency: (currency: CurrencyCode) => void;
  setLanguage: (language: LanguageCode) => void;
  translate: (key: string, params?: Record<string, string>) => string;
}

export interface PreferencesProviderProps {
  children: ReactNode;
}
