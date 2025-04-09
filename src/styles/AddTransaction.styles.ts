import { StyleSheet } from 'react-native';
import { theme } from './theme';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.md,
    marginVertical: theme.spacing.md,
    shadowColor: theme.colors.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: theme.fontSize.subtitle,
    fontWeight: theme.fontWeight.semibold,
    marginBottom: theme.spacing.md,
    color: theme.colors.text,
    textAlign: 'center',
    letterSpacing: 0.15,
  },
  input: {
    backgroundColor: theme.colors.background,
    padding: theme.spacing.sm,
    borderRadius: theme.radius.sm,
    marginBottom: theme.spacing.md,
    fontSize: theme.fontSize.body,
    color: theme.colors.text,
    borderWidth: 1,
    borderColor: theme.colors.lightGrey,
  },
  typeSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: theme.spacing.md,
  },
  button: {
    flex: 1,
    borderRadius: theme.radius.sm,
    padding: theme.spacing.sm,
  },
  buttonSpace: {
    width: theme.spacing.md,
  },
  saveButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.sm,
    padding: theme.spacing.sm,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: theme.fontWeight.medium,
    fontSize: theme.fontSize.body,
  }
});
