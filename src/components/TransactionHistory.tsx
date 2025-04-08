import React from 'react';
import { View, Text, FlatList, ListRenderItem } from 'react-native';
import { Transaction } from '../types/Transaction';
import { styles } from '../styles/TransactionHistory.styles';
import { formatCurrency } from '../utils/formatCurrency';
import { format } from 'date-fns';

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
  // Ordenar transações do mais recente para o mais antigo
  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const renderItem: ListRenderItem<Transaction> = ({ item }) => {
    return (
      <View
        style={[
          styles.transactionItem,
          item.type === 'income' ? styles.incomeItem : styles.expenseItem,
        ]}
      >
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
      </View>
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

  // Componha o cabeçalho completo
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
      contentContainerStyle={transactions.length === 0 ? { flex: 1 } : null}
    />
  );
};

export default TransactionHistory;
