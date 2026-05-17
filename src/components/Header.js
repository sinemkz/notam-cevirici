import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { theme } from '../constants/theme';

export default function Header({ onRefresh, loading }) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.logoWrap}>
          <Text style={styles.logoIcon} accessibilityLabel="Uçak">
            ✈️
          </Text>
        </View>
        <View style={styles.titles}>
          <Text style={styles.title}>NOTAM Çevirici</Text>
          <Text style={styles.subtitle}>Pilot dostu NOTAM analizi</Text>
        </View>
        <Pressable
          onPress={onRefresh}
          disabled={loading}
          hitSlop={12}
          accessibilityRole="button"
          accessibilityLabel="Yenile"
          style={({ pressed }) => [
            styles.refreshBtn,
            pressed && styles.refreshPressed,
            loading && styles.refreshDisabled,
          ]}
        >
          <Text style={styles.refreshIcon}>↻</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: theme.sectionTitleGap,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  logoWrap: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: theme.logoBlue,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#D0E8FC',
  },
  logoIcon: {
    fontSize: 22,
  },
  titles: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1a1a1a',
    letterSpacing: -0.35,
    fontFamily: theme.fontFamily,
  },
  subtitle: {
    fontSize: 13,
    color: '#6b6560',
    marginTop: 4,
    fontFamily: theme.fontFamily,
  },
  refreshBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: theme.border,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadowCard,
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  refreshPressed: {
    opacity: 0.85,
    backgroundColor: '#f5f3ef',
  },
  refreshDisabled: {
    opacity: 0.45,
  },
  refreshIcon: {
    fontSize: 22,
    color: '#286DE8',
    fontWeight: '600',
    marginTop: -2,
    fontFamily: theme.fontFamily,
  },
});
