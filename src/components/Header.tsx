import { View, Text } from 'react-native';
import { styles } from '../styles/HomeScreen.styles';
import { usePreferences } from '../context/PreferencesContext';
import { HeaderProps } from '../types/ComponentsTypes';

const Header = ({ title, subtitle }: HeaderProps) => {
  const { translate } = usePreferences();

  return (
    <View>
      <Text style={styles.title}>
        {title || translate('welcome')}
      </Text>
      <Text style={styles.subtitle}>
        {subtitle || translate('welcome.subtitle')}
      </Text>
    </View>
  );
};

export default Header;
