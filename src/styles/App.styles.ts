import { StyleSheet } from 'react-native';
import { theme } from './theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.background,
  },
  icon: {
    width: 120,
    height: 120,
    marginBottom: theme.spacing.lg,
  },
  loader: {
    marginVertical: theme.spacing.sm,
  },
  text: {
    marginTop: theme.spacing.sm,
    textAlign: 'center',
    fontSize: theme.fontSize.body,
    color: theme.colors.text,
  },
  subText: {
    marginTop: theme.spacing.lg,
    textAlign: 'center',
    fontSize: theme.fontSize.caption,
    color: theme.colors.subText,
  },
  errorText: {
    fontSize: theme.fontSize.subtitle,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.danger,
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.sm,
  },
});
