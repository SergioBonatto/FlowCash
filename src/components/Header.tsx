import { View, Text } from 'react-native';
import { styles } from '../styles/HomeScreen.styles';
import { usePreferences } from '../context/PreferencesContext';
import { HeaderProps } from '../types/ComponentsTypes';

const Header = ({ title, subtitle }: HeaderProps) => {
  const { i18n } = usePreferences();

  return (
    <View>
      <Text style={styles.title}>
        {title || i18n.t('welcome')}
      </Text>
      <Text style={styles.subtitle}>
        {subtitle || i18n.t('welcome.subtitle')}
      </Text>
    </View>
  );
};

export default Header;
