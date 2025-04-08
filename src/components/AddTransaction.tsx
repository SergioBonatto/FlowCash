import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { Transaction } from '../types/Transaction';
import { styles } from '../styles/AddTransaction.styles';

interface AddTransactionProps {
  onAddTransaction: (transaction: Transaction) => void;
}

const AddTransaction = ({ onAddTransaction }: AddTransactionProps) => {
  const [amount, setAmount] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('income');

  const handleSave = () => {
    if (!amount || isNaN(Number(amount)) || !title) {
      return;
    }

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      title,
      amount: Number(amount),
      type,
      category: category || 'Other',
      date: new Date().toISOString(),
    };

    onAddTransaction(newTransaction);

    setAmount('');
    setTitle('');
    setCategory('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Transaction</Text>

      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={styles.input}
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Category (optional)"
        value={category}
        onChangeText={setCategory}
      />

      <View style={styles.typeSelector}>
        <Button
          title="Income"
          onPress={() => setType('income')}
          color={type === 'income' ? '#4CAF50' : '#ccc'}
        />
        <View style={{width: 10}} />
        <Button
          title="Expense"
          onPress={() => setType('expense')}
          color={type === 'expense' ? '#F44336' : '#ccc'}
        />
      </View>

      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

export default AddTransaction;
