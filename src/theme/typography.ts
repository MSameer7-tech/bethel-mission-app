import { Platform } from 'react-native';

export const typography = {
  family: {
    primary: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  sizes: {
    xs: 13,
    sm: 14,
    md: 15,
    lg: 16,
    xl: 18,
    xxl: 24,
    xxxl: 28,
  },
  weights: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
  styles: {
    display: {
      fontSize: 28, // 28-30px
      fontWeight: '700' as const,
      lineHeight: 34,
      letterSpacing: -0.5,
    },
    pageTitle: {
      fontSize: 24,
      fontWeight: '700' as const,
      lineHeight: 30,
      letterSpacing: -0.4,
    },
    sectionTitle: {
      fontSize: 15, // 15-16px
      fontWeight: '700' as const,
      lineHeight: 20,
      letterSpacing: 0.5,
      textTransform: 'uppercase' as const,
    },
    cardTitle: {
      fontSize: 17, // 16-18px
      fontWeight: '600' as const,
      lineHeight: 22,
      letterSpacing: -0.2,
    },
    body: {
      fontSize: 15, // 14-15px
      fontWeight: '400' as const,
      lineHeight: 22,
    },
    bodyMedium: {
      fontSize: 15,
      fontWeight: '500' as const,
      lineHeight: 22,
    },
    caption: {
      fontSize: 14, // 13-14px
      fontWeight: '400' as const,
      lineHeight: 20,
    },
    label: {
      fontSize: 13,
      fontWeight: '600' as const,
      lineHeight: 18,
    },
  },
};
