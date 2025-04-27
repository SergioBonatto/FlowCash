import { LanguageCode } from '../context/PreferencesContext';
import { translations } from './translations';
import { pipe } from '../utils/functional';

// Pure function to retrieve a translation
const getTranslation = (language: LanguageCode, key: string): string =>
  translations[language][key] || translations.en[key] || key;

// Pure function to apply parameters to a string
const applyParams = (text: string, params?: Record<string, string>): string => {
  if (!params) return text;

  return Object.entries(params).reduce(
    (result, [key, value]) => result.replace(`{{${key}}}`, value),
    text
  );
};

// Composing functions to create the translation function
export const createTranslator = (language: LanguageCode) =>
  (key: string, params?: Record<string, string>): string =>
    pipe(
      key,
      (k: string) => getTranslation(language, k),
      (text: string) => applyParams(text, params)
    );

// I18n class refactored to be more functional
export class I18n {
  private translate: (key: string, params?: Record<string, string>) => string;

  constructor(language: LanguageCode) {
    this.translate = createTranslator(language);
  }

  t(key: string, params?: Record<string, string>): string {
    return this.translate(key, params);
  }
}
