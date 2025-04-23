import React from 'react';
import { View, Text, FlatList, ListRenderItem } from 'react-native';
import { BlurView } from 'expo-blur';
import { Transaction } from '../types/Transaction';
import { styles } from '../styles/TransactionHistory.styles';
import { formatCurrency } from '../utils/formatCurrency';
import { format } from 'date-fns';
import { theme } from '../styles/theme';

interface TransactionHistoryProps {
  transactions: Transaction[];
  ListHeaderComponent?: React.ComponentType<any> | React.ReactElement | null;
  ListFooterComponent?: React.ComponentType<any> | React.ReactElement | null;
}

const TransactionHistory = ({
  transactions,
  ListHeaderComponent,
  ListFooterComponent
}: TransactionHistoryProps) => {
  // Sort transactions from newest to oldest
  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const renderItem: ListRenderItem<Transaction> = ({ item }) => {
    return (
      <BlurView intensity={theme.blur.light} tint="light" style={[
        styles.transactionItem,
        item.type === 'income' ? styles.incomeItem : styles.expenseItem,
      ]}>
        <View style={styles.transactionInfo}>
          <Text style={styles.transactionTitle}>{item.title}</Text>
          <Text style={styles.transactionCategory}>{item.category}</Text>
          <Text style={styles.transactionDate}>
            {format(new Date(item.date), 'dd/MM/yyyy HH:mm')}
          </Text>
        </View>
        <Text
          style={[
            styles.transactionAmount,
            item.type === 'income' ? styles.incomeAmount : styles.expenseAmount,
          ]}
        >
          {item.type === 'expense' ? '-' : '+'}
          {formatCurrency(item.amount)}
        </Text>
      </BlurView>
    );
  };

  const EmptyListComponent = () => (
    <View style={styles.container}>
      <Text style={styles.title}>Transaction History</Text>
      <Text style={styles.noTransactions}>No transactions recorded yet</Text>
    </View>
  );

  const HeaderTitle = () => (
    <View style={styles.container}>
      <Text style={styles.title}>Transaction History</Text>
    </View>
  );

  // Compose the complete header
  const renderHeader = () => (
    <>
      {ListHeaderComponent && (
        React.isValidElement(ListHeaderComponent)
          ? ListHeaderComponent
          : React.createElement(ListHeaderComponent as React.ComponentType)
      )}
      <HeaderTitle />
    </>
  );

  return (
    <FlatList
      data={sortedTransactions}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={renderHeader}
      ListFooterComponent={ListFooterComponent}
      ListEmptyComponent={EmptyListComponent}
      contentContainerStyle={[
        transactions.length === 0 ? { flex: 1 } : null,
        styles.listContainer
      ]}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default TransactionHistory;
