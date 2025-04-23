import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation';
import { TransactionsProvider } from './src/context/TransactionsContext';
import LoadingScreen from './src/components/LoadingScreen';
import ErrorScreen from './src/components/ErrorScreen';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Check if the app can connect to the development server
    const checkConnection = async () => {
      try {
        // Wait a moment to ensure the bundler has time to initialize
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsLoading(false);
      } catch (error) {
        console.error('Error initializing app:', error);
        setHasError(true);
        setIsLoading(false);
      }
    };

    checkConnection();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (hasError) {
    return <ErrorScreen />;
  }

  return (
    <TransactionsProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </TransactionsProvider>
  );
}
