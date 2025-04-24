import { StyleSheet, Dimensions } from 'react-native';
import { theme } from './theme';

const { width, height } = Dimensions.get('window');

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
    marginBottom: theme.spacing.sm,
  },
  pickerContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: theme.radius.sm,
    marginTop: theme.spacing.xs,
    overflow: 'hidden',
  },
  picker: {
    width: '100%',
    height: 50,
  },
  // Estilos para o seletor customizado
  selectButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: theme.radius.sm,
    padding: theme.spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing.xs,
  },
  selectButtonText: {
    fontSize: theme.fontSize.body,
    color: theme.colors.text,
  },
  // Estilos para o modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: theme.colors.card,
    borderTopLeftRadius: theme.radius.lg,
    borderTopRightRadius: theme.radius.lg,
    paddingBottom: 20, // Para evitar problemas com o notch em iPhones
    maxHeight: height * 0.7, // Limitar a altura máxima
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderLight,
  },
  modalTitle: {
    fontSize: theme.fontSize.subtitle,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
  },
  modalList: {
    maxHeight: 300,
  },
  modalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.lightGrey,
  },
  modalItemText: {
    fontSize: theme.fontSize.body,
    color: theme.colors.text,
  },
});
