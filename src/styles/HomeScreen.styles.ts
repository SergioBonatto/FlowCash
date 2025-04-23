import { StyleSheet, Dimensions } from 'react-native';
import { theme } from './theme';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    padding: theme.spacing.md,
  },
  contentContainer: {
    flex: 1,
    gap: theme.spacing.md,
  },
  title: {
    fontSize: theme.fontSize.title,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    letterSpacing: 0.35,
    textShadowColor: 'rgba(255, 255, 255, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
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
  blurContainer: {
    borderRadius: theme.radius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: theme.colors.borderLight,
    shadowColor: theme.colors.dark,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.16,
    shadowRadius: 6,
    elevation: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  headerContent: {
    padding: theme.spacing.lg,
  },
  footerContent: {
    padding: theme.spacing.md,
  },
  emptyStateContainer: {
    flex: 1,
    borderRadius: theme.radius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: theme.colors.borderLight,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  }
});
