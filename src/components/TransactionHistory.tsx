import React, { useRef } from 'react';
import { View, Text, FlatList, ListRenderItem, TouchableOpacity, Alert } from 'react-native';
import { BlurView } from 'expo-blur';
import { Transaction } from '../types/Transaction';
import { TransactionHistoryProps } from '../types/TransactionTypes';
import { styles } from '../styles/TransactionHistory.styles';
import { formatCurrency } from '../utils/formatCurrency';
import { format } from 'date-fns';
import { theme } from '../styles/theme';
import { usePreferences } from '../context/PreferencesContext';
import { Swipeable } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

const TransactionHistory = ({
  transactions,
  ListHeaderComponent,
  ListFooterComponent,
  onDeleteTransaction
}: TransactionHistoryProps) => {
  const { preferences, i18n } = usePreferences();
  const swipeableRefs = useRef<Map<string, any>>(new Map());

  // Sort transactions from newest to oldest
  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const handleDelete = (id: string) => {
    Alert.alert(
      i18n.t('dialog.delete.title'),
      i18n.t('dialog.delete.message'),
      [
        {
          text: i18n.t('dialog.cancel'),
          style: 'cancel',
          onPress: () => {
            swipeableRefs.current.get(id)?.close();
          }
        },
        {
          text: i18n.t('dialog.delete'),
          style: 'destructive',
          onPress: () => {
            onDeleteTransaction && onDeleteTransaction(id);
          }
        }
      ]
    );
  };

  const renderRightActions = (id: string) => {
    return (
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDelete(id)}
      >
        <Ionicons name="trash-outline" size={24} color="white" />
      </TouchableOpacity>
    );
  };

  const renderItem: ListRenderItem<Transaction> = ({ item }) => {
    return (
      <Swipeable
        ref={(ref) => {
          if (ref) {
            swipeableRefs.current.set(item.id, ref);
          } else {
            swipeableRefs.current.delete(item.id);
          }
        }}
        renderRightActions={() => renderRightActions(item.id)}
        rightThreshold={40}
      >
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
            {formatCurrency(item.amount, preferences.currency)}
          </Text>
        </BlurView>
      </Swipeable>
    );
  };

  const EmptyListComponent = () => (
    <View style={styles.container}>
      <Text style={styles.title}>{i18n.t('transaction.history')}</Text>
      <Text style={styles.noTransactions}>{i18n.t('transaction.empty')}</Text>
    </View>
  );

  const HeaderTitle = () => (
    <View style={styles.container}>
      <Text style={styles.title}>{i18n.t('transaction.history')}</Text>
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
