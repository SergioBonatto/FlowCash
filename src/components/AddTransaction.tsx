import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Pressable } from 'react-native';
import { Transaction } from '../types/Transaction';
import { styles } from '../styles/AddTransaction.styles';
import { theme } from '../styles/theme';
import { usePreferences } from '../context/PreferencesContext';
import { AddTransactionProps } from '../types/ComponentsTypes';

const AddTransaction = ({ onAddTransaction }: AddTransactionProps) => {
  const { translate } = usePreferences();
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
      <Text style={styles.title}>{translate('transaction.new')}</Text>

      <TextInput
        style={styles.input}
        placeholder={translate('transaction.title')}
        value={title}
        onChangeText={setTitle}
        placeholderTextColor={theme.colors.grey}
      />

      <TextInput
        style={styles.input}
        placeholder={translate('transaction.amount')}
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        placeholderTextColor={theme.colors.grey}
      />

      <TextInput
        style={styles.input}
        placeholder={translate('transaction.category')}
        value={category}
        onChangeText={setCategory}
        placeholderTextColor={theme.colors.grey}
      />

      <View style={styles.typeSelector}>
        <Pressable
          style={[
            styles.button,
            { backgroundColor: type === 'income' ? theme.colors.success : theme.colors.background }
          ]}
          onPress={() => setType('income')}
        >
          <Text style={{
            color: type === 'income' ? 'white' : theme.colors.text,
            textAlign: 'center',
            fontWeight: theme.fontWeight.medium
          }}>
            {translate('transaction.income')}
          </Text>
        </Pressable>

        <View style={styles.buttonSpace} />

        <Pressable
          style={[
            styles.button,
            { backgroundColor: type === 'expense' ? theme.colors.danger : theme.colors.background }
          ]}
          onPress={() => setType('expense')}
        >
          <Text style={{
            color: type === 'expense' ? 'white' : theme.colors.text,
            textAlign: 'center',
            fontWeight: theme.fontWeight.medium
          }}>
            {translate('transaction.expense')}
          </Text>
        </Pressable>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>{translate('transaction.save')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddTransaction;
