import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Pressable, Alert } from 'react-native';
import { Transaction, TransactionType } from '../types/Transaction';
import { styles } from '../styles/AddTransaction.styles';
import { theme } from '../styles/theme';
import { usePreferences } from '../context/PreferencesContext';
import { AddTransactionProps } from '../types/ComponentsTypes';
import { pipe, when } from '../utils/functional';

const AddTransaction = ({ onAddTransaction }: AddTransactionProps) => {
  const { translate, preferences } = usePreferences();
  const [amount, setAmount] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState<TransactionType>('income');

  // Pure functions to handle user input
  const normalizeAmount = (value: string): number => {
    // Solution 1: using pipe with explicit types
    return pipe<string, string, string, number>(
      value,
      (s: string) => s.replace(/[^\d.,]/g, ''),
      (s: string) => s.replace(',', '.'),
      parseFloat
    );
  };

  const sanitizeAmount = (value: string): string => {
    const sanitized = value.replace(/[^\d.,]/g, '');
    const decimalCount = (sanitized.match(/[.,]/g) || []).length;
    return decimalCount > 1 ? amount : sanitized;
  };

  const createTransaction = (
    title: string,
    amount: number,
    type: TransactionType,
    category: string
  ): Transaction => ({
    id: Date.now().toString(),
    title,
    amount,
    type,
    category: category || 'Other',
    date: new Date().toISOString(),
  });

  // Validation functions
  const validateTitle = (title: string): boolean => Boolean(title.trim());
  const validateAmount = (amount: string): boolean => {
    const value = normalizeAmount(amount);
    return !isNaN(value) && value > 0;
  };

  const handleAmountChange = (value: string) => {
    setAmount(sanitizeAmount(value));
  };

  const handleSave = () => {
    // Validations
    if (!validateTitle(title)) {
      Alert.alert(translate('error.title'), translate('error.titleRequired'));
      return;
    }

    if (!validateAmount(amount)) {
      Alert.alert(
        translate('error.amount'),
        amount ? translate('error.validAmount') : translate('error.amountRequired')
      );
      return;
    }

    // Create the transaction first
    const transaction = createTransaction(
      title,
      normalizeAmount(amount),
      type,
      category
    );

    // Add to the list
    onAddTransaction(transaction);

    // Clear fields
    setTitle('');
    setAmount('');
    setCategory('');
    setType('income');
  };

  // Render helper for the type button
  const renderTypeButton = (buttonType: TransactionType, label: string) => (
    <Pressable
      style={[
        styles.button,
        { backgroundColor: type === buttonType ?
            (buttonType === 'income' ? theme.colors.success : theme.colors.danger) :
            theme.colors.background
        }
      ]}
      onPress={() => setType(buttonType)}
    >
      <Text style={{
        color: type === buttonType ? 'white' : theme.colors.text,
        textAlign: 'center',
        fontWeight: theme.fontWeight.medium
      }}>
        {translate(`transaction.${buttonType}`)}
      </Text>
    </Pressable>
  );

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
        onChangeText={handleAmountChange}
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
        {renderTypeButton('income', 'transaction.income')}
        <View style={styles.buttonSpace} />
        {renderTypeButton('expense', 'transaction.expense')}
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>{translate('transaction.save')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddTransaction;
