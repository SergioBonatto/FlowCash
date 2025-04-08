import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { useEffect } from 'react';
import {styles} from '../styles/HomeScreen.styles';
import { useTransactions } from '../context/TransactionsContext';
import { exportTransactions } from '../services/export';
import { importTransactions } from '../services/import';
import { saveTransactions } from '../services/storage';

const HomeScreen = () => {
  const { transactions, addTransaction } = useTransactions();

  useEffect(() => {
    saveTransactions(transactions);
  }, [transactions]);

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

    imported.forEach(tx => addTransaction(tx));
    Alert.alert('Success', `${imported.length} transactions imported.`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to FlowCash</Text>
      <Text style={styles.subtitle}>Manage your home finances easily.</Text>

      <View style={styles.buttons}>
        <Button title="Export data" onPress={handleExport} />
        <View style={{ height: 12 }} />
        <Button title="Import data" onPress={handleImport} />
      </View>
    </View>
  );
};

export default HomeScreen;
