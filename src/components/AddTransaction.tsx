import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, TouchableOpacity, Pressable, Alert, FlatList, Modal } from 'react-native';
import { Transaction, TransactionType } from '../types/Transaction';
import { styles } from '../styles/AddTransaction.styles';
import { theme } from '../styles/theme';
import { usePreferences } from '../context/PreferencesContext';
import { useTransactions } from '../context/TransactionsContext';
import { AddTransactionProps } from '../types/ComponentsTypes';
import { pipe, when } from '../utils/functional';

const AddTransaction = ({ onAddTransaction }: AddTransactionProps) => {
  const { i18n, preferences } = usePreferences();
  const { categories } = useTransactions();

  const [amount, setAmount] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState<TransactionType>('income');
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [filteredCategories, setFilteredCategories] = useState<string[]>([]);

  // Update filtered categories when user types
  useEffect(() => {
    if (category.trim()) {
      const filtered = Array.from(categories).filter(
        cat => cat.toLowerCase().includes(category.toLowerCase())
      );
      setFilteredCategories(filtered);
    } else {
      setFilteredCategories([]);
    }
  }, [category, categories]);

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

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    if (value.trim()) {
      setShowCategoryModal(true);
    } else {
      setShowCategoryModal(false);
    }
  };

  const selectCategory = (selectedCategory: string) => {
    setCategory(selectedCategory);
    setShowCategoryModal(false);
  };

  const handleSave = () => {
    // Validations
    if (!validateTitle(title)) {
      Alert.alert(i18n.t('error.title'), i18n.t('error.titleRequired'));
      return;
    }

    if (!validateAmount(amount)) {
      Alert.alert(
        i18n.t('error.amount'),
        amount ? i18n.t('error.validAmount') : i18n.t('error.amountRequired')
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
        {i18n.t(`transaction.${buttonType}`)}
      </Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{i18n.t('transaction.new')}</Text>

      <TextInput
        style={styles.input}
        placeholder={i18n.t('transaction.title')}
        value={title}
        onChangeText={setTitle}
        placeholderTextColor={theme.colors.grey}
      />

      <TextInput
        style={styles.input}
        placeholder={i18n.t('transaction.amount')}
        value={amount}
        onChangeText={handleAmountChange}
        keyboardType="numeric"
        placeholderTextColor={theme.colors.grey}
      />

      <View style={styles.categoryInputContainer}>
        <TextInput
          style={styles.input}
          placeholder={i18n.t('transaction.category')}
          value={category}
          onChangeText={handleCategoryChange}
          placeholderTextColor={theme.colors.grey}
        />

        {/* Category suggestions dropdown */}
        {showCategoryModal && filteredCategories.length > 0 && (
          <View style={styles.suggestionsContainer}>
            <FlatList
              data={filteredCategories}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.suggestionItem}
                  onPress={() => selectCategory(item)}
                >
                  <Text style={styles.suggestionText}>{item}</Text>
                </TouchableOpacity>
              )}
              style={styles.suggestionsList}
              keyboardShouldPersistTaps="handled"
            />
          </View>
        )}
      </View>

      <View style={styles.typeSelector}>
        {renderTypeButton('income', 'transaction.income')}
        <View style={styles.buttonSpace} />
        {renderTypeButton('expense', 'transaction.expense')}
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>{i18n.t('transaction.save')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddTransaction;
