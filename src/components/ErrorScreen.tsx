import React from 'react';
import { View, Text, Image } from 'react-native';
import { styles } from '../styles/App.styles';
import { usePreferences } from '../context/PreferencesContext';

const ErrorScreen = () => {
  const { translate } = usePreferences();

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/icon.png')}
        style={styles.icon}
        resizeMode="contain"
      />
      <Text style={styles.errorText}>
        {translate('error.connection')}
      </Text>
      <Text style={styles.text}>
        {translate('error.server')}
      </Text>
      <Text style={styles.subText}>
        {translate('error.restart')}
        npx expo start --clear
      </Text>
    </View>
  );
};

export default ErrorScreen;
