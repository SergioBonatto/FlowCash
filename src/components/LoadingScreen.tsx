import React from 'react';
import { View, Text, ActivityIndicator, Image } from 'react-native';
import { styles } from '../styles/App.styles';
import { usePreferences } from '../context/PreferencesContext';

const LoadingScreen = () => {
  const { i18n } = usePreferences();

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/icon.png')}
        style={styles.icon}
        resizeMode="contain"
      />
      <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      <Text style={styles.text}>
        {i18n.t('loading')}
      </Text>
    </View>
  );
};

export default LoadingScreen;
