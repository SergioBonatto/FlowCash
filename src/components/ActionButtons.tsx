import { View, Button, Alert } from 'react-native';
import { styles } from '../styles/HomeScreen.styles';
import { exportTransactions } from '../services/export';
import { importTransactions } from '../services/import';
import { Transaction } from '../types/Transaction';

interface ActionButtonsProps {
  transactions: Transaction[];
  onImport: (transactions: Transaction[]) => void;
}

const ActionButtons = ({ transactions, onImport }: ActionButtonsProps) => {
  const handleExport = async () => {
    if (transactions.length === 0) {
      Alert.alert('Nothing to export', 'You have no transactions saved.');
      return;
    }

    await exportTransactions(transactions);
  };

  const handleImport = async () => {
    const imported = await importTransactions();

    if (!imported) {
      Alert.alert('Import failed', 'Could not read the file or file was invalid.');
      return;
    }

    onImport(imported);
    Alert.alert('Success', `${imported.length} transactions imported.`);
  };

  return (
    <View style={styles.buttons}>
      <Button title="Export data" onPress={handleExport} />
      <View style={{ height: 12 }} />
      <Button title="Import data" onPress={handleImport} />
    </View>
  );
};

export default ActionButtons;
