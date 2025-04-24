import { View, Text, Alert, TouchableOpacity } from 'react-native';
import { exportTransactions } from '../services/export';
import { importTransactions } from '../services/import';
import { Transaction } from '../types/Transaction';
import { theme } from '../styles/theme';
import { styles } from '../styles/ActionButtons.styles';
import { usePreferences } from '../context/PreferencesContext';

interface ActionButtonsProps {
  transactions: Transaction[];
  onImport: (transactions: Transaction[]) => void;
  onReplaceAll: (transactions: Transaction[]) => void;
}

const ActionButtons = ({ transactions, onImport, onReplaceAll }: ActionButtonsProps) => {
  const { translate } = usePreferences();

  const handleExport = async () => {
    if (transactions.length === 0) {
      Alert.alert(translate('export.empty'));
      return;
    }

    await exportTransactions(transactions);
  };

  const handleImport = async () => {
    const result = await importTransactions(transactions);

    if (!result.transactions) {
      if (result.mode === 'cancel') {
        return;
      }
      Alert.alert(translate('dialog.title'), translate('import.fail'));
      return;
    }

    if (result.mode === 'replace') {
      onReplaceAll(result.transactions);
      Alert.alert(
        translate('dialog.title'),
        translate('import.success', { count: result.transactions.length.toString() })
      );
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, styles.exportButton]}
        onPress={handleExport}
      >
        <Text style={styles.buttonText}>{translate('action.export')}</Text>
      </TouchableOpacity>

      <View style={{ height: theme.spacing.md }} />

      <TouchableOpacity
        style={[styles.button, styles.importButton]}
        onPress={handleImport}
      >
        <Text style={styles.buttonText}>{translate('action.import')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ActionButtons;
