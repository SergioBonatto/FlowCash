export const theme = {
  colors: {
    // Main colors with transparency for glass effect
    primary: 'rgba(0, 122, 255, 0.9)',
    secondary: 'rgba(90, 200, 250, 0.9)',
    success: 'rgba(52, 199, 89, 0.9)',
    danger: 'rgba(255, 59, 48, 0.9)',
    warning: 'rgba(255, 149, 0, 0.9)',

    // Background colors with blur
    dark: 'rgba(28, 28, 30, 0.85)',
    background: 'rgba(242, 242, 247, 0.6)',
    card: 'rgba(255, 255, 255, 0.7)',

    // Neutral colors for text and details
    text: 'rgba(0, 0, 0, 0.85)',
    subText: 'rgba(109, 109, 114, 0.75)',
    grey: 'rgba(142, 142, 147, 0.65)',
    lightGrey: 'rgba(209, 209, 214, 0.5)',

    // Subtle borders for glassmorphic elements
    borderLight: 'rgba(255, 255, 255, 0.3)',
    borderDark: 'rgba(0, 0, 0, 0.05)',
  },

  // Soft shadows for glassmorphic effect
  shadows: {
    small: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 1,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.12,
      shadowRadius: 6,
      elevation: 2,
    },
    large: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.14,
      shadowRadius: 10,
      elevation: 3,
    },
  },

  // Blur values for different layers
  blur: {
    light: 15,
    medium: 25,
    strong: 40,
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },

  // Softer borders for glassmorphic style
  radius: {
    sm: 12,
    md: 16,
    lg: 24,
    xl: 32,
  },

  fontSize: {
    title: 20,
    subtitle: 17,
    body: 16,
    caption: 14,
    small: 12,
  },

  fontWeight: {
    regular: '400' as '400',
    medium: '500' as '500',
    semibold: '600' as '600',
    bold: '700' as '700',
  }
};
