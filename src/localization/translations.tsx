import { LanguageCode } from '../context/PreferencesContext';

// Interface para tipagem das traduções
interface TranslationKeys {
  [key: string]: string;
}

// Traduções organizadas por idioma
export const translations: Record<LanguageCode, TranslationKeys> = {
  'en': {
    'welcome': 'Welcome to FlowCash',
    'welcome.subtitle': 'Manage your home finances easily.',
    'transaction.history': 'Transaction History',
    'transaction.new': 'New Transaction',
    'transaction.title': 'Title',
    'transaction.amount': 'Amount',
    'transaction.category': 'Category (optional)',
    'transaction.income': 'Income',
    'transaction.expense': 'Expense',
    'transaction.save': 'Save',
    'transaction.empty': 'No transactions recorded yet',
    'action.export': 'Export data',
    'action.import': 'Import data',
    'error.connection': 'Connection Error',
    'error.server': 'Please check if the Expo server is running on 127.0.0.1:8081',
    'error.restart': 'Try stopping and restarting your Expo server with:',
    'loading': 'Loading FlowCash...',
    'settings': 'Settings',
    'settings.language': 'Language',
    'settings.currency': 'Currency',
    'settings.save': 'Save Changes',
    'import.success': '{{count}} transactions imported. Previous data was replaced.',
    'import.fail': 'Could not read the file or the file is invalid.',
    'export.empty': 'You don\'t have any saved transactions.',
    'dialog.title': 'Import Transactions',
    'dialog.message': 'This action will replace all your current transactions with the imported data. This action is irreversible.',
    'dialog.cancel': 'Cancel',
    'dialog.replace': 'Replace',
  },
  'pt-BR': {
    'welcome': 'Bem-vindo ao FlowCash',
    'welcome.subtitle': 'Gerencie suas finanças domésticas facilmente.',
    'transaction.history': 'Histórico de Transações',
    'transaction.new': 'Nova Transação',
    'transaction.title': 'Título',
    'transaction.amount': 'Valor',
    'transaction.category': 'Categoria (opcional)',
    'transaction.income': 'Receita',
    'transaction.expense': 'Despesa',
    'transaction.save': 'Salvar',
    'transaction.empty': 'Nenhuma transação registrada ainda',
    'action.export': 'Exportar dados',
    'action.import': 'Importar dados',
    'error.connection': 'Erro de Conexão',
    'error.server': 'Verifique se o servidor Expo está rodando em 127.0.0.1:8081',
    'error.restart': 'Tente parar e reiniciar seu servidor Expo com:',
    'loading': 'Carregando FlowCash...',
    'settings': 'Configurações',
    'settings.language': 'Idioma',
    'settings.currency': 'Moeda',
    'settings.save': 'Salvar Alterações',
    'import.success': '{{count}} transações importadas. Dados anteriores foram substituídos.',
    'import.fail': 'Não foi possível ler o arquivo ou o arquivo é inválido.',
    'export.empty': 'Você não tem nenhuma transação salva.',
    'dialog.title': 'Importar Transações',
    'dialog.message': 'Esta ação irá substituir todas as suas transações atuais pelos dados importados. Esta ação é irreversível.',
    'dialog.cancel': 'Cancelar',
    'dialog.replace': 'Substituir',
  },
  'es': {
    // Traduções em espanhol
    'welcome': 'Bienvenido a FlowCash',
    // Adicione mais traduções conforme necessário
  },
  'fr': {
    // Traduções em francês
    'welcome': 'Bienvenue à FlowCash',
    // Adicione mais traduções conforme necessário
  }
};
