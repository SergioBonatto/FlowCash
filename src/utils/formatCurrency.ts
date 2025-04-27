import { CurrencyCode } from '../context/PreferencesContext';

const currencyLocales: Record<CurrencyCode, string> = {
  'USD': 'en-US',
  'BRL': 'pt-BR',
  'EUR': 'de-DE',
  'GBP': 'en-GB'
};

// Função pura que recebe todos os parâmetros necessários
export const formatCurrency = (amount: number, currencyCode: CurrencyCode = 'USD'): string => {
  const locale = currencyLocales[currencyCode] || 'en-US';

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
  }).format(amount);
};

// Função de ordem superior para criar formatadores específicos
export const createCurrencyFormatter = (currencyCode: CurrencyCode) =>
  (amount: number): string => formatCurrency(amount, currencyCode);
