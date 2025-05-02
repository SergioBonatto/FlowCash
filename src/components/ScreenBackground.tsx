import React, { ReactNode } from 'react';
import { ImageBackground, StyleSheet, View, StatusBar, SafeAreaView } from 'react-native';
import { styles as homeStyles } from '../styles/HomeScreen.styles';

interface ScreenBackgroundProps {
  children: ReactNode;
  statusBarStyle?: 'light-content' | 'dark-content';
}

const ScreenBackground = ({
  children,
  statusBarStyle = 'dark-content'
}: ScreenBackgroundProps) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle={statusBarStyle} translucent backgroundColor="transparent" />
      <ImageBackground
        source={require('../../assets/background.png')}
        style={styles.backgroundImage}
      >
        {children}
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default ScreenBackground;
