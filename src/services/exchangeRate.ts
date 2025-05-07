import { Result, success, failure, ErrorCode } from '../types/Result';

// API gratuita para taxas de câmbio (usaremos a API pública do ExchangeRate-API)
const API_URL = 'https://open.er-api.com/v6/latest';

export type ExchangeRateResponse = {
  rates: Record<string, number>;
  base: string;
  time_last_updated: number;
};

export const fetchExchangeRates = async (
  fromCurrency: string,
  toCurrency: string
): Promise<number> => {
  try {
    // Buscar as taxas a partir da moeda base
    const response = await fetch(`${API_URL}/${fromCurrency}`);

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`);
    }

    const data = await response.json() as ExchangeRateResponse;

    // Verificar se a moeda de destino existe nas taxas
    if (!data.rates[toCurrency]) {
      throw new Error(`Taxa não encontrada para ${toCurrency}`);
    }

    // Retornar a taxa de câmbio
    return data.rates[toCurrency];
  } catch (error) {
    console.error('Erro ao buscar taxas de câmbio:', error);
    throw error;
  }
};

// Função para converter valores
export const convertCurrency = (
  amount: number,
  rate: number
): number => {
  return amount * rate;
};
