import React from 'react';
import { View } from 'react-native';
import { styles } from '../styles/HomeScreen.styles';
import { useTransactions } from '../context/TransactionsContext';
import Header from '../components/Header';
import ActionButtons from '../components/ActionButtons';
import AddTransaction from '../components/AddTransaction';
import TransactionHistory from '../components/TransactionHistory';
import { Transaction } from '../types/Transaction';

const HomeScreen = () => {
  const { transactions, addTransaction, replaceAllTransactions } = useTransactions();

  const handleImportedTransactions = (importedTransactions: Transaction[]) => {
    importedTransactions.forEach(tx => addTransaction(tx));
  };

  const handleReplaceAllTransactions = (newTransactions: Transaction[]) => {
    replaceAllTransactions(newTransactions);
  };

  const handleAddTransaction = (transaction: Transaction) => {
    addTransaction(transaction);
  };

  // Header component, already rendered (not a function that returns a component anymore)
  const HeaderComponent = (
    <View>
      <Header
        title="Welcome to FlowCash"
        subtitle="Manage your home finances easily."
      />

      <AddTransaction onAddTransaction={handleAddTransaction} />
    </View>
  );

  // Footer component, already rendered
  const FooterComponent = (
    <ActionButtons
      transactions={transactions}
      onImport={handleImportedTransactions}
      onReplaceAll={handleReplaceAllTransactions}
    />
  );

  return (
    <View style={styles.container}>
      {transactions.length === 0 ? (
        <View>
          {HeaderComponent}
          <TransactionHistory transactions={[]} />
          {FooterComponent}
        </View>
      ) : (
        <TransactionHistory
          transactions={transactions}
          ListHeaderComponent={HeaderComponent}
          ListFooterComponent={FooterComponent}
        />
      )}
    </View>
  );
};

export default HomeScreen;
