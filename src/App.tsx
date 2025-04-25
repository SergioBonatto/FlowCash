import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './navigation';
import { TransactionsProvider } from './context/TransactionsContext';
import { PreferencesProvider } from './context/PreferencesContext';
import LoadingScreen from './components/LoadingScreen';
import ErrorScreen from './components/ErrorScreen';
import { AppState, ConnectionResult } from './types/AppTypes';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
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
        setState({ isLoading: false, hasError: true });
      }
    };

    checkConnection();
  }, []);

  return (
    <PreferencesProvider>
      {state.isLoading ? (
        <LoadingScreen />
      ) : state.hasError ? (
        <ErrorScreen />
      ) : (
        <TransactionsProvider>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </TransactionsProvider>
      )}
    </PreferencesProvider>
  );
};

export default App;
