import React from 'react';
import {
  ActivityIndicator,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { theme } from '../constants/theme';

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
        placeholderTextColor="#9CA3AF"
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
          style={[styles.primaryWrap, loading && { opacity: 0.85 }]}
        >
          <View style={[styles.primaryFill, primaryGradientStyle]}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <Text style={styles.primaryPlane}>✈️</Text>
                <Text style={styles.primaryButtonText}>Çevir ve Analiz Et</Text>
              </>
            )}
          </View>
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
          <Text style={styles.secondaryIcon}>🧹</Text>
          <Text style={styles.secondaryButtonText}>Temizle</Text>
        </Pressable>
      </View>
    </View>
  );
}

/** Web: CSS 135° gradient; iOS/Android: iki durak ortası düz renk (paketsiz). */
const primaryGradientStyle =
  Platform.OS === 'web'
    ? {
        backgroundImage:
          'linear-gradient(135deg, #4BA3F2 0%, #286DE8 100%)',
      }
    : {
        backgroundColor: '#3889ED',
      };

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3d3d3d',
    marginBottom: 10,
    fontFamily: theme.fontFamily,
  },
  input: {
    minHeight: 120,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.borderInput,
    backgroundColor: '#fff',
    paddingHorizontal: 18,
    paddingVertical: 18,
    fontSize: 14,
    color: '#1a1a1a',
    fontFamily: Platform.select({
      ios: 'Menlo',
      android: 'monospace',
      web: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
      default: 'monospace',
    }),
    lineHeight: 21,
    ...theme.shadowCard,
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 2,
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: 12,
    marginTop: 16,
  },
  primaryWrap: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
    ...theme.shadowCard,
    shadowOpacity: 0.08,
    elevation: 3,
  },
  primaryFill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    paddingHorizontal: 14,
    minHeight: 52,
  },
  primaryPlane: {
    fontSize: 16,
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
    letterSpacing: 0.2,
    fontFamily: theme.fontFamily,
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.border,
    backgroundColor: '#fff',
    ...theme.shadowCard,
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 1,
  },
  secondaryButtonPressed: {
    backgroundColor: '#f7f5f2',
  },
  secondaryIcon: {
    fontSize: 15,
  },
  secondaryButtonText: {
    color: '#44403c',
    fontWeight: '600',
    fontSize: 14,
    fontFamily: theme.fontFamily,
  },
});
