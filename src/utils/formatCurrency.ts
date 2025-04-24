import { CurrencyCode } from '../context/PreferencesContext';

const currencyLocales: Record<CurrencyCode, string> = {
  'USD': 'en-US',
  'BRL': 'pt-BR',
  'EUR': 'de-DE',
  'GBP': 'en-GB'
};

export const formatCurrency = (amount: number, currencyCode: CurrencyCode = 'USD') => {
  const locale = currencyLocales[currencyCode] || 'en-US';

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
  }).format(amount);
};
