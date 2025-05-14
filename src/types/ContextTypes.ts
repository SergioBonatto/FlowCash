import { ReactNode } from 'react';
import { I18n } from '../localization/i18n';

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
  i18n: I18n;
}

export interface PreferencesProviderProps {
  children: ReactNode;
}
