import { StyleSheet } from 'react-native';
import { theme } from './theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.md,
  },
  title: {
    fontSize: theme.fontSize.title,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },
  card: {
    borderRadius: theme.radius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: theme.colors.borderLight,
    marginBottom: theme.spacing.lg,
    padding: theme.spacing.md,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  sectionTitle: {
    fontSize: theme.fontSize.subtitle,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  swapButton: {
    alignSelf: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: theme.radius.lg,
    padding: theme.spacing.sm,
    marginVertical: theme.spacing.md,
  },
  rateContainer: {
    alignItems: 'center',
    marginVertical: theme.spacing.md,
  },
  rateValue: {
    fontSize: theme.fontSize.body,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.text,
  },
  // Novo container de resultado para evitar duplicação
  conversionResultContainer: {
    alignItems: 'center',
    marginVertical: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.borderLight,
  },
  // Estilo para o valor convertido (em destaque)
  conversionResultValue: {
    fontSize: 28,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.primary,
  },
  updatedText: {
    fontSize: theme.fontSize.small,
    color: theme.colors.subText,
    textAlign: 'center',
    marginTop: theme.spacing.sm,
  },
  infoText: {
    fontSize: theme.fontSize.body,
    color: theme.colors.text,
    lineHeight: 22,
  },
  // Estilo para o campo de entrada de valor
  amountInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: theme.spacing.sm,
    borderRadius: theme.radius.sm,
    marginBottom: theme.spacing.md,
    fontSize: 20,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.text,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: theme.colors.borderLight,
  },
});
