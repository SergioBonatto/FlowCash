import { View, Text } from 'react-native';
import {styles} from '../styles/HomeScreen.styles';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to FlowCash</Text>
      <Text style={styles.subtitle}>Manage your home finances easily.</Text>
    </View>
  );
};

export default HomeScreen;
