import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../styles/theme';
import { styles } from '../styles/CurrencySelector.styles';
import { usePreferences } from '../context/PreferencesContext';

interface CurrencySelectorProps {
    currencies: { code: string; name: string }[];
    selectedCurrency: string;
    onSelect: (currencyCode: string) => void;
  }

const CurrencySelector = ({ currencies, selectedCurrency, onSelect }: CurrencySelectorProps) => {
  const { i18n } = usePreferences();
  const [modalVisible, setModalVisible] = useState(false);

  const selectedCurrencyInfo = currencies.find(c => c.code === selectedCurrency);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleSelect = (currencyCode: string) => {
    onSelect(currencyCode);
    closeModal();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.selectButton}
        onPress={openModal}
      >
        <View style={styles.selectedCurrency}>
          <Text style={styles.currencyCode}>{selectedCurrency}</Text>
          <Text style={styles.currencyName}>
            {selectedCurrencyInfo?.name || ''}
          </Text>
        </View>
        <Ionicons name="chevron-down" size={24} color={theme.colors.primary} />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <BlurView intensity={theme.blur.strong} tint="light" style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{i18n.t('exchange.selectCurrency')}</Text>
              <TouchableOpacity onPress={closeModal}>
                <Ionicons name="close" size={24} color={theme.colors.text} />
              </TouchableOpacity>
            </View>

            <FlatList
              data={currencies}
              keyExtractor={(item) => item.code}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.currencyItem,
                    selectedCurrency === item.code && styles.selectedItem
                  ]}
                  onPress={() => handleSelect(item.code)}
                >
                  <Text style={styles.currencyItemCode}>{item.code}</Text>
                  <Text style={styles.currencyItemName}>{item.name}</Text>
                  {selectedCurrency === item.code && (
                    <Ionicons name="checkmark" size={24} color={theme.colors.primary} />
                  )}
                </TouchableOpacity>
              )}
            />
          </BlurView>
        </View>
      </Modal>
    </View>
  );
};

export default CurrencySelector;
