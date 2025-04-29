import React, { useMemo } from 'react';
import { View, Text, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import { BlurView } from 'expo-blur';
import { PieChart } from 'react-native-chart-kit';
import { useTransactions } from '../context/TransactionsContext';
import { usePreferences } from '../context/PreferencesContext';
import { theme } from '../styles/theme';
import { styles } from '../styles/ReportScreen.styles';
import { formatCurrency } from '../utils/formatCurrency';

const ReportScreen = () => {
  const { transactions } = useTransactions();
  const { preferences, translate } = usePreferences();
  const screenWidth = Dimensions.get('window').width;

  // Calculate total balance
  const totalBalance = useMemo(() => {
    return transactions.reduce((acc, transaction) => {
      return transaction.type === 'income'
        ? acc + transaction.amount
        : acc - transaction.amount;
    }, 0);
  }, [transactions]);

  // Group transactions by category
  const categoryData = useMemo(() => {
    const categories: Record<string, { total: number, color: string }> = {};
    const colors = [
      '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
      '#FF9F40', '#8AC24A', '#00BCD4', '#FF5722', '#607D8B'
    ];

    let colorIndex = 0;

    // Process only expenses for the category chart
    transactions
      .filter(t => t.type === 'expense')
      .forEach(transaction => {
        const category = transaction.category || 'Other';

        if (!categories[category]) {
          categories[category] = {
            total: 0,
            color: colors[colorIndex % colors.length]
          };
          colorIndex++;
        }

        categories[category].total += transaction.amount;
      });

    // Convert to chart format
    return Object.entries(categories).map(([name, data]) => ({
      name,
      amount: data.total,
      color: data.color,
      legendFontColor: theme.colors.text,
      legendFontSize: 12
    }));
  }, [transactions]);

  // Calculate income and expense totals
  const { totalIncome, totalExpenses } = useMemo(() => {
    return transactions.reduce((acc, transaction) => {
      if (transaction.type === 'income') {
        acc.totalIncome += transaction.amount;
      } else {
        acc.totalExpenses += transaction.amount;
      }
      return acc;
    }, { totalIncome: 0, totalExpenses: 0 });
  }, [transactions]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>{translate('report.title')}</Text>

        {/* Display total balance */}
        <BlurView intensity={theme.blur.medium} tint="light" style={styles.balanceCard}>
          <Text style={styles.sectionTitle}>{translate('report.balance')}</Text>
          <Text style={[
            styles.balanceValue,
            totalBalance >= 0 ? styles.positiveBalance : styles.negativeBalance
          ]}>
            {formatCurrency(Math.abs(totalBalance), preferences.currency)}
          </Text>

          <View style={styles.summaryContainer}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>{translate('report.income')}</Text>
              <Text style={styles.incomeValue}>
                +{formatCurrency(totalIncome, preferences.currency)}
              </Text>
            </View>

            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>{translate('report.expenses')}</Text>
              <Text style={styles.expenseValue}>
                -{formatCurrency(totalExpenses, preferences.currency)}
              </Text>
            </View>
          </View>
        </BlurView>

        {/* Category chart */}
        <BlurView intensity={theme.blur.medium} tint="light" style={styles.chartCard}>
          <Text style={styles.sectionTitle}>{translate('report.categories')}</Text>

          {categoryData.length > 0 ? (
            <PieChart
              data={categoryData}
              width={screenWidth - 60}
              height={220}
              chartConfig={{
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
              accessor="amount"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute
            />
          ) : (
            <View style={styles.noDataContainer}>
              <Text style={styles.noDataText}>{translate('report.noData')}</Text>
            </View>
          )}
        </BlurView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ReportScreen;
