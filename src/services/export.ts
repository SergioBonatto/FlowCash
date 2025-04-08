import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { Transaction } from '../types/Transaction';

export const exportTransactions = async (transactions: Transaction[]) => {
  const json = JSON.stringify(transactions, null, 2);
  const fileUri = FileSystem.documentDirectory + 'flowcash-export.json';

  try {
    await FileSystem.writeAsStringAsync(fileUri, json, { encoding: FileSystem.EncodingType.UTF8 });
    await Sharing.shareAsync(fileUri);
  } catch (error) {
    console.error('Error exporting transactions:', error);
  }
};
