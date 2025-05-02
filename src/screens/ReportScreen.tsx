import React, { useMemo, useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import { PieChart, LineChart, BarChart } from 'react-native-chart-kit';
import { useTransactions } from '../context/TransactionsContext';
import { usePreferences } from '../context/PreferencesContext';
import { theme } from '../styles/theme';
import { styles } from '../styles/ReportScreen.styles';
import { formatCurrency } from '../utils/formatCurrency';
import { Transaction } from '../types/Transaction';
import { Ionicons } from '@expo/vector-icons';
import { format, subMonths, startOfMonth, endOfMonth, isWithinInterval, parseISO } from 'date-fns';
import { ptBR, enUS } from 'date-fns/locale';

// Opções para o período do relatório
type TimeRange = 'week' | 'month' | '3months' | '6months' | 'year' | 'all';

const ReportScreen = () => {
  const { transactions } = useTransactions();
  const { preferences, translate } = usePreferences();
  const screenWidth = Dimensions.get('window').width;
  const [timeRange, setTimeRange] = useState<TimeRange>('month');

  // Determinar a localização para formatação de datas baseada no idioma selecionado
  const dateLocale = preferences.language.startsWith('pt') ? ptBR : enUS;

  // Filtrar transações pelo período selecionado
  const filteredTransactions = useMemo(() => {
    const now = new Date();
    let startDate: Date;

    switch(timeRange) {
      case 'week':
        startDate = new Date(now.setDate(now.getDate() - 7));
        break;
      case 'month':
        startDate = new Date(now.setMonth(now.getMonth() - 1));
        break;
      case '3months':
        startDate = new Date(now.setMonth(now.getMonth() - 3));
        break;
      case '6months':
        startDate = new Date(now.setMonth(now.getMonth() - 6));
        break;
      case 'year':
        startDate = new Date(now.setFullYear(now.getFullYear() - 1));
        break;
      case 'all':
      default:
        return transactions;
    }

    return transactions.filter(transaction => {
      const transactionDate = parseISO(transaction.date);
      return transactionDate >= startDate;
    });
  }, [transactions, timeRange]);

  // Cálculos financeiros básicos
  const financialSummary = useMemo(() => {
    let totalIncome = 0;
    let totalExpenses = 0;
    let largestExpense = { amount: 0, title: '', date: '', category: '' };
    let largestIncome = { amount: 0, title: '', date: '', category: '' };

    filteredTransactions.forEach(transaction => {
      if (transaction.type === 'income') {
        totalIncome += transaction.amount;
        if (transaction.amount > largestIncome.amount) {
          largestIncome = {
            amount: transaction.amount,
            title: transaction.title,
            date: transaction.date,
            category: transaction.category
          };
        }
      } else {
        totalExpenses += transaction.amount;
        if (transaction.amount > largestExpense.amount) {
          largestExpense = {
            amount: transaction.amount,
            title: transaction.title,
            date: transaction.date,
            category: transaction.category
          };
        }
      }
    });

    const totalBalance = totalIncome - totalExpenses;
    const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0;

    return {
      totalIncome,
      totalExpenses,
      totalBalance,
      savingsRate,
      largestExpense,
      largestIncome,
      transactionCount: filteredTransactions.length
    };
  }, [filteredTransactions]);

  // Dados por categoria para despesas
  const expenseCategoryData = useMemo(() => {
    const categories: Record<string, { total: number, color: string }> = {};
    const colors = [
      '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
      '#FF9F40', '#8AC24A', '#00BCD4', '#FF5722', '#607D8B'
    ];

    let colorIndex = 0;

    // Processar apenas despesas para o gráfico
    filteredTransactions
      .filter(t => t.type === 'expense')
      .forEach(transaction => {
        const category = transaction.category || 'Outros';

        if (!categories[category]) {
          categories[category] = {
            total: 0,
            color: colors[colorIndex % colors.length]
          };
          colorIndex++;
        }

        categories[category].total += transaction.amount;
      });

    // Converter para o formato do gráfico
    return Object.entries(categories)
      .sort((a, b) => b[1].total - a[1].total) // Ordenar por valor decrescente
      .map(([name, data]) => ({
        name,
        amount: data.total,
        color: data.color,
        legendFontColor: theme.colors.text,
        legendFontSize: 12
      }));
  }, [filteredTransactions]);

  // Dados por categoria para receitas
  const incomeCategoryData = useMemo(() => {
    const categories: Record<string, { total: number, color: string }> = {};
    const colors = [
      '#4BC0C0', '#9966FF', '#FF9F40', '#8AC24A', '#00BCD4',
      '#FF6384', '#36A2EB', '#FFCE56', '#FF5722', '#607D8B'
    ];

    let colorIndex = 0;

    // Processar apenas receitas para o gráfico
    filteredTransactions
      .filter(t => t.type === 'income')
      .forEach(transaction => {
        const category = transaction.category || 'Outros';

        if (!categories[category]) {
          categories[category] = {
            total: 0,
            color: colors[colorIndex % colors.length]
          };
          colorIndex++;
        }

        categories[category].total += transaction.amount;
      });

    // Converter para o formato do gráfico
    return Object.entries(categories)
      .sort((a, b) => b[1].total - a[1].total) // Ordenar por valor decrescente
      .map(([name, data]) => ({
        name,
        amount: data.total,
        color: data.color,
        legendFontColor: theme.colors.text,
        legendFontSize: 12
      }));
  }, [filteredTransactions]);

  // Dados para o gráfico de evolução mensal
  const monthlyTrendData = useMemo(() => {
    // Considerar no máximo os últimos 6 meses para o gráfico de tendência
    const numberOfMonths = 6;
    const labels: string[] = [];
    const incomeData: number[] = [];
    const expenseData: number[] = [];
    const balanceData: number[] = [];

    const now = new Date();

    // Criar arrays para cada mês
    for (let i = numberOfMonths - 1; i >= 0; i--) {
      const monthDate = subMonths(now, i);
      const monthStart = startOfMonth(monthDate);
      const monthEnd = endOfMonth(monthDate);

      // Formatar o nome do mês de acordo com o idioma
      labels.push(format(monthDate, 'MMM', { locale: dateLocale }).substring(0, 3));

      // Calcular totais do mês
      let monthlyIncome = 0;
      let monthlyExpense = 0;

      filteredTransactions.forEach(transaction => {
        const transactionDate = parseISO(transaction.date);

        if (isWithinInterval(transactionDate, { start: monthStart, end: monthEnd })) {
          if (transaction.type === 'income') {
            monthlyIncome += transaction.amount;
          } else {
            monthlyExpense += transaction.amount;
          }
        }
      });

      incomeData.push(monthlyIncome);
      expenseData.push(monthlyExpense);
      balanceData.push(monthlyIncome - monthlyExpense);
    }

    return { labels, incomeData, expenseData, balanceData };
  }, [filteredTransactions, dateLocale]);

  // Dados para estatísticas de transações
  const transactionStats = useMemo(() => {
    if (filteredTransactions.length === 0) return null;

    // Classificar transações por data (mais recente primeiro)
    const sortedTransactions = [...filteredTransactions].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    const firstDate = parseISO(sortedTransactions[sortedTransactions.length - 1].date);
    const lastDate = parseISO(sortedTransactions[0].date);
    const daysInRange = Math.ceil((lastDate.getTime() - firstDate.getTime()) / (1000 * 3600 * 24)) || 1;

    // Calcular médias
    const averageExpenseAmount = filteredTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0) /
      (filteredTransactions.filter(t => t.type === 'expense').length || 1);

    const averageIncomeAmount = filteredTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0) /
      (filteredTransactions.filter(t => t.type === 'income').length || 1);

    const transactionsPerDay = filteredTransactions.length / daysInRange;

    // Top categorias
    const expenseCategoryCounts: Record<string, number> = {};
    const incomeCategoryCounts: Record<string, number> = {};

    filteredTransactions.forEach(t => {
      const category = t.category || 'Outros';
      if (t.type === 'expense') {
        expenseCategoryCounts[category] = (expenseCategoryCounts[category] || 0) + 1;
      } else {
        incomeCategoryCounts[category] = (incomeCategoryCounts[category] || 0) + 1;
      }
    });

    const mostFrequentExpenseCategory = Object.entries(expenseCategoryCounts)
      .sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

    const mostFrequentIncomeCategory = Object.entries(incomeCategoryCounts)
      .sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

    return {
      firstTransactionDate: firstDate,
      lastTransactionDate: lastDate,
      daysInRange,
      averageExpenseAmount,
      averageIncomeAmount,
      transactionsPerDay,
      mostFrequentExpenseCategory,
      mostFrequentIncomeCategory
    };
  }, [filteredTransactions]);

  // Renderizar os botões para selecionar o período
  const renderTimeRangeSelector = () => {
    const options: { label: string, value: TimeRange }[] = [
      { label: '7D', value: 'week' },
      { label: '1M', value: 'month' },
      { label: '3M', value: '3months' },
      { label: '6M', value: '6months' },
      { label: '1A', value: 'year' },
      { label: translate('report.all'), value: 'all' }
    ];

    return (
      <View style={styles.timeRangeContainer}>
        {options.map(option => (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.timeRangeButton,
              timeRange === option.value && styles.timeRangeButtonActive
            ]}
            onPress={() => setTimeRange(option.value)}
          >
            <Text
              style={[
                styles.timeRangeText,
                timeRange === option.value && styles.timeRangeTextActive
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>{translate('report.title')}</Text>

        {/* Seletor de período */}
        {renderTimeRangeSelector()}

        {/* Resumo financeiro */}
        <BlurView intensity={theme.blur.medium} tint="light" style={styles.balanceCard}>
          <Text style={styles.sectionTitle}>{translate('report.balance')}</Text>
          <Text style={[
            styles.balanceValue,
            financialSummary.totalBalance >= 0 ? styles.positiveBalance : styles.negativeBalance
          ]}>
            {formatCurrency(Math.abs(financialSummary.totalBalance), preferences.currency)}
          </Text>

          <View style={styles.summaryContainer}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>{translate('report.income')}</Text>
              <Text style={styles.incomeValue}>
                +{formatCurrency(financialSummary.totalIncome, preferences.currency)}
              </Text>
            </View>

            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>{translate('report.expenses')}</Text>
              <Text style={styles.expenseValue}>
                -{formatCurrency(financialSummary.totalExpenses, preferences.currency)}
              </Text>
            </View>
          </View>

          {/* Taxa de economia */}
          <View style={styles.savingsRateContainer}>
            <Text style={styles.savingsRateLabel}>{translate('report.savingsRate')}</Text>
            <Text style={[
              styles.savingsRateValue,
              financialSummary.savingsRate >= 0 ? styles.positiveBalance : styles.negativeBalance
            ]}>
              {financialSummary.savingsRate.toFixed(0)}%
            </Text>
          </View>
        </BlurView>

        {/* Gráfico de tendência mensal */}
        {monthlyTrendData.labels.length > 1 && (
          <BlurView intensity={theme.blur.medium} tint="light" style={styles.chartCard}>
            <Text style={styles.sectionTitle}>{translate('report.monthlyTrend')}</Text>
            <LineChart
              data={{
                labels: monthlyTrendData.labels,
                datasets: [
                  {
                    data: monthlyTrendData.balanceData,
                    color: (opacity = 1) => `rgba(65, 105, 225, ${opacity})`,
                    strokeWidth: 3
                  },
                  {
                    data: monthlyTrendData.incomeData,
                    color: (opacity = 1) => `rgba(50, 205, 50, ${opacity})`,
                    strokeWidth: 2
                  },
                  {
                    data: monthlyTrendData.expenseData,
                    color: (opacity = 1) => `rgba(255, 99, 71, ${opacity})`,
                    strokeWidth: 2
                  }
                ],
                legend: [
                  translate('report.balance'),
                  translate('report.income'),
                  translate('report.expenses')
                ]
              }}
              width={screenWidth - 40}
              height={220}
              chartConfig={{
                backgroundColor: 'transparent',
                backgroundGradientFrom: 'white',
                backgroundGradientTo: 'white',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16
                },
                propsForDots: {
                  r: '4',
                },
              }}
              bezier
              style={styles.chartStyle}
            />
          </BlurView>
        )}

        {/* Gráfico de categorias de despesas */}
        <BlurView intensity={theme.blur.medium} tint="light" style={styles.chartCard}>
          <Text style={styles.sectionTitle}>{translate('report.expenseCategories')}</Text>

          {expenseCategoryData.length > 0 ? (
            <PieChart
              data={expenseCategoryData}
              width={screenWidth - 40}
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

        {/* Gráfico de categorias de receitas */}
        <BlurView intensity={theme.blur.medium} tint="light" style={styles.chartCard}>
          <Text style={styles.sectionTitle}>{translate('report.incomeCategories')}</Text>

          {incomeCategoryData.length > 0 ? (
            <PieChart
              data={incomeCategoryData}
              width={screenWidth - 40}
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
              <Text style={styles.noDataText}>{translate('report.noIncomeData')}</Text>
            </View>
          )}
        </BlurView>

        {/* Transações notáveis */}
        <BlurView intensity={theme.blur.medium} tint="light" style={styles.infoCard}>
          <Text style={styles.sectionTitle}>{translate('report.notableTransactions')}</Text>

          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>{translate('report.largestExpense')}</Text>
              <Text style={styles.expenseValue}>
                -{formatCurrency(financialSummary.largestExpense.amount, preferences.currency)}
              </Text>
              <Text style={styles.infoSubtext}>
                {financialSummary.largestExpense.title || 'N/A'} • {financialSummary.largestExpense.category || 'N/A'}
              </Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>{translate('report.largestIncome')}</Text>
              <Text style={styles.incomeValue}>
                +{formatCurrency(financialSummary.largestIncome.amount, preferences.currency)}
              </Text>
              <Text style={styles.infoSubtext}>
                {financialSummary.largestIncome.title || 'N/A'} • {financialSummary.largestIncome.category || 'N/A'}
              </Text>
            </View>
          </View>
        </BlurView>

        {/* Estatísticas adicionais */}
        {transactionStats && (
          <BlurView intensity={theme.blur.medium} tint="light" style={styles.infoCard}>
            <Text style={styles.sectionTitle}>{translate('report.statistics')}</Text>

            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{financialSummary.transactionCount}</Text>
                <Text style={styles.statLabel}>{translate('report.totalTransactions')}</Text>
              </View>

              <View style={styles.statItem}>
                <Text style={styles.statValue}>
                  {formatCurrency(transactionStats.averageExpenseAmount, preferences.currency)}
                </Text>
                <Text style={styles.statLabel}>{translate('report.avgExpense')}</Text>
              </View>

              <View style={styles.statItem}>
                <Text style={styles.statValue}>
                  {formatCurrency(transactionStats.averageIncomeAmount, preferences.currency)}
                </Text>
                <Text style={styles.statLabel}>{translate('report.avgIncome')}</Text>
              </View>

              <View style={styles.statItem}>
                <Text style={styles.statValue}>{transactionStats.transactionsPerDay.toFixed(1)}</Text>
                <Text style={styles.statLabel}>{translate('report.transactionsPerDay')}</Text>
              </View>

              <View style={styles.statItem}>
                <Text style={styles.statValue}>{transactionStats.mostFrequentExpenseCategory}</Text>
                <Text style={styles.statLabel}>{translate('report.topExpenseCategory')}</Text>
              </View>

              <View style={styles.statItem}>
                <Text style={styles.statValue}>{transactionStats.mostFrequentIncomeCategory}</Text>
                <Text style={styles.statLabel}>{translate('report.topIncomeCategory')}</Text>
              </View>
            </View>
          </BlurView>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ReportScreen;
