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
import { I18n } from '../localization/i18n';


type SupportedCurrencyCode = CurrencyCode | 'JPY' | 'CNY' | 'CAD' | 'AUD' | 'CHF' | 'MXN';

const AVAILABLE_CURRENCIES = [
  { code: 'USD', name: 'US Dollar' },
  { code: 'EUR', name: 'Euro' },
  { code: 'BRL', name: 'Brazilian Real' },
  { code: 'GBP', name: 'British Pound' },
  { code: 'JPY', name: 'Japanese Yen' },
  { code: 'CNY', name: 'Chinese Yuan' },
  { code: 'CAD', name: 'Canadian Dollar' },
  { code: 'AUD', name: 'Australian Dollar' },
  { code: 'CHF', name: 'Swiss Franc' },
  { code: 'MXN', name: 'Mexican Peso' },
];

const ExchangeRateScreen = () => {
  const { preferences, i18n } = usePreferences();
  const [toCurrency, setToCurrency] = useState<SupportedCurrencyCode>(preferences.currency);
  const [fromCurrency, setFromCurrency] = useState<SupportedCurrencyCode>(toCurrency === 'BRL' ? 'USD' : 'BRL');
  const [amount, setAmount] = useState('1');
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const handleAmountChange = (text: string) => {
    const sanitized = text.replace(/[^0-9.]/g, '');
    const decimalCount = (sanitized.match(/\./g) || []).length;
    if (decimalCount > 1) return;
    setAmount(sanitized);
  };

  const getExchangeRate = async () => {
    if (fromCurrency === toCurrency) {
      setExchangeRate(1);
      setLastUpdated(new Date());
      return;
    }

    setLoading(true);

    const result = await fetchExchangeRates(fromCurrency, toCurrency, i18n);


    if (result.success) {
      setExchangeRate(result.data);
      setLastUpdated(new Date());
    } else {
      Alert.alert(
        i18n.t('exchange.error.title'),
        result.error.msg
      );
      setExchangeRate(null);
    }

    setLoading(false);
  };

  useEffect(() => {
    getExchangeRate();
  }, [fromCurrency, toCurrency]);

  const convertedAmount = exchangeRate !== null && amount
    ? (parseFloat(amount || '0') * exchangeRate).toFixed(2)
    : '0.00';

  return (
    <ScreenBackground>
      <ScrollView style={styles.container}>
      <Text style={styles.title}>{i18n.t('exchange.title')}</Text>

        <BlurView intensity={theme.blur.medium} tint="light" style={styles.card}>
        <Text style={styles.sectionTitle}>{i18n.t('exchange.amount')}</Text>
        <TextInput
            style={styles.amountInput}
            value={amount}
            onChangeText={handleAmountChange}
            keyboardType="numeric"
            placeholder="0.00"
            placeholderTextColor={theme.colors.grey}
          />
        </BlurView>

        <BlurView intensity={theme.blur.medium} tint="light" style={styles.card}>
        <Text style={styles.sectionTitle}>{i18n.t('exchange.from')}</Text>

          <CurrencySelector
            currencies={AVAILABLE_CURRENCIES}
            selectedCurrency={fromCurrency}
            onSelect={(currency: string) => setFromCurrency(currency as SupportedCurrencyCode)}
          />

          <TouchableOpacity
            style={styles.swapButton}
            onPress={swapCurrencies}
          >
            <Ionicons name="swap-vertical" size={24} color={theme.colors.primary} />
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>{i18n.t('exchange.to')}</Text>

          <CurrencySelector
            currencies={AVAILABLE_CURRENCIES}
            selectedCurrency={toCurrency}
            onSelect={(currency: string) => setToCurrency(currency as SupportedCurrencyCode)}
          />
        </BlurView>

        <BlurView intensity={theme.blur.medium} tint="light" style={styles.card}>
        <Text style={styles.sectionTitle}>{i18n.t('exchange.result')}</Text>

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
                  {i18n.t('exchange.lastUpdated')}:
                  {lastUpdated.toLocaleTimeString()}
                </Text>
              )}
            </>
          )}
        </BlurView>

        <BlurView intensity={theme.blur.medium} tint="light" style={styles.card}>
          <Text style={styles.sectionTitle}>{i18n.t('exchange.about')}</Text>
        <Text style={styles.infoText}>
          {i18n.t('exchange.info')}
        </Text>
        </BlurView>
      </ScrollView>
    </ScreenBackground>
  );
};

export default ExchangeRateScreen;
