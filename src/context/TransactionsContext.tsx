import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Transaction } from '../types/Transaction';
import { loadTransactions, saveTransactions } from '../services/storage';
import { pipe, tap } from '../utils/functional';

type TransactionsContextType = {
  transactions: Transaction[];
  addTransaction: (tx: Transaction) => void;
  deleteTransaction: (id: string) => void;
  replaceAllTransactions: (txs: Transaction[]) => void;
  categories: Set<string>; // Added: set of unique categories
};

const TransactionsContext = createContext<TransactionsContextType | undefined>(undefined);

export const TransactionsProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  // Extract unique categories from transactions
  const extractCategories = (txs: Transaction[]): Set<string> => {
    return new Set(
      txs
        .map(tx => tx.category)
        .filter(category => category && category !== 'Other')
    );
  };

  useEffect(() => {
    loadTransactions()
      .then((loadedTransactions) => {
        setIsLoading(false);
        setTransactions(loadedTransactions);
        setCategories(extractCategories(loadedTransactions));
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
    setTransactions(prev => [...prev, tx]);

    // If the category is not empty and not 'Other', add it to the set of categories
    if (tx.category && tx.category !== 'Other') {
      setCategories(prev => new Set([...prev, tx.category]));
    }
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(tx => tx.id !== id));

    // Recalculate categories after deleting a transaction
    setCategories(extractCategories(
      transactions.filter(tx => tx.id !== id)
    ));
  };

  const replaceAllTransactions = (txs: Transaction[]) => {
    setTransactions(txs);
    setCategories(extractCategories(txs));
  };

  return (
    <TransactionsContext.Provider value={{
      transactions,
      addTransaction,
      deleteTransaction,
      replaceAllTransactions,
      categories
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
