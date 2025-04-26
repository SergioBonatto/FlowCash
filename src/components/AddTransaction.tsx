import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Pressable, Alert } from 'react-native';
import { Transaction } from '../types/Transaction';
import { styles } from '../styles/AddTransaction.styles';
import { theme } from '../styles/theme';
import { usePreferences } from '../context/PreferencesContext';
import { AddTransactionProps } from '../types/ComponentsTypes';

const AddTransaction = ({ onAddTransaction }: AddTransactionProps) => {
  const { translate, preferences } = usePreferences();
  const [amount, setAmount] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('income');

  // Função para normalizar o valor de entrada, considerando diferentes formatos de número
  const normalizeAmount = (value: string): number => {
    // Remove todos os caracteres que não são dígitos, pontos ou vírgulas
    const cleanValue = value.replace(/[^\d.,]/g, '');

    // Substitui vírgula por ponto para conversão correta
    const normalizedValue = cleanValue.replace(',', '.');

    return parseFloat(normalizedValue);
  };

  const handleAmountChange = (value: string) => {
    // Aceita apenas dígitos, vírgula e ponto
    const sanitized = value.replace(/[^\d.,]/g, '');

    // Garantir que só temos um separador decimal
    const decimalCount = (sanitized.match(/[.,]/g) || []).length;
    if (decimalCount > 1) return;

    setAmount(sanitized);
  };

  const handleSave = () => {
    if (!title) {
      Alert.alert(translate('error.title'), translate('error.titleRequired'));
      return;
    }

    if (!amount) {
      Alert.alert(translate('error.amount'), translate('error.amountRequired'));
      return;
    }

    const amountValue = normalizeAmount(amount);

    if (isNaN(amountValue) || amountValue <= 0) {
      Alert.alert(translate('error.amount'), translate('error.validAmount'));
      return;
    }

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      title,
      amount: amountValue,
      type,
      category: category || 'Other',
      date: new Date().toISOString(),
    };

    onAddTransaction(newTransaction);

    // Limpar os campos após salvar
    setAmount('');
    setTitle('');
    setCategory('');
    setType('income'); // Resetar para o valor padrão
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
