import * as DocumentPicker from 'expo-document-picker';
import { Transaction } from '../types/Transaction';
import { Alert } from 'react-native';
import { translations } from '../localization/translations';
import { LanguageCode } from '../context/PreferencesContext';

export const importTransactions = async (
  currentTransactions: Transaction[] = [],
  language: LanguageCode = 'en'
): Promise<{ transactions: Transaction[] | null; mode: 'replace' | 'merge' | 'cancel' }> => {
  try {
    const result = await DocumentPicker.getDocumentAsync({ type: 'application/json' });

    if (result.canceled || !result.assets?.length)
      return { transactions: null, mode: 'cancel' };

    const fileUri = result.assets[0].uri;
    const response = await fetch(fileUri);
    const json = await response.json();

    if (!Array.isArray(json))
      return { transactions: null, mode: 'cancel' };

    const importedTransactions = json as Transaction[];

    // If there are no current transactions, we don't need to ask
    if (currentTransactions.length === 0) {
      return { transactions: importedTransactions, mode: 'replace' };
    }

    const t = (key: string) => translations[language][key] || translations['en'][key];

    // Return a Promise that will be resolved when the user makes a choice
    return new Promise((resolve) => {
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
