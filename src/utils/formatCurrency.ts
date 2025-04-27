import { CurrencyCode } from '../context/PreferencesContext';

const currencyLocales: Record<CurrencyCode, string> = {
  'USD': 'en-US',
  'BRL': 'pt-BR',
  'EUR': 'de-DE',
  'GBP': 'en-GB'
};

// Pure function that receives all necessary parameters
export const formatCurrency = (amount: number, currencyCode: CurrencyCode = 'USD'): string => {
  const locale = currencyLocales[currencyCode] || 'en-US';

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
  }).format(amount);
};

// Higher-order function to create specific formatters
export const createCurrencyFormatter = (currencyCode: CurrencyCode) =>
  (amount: number): string => formatCurrency(amount, currencyCode);
