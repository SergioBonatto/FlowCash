import React from 'react';
import { BlurView } from 'expo-blur';
import { View, StatusBar, SafeAreaView, ImageBackground } from 'react-native';
import { styles } from '../styles/HomeScreen.styles';
import { theme } from '../styles/theme';
import { useTransactions } from '../context/TransactionsContext';
import Header from '../components/Header';
import ActionButtons from '../components/ActionButtons';
import AddTransaction from '../components/AddTransaction';
import TransactionHistory from '../components/TransactionHistory';
import { Transaction } from '../types/Transaction';
import { usePreferences } from '../context/PreferencesContext';

const HomeScreen = () => {
  const { transactions, addTransaction, replaceAllTransactions, deleteTransaction } = useTransactions();
  const { translate } = usePreferences();


  const handleImportedTransactions = (importedTransactions: Transaction[]) => {
    importedTransactions.forEach(tx => addTransaction(tx));
  };

  const handleReplaceAllTransactions = (newTransactions: Transaction[]) => {
    replaceAllTransactions(newTransactions);
  };

  const handleAddTransaction = (transaction: Transaction) => {
    addTransaction(transaction);
  };

  // Header component with welcome message only for empty state
  const EmptyStateHeaderComponent = (
    <BlurView intensity={theme.blur.medium} tint="light" style={styles.blurContainer}>
      <View style={styles.headerContent}>
        <Header />
        <AddTransaction onAddTransaction={handleAddTransaction} />
      </View>
    </BlurView>
  );

  // Header component without welcome message when transactions exist
  const TransactionsHeaderComponent = (
    <BlurView intensity={theme.blur.medium} tint="light" style={styles.blurContainer}>
      <View style={styles.headerContent}>
        <AddTransaction onAddTransaction={handleAddTransaction} />
      </View>
    </BlurView>
  );

  const FooterComponent = (
    <BlurView intensity={theme.blur.light} tint="light" style={styles.blurContainer}>
      <View style={styles.footerContent}>
        <ActionButtons
          transactions={transactions}
          onImport={handleImportedTransactions}
          onReplaceAll={handleReplaceAllTransactions}
        />
      </View>
    </BlurView>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
      <ImageBackground
        source={require('../../assets/background.png')}
        style={styles.backgroundImage}
      >
        <View style={styles.container}>
          {transactions.length === 0 ? (
            <View style={styles.contentContainer}>
              {EmptyStateHeaderComponent}
              <BlurView intensity={theme.blur.light} tint="light" style={styles.emptyStateContainer}>
                <TransactionHistory transactions={[]} />
              </BlurView>
              {FooterComponent}
            </View>
          ) : (
            <TransactionHistory
            transactions={transactions}
            ListHeaderComponent={TransactionsHeaderComponent}
            ListFooterComponent={FooterComponent}
            onDeleteTransaction={deleteTransaction}
          />
          )}
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default HomeScreen;
