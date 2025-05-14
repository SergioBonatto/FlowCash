import { Result, success, failure, ErrorCode } from '../types/Result';
import { I18n } from '../localization/i18n';

// Free API for exchange rates (using ExchangeRate-API public API)
const API_URL = 'https://open.er-api.com/v6/latest';

export type ExchangeRateResponse = {
  rates: Record<string, number>;
  base: string;
  time_last_updated: number;
};

export const fetchExchangeRates = async (
  fromCurrency: string,
  toCurrency: string,
  i18n: I18n
): Promise<Result<number>> => {
  try {
    const response = await fetch(`${API_URL}/${fromCurrency}`);

    if (!response.ok) {
      return failure({
        code: ErrorCode.SERVER_ERROR,
        msg: i18n.t('exchange.error.message'),
        source: 'exchangeRate'
      });
    }

    const data = await response.json() as ExchangeRateResponse;

    if (!data.rates[toCurrency]) {
      return failure({
        code: ErrorCode.NOT_FOUND,
        msg: i18n.t('exchange.error.message'),
        source: 'exchangeRate'
      });
    }

    return success(data.rates[toCurrency]);
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    return failure({
      code: ErrorCode.NETWORK_ERROR,
      msg: i18n.t('exchange.error.message'),
      source: 'exchangeRate',
      timestamp: Date.now()
    });
  }
};

// Function to convert amounts
export const convertCurrency = (
  amount: number,
  rate: number
): number => {
  return amount * rate;
};
