import { LanguageCode } from '../context/PreferencesContext';
import { translations } from './translations';
import { pipe } from '../utils/functional';

// Função pura para buscar uma tradução
const getTranslation = (language: LanguageCode, key: string): string =>
  translations[language][key] || translations.en[key] || key;

// Função pura para aplicar parâmetros a uma string
const applyParams = (text: string, params?: Record<string, string>): string => {
  if (!params) return text;

  return Object.entries(params).reduce(
    (result, [key, value]) => result.replace(`{{${key}}}`, value),
    text
  );
};

// Compondo funções para criar a função de tradução
export const createTranslator = (language: LanguageCode) =>
  (key: string, params?: Record<string, string>): string =>
    pipe(
      key,
      (k: string) => getTranslation(language, k),
      (text: string) => applyParams(text, params)
    );

// Classe I18n refatorada para ser mais funcional
export class I18n {
  private translate: (key: string, params?: Record<string, string>) => string;

  constructor(language: LanguageCode) {
    this.translate = createTranslator(language);
  }

  t(key: string, params?: Record<string, string>): string {
    return this.translate(key, params);
  }
}
