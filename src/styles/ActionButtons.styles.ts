import { StyleSheet } from 'react-native';
import { theme } from './theme';

export const styles = StyleSheet.create({
    container: {
      width: '100%',
      marginVertical: theme.spacing.md,
    },
    button: {
      borderRadius: theme.radius.sm,
      padding: theme.spacing.md,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      shadowColor: theme.colors.dark,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 5,
      elevation: 2,
    },
    exportButton: {
      backgroundColor: theme.colors.primary,
      borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    importButton: {
      backgroundColor: theme.colors.secondary,
      borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    buttonText: {
      color: 'white',
      fontWeight: theme.fontWeight.medium,
      fontSize: theme.fontSize.body,
    },
  });
