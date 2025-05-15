import { View, Text, Alert, TouchableOpacity } from 'react-native';
import { exportTransactions } from '../services/export';
import { importTransactions } from '../services/import';
import { theme } from '../styles/theme';
import { styles } from '../styles/ActionButtons.styles';
import { usePreferences } from '../context/PreferencesContext';
import { ActionButtonsProps } from '../types/ComponentsTypes';


const ActionButtons = ({ transactions, onImport, onReplaceAll }: ActionButtonsProps) => {
  const { i18n, preferences } = usePreferences();

  const handleExport = async () => {
    if (transactions.length === 0) {
      Alert.alert(i18n.t('export.empty'));
      return;
    }

    await exportTransactions(transactions);
  };

  const handleImport = async () => {
    const result = await importTransactions(transactions, preferences.language);

    if (!result.transactions) {
      if (result.mode === 'cancel') {
        return;
      }
      Alert.alert(i18n.t('dialog.title'), i18n.t('import.fail'));
      return;
    }

    if (result.mode === 'replace') {
      onReplaceAll(result.transactions);
      Alert.alert(
        i18n.t('dialog.title'),
        i18n.t('import.success', { count: result.transactions.length.toString() })
      );
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, styles.exportButton]}
        onPress={handleExport}
      >
        <Text style={styles.buttonText}>{i18n.t('action.export')}</Text>
      </TouchableOpacity>

      <View style={{ height: theme.spacing.md }} />

      <TouchableOpacity
        style={[styles.button, styles.importButton]}
        onPress={handleImport}
      >
        <Text style={styles.buttonText}>{i18n.t('action.import')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ActionButtons;
