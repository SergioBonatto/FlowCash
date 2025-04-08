import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Transaction } from '../types/Transaction';
import { loadTransactions, saveTransactions } from '../services/storage';

type TransactionsContextType = {
  transactions: Transaction[];
  addTransaction: (tx: Transaction) => void;
};

const TransactionsContext = createContext<TransactionsContextType | undefined>(undefined);

export const TransactionsProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const savedTransactions = await loadTransactions();
      setTransactions(savedTransactions);
      setIsLoading(false);
    };

    loadData();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      saveTransactions(transactions);
    }
  }, [transactions, isLoading]);

  const addTransaction = (tx: Transaction) => {
    setTransactions((prev) => [...prev, tx]);
  };

  return (
    <TransactionsContext.Provider value={{ transactions, addTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(TransactionsContext);
  if (!context) {
    throw new Error('useTransactions must be used within TransactionsProvider');
  }
  return context;
};
