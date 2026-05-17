import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function ResultCard({
  title,
  children,
  accentColor = '#0F172A',
  backgroundColor = '#FFFFFF',
  borderColor = '#E2E8F0',
}) {
  return (
    <View
      style={[
        styles.card,
        { backgroundColor, borderColor },
      ]}
    >
      <View style={styles.header}>
        <View style={[styles.accent, { backgroundColor: accentColor }]} />
        <Text style={[styles.title, { color: accentColor }]}>{title}</Text>
      </View>
      <View style={styles.body}>
        {typeof children === 'string' ? (
          <Text style={styles.text}>{children}</Text>
        ) : (
          children
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: 1,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 12,
    shadowColor: '#0F172A',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  accent: {
    width: 4,
    height: 16,
    borderRadius: 2,
  },
  title: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  body: {},
  text: {
    color: '#3D3528',
    fontSize: 15,
    lineHeight: 22,
  },
});
