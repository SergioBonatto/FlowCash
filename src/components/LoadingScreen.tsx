import React from 'react';
import { View, Text, ActivityIndicator, Image } from 'react-native';
import { styles } from '../styles/App.styles';

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/icon.png')}
        style={styles.icon}
        resizeMode="contain"
      />
      <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      <Text style={styles.text}>Loading FlowCash...</Text>
    </View>
  );
};

export default LoadingScreen;
