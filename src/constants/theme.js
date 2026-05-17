import { Platform } from 'react-native';

/** Referans tasarım tokenları — NOTAM Çevirici UI */
export const theme = {
  screenBg: '#FAF9F6',
  border: '#E8E2D8',
  borderInput: '#E5DED3',

  shadowCard: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 18,
    elevation: 4,
  },

  pagePadding: 24,
  cardGap: 16,
  sectionTitleGap: 12,
  cardPadding: 18,
  cardRadius: 18,
  contentMaxWidth: 430,

  /** Web’de iOS benzeri stack; native’de undefined = sistem fontu */
  fontFamily:
    Platform.OS === 'web'
      ? '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Inter", sans-serif'
      : undefined,

  gradientPrimary: ['#4BA3F2', '#286DE8'],

  plainEnglish: {
    bg: '#EAF5FF',
    border: '#CFE7FA',
    title: '#2F7DBD',
  },
  turkish: {
    bg: '#F4ECFF',
    border: '#E2D2F5',
    title: '#7656A8',
  },
  pilot: {
    bg: '#FFF6E4',
    border: '#F2DDAF',
    title: '#9A6B22',
  },
  disclaimer: {
    bg: '#FFF5D6',
    border: '#F1D18A',
    text: '#A16D15',
    iconBg: '#F5D563',
  },

  logoBlue: '#B8D9FA',
  logoBlueDeep: '#7BB8F0',
};
