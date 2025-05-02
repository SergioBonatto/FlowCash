import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, FlatList } from 'react-native';
import { BlurView } from 'expo-blur';
import { usePreferences, CurrencyCode, LanguageCode } from '../context/PreferencesContext';
import { theme } from '../styles/theme';
import { styles } from '../styles/SettingsScreen.styles';
import { Ionicons } from '@expo/vector-icons';
import ScreenBackground from '../components/ScreenBackground';

const SettingsScreen = () => {
  const { preferences, setCurrency, setLanguage, translate } = usePreferences();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<'language' | 'currency'>('language');

  const currencies: { label: string, value: CurrencyCode }[] = [
    { label: 'USD - US Dollar', value: 'USD' },
    { label: 'BRL - Real Brasileiro', value: 'BRL' },
    { label: 'EUR - Euro', value: 'EUR' },
    { label: 'GBP - British Pound', value: 'GBP' }
  ];

  const languages: { label: string, value: LanguageCode }[] = [
    { label: 'English', value: 'en' },
    { label: 'Português (Brasil)', value: 'pt-BR' },
    { label: 'Português (Guiana Brasileira/Faixa de Gajos)', value: 'pt-PT' },
    { label: 'Español', value: 'es' },
    { label: 'Français', value: 'fr' },
    { label: 'Deutsch', value: 'de' },
    { label: 'Italiano', value: 'it' },
    { label: '日本語', value: 'ja' },
    { label: '中文 (简体)', value: 'zh-CN' },
    { label: 'Русский', value: 'ru' }
  ];

  const openModal = (type: 'language' | 'currency') => {
    setModalType(type);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const selectItem = (value: string) => {
    if (modalType === 'language') {
      setLanguage(value as LanguageCode);
    } else {
      setCurrency(value as CurrencyCode);
    }
    closeModal();
  };

  const getCurrentLabel = (type: 'language' | 'currency'): string => {
    if (type === 'language') {
      const lang = languages.find(l => l.value === preferences.language);
      return lang?.label || 'Selecione um idioma';
    } else {
      const curr = currencies.find(c => c.value === preferences.currency);
      return curr?.label || 'Selecione uma moeda';
    }
  };

  const renderItem = ({ item }: { item: { label: string, value: string } }) => (
    <TouchableOpacity
      style={styles.modalItem}
      onPress={() => selectItem(item.value)}
    >
      <Text style={styles.modalItemText}>{item.label}</Text>
      {((modalType === 'language' && preferences.language === item.value) ||
        (modalType === 'currency' && preferences.currency === item.value)) && (
        <Ionicons name="checkmark" size={24} color={theme.colors.primary} />
      )}
    </TouchableOpacity>
  );

  return (
    <ScreenBackground>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>{translate('settings')}</Text>

        <BlurView intensity={theme.blur.medium} tint="light" style={styles.card}>
          <Text style={styles.sectionTitle}>{translate('settings.language')}</Text>
          <TouchableOpacity
            style={styles.selectButton}
            onPress={() => openModal('language')}
          >
            <Text style={styles.selectButtonText}>
              {getCurrentLabel('language')}
            </Text>
            <Ionicons name="chevron-down" size={24} color={theme.colors.primary} />
          </TouchableOpacity>
        </BlurView>

        <BlurView intensity={theme.blur.medium} tint="light" style={styles.card}>
          <Text style={styles.sectionTitle}>{translate('settings.currency')}</Text>
          <TouchableOpacity
            style={styles.selectButton}
            onPress={() => openModal('currency')}
          >
            <Text style={styles.selectButtonText}>
              {getCurrentLabel('currency')}
            </Text>
            <Ionicons name="chevron-down" size={24} color={theme.colors.primary} />
          </TouchableOpacity>
        </BlurView>
      </ScrollView>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {modalType === 'language'
                  ? translate('settings.language')
                  : translate('settings.currency')}
              </Text>
              <TouchableOpacity onPress={closeModal}>
                <Ionicons name="close" size={24} color={theme.colors.text} />
              </TouchableOpacity>
            </View>

            <FlatList
              data={modalType === 'language' ? languages : currencies}
              renderItem={renderItem}
              keyExtractor={item => item.value}
              style={styles.modalList}
            />
          </View>
        </View>
      </Modal>
    </ScreenBackground>
  );
};

export default SettingsScreen;
