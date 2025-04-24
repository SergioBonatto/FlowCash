import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { usePreferences } from '../context/PreferencesContext';

export type RootStackParamList = {
  Home: undefined;
  Settings: undefined;
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
        options={{ title: 'FlowCash' }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: translate('settings') }}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;
