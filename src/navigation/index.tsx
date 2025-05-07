import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ReportScreen from '../screens/ReportScreen';
import ExchangeRateScreen from '../screens/ExchangeRateScreen';
import { TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { usePreferences } from '../context/PreferencesContext';

export type RootStackParamList = {
  Home: undefined;
  Settings: undefined;
  Report: undefined;
  Exchange: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const { translate } = usePreferences();

  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <Ionicons name="settings-outline" size={24} color="#007AFF" />
          </TouchableOpacity>
        ),
      })}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => ({
          title: 'FlowCash',
          headerRight: () => (
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Exchange')}
                style={{ marginRight: 15 }}
              >
                <Ionicons name="cube-outline" size={24} color="#007AFF" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('Report')}
                style={{ marginRight: 15 }}
              >
                <Ionicons name="bar-chart-outline" size={24} color="#007AFF" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                <Ionicons name="settings-outline" size={24} color="#007AFF" />
              </TouchableOpacity>
            </View>
          ),
        })}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: translate('settings') }}
      />
      <Stack.Screen
        name="Report"
        component={ReportScreen}
        options={{ title: translate('report') }}
      />
      <Stack.Screen
        name="Exchange"
        component={ExchangeRateScreen}
        options={{ title: translate('exchange.title') }}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;
