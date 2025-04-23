import { View, Text, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import { exportTransactions } from '../services/export';
import { importTransactions } from '../services/import';
import { Transaction } from '../types/Transaction';
import { theme } from '../styles/theme';

interface ActionButtonsProps {
  transactions: Transaction[];
  onImport: (transactions: Transaction[]) => void;
  onReplaceAll: (transactions: Transaction[]) => void;
}

const ActionButtons = ({ transactions, onImport, onReplaceAll }: ActionButtonsProps) => {
  const handleExport = async () => {
    if (transactions.length === 0) {
      Alert.alert('Nothing to export', 'You don\'t have any saved transactions.');
      return;
    }

    await exportTransactions(transactions);
  };

  const handleImport = async () => {
    const result = await importTransactions(transactions);

    if (!result.transactions) {
      if (result.mode === 'cancel') {
        // Usuário cancelou ou ocorreu um erro
        return;
      }
      Alert.alert('Import failed', 'Could not read the file or the file is invalid.');
      return;
    }

    if (result.mode === 'replace') {
      onReplaceAll(result.transactions);
      Alert.alert('Success', `${result.transactions.length} transactions imported. Previous data was replaced.`);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, styles.exportButton]}
        onPress={handleExport}
      >
        <Text style={styles.buttonText}>Export data</Text>
      </TouchableOpacity>

      <View style={{ height: theme.spacing.md }} />

      <TouchableOpacity
        style={[styles.button, styles.importButton]}
        onPress={handleImport}
      >
        <Text style={styles.buttonText}>Import data</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: theme.spacing.md,
  },
  button: {
    borderRadius: theme.radius.sm,
    padding: theme.spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    shadowColor: theme.colors.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 2,
  },
  exportButton: {
    backgroundColor: theme.colors.primary,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  importButton: {
    backgroundColor: theme.colors.secondary,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  buttonText: {
    color: 'white',
    fontWeight: theme.fontWeight.medium,
    fontSize: theme.fontSize.body,
  },
});

export default ActionButtons;
