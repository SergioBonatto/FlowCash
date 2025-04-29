import { StyleSheet } from 'react-native';
import { theme } from './theme';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    flex: 1,
    padding: theme.spacing.lg,
  },
  title: {
    fontSize: theme.fontSize.title,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.lg,
  },
  balanceCard: {
    borderRadius: theme.radius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: theme.colors.borderLight,
    marginBottom: theme.spacing.lg,
    padding: theme.spacing.lg,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  chartCard: {
    borderRadius: theme.radius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: theme.colors.borderLight,
    marginBottom: theme.spacing.lg,
    padding: theme.spacing.md,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: theme.fontSize.subtitle,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  balanceValue: {
    fontSize: 32,
    fontWeight: theme.fontWeight.bold,
    textAlign: 'center',
    marginVertical: theme.spacing.md,
  },
  positiveBalance: {
    color: theme.colors.success,
  },
  negativeBalance: {
    color: theme.colors.danger,
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: theme.spacing.md,
    paddingTop: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.borderLight,
  },
  summaryItem: {
    alignItems: 'center',
    flex: 1,
  },
  summaryLabel: {
    fontSize: theme.fontSize.caption,
    color: theme.colors.subText,
    marginBottom: theme.spacing.xs,
  },
  incomeValue: {
    fontSize: theme.fontSize.body,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.success,
  },
  expenseValue: {
    fontSize: theme.fontSize.body,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.danger,
  },
  noDataContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    fontSize: theme.fontSize.body,
    color: theme.colors.subText,
    textAlign: 'center',
  },
});
