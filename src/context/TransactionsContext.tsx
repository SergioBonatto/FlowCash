import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Transaction } from '../types/Transaction';
import { loadTransactions, saveTransactions } from '../services/storage';
import { pipe, tap } from '../utils/functional';

type TransactionsContextType = {
  transactions: Transaction[];
  addTransaction: (tx: Transaction) => void;
  deleteTransaction: (id: string) => void;
  replaceAllTransactions: (txs: Transaction[]) => void;
};

const TransactionsContext = createContext<TransactionsContextType | undefined>(undefined);

export const TransactionsProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTransactions()
      .then((loadedTransactions) => {
        setIsLoading(false);
        setTransactions(loadedTransactions);
        return loadedTransactions;
      })
      .catch(error => {
        console.error('Error loading transactions:', error);
        setIsLoading(false);
      });
  }, []);

  // Effect to save transactions when they change
  useEffect(() => {
    if (!isLoading) {
      saveTransactions(transactions)
        .catch(error => console.error('Error saving transactions:', error));
    }
  }, [transactions, isLoading]);

  // Pure operations for data transformation
  const addTransaction = (tx: Transaction) => {
    setTransactions(prev => [...prev, tx]); // Immutable way to add
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(tx => tx.id !== id)); // Immutable filter
  };

  const replaceAllTransactions = (txs: Transaction[]) => {
    setTransactions(txs); // Already immutable
  };

  return (
    <TransactionsContext.Provider value={{
      transactions,
      addTransaction,
      deleteTransaction,
      replaceAllTransactions
    }}>
      {children}
    </TransactionsContext.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(TransactionsContext);
  if (!context) {
    throw new Error('useTransactions must be used within a TransactionsProvider');
  }
  return context;
};
