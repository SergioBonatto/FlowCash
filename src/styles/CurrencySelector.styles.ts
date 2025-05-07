import { StyleSheet } from 'react-native';
import { theme } from './theme';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  selectButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.borderLight,
  },
  selectedCurrency: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currencyCode: {
    fontSize: theme.fontSize.subtitle,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    marginRight: theme.spacing.sm,
  },
  currencyName: {
    fontSize: theme.fontSize.body,
    color: theme.colors.subText,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    maxHeight: '80%',
    borderRadius: theme.radius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: theme.colors.borderLight,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderLight,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  modalTitle: {
    fontSize: theme.fontSize.subtitle,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
  },
  currencyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.lightGrey,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  selectedItem: {
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
  },
  currencyItemCode: {
    fontSize: theme.fontSize.body,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    width: 60,
  },
  currencyItemName: {
    fontSize: theme.fontSize.body,
    color: theme.colors.text,
    flex: 1,
  },
});
