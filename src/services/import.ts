import * as DocumentPicker from 'expo-document-picker';
import { Transaction } from '../types/Transaction';
import { Alert } from 'react-native';
import { translations } from '../localization/translations';
import { LanguageCode } from '../context/PreferencesContext';
import { Result } from '../types/Result';
import { pipe, tap } from '../utils/functional';

type ImportMode = 'replace' | 'merge' | 'cancel';
type ImportResult = { transactions: Transaction[] | null; mode: ImportMode };

// Função pura para validar transações importadas
const validateTransactions = (data: any): Result<Transaction[]> => {
  if (!Array.isArray(data)) {
    return { success: false, data: { code: 400, msg: 'Not an array' } };
  }

  // Validação mais profunda pode ser implementada aqui
  return { success: true, data: data as Transaction[] };
};

// Função pura para obter texto de tradução
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

    // Ler o arquivo e validar o conteúdo
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

    // Se não houver transações existentes, simplesmente retorne as importadas
    if (currentTransactions.length === 0) {
      return { transactions: importedTransactions, mode: 'replace' };
    }

    // Retornar uma Promise para o diálogo de confirmação
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
    console.error('Erro ao importar transações:', error);
    return { transactions: null, mode: 'cancel' };
  }
};
