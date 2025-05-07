import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Alert, TextInput } from 'react-native';
import { BlurView } from 'expo-blur';
import { usePreferences, CurrencyCode } from '../context/PreferencesContext';
import { theme } from '../styles/theme';
import { styles } from '../styles/ExchangeRateScreen.styles';
import { Ionicons } from '@expo/vector-icons';
import ScreenBackground from '../components/ScreenBackground';
import { fetchExchangeRates } from '../services/exchangeRate';
import CurrencySelector from '../components/CurrencySelector';

// Definir um tipo para todos os códigos de moeda suportados
type SupportedCurrencyCode = CurrencyCode | 'JPY' | 'CNY' | 'CAD' | 'AUD' | 'CHF' | 'MXN';

const AVAILABLE_CURRENCIES = [
  { code: 'USD', name: 'Dólar Americano' },
  { code: 'EUR', name: 'Euro' },
  { code: 'BRL', name: 'Real Brasileiro' },
  { code: 'GBP', name: 'Libra Esterlina' },
  { code: 'JPY', name: 'Iene Japonês' },
  { code: 'CNY', name: 'Yuan Chinês' },
  { code: 'CAD', name: 'Dólar Canadense' },
  { code: 'AUD', name: 'Dólar Australiano' },
  { code: 'CHF', name: 'Franco Suíço' },
  { code: 'MXN', name: 'Peso Mexicano' },
];

const ExchangeRateScreen = () => {
  const { preferences, translate } = usePreferences();
  const [fromCurrency, setFromCurrency] = useState<SupportedCurrencyCode>(preferences.currency);
  const [toCurrency, setToCurrency] = useState<SupportedCurrencyCode>(
    fromCurrency === 'USD' ? 'BRL' : 'USD'
  );
  const [amount, setAmount] = useState('1');
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Trocar as moedas de posição
  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  // Função para validar e formatar entrada numérica
  const handleAmountChange = (text: string) => {
    // Permitir apenas números e um ponto decimal
    const sanitized = text.replace(/[^0-9.]/g, '');
    // Verificar que não existam múltiplos pontos decimais
    const decimalCount = (sanitized.match(/\./g) || []).length;
    if (decimalCount > 1) return;

    setAmount(sanitized);
  };

  // Buscar taxas de câmbio
  const getExchangeRate = async () => {
    if (fromCurrency === toCurrency) {
      setExchangeRate(1);
      setLastUpdated(new Date());
      return;
    }

    setLoading(true);

    try {
      const rate = await fetchExchangeRates(fromCurrency, toCurrency);
      setExchangeRate(rate);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Erro ao buscar taxas de câmbio:', error);
      Alert.alert(
        translate('exchange.error.title'),
        translate('exchange.error.message')
      );
      setExchangeRate(null);
    } finally {
      setLoading(false);
    }
  };

  // Buscar taxa de câmbio quando as moedas mudarem
  useEffect(() => {
    getExchangeRate();
  }, [fromCurrency, toCurrency]);

  // Calcular o valor convertido
  const convertedAmount = exchangeRate !== null && amount
    ? (parseFloat(amount || '0') * exchangeRate).toFixed(2)
    : '0.00';

  return (
    <ScreenBackground>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>{translate('exchange.title')}</Text>

        {/* Campo para digitar o valor */}
        <BlurView intensity={theme.blur.medium} tint="light" style={styles.card}>
          <Text style={styles.sectionTitle}>{translate('exchange.amount')}</Text>
          <TextInput
            style={styles.amountInput}
            value={amount}
            onChangeText={handleAmountChange}
            keyboardType="numeric"
            placeholder="0.00"
            placeholderTextColor={theme.colors.grey}
          />
        </BlurView>

        {/* Seletor de moedas */}
        <BlurView intensity={theme.blur.medium} tint="light" style={styles.card}>
          <Text style={styles.sectionTitle}>{translate('exchange.from')}</Text>

          <CurrencySelector
            currencies={AVAILABLE_CURRENCIES}
            selectedCurrency={fromCurrency}
            onSelect={(currency: string) => setFromCurrency(currency as SupportedCurrencyCode)}
          />

          {/* Botão de inverter moedas */}
          <TouchableOpacity
            style={styles.swapButton}
            onPress={swapCurrencies}
          >
            <Ionicons name="swap-vertical" size={24} color={theme.colors.primary} />
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>{translate('exchange.to')}</Text>

          <CurrencySelector
            currencies={AVAILABLE_CURRENCIES}
            selectedCurrency={toCurrency}
            onSelect={(currency: string) => setToCurrency(currency as SupportedCurrencyCode)}
          />
        </BlurView>

        {/* Resultados da conversão */}
        <BlurView intensity={theme.blur.medium} tint="light" style={styles.card}>
          <Text style={styles.sectionTitle}>{translate('exchange.result')}</Text>

          {loading ? (
            <ActivityIndicator size="large" color={theme.colors.primary} />
          ) : (
            <>
              <View style={styles.rateContainer}>
                <Text style={styles.rateValue}>
                  1 {fromCurrency} = {exchangeRate?.toFixed(4)} {toCurrency}
                </Text>
              </View>

              <View style={styles.conversionResultContainer}>
                <Text style={styles.conversionResultValue}>
                  {convertedAmount} {toCurrency}
                </Text>
              </View>

              {lastUpdated && (
                <Text style={styles.updatedText}>
                  {translate('exchange.lastUpdated')}: {lastUpdated.toLocaleTimeString()}
                </Text>
              )}
            </>
          )}
        </BlurView>

        {/* Informações sobre taxas */}
        <BlurView intensity={theme.blur.medium} tint="light" style={styles.card}>
          <Text style={styles.sectionTitle}>{translate('exchange.about')}</Text>
          <Text style={styles.infoText}>
            {translate('exchange.info')}
          </Text>
        </BlurView>
      </ScrollView>
    </ScreenBackground>
  );
};

export default ExchangeRateScreen;
