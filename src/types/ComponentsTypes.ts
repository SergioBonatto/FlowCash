import { Transaction } from './Transaction';

export interface HeaderProps {
    title?: string;
    subtitle?: string;
  }

export interface ActionButtonsProps {
    transactions: Transaction[];
    onImport: (transactions: Transaction[]) => void;
    onReplaceAll: (transactions: Transaction[]) => void;
  }

export interface AddTransactionProps {
    onAddTransaction: (transaction: Transaction) => void;
  }
