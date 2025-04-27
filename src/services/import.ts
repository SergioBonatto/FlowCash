import * as DocumentPicker from 'expo-document-picker';
import { Transaction } from '../types/Transaction';
import { Alert } from 'react-native';
import { translations } from '../localization/translations';
import { LanguageCode } from '../context/PreferencesContext';
import { Result } from '../types/Result';
import { pipe, tap } from '../utils/functional';

type ImportMode = 'replace' | 'merge' | 'cancel';
type ImportResult = { transactions: Transaction[] | null; mode: ImportMode };

// Pure function to validate imported transactions
const validateTransactions = (data: any): Result<Transaction[]> => {
  if (!Array.isArray(data)) {
    return { success: false, data: { code: 400, msg: 'Not an array' } };
  }

  // Deeper validation can be implemented here
  return { success: true, data: data as Transaction[] };
};

// Pure function to get translation text
const getTranslation = (key: string, language: LanguageCode): string =>
  translations[language][key] || translations['en'][key];

export const importTransactions = async (
  currentTransactions: Transaction[] = [],
  language: LanguageCode = 'en'
): Promise<ImportResult> => {
  try {
    const result = await DocumentPicker.getDocumentAsync({ type: 'application/json' });

    if (result.canceled || !result.assets?.length)
      return { transactions: null, mode: 'cancel' };

    const fileUri = result.assets[0].uri;

    // Read the file and validate its contents
    const fetchData = async (uri: string) => {
      const response = await fetch(uri);
      return await response.json();
    };

    const data = await fetchData(fileUri);
    const importResult = validateTransactions(data);

    if (!importResult.success) {
      return { transactions: null, mode: 'cancel' };
    }

    const importedTransactions = importResult.data;

    // If there are no existing transactions, simply return the imported ones
    if (currentTransactions.length === 0) {
      return { transactions: importedTransactions, mode: 'replace' };
    }

    // Return a Promise for the confirmation dialog
    return new Promise((resolve) => {
      const t = (key: string) => getTranslation(key, language);

      Alert.alert(
        t('dialog.title'),
        t('dialog.message'),
        [
          {
            text: t('dialog.cancel'),
            style: 'cancel',
            onPress: () => resolve({ transactions: null, mode: 'cancel' })
          },
          {
            text: t('dialog.replace'),
            style: 'destructive',
            onPress: () => resolve({ transactions: importedTransactions, mode: 'replace' })
          }
        ],
        { cancelable: false }
      );
    });
  } catch (error) {
    console.error('Error importing transactions:', error);
    return { transactions: null, mode: 'cancel' };
  }
};
