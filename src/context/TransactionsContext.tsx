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
        console.error('Erro ao carregar transações:', error);
        setIsLoading(false);
      });
  }, []);

  // Efeito para salvar transações quando mudam
  useEffect(() => {
    if (!isLoading) {
      saveTransactions(transactions)
        .catch(error => console.error('Erro ao salvar transações:', error));
    }
  }, [transactions, isLoading]);

  // Operações puras para transformação de dados
  const addTransaction = (tx: Transaction) => {
    setTransactions(prev => [...prev, tx]); // Maneira imutável de adicionar
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(tx => tx.id !== id)); // Filtro imutável
  };

  const replaceAllTransactions = (txs: Transaction[]) => {
    setTransactions(txs); // Já é imutável
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
    throw new Error('useTransactions deve ser usado dentro de TransactionsProvider');
  }
  return context;
};
