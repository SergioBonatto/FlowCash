import { LanguageCode } from '../context/PreferencesContext';
import { translations } from './translations';

export class I18n {
  private language: LanguageCode;

  constructor(language: LanguageCode) {
    this.language = language;
  }

  t(key: string, params?: Record<string, string>): string {
    const translation = translations[this.language][key] || translations.en[key] || key;

    if (!params) return translation;

    let result = translation;
    Object.entries(params).forEach(([key, value]) => {
      result = result.replace(`{{${key}}}`, value);
    });

    return result;
  }
}
