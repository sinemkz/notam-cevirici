import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../constants/theme';

export default function ResultCard({
  title,
  titleIcon,
  titleColor,
  children,
  backgroundColor = '#FFFFFF',
  borderColor = theme.border,
}) {
  return (
    <View
      style={[
        styles.card,
        { backgroundColor, borderColor },
        theme.shadowCard,
      ]}
    >
      <View style={styles.header}>
        {titleIcon ? (
          <Text style={styles.headerIcon}>{titleIcon}</Text>
        ) : null}
        <Text style={[styles.title, titleColor && { color: titleColor }]}>
          {title}
        </Text>
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
    borderRadius: theme.cardRadius,
    borderWidth: 1,
    padding: theme.cardPadding,
    marginBottom: theme.cardGap,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  headerIcon: {
    fontSize: 18,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.2,
    color: '#1a1a1a',
    fontFamily: theme.fontFamily,
  },
  body: {},
  text: {
    color: '#292524',
    fontSize: 15,
    lineHeight: 23,
    fontFamily: theme.fontFamily,
  },
});
