import * as DocumentPicker from 'expo-document-picker';
import { Alert } from 'react-native';
import { translations } from '../localization/translations';
import { LanguageCode } from '../context/PreferencesContext';
import { pipe, tap } from '../utils/functional';
import { Result, success, failure, ErrorCode } from '../types/Result';
import { Transaction } from '../types/Transaction'

type ImportMode = 'replace' | 'merge' | 'cancel';
type ImportResult = { transactions: Transaction[] | null; mode: ImportMode };

// Pure function to validate imported transactions
const validateTransactions = (data: any): Result<Transaction[]> => {
  if (!Array.isArray(data)) {
    return failure({
      code: ErrorCode.VALIDATION,
      msg: 'The imported data is not in the correct format',
      source: 'validateTransactions'
    });
  }

  // Validate each transaction in the array
  const invalidTransactions = data.filter(item => {
    return !item.id || !item.title || typeof item.amount !== 'number' ||
           !['income', 'expense'].includes(item.type);
  });

  if (invalidTransactions.length > 0) {
    return failure({
      code: ErrorCode.VALIDATION,
      msg: `${invalidTransactions.length} invalid transactions found`,
      source: 'validateTransactions',
      data: { invalidItems: invalidTransactions.length }
    });
  }

  return success(data as Transaction[]);
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
    const errorResponse = failure({
      code: ErrorCode.BAD_FORMAT,
      msg: 'Unable to import data',
      source: 'importComponent',
      data: { originalError: (error instanceof Error ? error.message : 'Unknown error') },
      timestamp: Date.now()
    });
  }

  // Ensure a default return value in case of unexpected errors
  return { transactions: null, mode: 'cancel' };
};
