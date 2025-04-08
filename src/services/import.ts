import * as DocumentPicker from 'expo-document-picker';
import { Transaction } from '../types/Transaction';

export const importTransactions = async (): Promise<Transaction[] | null> => {
  try {
    const result = await DocumentPicker.getDocumentAsync({ type: 'application/json' });

    if (result.canceled || !result.assets?.length) return null;

    const fileUri = result.assets[0].uri;
    const response = await fetch(fileUri);
    const json = await response.json();

    return Array.isArray(json) ? (json as Transaction[]) : null;
  } catch (error) {
    console.error('Error importing transactions:', error);
    return null;
  }
};
