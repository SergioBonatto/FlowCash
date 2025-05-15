import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { I18n } from '../localization/i18n';
import {
  CurrencyCode,
  LanguageCode,
  UserPreferences,
  PreferencesContextProps,
  PreferencesProviderProps
} from '../types/ContextTypes';

// Default values
const DEFAULT_PREFERENCES: UserPreferences = {
  currency: 'USD',
  language: 'en'
};

// AsyncStorage keys
const STORAGE_KEY_PREFERENCES = 'flowcash:preferences';

const PreferencesContext = createContext<PreferencesContextProps | undefined>(undefined);

export const PreferencesProvider: React.FC<PreferencesProviderProps> = ({ children }) => {
  const [preferences, setPreferences] = useState<UserPreferences>(DEFAULT_PREFERENCES);
  const [i18n, setI18n] = useState<I18n>(new I18n(DEFAULT_PREFERENCES.language));
  const [isLoading, setIsLoading] = useState(true);


  // Load preferences on startup
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
        console.error('Error loading preferences:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPreferences();
  }, []);

  // Save preferences when changed
  useEffect(() => {
    if (!isLoading) {
      AsyncStorage.setItem(STORAGE_KEY_PREFERENCES, JSON.stringify(preferences));
    }
  }, [preferences, isLoading]);

  // Update currency
  const setCurrency = (currency: CurrencyCode) => {
    setPreferences(prev => ({ ...prev, currency }));
  };

  // Update language
  const setLanguage = (language: LanguageCode) => {
    setPreferences(prev => ({ ...prev, language }));
    setI18n(new I18n(language));
  };

  // Translate text
  const translate = (key: string, params?: Record<string, string>) => {
    return i18n.t(key, params);
  };


  return (
    <PreferencesContext.Provider value={{ preferences, setCurrency, setLanguage, i18n }}>
      {children}
    </PreferencesContext.Provider>
  );
};

export const usePreferences = (): PreferencesContextProps => {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error('usePreferences must be used within a PreferencesProvider');
  }
  return context;
};

export { CurrencyCode, LanguageCode };
