import { StyleSheet } from 'react-native';
import { theme } from './theme';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: theme.spacing.md,
  },
  title: {
    fontSize: theme.fontSize.subtitle,
    fontWeight: theme.fontWeight.semibold,
    marginBottom: theme.spacing.md,
    textAlign: 'left',
    color: theme.colors.text,
    letterSpacing: 0.15,
  },
  noTransactions: {
    textAlign: 'center',
    color: theme.colors.subText,
    marginTop: theme.spacing.md,
    fontSize: theme.fontSize.body,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.md,
    marginBottom: theme.spacing.sm,
    shadowColor: theme.colors.dark,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  incomeItem: {
    borderLeftColor: theme.colors.success,
    borderLeftWidth: 4,
  },
  expenseItem: {
    borderLeftColor: theme.colors.danger,
    borderLeftWidth: 4,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: theme.fontSize.body,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.text,
  },
  transactionCategory: {
    fontSize: theme.fontSize.caption,
    color: theme.colors.subText,
    marginTop: theme.spacing.xs,
  },
  transactionDate: {
    fontSize: theme.fontSize.small,
    color: theme.colors.grey,
    marginTop: theme.spacing.xs,
  },
  transactionAmount: {
    fontWeight: theme.fontWeight.semibold,
    fontSize: theme.fontSize.body,
  },
  incomeAmount: {
    color: theme.colors.success,
  },
  expenseAmount: {
    color: theme.colors.danger,
  },
  listContainer: {
    paddingBottom: theme.spacing.md,
  }
});
