import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../constants/theme';

export default function Disclaimer() {
  return (
    <View style={[styles.container, theme.shadowCard]}>
      <View style={styles.iconCircle}>
        <Text style={styles.iconMark}>!</Text>
      </View>
      <Text style={styles.text}>
        Bu çeviri yardımcı amaçlıdır. Operasyonel kararlar için daima resmi
        NOTAM kaynağı ve şirket prosedürleri esas alınmalıdır.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
    backgroundColor: theme.disclaimer.bg,
    borderColor: theme.disclaimer.border,
    borderWidth: 1,
    borderRadius: theme.cardRadius,
    paddingVertical: theme.cardPadding,
    paddingHorizontal: theme.cardPadding,
    marginTop: 4,
    shadowOpacity: 0.05,
    shadowRadius: 14,
    elevation: 2,
  },
  iconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: theme.disclaimer.iconBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconMark: {
    color: '#A16D15',
    fontWeight: '800',
    fontSize: 16,
    marginTop: -1,
    fontFamily: theme.fontFamily,
  },
  text: {
    flex: 1,
    color: theme.disclaimer.text,
    fontSize: 13,
    lineHeight: 20,
    fontFamily: theme.fontFamily,
  },
});
