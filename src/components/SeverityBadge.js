import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SEVERITY_META } from '../constants/severity';

export default function SeverityBadge({ severity, size = 'md' }) {
  const meta = SEVERITY_META[severity];
  if (!meta) return null;

  const isSm = size === 'sm';

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: meta.bg,
          borderColor: meta.border,
          paddingVertical: isSm ? 4 : 6,
          paddingHorizontal: isSm ? 10 : 12,
        },
      ]}
    >
      <View style={[styles.dot, { backgroundColor: meta.color }]} />
      <Text
        style={[
          styles.text,
          { color: meta.color, fontSize: isSm ? 12 : 13 },
        ]}
      >
        {meta.label}
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
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  text: {
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
