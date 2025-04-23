import React from 'react';
import { View, Text, Image } from 'react-native';
import { styles } from '../styles/App.styles';

const ErrorScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/icon.png')}
        style={styles.icon}
        resizeMode="contain"
      />
      <Text style={styles.errorText}>Connection Error</Text>
      <Text style={styles.text}>
        Please check if the Expo server is running on 127.0.0.1:8081
      </Text>
      <Text style={styles.subText}>
        Try stopping and restarting your Expo server with:
        npx expo start --clear
      </Text>
    </View>
  );
};

export default ErrorScreen;
