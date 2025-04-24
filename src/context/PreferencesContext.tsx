import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { I18n } from '../localization/i18n';


// Tipos de moedas disponíveis
export type CurrencyCode = 'USD' | 'BRL' | 'EUR' | 'GBP';

// Tipos de idiomas disponíveis
export type LanguageCode = 'en' | 'pt-BR' | 'es' | 'fr';

// Estrutura das preferências do usuário
interface UserPreferences {
  currency: CurrencyCode;
  language: LanguageCode;
}

// Interface do contexto
interface PreferencesContextProps {
  preferences: UserPreferences;
  setCurrency: (currency: CurrencyCode) => void;
  setLanguage: (language: LanguageCode) => void;
  translate: (key: string, params?: Record<string, string>) => string;
}

// Valores padrão
const DEFAULT_PREFERENCES: UserPreferences = {
  currency: 'USD',
  language: 'en'
};

// Chaves do AsyncStorage
const STORAGE_KEY_PREFERENCES = 'flowcash:preferences';

const PreferencesContext = createContext<PreferencesContextProps | undefined>(undefined);

export const PreferencesProvider = ({ children }: { children: ReactNode }) => {
  const [preferences, setPreferences] = useState<UserPreferences>(DEFAULT_PREFERENCES);
  const [i18n, setI18n] = useState<I18n>(new I18n(DEFAULT_PREFERENCES.language));
  const [isLoading, setIsLoading] = useState(true);

  // Carregar preferências ao iniciar
  useEffect(() => {
    const loadPreferences = async () => {
      try {
        const savedPrefs = await AsyncStorage.getItem(STORAGE_KEY_PREFERENCES);
        if (savedPrefs) {
          const userPrefs = JSON.parse(savedPrefs) as UserPreferences;
          setPreferences(userPrefs);
          setI18n(new I18n(userPrefs.language));
        }
      } catch (error) {
        console.error('Erro ao carregar preferências:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPreferences();
  }, []);

  // Salvar preferências quando mudarem
  useEffect(() => {
    if (!isLoading) {
      AsyncStorage.setItem(STORAGE_KEY_PREFERENCES, JSON.stringify(preferences));
    }
  }, [preferences, isLoading]);

  // Atualizar a moeda
  const setCurrency = (currency: CurrencyCode) => {
    setPreferences(prev => ({ ...prev, currency }));
  };

  // Atualizar o idioma
  const setLanguage = (language: LanguageCode) => {
    setPreferences(prev => ({ ...prev, language }));
    setI18n(new I18n(language));
  };

  // Traduzir texto
  const translate = (key: string, params?: Record<string, string>) => {
    return i18n.t(key, params);
  };

  return (
    <PreferencesContext.Provider value={{ preferences, setCurrency, setLanguage, translate }}>
      {children}
    </PreferencesContext.Provider>
  );
};

// Hook para usar o contexto
export const usePreferences = () => {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error('usePreferences deve ser usado dentro de um PreferencesProvider');
  }
  return context;
};
