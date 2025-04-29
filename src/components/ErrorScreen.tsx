import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { styles } from '../styles/App.styles';
import { usePreferences } from '../context/PreferencesContext';
import { ErrorResponse, ErrorCode } from '../types/Result';

interface ErrorScreenProps {
  error?: ErrorResponse;
}

const ErrorScreen = ({ error }: ErrorScreenProps) => {
  const { translate } = usePreferences();

  // Default error information if no specific error is provided
  const errorInfo = error || {
    code: ErrorCode.NETWORK_ERROR,
    msg: translate('error.connection'),
    source: 'App'
  };

  // Add timestamp information if it doesn't exist
  const errorWithTimestamp = {
    ...errorInfo,
    timestamp: errorInfo.timestamp || Date.now()
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/icon.png')}
        style={styles.icon}
        resizeMode="contain"
      />
      <Text style={styles.errorText}>
        {translate('error.connection')} (Code: {errorWithTimestamp.code})
      </Text>
      <Text style={styles.text}>
        {errorWithTimestamp.msg || translate('error.server')}
      </Text>
      <ScrollView style={{ maxHeight: 150 }}>
        <Text style={styles.subText}>
          {translate('error.restart')}
          npx expo start --clear
        </Text>
        {errorWithTimestamp.source && (
          <Text style={styles.subText}>
            Source: {errorWithTimestamp.source}
          </Text>
        )}
        {errorWithTimestamp.data && (
          <Text style={styles.subText}>
            Details: {JSON.stringify(errorWithTimestamp.data, null, 2)}
          </Text>
        )}
      </ScrollView>
    </View>
  );
};

export default ErrorScreen;
