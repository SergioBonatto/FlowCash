import { StyleSheet } from 'react-native';
import { theme } from './theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background,
  },
  title: {
    fontSize: theme.fontSize.title,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    letterSpacing: 0.35,
  },
  subtitle: {
    marginTop: theme.spacing.xs,
    fontSize: theme.fontSize.subtitle,
    color: theme.colors.subText,
    marginBottom: theme.spacing.lg,
    letterSpacing: 0.15,
  },
  buttons: {
    width: '100%',
    marginVertical: theme.spacing.md,
  },
});
