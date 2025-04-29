import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import RootNavigator from './navigation';
import { TransactionsProvider } from './context/TransactionsContext';
import { PreferencesProvider } from './context/PreferencesContext';
import LoadingScreen from './components/LoadingScreen';
import ErrorScreen from './components/ErrorScreen';
import { AppState } from './types/AppTypes';
import { ErrorResponse, ErrorCode } from './types/Result';

const App: React.FC = () => {
  const [state, setState] = useState<AppState & { error?: ErrorResponse }>({
    isLoading: true,
    hasError: false
  });

  useEffect(() => {
    // Check if the app can connect to the development server
    const checkConnection = async (): Promise<void> => {
      try {
        // Wait a moment to ensure the bundler has time to initialize
        await new Promise<void>((resolve) => setTimeout(resolve, 2000));
        setState(prevState => ({ ...prevState, isLoading: false }));
      } catch (error) {
        console.error('Error initializing app:', error);
        setState({
          isLoading: false,
          hasError: true,
          error: {
            code: ErrorCode.NETWORK_ERROR,
            msg: error instanceof Error ? error.message : 'Erro desconhecido ao inicializar o aplicativo',
            source: 'App.checkConnection',
            timestamp: Date.now()
          }
        });
      }
    };

    checkConnection();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PreferencesProvider>
        {state.isLoading ? (
          <LoadingScreen />
        ) : state.hasError ? (
          <ErrorScreen error={state.error} />
        ) : (
          <TransactionsProvider>
            <NavigationContainer>
              <RootNavigator />
            </NavigationContainer>
          </TransactionsProvider>
        )}
      </PreferencesProvider>
    </GestureHandlerRootView>
  );
};

export default App;
