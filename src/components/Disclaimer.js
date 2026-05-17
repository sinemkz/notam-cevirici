import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Disclaimer() {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>!</Text>
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
    gap: 10,
    backgroundColor: '#FBF1C7',
    borderColor: '#EFD89A',
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginTop: 4,
  },
  icon: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#B0823A',
    color: '#FBF7EE',
    textAlign: 'center',
    lineHeight: 22,
    fontWeight: '800',
    fontSize: 14,
  },
  text: {
    flex: 1,
    color: '#8A6E3A',
    fontSize: 12.5,
    lineHeight: 18,
  },
});
