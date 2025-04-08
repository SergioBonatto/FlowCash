import AsyncStorage from '@react-native-async-storage/async-storage';
import { Transaction } from '../types/Transaction';

const STORAGE_KEY = 'flowcash:transactions';

export const saveTransactions = async (transactions: Transaction[]) => {
  try {
    const json = JSON.stringify(transactions);
    await AsyncStorage.setItem(STORAGE_KEY, json);
  } catch (error) {
    console.error('Error saving transactions:', error);
  }
};

export const loadTransactions = async (): Promise<Transaction[]> => {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    return json ? JSON.parse(json) : [];
  } catch (error) {
    console.error('Error loading transactions:', error);
    return [];
  }
};
