import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Header() {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>N</Text>
        </View>
        <View>
          <Text style={styles.title}>NOTAM Çevirici</Text>
          <Text style={styles.subtitle}>Pilot dostu NOTAM analizi</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logo: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#3D3528',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: '#F5F1E8',
    fontSize: 22,
    fontWeight: '800',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#3D3528',
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 13,
    color: '#8A7E68',
    marginTop: 2,
  },
});
