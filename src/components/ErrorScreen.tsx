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

  // Informações padrão de erro se nenhum erro específico for fornecido
  const errorInfo = error || {
    code: ErrorCode.NETWORK_ERROR,
    msg: translate('error.connection'),
    source: 'App'
  };

  // Adicionar informações de timestamp se não existirem
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
        {translate('error.connection')} (Código: {errorWithTimestamp.code})
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
            Origem: {errorWithTimestamp.source}
          </Text>
        )}
        {errorWithTimestamp.data && (
          <Text style={styles.subText}>
            Detalhes: {JSON.stringify(errorWithTimestamp.data, null, 2)}
          </Text>
        )}
      </ScrollView>
    </View>
  );
};

export default ErrorScreen;
