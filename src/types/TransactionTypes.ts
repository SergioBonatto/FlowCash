import { Transaction } from './Transaction';

export interface TransactionHistoryProps {
  transactions: Transaction[];
  ListHeaderComponent?: React.ComponentType<any> | React.ReactElement | null;
  ListFooterComponent?: React.ComponentType<any> | React.ReactElement | null;
}
