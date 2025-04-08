import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation';
import { TransactionsProvider } from './src/context/TransactionsContext';

export default function App() {
  return (
    <TransactionsProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </TransactionsProvider>
  );
}
