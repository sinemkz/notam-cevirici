import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SEVERITY_META } from '../constants/severity';
import { theme } from '../constants/theme';

export default function SeverityBadge({ severity }) {
  const meta = SEVERITY_META[severity];
  if (!meta) return null;

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: meta.pillBg,
          borderColor: meta.pillBorder,
        },
      ]}
    >
      <View style={[styles.dot, { backgroundColor: meta.color }]} />
      <Text style={[styles.text, { color: meta.pillText }]}>
        {meta.badgeLabel}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderRadius: 999,
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 14,
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  text: {
    fontWeight: '700',
    fontSize: 13,
    letterSpacing: 0.6,
    fontFamily: theme.fontFamily,
  },
});
