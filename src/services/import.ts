import * as DocumentPicker from 'expo-document-picker';
import { Transaction } from '../types/Transaction';
import { Alert } from 'react-native';

export const importTransactions = async (
  currentTransactions: Transaction[] = []
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

    // Se não há transações atuais, não precisamos perguntar
    if (currentTransactions.length === 0) {
      return { transactions: importedTransactions, mode: 'replace' };
    }

    // Retornar uma Promise que será resolvida quando o usuário fizer uma escolha
    return new Promise((resolve) => {
      Alert.alert(
        'Importar Transações',
        'Esta ação substituirá todas as suas transações atuais pelos dados importados. Esta ação é irreversível.',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
            onPress: () => resolve({ transactions: null, mode: 'cancel' })
          },
          {
            text: 'Substituir',
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
