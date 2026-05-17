import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

export default function NotamInput({
  value,
  onChangeText,
  onSubmit,
  onClear,
  loading,
}) {
  const isEmpty = value.trim().length === 0;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>NOTAM Metni</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={'Örn: RWY 03R CLSD BTN 0200-0400Z'}
        placeholderTextColor="#94A3B8"
        multiline
        textAlignVertical="top"
        autoCapitalize="characters"
        autoCorrect={false}
        style={styles.input}
      />

      <View style={styles.buttonRow}>
        <Pressable
          onPress={onSubmit}
          disabled={loading}
          style={({ pressed }) => [
            styles.primaryButton,
            (pressed || loading) && styles.primaryButtonPressed,
            loading && { opacity: 0.8 },
          ]}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.primaryButtonText}>Çevir ve Analiz Et</Text>
          )}
        </Pressable>

        <Pressable
          onPress={onClear}
          disabled={loading || isEmpty}
          style={({ pressed }) => [
            styles.secondaryButton,
            pressed && styles.secondaryButtonPressed,
            (loading || isEmpty) && { opacity: 0.4 },
          ]}
        >
          <Text style={styles.secondaryButtonText}>Temizle</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6B5E47',
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  input: {
    minHeight: 140,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E5DDC9',
    backgroundColor: '#FBF7EE',
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: '#3D3528',
    fontFamily: 'Courier',
    lineHeight: 22,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#3D3528',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonPressed: {
    backgroundColor: '#5A4F3D',
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
    letterSpacing: 0.2,
  },
  secondaryButton: {
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D9D0BC',
    backgroundColor: '#FBF7EE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonPressed: {
    backgroundColor: '#EFE7D3',
  },
  secondaryButtonText: {
    color: '#3D3528',
    fontWeight: '600',
    fontSize: 14,
  },
});
